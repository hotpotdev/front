import { GRAPHQL_API } from '@/conf/chain';
import { ComputeBondingCurve, EncodeLaunchData, FormatBondingCurve } from './utils/curve';
import { IToken, useTokens } from './hooks/useToken';
import { IPlatfrom, usePlatform } from './hooks/usePlatform';
import { getContract, writeContract, readContract, waitForTransaction } from 'wagmi/actions';
import { factoryAbi } from './contracts/Factory';
import { WalletClient } from 'wagmi';
import { IBondingCurveType, ILaunchParam } from './types/curve';
import { Hash } from '../types/type';
import { formatEther, parseEther } from 'viem';
import { getSdk } from './api/graphql';
import { GraphQLClient } from 'graphql-request';
import { bondingCurveAbi } from './contracts/BondingCurve';
import { BondingCurveEncode } from './hooks/useBondingCurve';
import { tokenAbi } from './contracts/Token';
import { ScientificToString } from '../common/utils';
import { ConverToToken, RATE_MULTIPLIER } from './utils/format';

/**
 * deploy a token with bonding curve type, supply expect, price expect and init price.
 * will generate the parameter of different bonding curve types base on `supply expect`, `price expect` and `init price`.
 */
export type DeployParameters = {
    /**
     * bonding curve type, 'linear' | 'exponential' | 'squareroot'
     */
    bondingCurveType: IBondingCurveType;
    supplyExpect: number;
    priceExpect: number;
    initPrice: number;
    name: string;
    symbol: string;
    mintTaxRate?: number;
    burnTaxRate?: number;
    mintFirstAmount?: number;
    metadataUrl?: string;
    isSbt?: boolean;
    owner?: Hash;
    treasury?: Hash;
    rasingToken?: Hash;
};

export class HotpotClient {
    chainId: number;
    walletClient: WalletClient;
    private factory?: IPlatfrom;
    private client?: GraphQLClient

    constructor(_chainId: number, _walletClient: WalletClient) {
        this.chainId = _chainId;
        this.walletClient = _walletClient;
    }

    private getGraphClient(): GraphQLClient {
        if (!this.client) {

            let endpoint = GRAPHQL_API[this.chainId];
            if (!endpoint) {
                throw 'unsupport chain';
            }
            this.client = new GraphQLClient(endpoint)
        }
        return this.client;
    }

    async getFactory(refresh?: boolean) {
        if (!this.factory || refresh) {
            const sdk = getSdk(this.getGraphClient())
            const data = await sdk.fetchPlatform()
            const { platformEntities, bondingCurveTypes } = data;
            const bondingCurve = bondingCurveTypes?.reduce((prev: any, curr: { name: string; impl: string }) => ({ ...prev, [curr.name]: curr.impl }), {}) as {
                [K in IBondingCurveType]?: `0x${string}` | string;
            }
            this.factory = {
                ...platformEntities?.[0],
                bondingCurve
            } as IPlatfrom
        }
        return this.factory;
    }

    async getTokenInfo(addr: Hash) {
        const sdk = getSdk(this.getGraphClient())
        const data = await sdk.fetchToken({ address: addr })
        return ConverToToken(data.tokenEntity);
    }

    async getAllToken() {
        const sdk = getSdk(this.getGraphClient())
        const data = await sdk.fetchTokens()
        return data.tokenEntities.map(token => {
            return ConverToToken(token)
        }) as IToken[]
    }

