import type { OracleContract } from './types';

/**
 * orace conteact
 * [zh] 预言机合约
 */
export const ORACLE_CONTEACT: OracleContract[] = [
  {
    id: 1,
    name: 'chainLink',
    address: '0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e',
    abi: [
      'function decimals() external view returns (uint8)',
      'function description() external view returns (string memory)',
      'function version() external view returns (uint256)',
      'function getRoundData(uint80 _roundId) returns ( uint80 roundId,int256 answer,uint256 startedAt,uint256 updatedAt,uint80 answeredInRound)',
      'function latestRoundData() external view returns (uint80 roundId,int256 answer,uint256 startedAt,uint256 updatedAt,uint80 answeredInRound)',
    ],
    pairs: {
      'usdt-eth': '0xEe9F2375b4bdF6387aa8265dD4FB8F16512A1d46',
      'usdc-eth': '0x986b5E1e1755e3C2440e960477f25201B0a8bbD4',
      'bnb-usdc': '0x14e613AC84a31f709eadbdF89C6CC390fDc9540A',
      'usdc-dev': '0x4497B606be93e773bbA5eaCFCb2ac5E2214220Eb',
      'ont-usdc': '0xcDa3708C5c2907FCca52BB3f9d3e4c2028b89319',
    }
  },
];