    async deployToken(deployParams: DeployParameters): Promise<HotpotToken> {
        let factory = await this.getFactory();
        const factoryContract = getContract({
            address: factory?.addr as `0x${string}`,
            abi: factoryAbi,
            chainId: this.chainId,
            walletClient: this.walletClient
        });
        let account = this.walletClient.account.address;
        let { params } = ComputeBondingCurve({
            type: deployParams.bondingCurveType,
            supplyExpect: deployParams.supplyExpect,
            priceExpect: deployParams.priceExpect,
            initPrice: deployParams.initPrice
        });
        let bondingCurveAddr = factory.bondingCurve?.[deployParams.bondingCurveType];
        let mintFirstAmount = deployParams.mintFirstAmount ?? 0;
        let payAmount = 0n;
        if (bondingCurveAddr && mintFirstAmount) {
            let readData = await readContract({
                address: bondingCurveAddr,
                abi: bondingCurveAbi,
                functionName: 'calculateBurnAmountFromBondingCurve',
                args: [parseEther(mintFirstAmount.toString()), parseEther(mintFirstAmount.toString()), BondingCurveEncode(deployParams.bondingCurveType, params)]
            })
            payAmount = readData ? (readData as bigint[])[1] : 0n
        }
        const burnTaxRate = deployParams.burnTaxRate ?? 0;
        const mintTaxRate = deployParams.mintTaxRate ?? 0;
        if (burnTaxRate > 100 || (burnTaxRate < 0.01 && burnTaxRate != 0)) {
            throw "wrong burnTaxRate, range 0.01% to 100%"
        }
        if (mintTaxRate > 100 || (mintTaxRate < 0.01 && mintTaxRate != 0)) {
            throw "wrong mintTaxRate, range 0.01% to 100%"
        }
        const { calldata, value } = EncodeLaunchData({
            tokenType: 'ERC20',
            bondingCurveType: deployParams.bondingCurveType,
            name: deployParams.name,
            symbol: deployParams.symbol,
            metadataUrl: deployParams.metadataUrl || '',
            ownerAddress: deployParams.owner || account,
            treasuryAddress: deployParams.treasury || account,
            mintTaxRate: burnTaxRate,
            burnTaxRate: mintTaxRate,
            raisingTokenAddress: deployParams.rasingToken ?? "0x0000000000000000000000000000000000000000",
            isSbt: deployParams.isSbt ?? false,
            params,
            payAmount: payAmount
        } as ILaunchParam);
        try {
            const hash = await factoryContract.write.deployToken([calldata, value], { value: value });
            const t = new Promise<Hash>((resolve, reject) => {
                factoryContract.watchEvent.LogTokenDeployed({}, { onLogs: logs => resolve((logs[0] as any).args.deployedAddr) });
            });
            await waitForTransaction({ hash });
            return new HotpotToken(await t, this.chainId, this.walletClient);
        } catch (error) {
            return Promise.reject(error);
        }

    }
}

class HotpotToken {

    public contract;

    chainId: number;
    walletClient: WalletClient;
    private client?: GraphQLClient
    private tokenInfo?: IToken | null;

    constructor(_addr: Hash, _chainId: number, _walletClient: WalletClient) {
        this.contract = getContract({
            address: _addr,
            abi: tokenAbi,
            chainId: _chainId,
            walletClient: _walletClient
        });
        this.chainId = _chainId;
        this.walletClient = _walletClient;
    }

    async getTokenInfo(refresh?: boolean) {
        if (!this.tokenInfo || refresh) {
            const sdk = getSdk(this.getGraphClient())
            const data = await sdk.fetchToken({ address: this.contract.address })
            this.tokenInfo = ConverToToken(data.tokenEntity);
        }
        return this.tokenInfo;
    }

    private getGraphClient(): GraphQLClient {
        if (!this.client) {
            let endpoint = GRAPHQL_API[this.chainId];
            if (!endpoint) {
                throw 'unsupport chain';
            }
            this.client = new GraphQLClient(endpoint)
        }
        return this.client;
    }

    async getProjectAdmin() {
        return (await this.getTokenInfo())?.admin
    }

    /**
     * change the owner to the new address
     * @param newOwner the address of new owner
     */
    async changeOwner(newOwner: Hash) {
        const currentAdmin = await this.getProjectAdmin();
        if (currentAdmin != this.walletClient.account.address) {
            throw "you are not the admin";
        }
        const hash = await this.contract.write.setProjectAdmin([newOwner]);
        await waitForTransaction({ hash: hash })
    }

    async setTaxRate(mintTaxRate?: number, burnTaxRate?: number) {
        if (!mintTaxRate && !burnTaxRate) {
            return;
        }
        const tokenInfo = (await this.getTokenInfo())
        if (!mintTaxRate) {
            mintTaxRate = Number(tokenInfo?.mintTax) / 1e2
        }
        if (!burnTaxRate) {
            burnTaxRate = Number(tokenInfo?.burnTax) / 1e2
        }
        if (burnTaxRate > 100 || (burnTaxRate < 0.01 && burnTaxRate != 0)) {
            throw "wrong burnTaxRate, range 0.01% to 100%"
        }
        if (mintTaxRate > 100 || (mintTaxRate < 0.01 && mintTaxRate != 0)) {
            throw "wrong mintTaxRate, range 0.01% to 100%"
        }
        const hash = await this.contract.write.setProjectTaxRate([BigInt(1e2 * mintTaxRate), BigInt(1e2 * mintTaxRate)]);
        await waitForTransaction({ hash: hash })
    }


    /**
     *
     * @param tokenWant the amount of token that you want to mint
     * @param slippage 1=100%, 0.0001=0.01%, the minimum receive amount will be 'tokenWant * (1-slippage)'
     * @param maxPay max anchor token you want to pay
     * @param account who receive the token, default is the account of `walletClient`
     */
    async mintExact(tokenWant: number, slippage: number = 0, maxPay: number, account?: Hash) {
        if (slippage > 100 || (slippage < 0.01 && slippage != 0)) {
            throw "wrong slippage, range 0.01% to 100%"
        }
        const tokenWantInWei = parseEther(ScientificToString(tokenWant))
        const maxPayInWei = parseEther(ScientificToString(maxPay))
        const estimateRes = await this.contract.read.estimateMintNeed([tokenWantInWei]);
        const payAmount = (estimateRes as bigint[])?.[1]
        if (payAmount > maxPayInWei) {
            throw "actual pay exceed max pay"
        }
        const hash = await this.contract.write.mint([account ?? this.walletClient.account.address, payAmount, tokenWantInWei * (10000n - BigInt(100 * slippage)) / 10000n])

        await waitForTransaction({ hash: hash })
    }

    /**
     * estimate how many anchor token you need pay if you mint `tokenWant` token
     * @param tokenWant the amount of token you want to mint
     * @returns the amount of anchor token you need pay
     */
    async estimateMintExact(tokenWant: number) {
        const tokenWantInWei = parseEther(ScientificToString(tokenWant))
        const estimateRes = await this.contract.read.estimateMintNeed([tokenWantInWei]);
        return (estimateRes as bigint[])?.[1]
    }

    /**
     *
     * @param payAmount the amount of anchor token you will pay
     * @param minReceive the amount of token that you acceptable after slippage
     * @param account who receive the token, default is the account of `walletClient`
     * @deprecated suggest use `mintExact`
     */
    async mint(payAmount: number, minReceive: number = 0, account?: Hash) {
        const payAmountInWei = parseEther(ScientificToString(payAmount))
        const minReceiveInWei = parseEther(ScientificToString(minReceive))
        const hash = await this.contract.write.mint([account ?? this.walletClient.account.address, payAmountInWei, minReceiveInWei])
        await waitForTransaction({ hash: hash })
    }


    /**
     * estimate how many token you will receive if you pay `payAmount` anchor token to mint
     * @param payAmount the amount of anchor token you will pay
     * @returns the amount of token you will receive
     */
    async estimateMint(payAmount: number) {
        const payAmountInWei = parseEther(ScientificToString(payAmount))
        const estimateRes = await this.contract.read.estimateMint([payAmountInWei]);
        const receivedAmount = (estimateRes as bigint[])?.[0]
        return formatEther(receivedAmount);
    }


    /**
     * estimate the amount of anchor token will receive after burn;
     * @param tokenAmount the amount of token you want to burn
     * @returns the amount of anchor token that you will receive
     */
    async estimateBurn(tokenAmount: number) {
        const tokenAmountInWei = parseEther(ScientificToString(tokenAmount))
        const estimateRes = await this.contract.read.estimateBurn([tokenAmountInWei]);
        const receivedAmount = (estimateRes as bigint[])?.[1]
        return formatEther(receivedAmount);
    }


    /**
     * burn
     * @param tokenAmount the amount of token you want to burn
     * @param minReceive minimum amount of anchor token you can accept
     * @param account who receive the anchor token, default is the account of `walletClient`
     */
    async burn(tokenAmount: number, minReceive: number, account?: Hash) {
        const tokenAmountInWei = parseEther(ScientificToString(tokenAmount))
        const minReceiveInWei = parseEther(ScientificToString(minReceive))
        const hash = await this.contract.write.burn([account ?? this.walletClient.account.address, tokenAmountInWei, minReceiveInWei])
        await waitForTransaction({ hash: hash })
    }

    // async getTokenInfo() {
    //     contractReads
    // }
}
