export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: `0x${string}`; output: `0x${string}`; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: bigint; output: bigint; }
  BigInt: { input: bigint; output: bigint; }
  Bytes: { input: `0x${string}`; output: `0x${string}`; }
  Int8: { input: number; output: number; }
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type BondingCurveType_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BondingCurveType_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  impl?: InputMaybe<Scalars['Bytes']['input']>;
  impl_contains?: InputMaybe<Scalars['Bytes']['input']>;
  impl_gt?: InputMaybe<Scalars['Bytes']['input']>;
  impl_gte?: InputMaybe<Scalars['Bytes']['input']>;
  impl_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  impl_lt?: InputMaybe<Scalars['Bytes']['input']>;
  impl_lte?: InputMaybe<Scalars['Bytes']['input']>;
  impl_not?: InputMaybe<Scalars['Bytes']['input']>;
  impl_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  impl_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<BondingCurveType_Filter>>>;
};

export enum BondingCurveType_OrderBy {
  Id = 'id',
  Impl = 'impl',
  Name = 'name'
}

export type CounterEntity_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CounterEntity_Filter>>>;
  count?: InputMaybe<Scalars['BigDecimal']['input']>;
  count_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  count_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  count_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  count_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  count_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  count_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  count_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<CounterEntity_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  type?: InputMaybe<Scalars['String']['input']>;
  type_contains?: InputMaybe<Scalars['String']['input']>;
  type_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  type_ends_with?: InputMaybe<Scalars['String']['input']>;
  type_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  type_gt?: InputMaybe<Scalars['String']['input']>;
  type_gte?: InputMaybe<Scalars['String']['input']>;
  type_in?: InputMaybe<Array<Scalars['String']['input']>>;
  type_lt?: InputMaybe<Scalars['String']['input']>;
  type_lte?: InputMaybe<Scalars['String']['input']>;
  type_not?: InputMaybe<Scalars['String']['input']>;
  type_not_contains?: InputMaybe<Scalars['String']['input']>;
  type_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  type_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  type_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  type_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  type_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  type_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  type_starts_with?: InputMaybe<Scalars['String']['input']>;
  type_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum CounterEntity_OrderBy {
  Count = 'count',
  Id = 'id',
  Timestamp = 'timestamp',
  Type = 'type'
}

export type Governor_Project_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Governor_Project_Filter>>>;
  currentStrategy?: InputMaybe<Scalars['String']['input']>;
  currentStrategy_?: InputMaybe<Governor_Strategy_Filter>;
  currentStrategy_contains?: InputMaybe<Scalars['String']['input']>;
  currentStrategy_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  currentStrategy_ends_with?: InputMaybe<Scalars['String']['input']>;
  currentStrategy_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  currentStrategy_gt?: InputMaybe<Scalars['String']['input']>;
  currentStrategy_gte?: InputMaybe<Scalars['String']['input']>;
  currentStrategy_in?: InputMaybe<Array<Scalars['String']['input']>>;
  currentStrategy_lt?: InputMaybe<Scalars['String']['input']>;
  currentStrategy_lte?: InputMaybe<Scalars['String']['input']>;
  currentStrategy_not?: InputMaybe<Scalars['String']['input']>;
  currentStrategy_not_contains?: InputMaybe<Scalars['String']['input']>;
  currentStrategy_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  currentStrategy_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  currentStrategy_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  currentStrategy_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  currentStrategy_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  currentStrategy_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  currentStrategy_starts_with?: InputMaybe<Scalars['String']['input']>;
  currentStrategy_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Governor_Project_Filter>>>;
  proposals_?: InputMaybe<Governor_Proposal_Filter>;
  timelock?: InputMaybe<Scalars['String']['input']>;
  timelock_?: InputMaybe<Governor_Timelock_Filter>;
  timelock_contains?: InputMaybe<Scalars['String']['input']>;
  timelock_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  timelock_ends_with?: InputMaybe<Scalars['String']['input']>;
  timelock_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timelock_gt?: InputMaybe<Scalars['String']['input']>;
  timelock_gte?: InputMaybe<Scalars['String']['input']>;
  timelock_in?: InputMaybe<Array<Scalars['String']['input']>>;
  timelock_lt?: InputMaybe<Scalars['String']['input']>;
  timelock_lte?: InputMaybe<Scalars['String']['input']>;
  timelock_not?: InputMaybe<Scalars['String']['input']>;
  timelock_not_contains?: InputMaybe<Scalars['String']['input']>;
  timelock_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  timelock_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  timelock_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timelock_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  timelock_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  timelock_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timelock_starts_with?: InputMaybe<Scalars['String']['input']>;
  timelock_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<TokenEntity_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  users_?: InputMaybe<Governor_UserProject_Filter>;
};

export enum Governor_Project_OrderBy {
  CurrentStrategy = 'currentStrategy',
  CurrentStrategyId = 'currentStrategy__id',
  CurrentStrategyProposalThreshold = 'currentStrategy__proposalThreshold',
  CurrentStrategyQuorumVotes = 'currentStrategy__quorumVotes',
  CurrentStrategyStrategyAddr = 'currentStrategy__strategyAddr',
  CurrentStrategyStrategyName = 'currentStrategy__strategyName',
  CurrentStrategyStrategyReference = 'currentStrategy__strategyReference',
  CurrentStrategyVotingDelay = 'currentStrategy__votingDelay',
  CurrentStrategyVotingPeriod = 'currentStrategy__votingPeriod',
  Id = 'id',
  Proposals = 'proposals',
  Timelock = 'timelock',
  TimelockDelay = 'timelock__delay',
  TimelockId = 'timelock__id',
  Token = 'token',
  TokenAddr = 'token__addr',
  TokenAdmin = 'token__admin',
  TokenBondingCurveType = 'token__bondingCurveType',
  TokenBurnTax = 'token__burnTax',
  TokenCreateTimestamp = 'token__createTimestamp',
  TokenCreator = 'token__creator',
  TokenCurrentPrice = 'token__currentPrice',
  TokenDestoryed = 'token__destoryed',
  TokenDoomsDays = 'token__doomsDays',
  TokenFactory = 'token__factory',
  TokenId = 'token__id',
  TokenIndex = 'token__index',
  TokenLockValue = 'token__lockValue',
  TokenMarketCap = 'token__marketCap',
  TokenMemberCount = 'token__memberCount',
  TokenMetaUri = 'token__metaUri',
  TokenMintTax = 'token__mintTax',
  TokenName = 'token__name',
  TokenNet = 'token__net',
  TokenParams = 'token__params',
  TokenPaused = 'token__paused',
  TokenRaisingToken = 'token__raisingToken',
  TokenSupply = 'token__supply',
  TokenSymbol = 'token__symbol',
  TokenTokenType = 'token__tokenType',
  TokenTreasury = 'token__treasury',
  TokenTreasuryFee = 'token__treasuryFee',
  TokenTxCount = 'token__txCount',
  Users = 'users'
}

export type Governor_Proposal_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  abstainVotes?: InputMaybe<Scalars['BigInt']['input']>;
  abstainVotes_gt?: InputMaybe<Scalars['BigInt']['input']>;
  abstainVotes_gte?: InputMaybe<Scalars['BigInt']['input']>;
  abstainVotes_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  abstainVotes_lt?: InputMaybe<Scalars['BigInt']['input']>;
  abstainVotes_lte?: InputMaybe<Scalars['BigInt']['input']>;
  abstainVotes_not?: InputMaybe<Scalars['BigInt']['input']>;
  abstainVotes_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  againstVotes?: InputMaybe<Scalars['BigInt']['input']>;
  againstVotes_gt?: InputMaybe<Scalars['BigInt']['input']>;
  againstVotes_gte?: InputMaybe<Scalars['BigInt']['input']>;
  againstVotes_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  againstVotes_lt?: InputMaybe<Scalars['BigInt']['input']>;
  againstVotes_lte?: InputMaybe<Scalars['BigInt']['input']>;
  againstVotes_not?: InputMaybe<Scalars['BigInt']['input']>;
  againstVotes_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  agreeVotes?: InputMaybe<Scalars['BigInt']['input']>;
  agreeVotes_gt?: InputMaybe<Scalars['BigInt']['input']>;
  agreeVotes_gte?: InputMaybe<Scalars['BigInt']['input']>;
  agreeVotes_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  agreeVotes_lt?: InputMaybe<Scalars['BigInt']['input']>;
  agreeVotes_lte?: InputMaybe<Scalars['BigInt']['input']>;
  agreeVotes_not?: InputMaybe<Scalars['BigInt']['input']>;
  agreeVotes_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Governor_Proposal_Filter>>>;
  calldatas?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  calldatas_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  calldatas_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  calldatas_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  calldatas_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  calldatas_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_gt?: InputMaybe<Scalars['String']['input']>;
  description_gte?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_lt?: InputMaybe<Scalars['String']['input']>;
  description_lte?: InputMaybe<Scalars['String']['input']>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  endBlock?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_not?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eta?: InputMaybe<Scalars['BigInt']['input']>;
  eta_gt?: InputMaybe<Scalars['BigInt']['input']>;
  eta_gte?: InputMaybe<Scalars['BigInt']['input']>;
  eta_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eta_lt?: InputMaybe<Scalars['BigInt']['input']>;
  eta_lte?: InputMaybe<Scalars['BigInt']['input']>;
  eta_not?: InputMaybe<Scalars['BigInt']['input']>;
  eta_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gov?: InputMaybe<Scalars['String']['input']>;
  gov_?: InputMaybe<Governor_Project_Filter>;
  gov_contains?: InputMaybe<Scalars['String']['input']>;
  gov_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  gov_ends_with?: InputMaybe<Scalars['String']['input']>;
  gov_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gov_gt?: InputMaybe<Scalars['String']['input']>;
  gov_gte?: InputMaybe<Scalars['String']['input']>;
  gov_in?: InputMaybe<Array<Scalars['String']['input']>>;
  gov_lt?: InputMaybe<Scalars['String']['input']>;
  gov_lte?: InputMaybe<Scalars['String']['input']>;
  gov_not?: InputMaybe<Scalars['String']['input']>;
  gov_not_contains?: InputMaybe<Scalars['String']['input']>;
  gov_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  gov_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  gov_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gov_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  gov_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  gov_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gov_starts_with?: InputMaybe<Scalars['String']['input']>;
  gov_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Governor_Proposal_Filter>>>;
  proposalThreshold?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_gt?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_gte?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proposalThreshold_lt?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_lte?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_not?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proposer?: InputMaybe<Scalars['String']['input']>;
  proposer_?: InputMaybe<Governor_User_Filter>;
  proposer_contains?: InputMaybe<Scalars['String']['input']>;
  proposer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposer_ends_with?: InputMaybe<Scalars['String']['input']>;
  proposer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposer_gt?: InputMaybe<Scalars['String']['input']>;
  proposer_gte?: InputMaybe<Scalars['String']['input']>;
  proposer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proposer_lt?: InputMaybe<Scalars['String']['input']>;
  proposer_lte?: InputMaybe<Scalars['String']['input']>;
  proposer_not?: InputMaybe<Scalars['String']['input']>;
  proposer_not_contains?: InputMaybe<Scalars['String']['input']>;
  proposer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  proposer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proposer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  proposer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposer_starts_with?: InputMaybe<Scalars['String']['input']>;
  proposer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  quorumVotes?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_gt?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_gte?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  quorumVotes_lt?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_lte?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_not?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signatures?: InputMaybe<Array<Scalars['String']['input']>>;
  signatures_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  signatures_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  signatures_not?: InputMaybe<Array<Scalars['String']['input']>>;
  signatures_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  signatures_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  startBlock?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_not?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  status?: InputMaybe<Scalars['String']['input']>;
  status_contains?: InputMaybe<Scalars['String']['input']>;
  status_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  status_ends_with?: InputMaybe<Scalars['String']['input']>;
  status_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  status_gt?: InputMaybe<Scalars['String']['input']>;
  status_gte?: InputMaybe<Scalars['String']['input']>;
  status_in?: InputMaybe<Array<Scalars['String']['input']>>;
  status_lt?: InputMaybe<Scalars['String']['input']>;
  status_lte?: InputMaybe<Scalars['String']['input']>;
  status_not?: InputMaybe<Scalars['String']['input']>;
  status_not_contains?: InputMaybe<Scalars['String']['input']>;
  status_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  status_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  status_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  status_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  status_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  status_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  status_starts_with?: InputMaybe<Scalars['String']['input']>;
  status_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyAddr?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_contains?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_ends_with?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_gt?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_gte?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_in?: InputMaybe<Array<Scalars['String']['input']>>;
  strategyAddr_lt?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_lte?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_not?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_not_contains?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  strategyAddr_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_starts_with?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyName?: InputMaybe<Scalars['String']['input']>;
  strategyName_contains?: InputMaybe<Scalars['String']['input']>;
  strategyName_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyName_ends_with?: InputMaybe<Scalars['String']['input']>;
  strategyName_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyName_gt?: InputMaybe<Scalars['String']['input']>;
  strategyName_gte?: InputMaybe<Scalars['String']['input']>;
  strategyName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  strategyName_lt?: InputMaybe<Scalars['String']['input']>;
  strategyName_lte?: InputMaybe<Scalars['String']['input']>;
  strategyName_not?: InputMaybe<Scalars['String']['input']>;
  strategyName_not_contains?: InputMaybe<Scalars['String']['input']>;
  strategyName_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  strategyName_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  strategyName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  strategyName_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyName_starts_with?: InputMaybe<Scalars['String']['input']>;
  strategyName_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyReference?: InputMaybe<Scalars['Bytes']['input']>;
  strategyReference_contains?: InputMaybe<Scalars['Bytes']['input']>;
  strategyReference_gt?: InputMaybe<Scalars['Bytes']['input']>;
  strategyReference_gte?: InputMaybe<Scalars['Bytes']['input']>;
  strategyReference_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  strategyReference_lt?: InputMaybe<Scalars['Bytes']['input']>;
  strategyReference_lte?: InputMaybe<Scalars['Bytes']['input']>;
  strategyReference_not?: InputMaybe<Scalars['Bytes']['input']>;
  strategyReference_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  strategyReference_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  targets?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  targets_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  targets_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  targets_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  targets_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  targets_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  values?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  votes_?: InputMaybe<Governor_Vote_Filter>;
  votingDelay?: InputMaybe<Scalars['BigInt']['input']>;
  votingDelay_gt?: InputMaybe<Scalars['BigInt']['input']>;
  votingDelay_gte?: InputMaybe<Scalars['BigInt']['input']>;
  votingDelay_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  votingDelay_lt?: InputMaybe<Scalars['BigInt']['input']>;
  votingDelay_lte?: InputMaybe<Scalars['BigInt']['input']>;
  votingDelay_not?: InputMaybe<Scalars['BigInt']['input']>;
  votingDelay_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  votingPeriod?: InputMaybe<Scalars['BigInt']['input']>;
  votingPeriod_gt?: InputMaybe<Scalars['BigInt']['input']>;
  votingPeriod_gte?: InputMaybe<Scalars['BigInt']['input']>;
  votingPeriod_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  votingPeriod_lt?: InputMaybe<Scalars['BigInt']['input']>;
  votingPeriod_lte?: InputMaybe<Scalars['BigInt']['input']>;
  votingPeriod_not?: InputMaybe<Scalars['BigInt']['input']>;
  votingPeriod_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Governor_Proposal_OrderBy {
  AbstainVotes = 'abstainVotes',
  AgainstVotes = 'againstVotes',
  AgreeVotes = 'agreeVotes',
  Calldatas = 'calldatas',
  Description = 'description',
  EndBlock = 'endBlock',
  Eta = 'eta',
  Gov = 'gov',
  GovId = 'gov__id',
  Id = 'id',
  ProposalThreshold = 'proposalThreshold',
  Proposer = 'proposer',
  ProposerId = 'proposer__id',
  QuorumVotes = 'quorumVotes',
  Signatures = 'signatures',
  StartBlock = 'startBlock',
  Status = 'status',
  StrategyAddr = 'strategyAddr',
  StrategyName = 'strategyName',
  StrategyReference = 'strategyReference',
  Targets = 'targets',
  Values = 'values',
  Votes = 'votes',
  VotingDelay = 'votingDelay',
  VotingPeriod = 'votingPeriod'
}

export type Governor_Strategy_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Governor_Strategy_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Governor_Strategy_Filter>>>;
  proposalThreshold?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_gt?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_gte?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proposalThreshold_lt?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_lte?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_not?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  quorumVotes?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_gt?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_gte?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  quorumVotes_lt?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_lte?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_not?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  strategyAddr?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_contains?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_ends_with?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_gt?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_gte?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_in?: InputMaybe<Array<Scalars['String']['input']>>;
  strategyAddr_lt?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_lte?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_not?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_not_contains?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  strategyAddr_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_starts_with?: InputMaybe<Scalars['String']['input']>;
  strategyAddr_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyName?: InputMaybe<Scalars['String']['input']>;
  strategyName_contains?: InputMaybe<Scalars['String']['input']>;
  strategyName_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyName_ends_with?: InputMaybe<Scalars['String']['input']>;
  strategyName_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyName_gt?: InputMaybe<Scalars['String']['input']>;
  strategyName_gte?: InputMaybe<Scalars['String']['input']>;
  strategyName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  strategyName_lt?: InputMaybe<Scalars['String']['input']>;
  strategyName_lte?: InputMaybe<Scalars['String']['input']>;
  strategyName_not?: InputMaybe<Scalars['String']['input']>;
  strategyName_not_contains?: InputMaybe<Scalars['String']['input']>;
  strategyName_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  strategyName_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  strategyName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  strategyName_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyName_starts_with?: InputMaybe<Scalars['String']['input']>;
  strategyName_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyReference?: InputMaybe<Scalars['Bytes']['input']>;
  strategyReference_contains?: InputMaybe<Scalars['Bytes']['input']>;
  strategyReference_gt?: InputMaybe<Scalars['Bytes']['input']>;
  strategyReference_gte?: InputMaybe<Scalars['Bytes']['input']>;
  strategyReference_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  strategyReference_lt?: InputMaybe<Scalars['Bytes']['input']>;
  strategyReference_lte?: InputMaybe<Scalars['Bytes']['input']>;
  strategyReference_not?: InputMaybe<Scalars['Bytes']['input']>;
  strategyReference_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  strategyReference_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  votingDelay?: InputMaybe<Scalars['BigInt']['input']>;
  votingDelay_gt?: InputMaybe<Scalars['BigInt']['input']>;
  votingDelay_gte?: InputMaybe<Scalars['BigInt']['input']>;
  votingDelay_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  votingDelay_lt?: InputMaybe<Scalars['BigInt']['input']>;
  votingDelay_lte?: InputMaybe<Scalars['BigInt']['input']>;
  votingDelay_not?: InputMaybe<Scalars['BigInt']['input']>;
  votingDelay_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  votingPeriod?: InputMaybe<Scalars['BigInt']['input']>;
  votingPeriod_gt?: InputMaybe<Scalars['BigInt']['input']>;
  votingPeriod_gte?: InputMaybe<Scalars['BigInt']['input']>;
  votingPeriod_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  votingPeriod_lt?: InputMaybe<Scalars['BigInt']['input']>;
  votingPeriod_lte?: InputMaybe<Scalars['BigInt']['input']>;
  votingPeriod_not?: InputMaybe<Scalars['BigInt']['input']>;
  votingPeriod_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Governor_Strategy_OrderBy {
  Id = 'id',
  ProposalThreshold = 'proposalThreshold',
  QuorumVotes = 'quorumVotes',
  StrategyAddr = 'strategyAddr',
  StrategyName = 'strategyName',
  StrategyReference = 'strategyReference',
  VotingDelay = 'votingDelay',
  VotingPeriod = 'votingPeriod'
}

export type Governor_Timelock_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Governor_Timelock_Filter>>>;
  delay?: InputMaybe<Scalars['BigInt']['input']>;
  delay_gt?: InputMaybe<Scalars['BigInt']['input']>;
  delay_gte?: InputMaybe<Scalars['BigInt']['input']>;
  delay_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delay_lt?: InputMaybe<Scalars['BigInt']['input']>;
  delay_lte?: InputMaybe<Scalars['BigInt']['input']>;
  delay_not?: InputMaybe<Scalars['BigInt']['input']>;
  delay_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gov?: InputMaybe<Scalars['String']['input']>;
  gov_?: InputMaybe<Governor_Project_Filter>;
  gov_contains?: InputMaybe<Scalars['String']['input']>;
  gov_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  gov_ends_with?: InputMaybe<Scalars['String']['input']>;
  gov_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gov_gt?: InputMaybe<Scalars['String']['input']>;
  gov_gte?: InputMaybe<Scalars['String']['input']>;
  gov_in?: InputMaybe<Array<Scalars['String']['input']>>;
  gov_lt?: InputMaybe<Scalars['String']['input']>;
  gov_lte?: InputMaybe<Scalars['String']['input']>;
  gov_not?: InputMaybe<Scalars['String']['input']>;
  gov_not_contains?: InputMaybe<Scalars['String']['input']>;
  gov_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  gov_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  gov_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gov_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  gov_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  gov_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gov_starts_with?: InputMaybe<Scalars['String']['input']>;
  gov_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Governor_Timelock_Filter>>>;
  transactions_?: InputMaybe<Governor_Transaction_Filter>;
};

export enum Governor_Timelock_OrderBy {
  Delay = 'delay',
  Gov = 'gov',
  GovId = 'gov__id',
  Id = 'id',
  Transactions = 'transactions'
}

export type Governor_Transaction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Governor_Transaction_Filter>>>;
  calldata?: InputMaybe<Scalars['Bytes']['input']>;
  calldata_contains?: InputMaybe<Scalars['Bytes']['input']>;
  calldata_gt?: InputMaybe<Scalars['Bytes']['input']>;
  calldata_gte?: InputMaybe<Scalars['Bytes']['input']>;
  calldata_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  calldata_lt?: InputMaybe<Scalars['Bytes']['input']>;
  calldata_lte?: InputMaybe<Scalars['Bytes']['input']>;
  calldata_not?: InputMaybe<Scalars['Bytes']['input']>;
  calldata_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  calldata_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  eta?: InputMaybe<Scalars['BigInt']['input']>;
  eta_gt?: InputMaybe<Scalars['BigInt']['input']>;
  eta_gte?: InputMaybe<Scalars['BigInt']['input']>;
  eta_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eta_lt?: InputMaybe<Scalars['BigInt']['input']>;
  eta_lte?: InputMaybe<Scalars['BigInt']['input']>;
  eta_not?: InputMaybe<Scalars['BigInt']['input']>;
  eta_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Governor_Transaction_Filter>>>;
  signature?: InputMaybe<Scalars['String']['input']>;
  signature_contains?: InputMaybe<Scalars['String']['input']>;
  signature_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  signature_ends_with?: InputMaybe<Scalars['String']['input']>;
  signature_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signature_gt?: InputMaybe<Scalars['String']['input']>;
  signature_gte?: InputMaybe<Scalars['String']['input']>;
  signature_in?: InputMaybe<Array<Scalars['String']['input']>>;
  signature_lt?: InputMaybe<Scalars['String']['input']>;
  signature_lte?: InputMaybe<Scalars['String']['input']>;
  signature_not?: InputMaybe<Scalars['String']['input']>;
  signature_not_contains?: InputMaybe<Scalars['String']['input']>;
  signature_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  signature_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  signature_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signature_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  signature_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  signature_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  signature_starts_with?: InputMaybe<Scalars['String']['input']>;
  signature_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  status_contains?: InputMaybe<Scalars['String']['input']>;
  status_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  status_ends_with?: InputMaybe<Scalars['String']['input']>;
  status_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  status_gt?: InputMaybe<Scalars['String']['input']>;
  status_gte?: InputMaybe<Scalars['String']['input']>;
  status_in?: InputMaybe<Array<Scalars['String']['input']>>;
  status_lt?: InputMaybe<Scalars['String']['input']>;
  status_lte?: InputMaybe<Scalars['String']['input']>;
  status_not?: InputMaybe<Scalars['String']['input']>;
  status_not_contains?: InputMaybe<Scalars['String']['input']>;
  status_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  status_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  status_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  status_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  status_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  status_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  status_starts_with?: InputMaybe<Scalars['String']['input']>;
  status_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  target?: InputMaybe<Scalars['Bytes']['input']>;
  target_contains?: InputMaybe<Scalars['Bytes']['input']>;
  target_gt?: InputMaybe<Scalars['Bytes']['input']>;
  target_gte?: InputMaybe<Scalars['Bytes']['input']>;
  target_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  target_lt?: InputMaybe<Scalars['Bytes']['input']>;
  target_lte?: InputMaybe<Scalars['Bytes']['input']>;
  target_not?: InputMaybe<Scalars['Bytes']['input']>;
  target_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  target_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  timelock?: InputMaybe<Scalars['String']['input']>;
  timelock_?: InputMaybe<Governor_Timelock_Filter>;
  timelock_contains?: InputMaybe<Scalars['String']['input']>;
  timelock_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  timelock_ends_with?: InputMaybe<Scalars['String']['input']>;
  timelock_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timelock_gt?: InputMaybe<Scalars['String']['input']>;
  timelock_gte?: InputMaybe<Scalars['String']['input']>;
  timelock_in?: InputMaybe<Array<Scalars['String']['input']>>;
  timelock_lt?: InputMaybe<Scalars['String']['input']>;
  timelock_lte?: InputMaybe<Scalars['String']['input']>;
  timelock_not?: InputMaybe<Scalars['String']['input']>;
  timelock_not_contains?: InputMaybe<Scalars['String']['input']>;
  timelock_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  timelock_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  timelock_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timelock_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  timelock_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  timelock_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timelock_starts_with?: InputMaybe<Scalars['String']['input']>;
  timelock_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  value?: InputMaybe<Scalars['BigInt']['input']>;
  value_gt?: InputMaybe<Scalars['BigInt']['input']>;
  value_gte?: InputMaybe<Scalars['BigInt']['input']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value_lt?: InputMaybe<Scalars['BigInt']['input']>;
  value_lte?: InputMaybe<Scalars['BigInt']['input']>;
  value_not?: InputMaybe<Scalars['BigInt']['input']>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Governor_Transaction_OrderBy {
  Calldata = 'calldata',
  Eta = 'eta',
  Id = 'id',
  Signature = 'signature',
  Status = 'status',
  Target = 'target',
  Timelock = 'timelock',
  TimelockDelay = 'timelock__delay',
  TimelockId = 'timelock__id',
  TransactionHash = 'transactionHash',
  Value = 'value'
}

export type Governor_UserProject_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Governor_UserProject_Filter>>>;
  gov?: InputMaybe<Scalars['String']['input']>;
  gov_?: InputMaybe<Governor_Project_Filter>;
  gov_contains?: InputMaybe<Scalars['String']['input']>;
  gov_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  gov_ends_with?: InputMaybe<Scalars['String']['input']>;
  gov_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gov_gt?: InputMaybe<Scalars['String']['input']>;
  gov_gte?: InputMaybe<Scalars['String']['input']>;
  gov_in?: InputMaybe<Array<Scalars['String']['input']>>;
  gov_lt?: InputMaybe<Scalars['String']['input']>;
  gov_lte?: InputMaybe<Scalars['String']['input']>;
  gov_not?: InputMaybe<Scalars['String']['input']>;
  gov_not_contains?: InputMaybe<Scalars['String']['input']>;
  gov_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  gov_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  gov_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gov_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  gov_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  gov_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gov_starts_with?: InputMaybe<Scalars['String']['input']>;
  gov_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Governor_UserProject_Filter>>>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<Governor_User_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Governor_UserProject_OrderBy {
  Gov = 'gov',
  GovId = 'gov__id',
  Id = 'id',
  User = 'user',
  UserId = 'user__id'
}

export type Governor_User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Governor_User_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Governor_User_Filter>>>;
  projects_?: InputMaybe<Governor_UserProject_Filter>;
  proposalHistory_?: InputMaybe<Governor_Proposal_Filter>;
  voteHistory_?: InputMaybe<Governor_Vote_Filter>;
};

export enum Governor_User_OrderBy {
  Id = 'id',
  Projects = 'projects',
  ProposalHistory = 'proposalHistory',
  VoteHistory = 'voteHistory'
}

export type Governor_Vote_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Governor_Vote_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Governor_Vote_Filter>>>;
  power?: InputMaybe<Scalars['BigInt']['input']>;
  power_gt?: InputMaybe<Scalars['BigInt']['input']>;
  power_gte?: InputMaybe<Scalars['BigInt']['input']>;
  power_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  power_lt?: InputMaybe<Scalars['BigInt']['input']>;
  power_lte?: InputMaybe<Scalars['BigInt']['input']>;
  power_not?: InputMaybe<Scalars['BigInt']['input']>;
  power_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proposal?: InputMaybe<Scalars['String']['input']>;
  proposal_?: InputMaybe<Governor_Proposal_Filter>;
  proposal_contains?: InputMaybe<Scalars['String']['input']>;
  proposal_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with?: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_gt?: InputMaybe<Scalars['String']['input']>;
  proposal_gte?: InputMaybe<Scalars['String']['input']>;
  proposal_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_lt?: InputMaybe<Scalars['String']['input']>;
  proposal_lte?: InputMaybe<Scalars['String']['input']>;
  proposal_not?: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains?: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  proposal_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with?: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  reason_contains?: InputMaybe<Scalars['String']['input']>;
  reason_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  reason_ends_with?: InputMaybe<Scalars['String']['input']>;
  reason_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  reason_gt?: InputMaybe<Scalars['String']['input']>;
  reason_gte?: InputMaybe<Scalars['String']['input']>;
  reason_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reason_lt?: InputMaybe<Scalars['String']['input']>;
  reason_lte?: InputMaybe<Scalars['String']['input']>;
  reason_not?: InputMaybe<Scalars['String']['input']>;
  reason_not_contains?: InputMaybe<Scalars['String']['input']>;
  reason_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  reason_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  reason_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  reason_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reason_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  reason_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  reason_starts_with?: InputMaybe<Scalars['String']['input']>;
  reason_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  support?: InputMaybe<Scalars['String']['input']>;
  support_contains?: InputMaybe<Scalars['String']['input']>;
  support_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  support_ends_with?: InputMaybe<Scalars['String']['input']>;
  support_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  support_gt?: InputMaybe<Scalars['String']['input']>;
  support_gte?: InputMaybe<Scalars['String']['input']>;
  support_in?: InputMaybe<Array<Scalars['String']['input']>>;
  support_lt?: InputMaybe<Scalars['String']['input']>;
  support_lte?: InputMaybe<Scalars['String']['input']>;
  support_not?: InputMaybe<Scalars['String']['input']>;
  support_not_contains?: InputMaybe<Scalars['String']['input']>;
  support_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  support_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  support_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  support_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  support_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  support_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  support_starts_with?: InputMaybe<Scalars['String']['input']>;
  support_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  voter?: InputMaybe<Scalars['String']['input']>;
  voter_?: InputMaybe<Governor_User_Filter>;
  voter_contains?: InputMaybe<Scalars['String']['input']>;
  voter_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  voter_ends_with?: InputMaybe<Scalars['String']['input']>;
  voter_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  voter_gt?: InputMaybe<Scalars['String']['input']>;
  voter_gte?: InputMaybe<Scalars['String']['input']>;
  voter_in?: InputMaybe<Array<Scalars['String']['input']>>;
  voter_lt?: InputMaybe<Scalars['String']['input']>;
  voter_lte?: InputMaybe<Scalars['String']['input']>;
  voter_not?: InputMaybe<Scalars['String']['input']>;
  voter_not_contains?: InputMaybe<Scalars['String']['input']>;
  voter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  voter_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  voter_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  voter_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  voter_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  voter_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  voter_starts_with?: InputMaybe<Scalars['String']['input']>;
  voter_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Governor_Vote_OrderBy {
  Id = 'id',
  Power = 'power',
  Proposal = 'proposal',
  ProposalAbstainVotes = 'proposal__abstainVotes',
  ProposalAgainstVotes = 'proposal__againstVotes',
  ProposalAgreeVotes = 'proposal__agreeVotes',
  ProposalDescription = 'proposal__description',
  ProposalEndBlock = 'proposal__endBlock',
  ProposalEta = 'proposal__eta',
  ProposalId = 'proposal__id',
  ProposalProposalThreshold = 'proposal__proposalThreshold',
  ProposalQuorumVotes = 'proposal__quorumVotes',
  ProposalStartBlock = 'proposal__startBlock',
  ProposalStatus = 'proposal__status',
  ProposalStrategyAddr = 'proposal__strategyAddr',
  ProposalStrategyName = 'proposal__strategyName',
  ProposalStrategyReference = 'proposal__strategyReference',
  ProposalVotingDelay = 'proposal__votingDelay',
  ProposalVotingPeriod = 'proposal__votingPeriod',
  Reason = 'reason',
  Support = 'support',
  Voter = 'voter',
  VoterId = 'voter__id'
}

export type Governor_VotingPower_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Governor_VotingPower_Filter>>>;
  delegateTo?: InputMaybe<Scalars['String']['input']>;
  delegateTo_?: InputMaybe<Governor_VotingPower_Filter>;
  delegateTo_contains?: InputMaybe<Scalars['String']['input']>;
  delegateTo_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  delegateTo_ends_with?: InputMaybe<Scalars['String']['input']>;
  delegateTo_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegateTo_gt?: InputMaybe<Scalars['String']['input']>;
  delegateTo_gte?: InputMaybe<Scalars['String']['input']>;
  delegateTo_in?: InputMaybe<Array<Scalars['String']['input']>>;
  delegateTo_lt?: InputMaybe<Scalars['String']['input']>;
  delegateTo_lte?: InputMaybe<Scalars['String']['input']>;
  delegateTo_not?: InputMaybe<Scalars['String']['input']>;
  delegateTo_not_contains?: InputMaybe<Scalars['String']['input']>;
  delegateTo_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  delegateTo_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  delegateTo_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegateTo_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  delegateTo_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  delegateTo_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegateTo_starts_with?: InputMaybe<Scalars['String']['input']>;
  delegateTo_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegated_?: InputMaybe<Governor_VotingPower_Filter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Governor_VotingPower_Filter>>>;
  reference?: InputMaybe<Scalars['Bytes']['input']>;
  reference_contains?: InputMaybe<Scalars['Bytes']['input']>;
  reference_gt?: InputMaybe<Scalars['Bytes']['input']>;
  reference_gte?: InputMaybe<Scalars['Bytes']['input']>;
  reference_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  reference_lt?: InputMaybe<Scalars['Bytes']['input']>;
  reference_lte?: InputMaybe<Scalars['Bytes']['input']>;
  reference_not?: InputMaybe<Scalars['Bytes']['input']>;
  reference_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  reference_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  user?: InputMaybe<Scalars['Bytes']['input']>;
  user_contains?: InputMaybe<Scalars['Bytes']['input']>;
  user_gt?: InputMaybe<Scalars['Bytes']['input']>;
  user_gte?: InputMaybe<Scalars['Bytes']['input']>;
  user_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  user_lt?: InputMaybe<Scalars['Bytes']['input']>;
  user_lte?: InputMaybe<Scalars['Bytes']['input']>;
  user_not?: InputMaybe<Scalars['Bytes']['input']>;
  user_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  votePower?: InputMaybe<Scalars['BigInt']['input']>;
  votePower_gt?: InputMaybe<Scalars['BigInt']['input']>;
  votePower_gte?: InputMaybe<Scalars['BigInt']['input']>;
  votePower_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  votePower_lt?: InputMaybe<Scalars['BigInt']['input']>;
  votePower_lte?: InputMaybe<Scalars['BigInt']['input']>;
  votePower_not?: InputMaybe<Scalars['BigInt']['input']>;
  votePower_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Governor_VotingPower_OrderBy {
  DelegateTo = 'delegateTo',
  DelegateToId = 'delegateTo__id',
  DelegateToReference = 'delegateTo__reference',
  DelegateToUser = 'delegateTo__user',
  DelegateToVotePower = 'delegateTo__votePower',
  Delegated = 'delegated',
  Id = 'id',
  Reference = 'reference',
  User = 'user',
  VotePower = 'votePower'
}

export type Member_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Member_Filter>>>;
  balance?: InputMaybe<Scalars['BigDecimal']['input']>;
  balance_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  balance_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  balance_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  balance_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  balance_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  balance_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  ids?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ids_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ids_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ids_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ids_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ids_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Member_Filter>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<TokenEntity_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Member_OrderBy {
  Balance = 'balance',
  Id = 'id',
  Ids = 'ids',
  Token = 'token',
  TokenAddr = 'token__addr',
  TokenAdmin = 'token__admin',
  TokenBondingCurveType = 'token__bondingCurveType',
  TokenBurnTax = 'token__burnTax',
  TokenCreateTimestamp = 'token__createTimestamp',
  TokenCreator = 'token__creator',
  TokenCurrentPrice = 'token__currentPrice',
  TokenDestoryed = 'token__destoryed',
  TokenDoomsDays = 'token__doomsDays',
  TokenFactory = 'token__factory',
  TokenId = 'token__id',
  TokenIndex = 'token__index',
  TokenLockValue = 'token__lockValue',
  TokenMarketCap = 'token__marketCap',
  TokenMemberCount = 'token__memberCount',
  TokenMetaUri = 'token__metaUri',
  TokenMintTax = 'token__mintTax',
  TokenName = 'token__name',
  TokenNet = 'token__net',
  TokenParams = 'token__params',
  TokenPaused = 'token__paused',
  TokenRaisingToken = 'token__raisingToken',
  TokenSupply = 'token__supply',
  TokenSymbol = 'token__symbol',
  TokenTokenType = 'token__tokenType',
  TokenTreasury = 'token__treasury',
  TokenTreasuryFee = 'token__treasuryFee',
  TokenTxCount = 'token__txCount',
  User = 'user',
  UserId = 'user__id'
}

export type MintBurnEntity_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MintBurnEntity_Filter>>>;
  blockNum?: InputMaybe<Scalars['BigInt']['input']>;
  blockNum_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNum_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNum_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNum_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNum_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNum_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNum_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  direction?: InputMaybe<Scalars['Int']['input']>;
  direction_gt?: InputMaybe<Scalars['Int']['input']>;
  direction_gte?: InputMaybe<Scalars['Int']['input']>;
  direction_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  direction_lt?: InputMaybe<Scalars['Int']['input']>;
  direction_lte?: InputMaybe<Scalars['Int']['input']>;
  direction_not?: InputMaybe<Scalars['Int']['input']>;
  direction_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  erc20Amount?: InputMaybe<Scalars['BigDecimal']['input']>;
  erc20Amount_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  erc20Amount_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  erc20Amount_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  erc20Amount_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  erc20Amount_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  erc20Amount_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  erc20Amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  from?: InputMaybe<Scalars['Bytes']['input']>;
  from_contains?: InputMaybe<Scalars['Bytes']['input']>;
  from_gt?: InputMaybe<Scalars['Bytes']['input']>;
  from_gte?: InputMaybe<Scalars['Bytes']['input']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  from_lt?: InputMaybe<Scalars['Bytes']['input']>;
  from_lte?: InputMaybe<Scalars['Bytes']['input']>;
  from_not?: InputMaybe<Scalars['Bytes']['input']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  hash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  hash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  hash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  hash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  hash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  hash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  hash_not?: InputMaybe<Scalars['Bytes']['input']>;
  hash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  nativeAmount?: InputMaybe<Scalars['BigDecimal']['input']>;
  nativeAmount_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  nativeAmount_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  nativeAmount_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  nativeAmount_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  nativeAmount_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  nativeAmount_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  nativeAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  or?: InputMaybe<Array<InputMaybe<MintBurnEntity_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['Bytes']['input']>;
  to_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to_gt?: InputMaybe<Scalars['Bytes']['input']>;
  to_gte?: InputMaybe<Scalars['Bytes']['input']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  to_lt?: InputMaybe<Scalars['Bytes']['input']>;
  to_lte?: InputMaybe<Scalars['Bytes']['input']>;
  to_not?: InputMaybe<Scalars['Bytes']['input']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<TokenEntity_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum MintBurnEntity_OrderBy {
  BlockNum = 'blockNum',
  Direction = 'direction',
  Erc20Amount = 'erc20Amount',
  From = 'from',
  Hash = 'hash',
  Id = 'id',
  NativeAmount = 'nativeAmount',
  Timestamp = 'timestamp',
  To = 'to',
  Token = 'token',
  TokenAddr = 'token__addr',
  TokenAdmin = 'token__admin',
  TokenBondingCurveType = 'token__bondingCurveType',
  TokenBurnTax = 'token__burnTax',
  TokenCreateTimestamp = 'token__createTimestamp',
  TokenCreator = 'token__creator',
  TokenCurrentPrice = 'token__currentPrice',
  TokenDestoryed = 'token__destoryed',
  TokenDoomsDays = 'token__doomsDays',
  TokenFactory = 'token__factory',
  TokenId = 'token__id',
  TokenIndex = 'token__index',
  TokenLockValue = 'token__lockValue',
  TokenMarketCap = 'token__marketCap',
  TokenMemberCount = 'token__memberCount',
  TokenMetaUri = 'token__metaUri',
  TokenMintTax = 'token__mintTax',
  TokenName = 'token__name',
  TokenNet = 'token__net',
  TokenParams = 'token__params',
  TokenPaused = 'token__paused',
  TokenRaisingToken = 'token__raisingToken',
  TokenSupply = 'token__supply',
  TokenSymbol = 'token__symbol',
  TokenTokenType = 'token__tokenType',
  TokenTreasury = 'token__treasury',
  TokenTreasuryFee = 'token__treasuryFee',
  TokenTxCount = 'token__txCount'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PlatformEntity_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  addr?: InputMaybe<Scalars['Bytes']['input']>;
  addr_contains?: InputMaybe<Scalars['Bytes']['input']>;
  addr_gt?: InputMaybe<Scalars['Bytes']['input']>;
  addr_gte?: InputMaybe<Scalars['Bytes']['input']>;
  addr_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  addr_lt?: InputMaybe<Scalars['Bytes']['input']>;
  addr_lte?: InputMaybe<Scalars['Bytes']['input']>;
  addr_not?: InputMaybe<Scalars['Bytes']['input']>;
  addr_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  addr_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  admin?: InputMaybe<Scalars['Bytes']['input']>;
  admin_contains?: InputMaybe<Scalars['Bytes']['input']>;
  admin_gt?: InputMaybe<Scalars['Bytes']['input']>;
  admin_gte?: InputMaybe<Scalars['Bytes']['input']>;
  admin_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  admin_lt?: InputMaybe<Scalars['Bytes']['input']>;
  admin_lte?: InputMaybe<Scalars['Bytes']['input']>;
  admin_not?: InputMaybe<Scalars['Bytes']['input']>;
  admin_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  admin_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<PlatformEntity_Filter>>>;
  burnTax?: InputMaybe<Scalars['BigInt']['input']>;
  burnTax_gt?: InputMaybe<Scalars['BigInt']['input']>;
  burnTax_gte?: InputMaybe<Scalars['BigInt']['input']>;
  burnTax_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  burnTax_lt?: InputMaybe<Scalars['BigInt']['input']>;
  burnTax_lte?: InputMaybe<Scalars['BigInt']['input']>;
  burnTax_not?: InputMaybe<Scalars['BigInt']['input']>;
  burnTax_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  mintTax?: InputMaybe<Scalars['BigInt']['input']>;
  mintTax_gt?: InputMaybe<Scalars['BigInt']['input']>;
  mintTax_gte?: InputMaybe<Scalars['BigInt']['input']>;
  mintTax_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  mintTax_lt?: InputMaybe<Scalars['BigInt']['input']>;
  mintTax_lte?: InputMaybe<Scalars['BigInt']['input']>;
  mintTax_not?: InputMaybe<Scalars['BigInt']['input']>;
  mintTax_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  net?: InputMaybe<Scalars['String']['input']>;
  net_contains?: InputMaybe<Scalars['String']['input']>;
  net_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  net_ends_with?: InputMaybe<Scalars['String']['input']>;
  net_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  net_gt?: InputMaybe<Scalars['String']['input']>;
  net_gte?: InputMaybe<Scalars['String']['input']>;
  net_in?: InputMaybe<Array<Scalars['String']['input']>>;
  net_lt?: InputMaybe<Scalars['String']['input']>;
  net_lte?: InputMaybe<Scalars['String']['input']>;
  net_not?: InputMaybe<Scalars['String']['input']>;
  net_not_contains?: InputMaybe<Scalars['String']['input']>;
  net_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  net_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  net_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  net_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  net_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  net_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  net_starts_with?: InputMaybe<Scalars['String']['input']>;
  net_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<PlatformEntity_Filter>>>;
  route?: InputMaybe<Scalars['Bytes']['input']>;
  route_contains?: InputMaybe<Scalars['Bytes']['input']>;
  route_gt?: InputMaybe<Scalars['Bytes']['input']>;
  route_gte?: InputMaybe<Scalars['Bytes']['input']>;
  route_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  route_lt?: InputMaybe<Scalars['Bytes']['input']>;
  route_lte?: InputMaybe<Scalars['Bytes']['input']>;
  route_not?: InputMaybe<Scalars['Bytes']['input']>;
  route_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  route_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  treasury?: InputMaybe<Scalars['Bytes']['input']>;
  treasury_contains?: InputMaybe<Scalars['Bytes']['input']>;
  treasury_gt?: InputMaybe<Scalars['Bytes']['input']>;
  treasury_gte?: InputMaybe<Scalars['Bytes']['input']>;
  treasury_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  treasury_lt?: InputMaybe<Scalars['Bytes']['input']>;
  treasury_lte?: InputMaybe<Scalars['Bytes']['input']>;
  treasury_not?: InputMaybe<Scalars['Bytes']['input']>;
  treasury_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  treasury_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum PlatformEntity_OrderBy {
  Addr = 'addr',
  Admin = 'admin',
  BurnTax = 'burnTax',
  Id = 'id',
  MintTax = 'mintTax',
  Net = 'net',
  Route = 'route',
  Treasury = 'treasury'
}

export type PriceByDay_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PriceByDay_Filter>>>;
  closePrice?: InputMaybe<Scalars['BigDecimal']['input']>;
  closePrice_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  closePrice_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  closePrice_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  closePrice_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  closePrice_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  closePrice_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  closePrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  maxPrice?: InputMaybe<Scalars['BigDecimal']['input']>;
  maxPrice_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  maxPrice_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  maxPrice_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  maxPrice_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  maxPrice_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  maxPrice_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  maxPrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  minPrice?: InputMaybe<Scalars['BigDecimal']['input']>;
  minPrice_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  minPrice_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  minPrice_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  minPrice_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  minPrice_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  minPrice_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  minPrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  openPrice?: InputMaybe<Scalars['BigDecimal']['input']>;
  openPrice_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  openPrice_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  openPrice_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  openPrice_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  openPrice_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  openPrice_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  openPrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  or?: InputMaybe<Array<InputMaybe<PriceByDay_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  tokenTvl?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenTvl_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenTvl_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenTvl_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  tokenTvl_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenTvl_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenTvl_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenTvl_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token_?: InputMaybe<TokenEntity_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum PriceByDay_OrderBy {
  ClosePrice = 'closePrice',
  Id = 'id',
  MaxPrice = 'maxPrice',
  MinPrice = 'minPrice',
  OpenPrice = 'openPrice',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenTvl = 'tokenTvl',
  TokenAddr = 'token__addr',
  TokenAdmin = 'token__admin',
  TokenBondingCurveType = 'token__bondingCurveType',
  TokenBurnTax = 'token__burnTax',
  TokenCreateTimestamp = 'token__createTimestamp',
  TokenCreator = 'token__creator',
  TokenCurrentPrice = 'token__currentPrice',
  TokenDestoryed = 'token__destoryed',
  TokenDoomsDays = 'token__doomsDays',
  TokenFactory = 'token__factory',
  TokenId = 'token__id',
  TokenIndex = 'token__index',
  TokenLockValue = 'token__lockValue',
  TokenMarketCap = 'token__marketCap',
  TokenMemberCount = 'token__memberCount',
  TokenMetaUri = 'token__metaUri',
  TokenMintTax = 'token__mintTax',
  TokenName = 'token__name',
  TokenNet = 'token__net',
  TokenParams = 'token__params',
  TokenPaused = 'token__paused',
  TokenRaisingToken = 'token__raisingToken',
  TokenSupply = 'token__supply',
  TokenSymbol = 'token__symbol',
  TokenTokenType = 'token__tokenType',
  TokenTreasury = 'token__treasury',
  TokenTreasuryFee = 'token__treasuryFee',
  TokenTxCount = 'token__txCount'
}

export type PriceByHour_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PriceByHour_Filter>>>;
  closePrice?: InputMaybe<Scalars['BigDecimal']['input']>;
  closePrice_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  closePrice_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  closePrice_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  closePrice_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  closePrice_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  closePrice_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  closePrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  maxPrice?: InputMaybe<Scalars['BigDecimal']['input']>;
  maxPrice_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  maxPrice_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  maxPrice_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  maxPrice_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  maxPrice_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  maxPrice_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  maxPrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  minPrice?: InputMaybe<Scalars['BigDecimal']['input']>;
  minPrice_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  minPrice_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  minPrice_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  minPrice_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  minPrice_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  minPrice_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  minPrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  openPrice?: InputMaybe<Scalars['BigDecimal']['input']>;
  openPrice_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  openPrice_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  openPrice_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  openPrice_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  openPrice_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  openPrice_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  openPrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  or?: InputMaybe<Array<InputMaybe<PriceByHour_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  tokenTvl?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenTvl_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenTvl_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenTvl_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  tokenTvl_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenTvl_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenTvl_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  tokenTvl_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token_?: InputMaybe<TokenEntity_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum PriceByHour_OrderBy {
  ClosePrice = 'closePrice',
  Id = 'id',
  MaxPrice = 'maxPrice',
  MinPrice = 'minPrice',
  OpenPrice = 'openPrice',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenTvl = 'tokenTvl',
  TokenAddr = 'token__addr',
  TokenAdmin = 'token__admin',
  TokenBondingCurveType = 'token__bondingCurveType',
  TokenBurnTax = 'token__burnTax',
  TokenCreateTimestamp = 'token__createTimestamp',
  TokenCreator = 'token__creator',
  TokenCurrentPrice = 'token__currentPrice',
  TokenDestoryed = 'token__destoryed',
  TokenDoomsDays = 'token__doomsDays',
  TokenFactory = 'token__factory',
  TokenId = 'token__id',
  TokenIndex = 'token__index',
  TokenLockValue = 'token__lockValue',
  TokenMarketCap = 'token__marketCap',
  TokenMemberCount = 'token__memberCount',
  TokenMetaUri = 'token__metaUri',
  TokenMintTax = 'token__mintTax',
  TokenName = 'token__name',
  TokenNet = 'token__net',
  TokenParams = 'token__params',
  TokenPaused = 'token__paused',
  TokenRaisingToken = 'token__raisingToken',
  TokenSupply = 'token__supply',
  TokenSymbol = 'token__symbol',
  TokenTokenType = 'token__tokenType',
  TokenTreasury = 'token__treasury',
  TokenTreasuryFee = 'token__treasuryFee',
  TokenTxCount = 'token__txCount'
}

export type TokenEntity_Filter = {
  Governor_?: InputMaybe<Governor_Project_Filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  addr?: InputMaybe<Scalars['Bytes']['input']>;
  addr_contains?: InputMaybe<Scalars['Bytes']['input']>;
  addr_gt?: InputMaybe<Scalars['Bytes']['input']>;
  addr_gte?: InputMaybe<Scalars['Bytes']['input']>;
  addr_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  addr_lt?: InputMaybe<Scalars['Bytes']['input']>;
  addr_lte?: InputMaybe<Scalars['Bytes']['input']>;
  addr_not?: InputMaybe<Scalars['Bytes']['input']>;
  addr_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  addr_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  admin?: InputMaybe<Scalars['Bytes']['input']>;
  admin_contains?: InputMaybe<Scalars['Bytes']['input']>;
  admin_gt?: InputMaybe<Scalars['Bytes']['input']>;
  admin_gte?: InputMaybe<Scalars['Bytes']['input']>;
  admin_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  admin_lt?: InputMaybe<Scalars['Bytes']['input']>;
  admin_lte?: InputMaybe<Scalars['Bytes']['input']>;
  admin_not?: InputMaybe<Scalars['Bytes']['input']>;
  admin_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  admin_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<TokenEntity_Filter>>>;
  bondingCurveType?: InputMaybe<Scalars['String']['input']>;
  bondingCurveType_contains?: InputMaybe<Scalars['String']['input']>;
  bondingCurveType_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  bondingCurveType_ends_with?: InputMaybe<Scalars['String']['input']>;
  bondingCurveType_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  bondingCurveType_gt?: InputMaybe<Scalars['String']['input']>;
  bondingCurveType_gte?: InputMaybe<Scalars['String']['input']>;
  bondingCurveType_in?: InputMaybe<Array<Scalars['String']['input']>>;
  bondingCurveType_lt?: InputMaybe<Scalars['String']['input']>;
  bondingCurveType_lte?: InputMaybe<Scalars['String']['input']>;
  bondingCurveType_not?: InputMaybe<Scalars['String']['input']>;
  bondingCurveType_not_contains?: InputMaybe<Scalars['String']['input']>;
  bondingCurveType_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  bondingCurveType_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  bondingCurveType_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  bondingCurveType_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  bondingCurveType_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  bondingCurveType_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  bondingCurveType_starts_with?: InputMaybe<Scalars['String']['input']>;
  bondingCurveType_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  burnTax?: InputMaybe<Scalars['BigInt']['input']>;
  burnTax_gt?: InputMaybe<Scalars['BigInt']['input']>;
  burnTax_gte?: InputMaybe<Scalars['BigInt']['input']>;
  burnTax_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  burnTax_lt?: InputMaybe<Scalars['BigInt']['input']>;
  burnTax_lte?: InputMaybe<Scalars['BigInt']['input']>;
  burnTax_not?: InputMaybe<Scalars['BigInt']['input']>;
  burnTax_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  createTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  createTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  creator?: InputMaybe<Scalars['Bytes']['input']>;
  creator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  creator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  creator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  creator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  creator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  creator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  creator_not?: InputMaybe<Scalars['Bytes']['input']>;
  creator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  creator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  currentPrice?: InputMaybe<Scalars['BigDecimal']['input']>;
  currentPrice_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  currentPrice_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  currentPrice_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  currentPrice_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  currentPrice_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  currentPrice_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  currentPrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  destoryed?: InputMaybe<Scalars['Boolean']['input']>;
  destoryed_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  destoryed_not?: InputMaybe<Scalars['Boolean']['input']>;
  destoryed_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  doomsDays?: InputMaybe<Scalars['Boolean']['input']>;
  doomsDays_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  doomsDays_not?: InputMaybe<Scalars['Boolean']['input']>;
  doomsDays_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  factory?: InputMaybe<Scalars['Bytes']['input']>;
  factory_contains?: InputMaybe<Scalars['Bytes']['input']>;
  factory_gt?: InputMaybe<Scalars['Bytes']['input']>;
  factory_gte?: InputMaybe<Scalars['Bytes']['input']>;
  factory_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  factory_lt?: InputMaybe<Scalars['Bytes']['input']>;
  factory_lte?: InputMaybe<Scalars['Bytes']['input']>;
  factory_not?: InputMaybe<Scalars['Bytes']['input']>;
  factory_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  factory_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  index?: InputMaybe<Scalars['BigInt']['input']>;
  index_gt?: InputMaybe<Scalars['BigInt']['input']>;
  index_gte?: InputMaybe<Scalars['BigInt']['input']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  index_lt?: InputMaybe<Scalars['BigInt']['input']>;
  index_lte?: InputMaybe<Scalars['BigInt']['input']>;
  index_not?: InputMaybe<Scalars['BigInt']['input']>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lockValue?: InputMaybe<Scalars['BigDecimal']['input']>;
  lockValue_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  lockValue_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  lockValue_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  lockValue_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  lockValue_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  lockValue_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  lockValue_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  marketCap?: InputMaybe<Scalars['BigDecimal']['input']>;
  marketCap_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  marketCap_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  marketCap_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  marketCap_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  marketCap_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  marketCap_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  marketCap_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  memberCount?: InputMaybe<Scalars['BigInt']['input']>;
  memberCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  memberCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  memberCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  memberCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  memberCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  memberCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  memberCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  members_?: InputMaybe<Member_Filter>;
  metaUri?: InputMaybe<Scalars['String']['input']>;
  metaUri_contains?: InputMaybe<Scalars['String']['input']>;
  metaUri_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  metaUri_ends_with?: InputMaybe<Scalars['String']['input']>;
  metaUri_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metaUri_gt?: InputMaybe<Scalars['String']['input']>;
  metaUri_gte?: InputMaybe<Scalars['String']['input']>;
  metaUri_in?: InputMaybe<Array<Scalars['String']['input']>>;
  metaUri_lt?: InputMaybe<Scalars['String']['input']>;
  metaUri_lte?: InputMaybe<Scalars['String']['input']>;
  metaUri_not?: InputMaybe<Scalars['String']['input']>;
  metaUri_not_contains?: InputMaybe<Scalars['String']['input']>;
  metaUri_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  metaUri_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  metaUri_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metaUri_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  metaUri_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  metaUri_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metaUri_starts_with?: InputMaybe<Scalars['String']['input']>;
  metaUri_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  mintBurnTxs_?: InputMaybe<MintBurnEntity_Filter>;
  mintTax?: InputMaybe<Scalars['BigInt']['input']>;
  mintTax_gt?: InputMaybe<Scalars['BigInt']['input']>;
  mintTax_gte?: InputMaybe<Scalars['BigInt']['input']>;
  mintTax_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  mintTax_lt?: InputMaybe<Scalars['BigInt']['input']>;
  mintTax_lte?: InputMaybe<Scalars['BigInt']['input']>;
  mintTax_not?: InputMaybe<Scalars['BigInt']['input']>;
  mintTax_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  net?: InputMaybe<Scalars['String']['input']>;
  net_contains?: InputMaybe<Scalars['String']['input']>;
  net_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  net_ends_with?: InputMaybe<Scalars['String']['input']>;
  net_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  net_gt?: InputMaybe<Scalars['String']['input']>;
  net_gte?: InputMaybe<Scalars['String']['input']>;
  net_in?: InputMaybe<Array<Scalars['String']['input']>>;
  net_lt?: InputMaybe<Scalars['String']['input']>;
  net_lte?: InputMaybe<Scalars['String']['input']>;
  net_not?: InputMaybe<Scalars['String']['input']>;
  net_not_contains?: InputMaybe<Scalars['String']['input']>;
  net_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  net_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  net_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  net_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  net_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  net_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  net_starts_with?: InputMaybe<Scalars['String']['input']>;
  net_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<TokenEntity_Filter>>>;
  params?: InputMaybe<Scalars['String']['input']>;
  params_contains?: InputMaybe<Scalars['String']['input']>;
  params_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  params_ends_with?: InputMaybe<Scalars['String']['input']>;
  params_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  params_gt?: InputMaybe<Scalars['String']['input']>;
  params_gte?: InputMaybe<Scalars['String']['input']>;
  params_in?: InputMaybe<Array<Scalars['String']['input']>>;
  params_lt?: InputMaybe<Scalars['String']['input']>;
  params_lte?: InputMaybe<Scalars['String']['input']>;
  params_not?: InputMaybe<Scalars['String']['input']>;
  params_not_contains?: InputMaybe<Scalars['String']['input']>;
  params_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  params_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  params_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  params_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  params_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  params_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  params_starts_with?: InputMaybe<Scalars['String']['input']>;
  params_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  paused?: InputMaybe<Scalars['Boolean']['input']>;
  paused_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  paused_not?: InputMaybe<Scalars['Boolean']['input']>;
  paused_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  priceByDay_?: InputMaybe<PriceByDay_Filter>;
  priceByHour_?: InputMaybe<PriceByHour_Filter>;
  raisingToken?: InputMaybe<Scalars['Bytes']['input']>;
  raisingToken_contains?: InputMaybe<Scalars['Bytes']['input']>;
  raisingToken_gt?: InputMaybe<Scalars['Bytes']['input']>;
  raisingToken_gte?: InputMaybe<Scalars['Bytes']['input']>;
  raisingToken_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  raisingToken_lt?: InputMaybe<Scalars['Bytes']['input']>;
  raisingToken_lte?: InputMaybe<Scalars['Bytes']['input']>;
  raisingToken_not?: InputMaybe<Scalars['Bytes']['input']>;
  raisingToken_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  raisingToken_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  supply?: InputMaybe<Scalars['BigDecimal']['input']>;
  supply_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  supply_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  supply_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  supply_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  supply_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  supply_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  supply_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenType?: InputMaybe<Scalars['String']['input']>;
  tokenType_contains?: InputMaybe<Scalars['String']['input']>;
  tokenType_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenType_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenType_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenType_gt?: InputMaybe<Scalars['String']['input']>;
  tokenType_gte?: InputMaybe<Scalars['String']['input']>;
  tokenType_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenType_lt?: InputMaybe<Scalars['String']['input']>;
  tokenType_lte?: InputMaybe<Scalars['String']['input']>;
  tokenType_not?: InputMaybe<Scalars['String']['input']>;
  tokenType_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenType_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenType_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenType_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenType_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenType_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenType_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenType_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenType_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tradeVolumesByDay_?: InputMaybe<TradeVolumeByDay_Filter>;
  tradeVolumesByHour_?: InputMaybe<TradeVolumeByHour_Filter>;
  treasury?: InputMaybe<Scalars['Bytes']['input']>;
  treasuryFee?: InputMaybe<Scalars['BigDecimal']['input']>;
  treasuryFee_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  treasuryFee_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  treasuryFee_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  treasuryFee_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  treasuryFee_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  treasuryFee_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  treasuryFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  treasury_contains?: InputMaybe<Scalars['Bytes']['input']>;
  treasury_gt?: InputMaybe<Scalars['Bytes']['input']>;
  treasury_gte?: InputMaybe<Scalars['Bytes']['input']>;
  treasury_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  treasury_lt?: InputMaybe<Scalars['Bytes']['input']>;
  treasury_lte?: InputMaybe<Scalars['Bytes']['input']>;
  treasury_not?: InputMaybe<Scalars['Bytes']['input']>;
  treasury_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  treasury_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  txCount?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum TokenEntity_OrderBy {
  Governor = 'Governor',
  GovernorId = 'Governor__id',
  Addr = 'addr',
  Admin = 'admin',
  BondingCurveType = 'bondingCurveType',
  BurnTax = 'burnTax',
  CreateTimestamp = 'createTimestamp',
  Creator = 'creator',
  CurrentPrice = 'currentPrice',
  Destoryed = 'destoryed',
  DoomsDays = 'doomsDays',
  Factory = 'factory',
  Id = 'id',
  Index = 'index',
  LockValue = 'lockValue',
  MarketCap = 'marketCap',
  MemberCount = 'memberCount',
  Members = 'members',
  MetaUri = 'metaUri',
  MintBurnTxs = 'mintBurnTxs',
  MintTax = 'mintTax',
  Name = 'name',
  Net = 'net',
  Params = 'params',
  Paused = 'paused',
  PriceByDay = 'priceByDay',
  PriceByHour = 'priceByHour',
  RaisingToken = 'raisingToken',
  Supply = 'supply',
  Symbol = 'symbol',
  TokenType = 'tokenType',
  TradeVolumesByDay = 'tradeVolumesByDay',
  TradeVolumesByHour = 'tradeVolumesByHour',
  Treasury = 'treasury',
  TreasuryFee = 'treasuryFee',
  TxCount = 'txCount'
}

export type TokenType_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokenType_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  impl?: InputMaybe<Scalars['Bytes']['input']>;
  impl_contains?: InputMaybe<Scalars['Bytes']['input']>;
  impl_gt?: InputMaybe<Scalars['Bytes']['input']>;
  impl_gte?: InputMaybe<Scalars['Bytes']['input']>;
  impl_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  impl_lt?: InputMaybe<Scalars['Bytes']['input']>;
  impl_lte?: InputMaybe<Scalars['Bytes']['input']>;
  impl_not?: InputMaybe<Scalars['Bytes']['input']>;
  impl_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  impl_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<TokenType_Filter>>>;
};

export enum TokenType_OrderBy {
  Id = 'id',
  Impl = 'impl',
  Name = 'name'
}

export type TokenUpgradeHistory_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokenUpgradeHistory_Filter>>>;
  data?: InputMaybe<Scalars['String']['input']>;
  data_contains?: InputMaybe<Scalars['String']['input']>;
  data_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  data_ends_with?: InputMaybe<Scalars['String']['input']>;
  data_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  data_gt?: InputMaybe<Scalars['String']['input']>;
  data_gte?: InputMaybe<Scalars['String']['input']>;
  data_in?: InputMaybe<Array<Scalars['String']['input']>>;
  data_lt?: InputMaybe<Scalars['String']['input']>;
  data_lte?: InputMaybe<Scalars['String']['input']>;
  data_not?: InputMaybe<Scalars['String']['input']>;
  data_not_contains?: InputMaybe<Scalars['String']['input']>;
  data_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  data_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  data_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  data_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  data_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  data_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  data_starts_with?: InputMaybe<Scalars['String']['input']>;
  data_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  operator?: InputMaybe<Scalars['Bytes']['input']>;
  operator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  operator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  operator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  operator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  operator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  operator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  operator_not?: InputMaybe<Scalars['Bytes']['input']>;
  operator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  operator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<TokenUpgradeHistory_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<TokenEntity_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tx?: InputMaybe<Scalars['Bytes']['input']>;
  tx_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tx_gt?: InputMaybe<Scalars['Bytes']['input']>;
  tx_gte?: InputMaybe<Scalars['Bytes']['input']>;
  tx_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  tx_lt?: InputMaybe<Scalars['Bytes']['input']>;
  tx_lte?: InputMaybe<Scalars['Bytes']['input']>;
  tx_not?: InputMaybe<Scalars['Bytes']['input']>;
  tx_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tx_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  type?: InputMaybe<Scalars['String']['input']>;
  type_contains?: InputMaybe<Scalars['String']['input']>;
  type_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  type_ends_with?: InputMaybe<Scalars['String']['input']>;
  type_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  type_gt?: InputMaybe<Scalars['String']['input']>;
  type_gte?: InputMaybe<Scalars['String']['input']>;
  type_in?: InputMaybe<Array<Scalars['String']['input']>>;
  type_lt?: InputMaybe<Scalars['String']['input']>;
  type_lte?: InputMaybe<Scalars['String']['input']>;
  type_not?: InputMaybe<Scalars['String']['input']>;
  type_not_contains?: InputMaybe<Scalars['String']['input']>;
  type_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  type_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  type_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  type_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  type_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  type_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  type_starts_with?: InputMaybe<Scalars['String']['input']>;
  type_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  upgradeTo?: InputMaybe<Scalars['Bytes']['input']>;
  upgradeTo_contains?: InputMaybe<Scalars['Bytes']['input']>;
  upgradeTo_gt?: InputMaybe<Scalars['Bytes']['input']>;
  upgradeTo_gte?: InputMaybe<Scalars['Bytes']['input']>;
  upgradeTo_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  upgradeTo_lt?: InputMaybe<Scalars['Bytes']['input']>;
  upgradeTo_lte?: InputMaybe<Scalars['Bytes']['input']>;
  upgradeTo_not?: InputMaybe<Scalars['Bytes']['input']>;
  upgradeTo_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  upgradeTo_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum TokenUpgradeHistory_OrderBy {
  Data = 'data',
  Id = 'id',
  Operator = 'operator',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenAddr = 'token__addr',
  TokenAdmin = 'token__admin',
  TokenBondingCurveType = 'token__bondingCurveType',
  TokenBurnTax = 'token__burnTax',
  TokenCreateTimestamp = 'token__createTimestamp',
  TokenCreator = 'token__creator',
  TokenCurrentPrice = 'token__currentPrice',
  TokenDestoryed = 'token__destoryed',
  TokenDoomsDays = 'token__doomsDays',
  TokenFactory = 'token__factory',
  TokenId = 'token__id',
  TokenIndex = 'token__index',
  TokenLockValue = 'token__lockValue',
  TokenMarketCap = 'token__marketCap',
  TokenMemberCount = 'token__memberCount',
  TokenMetaUri = 'token__metaUri',
  TokenMintTax = 'token__mintTax',
  TokenName = 'token__name',
  TokenNet = 'token__net',
  TokenParams = 'token__params',
  TokenPaused = 'token__paused',
  TokenRaisingToken = 'token__raisingToken',
  TokenSupply = 'token__supply',
  TokenSymbol = 'token__symbol',
  TokenTokenType = 'token__tokenType',
  TokenTreasury = 'token__treasury',
  TokenTreasuryFee = 'token__treasuryFee',
  TokenTxCount = 'token__txCount',
  Tx = 'tx',
  Type = 'type',
  UpgradeTo = 'upgradeTo'
}

export type TradeVolumeByDay_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TradeVolumeByDay_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<TradeVolumeByDay_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<TokenEntity_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  volume?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volume_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export enum TradeVolumeByDay_OrderBy {
  Id = 'id',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenAddr = 'token__addr',
  TokenAdmin = 'token__admin',
  TokenBondingCurveType = 'token__bondingCurveType',
  TokenBurnTax = 'token__burnTax',
  TokenCreateTimestamp = 'token__createTimestamp',
  TokenCreator = 'token__creator',
  TokenCurrentPrice = 'token__currentPrice',
  TokenDestoryed = 'token__destoryed',
  TokenDoomsDays = 'token__doomsDays',
  TokenFactory = 'token__factory',
  TokenId = 'token__id',
  TokenIndex = 'token__index',
  TokenLockValue = 'token__lockValue',
  TokenMarketCap = 'token__marketCap',
  TokenMemberCount = 'token__memberCount',
  TokenMetaUri = 'token__metaUri',
  TokenMintTax = 'token__mintTax',
  TokenName = 'token__name',
  TokenNet = 'token__net',
  TokenParams = 'token__params',
  TokenPaused = 'token__paused',
  TokenRaisingToken = 'token__raisingToken',
  TokenSupply = 'token__supply',
  TokenSymbol = 'token__symbol',
  TokenTokenType = 'token__tokenType',
  TokenTreasury = 'token__treasury',
  TokenTreasuryFee = 'token__treasuryFee',
  TokenTxCount = 'token__txCount',
  Volume = 'volume'
}

export type TradeVolumeByHour_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TradeVolumeByHour_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<TradeVolumeByHour_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<TokenEntity_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  volume?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volume_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volume_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export enum TradeVolumeByHour_OrderBy {
  Id = 'id',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenAddr = 'token__addr',
  TokenAdmin = 'token__admin',
  TokenBondingCurveType = 'token__bondingCurveType',
  TokenBurnTax = 'token__burnTax',
  TokenCreateTimestamp = 'token__createTimestamp',
  TokenCreator = 'token__creator',
  TokenCurrentPrice = 'token__currentPrice',
  TokenDestoryed = 'token__destoryed',
  TokenDoomsDays = 'token__doomsDays',
  TokenFactory = 'token__factory',
  TokenId = 'token__id',
  TokenIndex = 'token__index',
  TokenLockValue = 'token__lockValue',
  TokenMarketCap = 'token__marketCap',
  TokenMemberCount = 'token__memberCount',
  TokenMetaUri = 'token__metaUri',
  TokenMintTax = 'token__mintTax',
  TokenName = 'token__name',
  TokenNet = 'token__net',
  TokenParams = 'token__params',
  TokenPaused = 'token__paused',
  TokenRaisingToken = 'token__raisingToken',
  TokenSupply = 'token__supply',
  TokenSymbol = 'token__symbol',
  TokenTokenType = 'token__tokenType',
  TokenTreasury = 'token__treasury',
  TokenTreasuryFee = 'token__treasuryFee',
  TokenTxCount = 'token__txCount',
  Volume = 'volume'
}

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  members_?: InputMaybe<Member_Filter>;
  or?: InputMaybe<Array<InputMaybe<User_Filter>>>;
};

export enum User_OrderBy {
  Id = 'id',
  Members = 'members'
}

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type FetchCountersWhereTypeQueryVariables = Exact<{
  type: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CounterEntity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type FetchCountersWhereTypeQuery = { __typename?: 'Query', counterEntities: Array<{ __typename?: 'CounterEntity', count: bigint, type: string, id: `0x${string}`, timestamp: bigint }> };

export type CounterFieldsFragment = { __typename?: 'CounterEntity', count: bigint, type: string, id: `0x${string}`, timestamp: bigint };

export type FetchMintBurnsWhereFromQueryVariables = Exact<{
  from: Scalars['Bytes']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MintBurnEntity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type FetchMintBurnsWhereFromQuery = { __typename?: 'Query', mintBurnEntities: Array<{ __typename?: 'MintBurnEntity', id: `0x${string}`, direction: number, erc20Amount: bigint, from: `0x${string}`, nativeAmount: bigint, hash: `0x${string}`, timestamp: bigint, to: `0x${string}`, blockNum: bigint, token: { __typename?: 'TokenEntity', addr: `0x${string}`, admin: `0x${string}`, creator: `0x${string}`, net: string, bondingCurveType: string, burnTax: bigint, createTimestamp: bigint, currentPrice: bigint, factory: `0x${string}`, index: bigint, lockValue: bigint, marketCap: bigint, memberCount: bigint, metaUri: string, mintTax: bigint, name: string, params: string, raisingToken: `0x${string}`, supply: bigint, symbol: string, tokenType: string, treasury: `0x${string}`, treasuryFee: bigint } }> };

export type FetchMintBurnsWhereToQueryVariables = Exact<{
  to: Scalars['Bytes']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MintBurnEntity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type FetchMintBurnsWhereToQuery = { __typename?: 'Query', mintBurnEntities: Array<{ __typename?: 'MintBurnEntity', id: `0x${string}`, direction: number, erc20Amount: bigint, from: `0x${string}`, nativeAmount: bigint, hash: `0x${string}`, timestamp: bigint, to: `0x${string}`, blockNum: bigint, token: { __typename?: 'TokenEntity', addr: `0x${string}`, admin: `0x${string}`, creator: `0x${string}`, net: string, bondingCurveType: string, burnTax: bigint, createTimestamp: bigint, currentPrice: bigint, factory: `0x${string}`, index: bigint, lockValue: bigint, marketCap: bigint, memberCount: bigint, metaUri: string, mintTax: bigint, name: string, params: string, raisingToken: `0x${string}`, supply: bigint, symbol: string, tokenType: string, treasury: `0x${string}`, treasuryFee: bigint } }> };

export type FetchMintBurnsWhereTokenQueryVariables = Exact<{
  tokenAddress: Scalars['Bytes']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MintBurnEntity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type FetchMintBurnsWhereTokenQuery = { __typename?: 'Query', mintBurnEntities: Array<{ __typename?: 'MintBurnEntity', id: `0x${string}`, direction: number, erc20Amount: bigint, from: `0x${string}`, nativeAmount: bigint, hash: `0x${string}`, timestamp: bigint, to: `0x${string}`, blockNum: bigint, token: { __typename?: 'TokenEntity', addr: `0x${string}`, admin: `0x${string}`, creator: `0x${string}`, net: string, bondingCurveType: string, burnTax: bigint, createTimestamp: bigint, currentPrice: bigint, factory: `0x${string}`, index: bigint, lockValue: bigint, marketCap: bigint, memberCount: bigint, metaUri: string, mintTax: bigint, name: string, params: string, raisingToken: `0x${string}`, supply: bigint, symbol: string, tokenType: string, treasury: `0x${string}`, treasuryFee: bigint } }> };

export type MintBurnFieldsFragment = { __typename?: 'MintBurnEntity', id: `0x${string}`, direction: number, erc20Amount: bigint, from: `0x${string}`, nativeAmount: bigint, hash: `0x${string}`, timestamp: bigint, to: `0x${string}`, blockNum: bigint, token: { __typename?: 'TokenEntity', addr: `0x${string}`, admin: `0x${string}`, creator: `0x${string}`, net: string, bondingCurveType: string, burnTax: bigint, createTimestamp: bigint, currentPrice: bigint, factory: `0x${string}`, index: bigint, lockValue: bigint, marketCap: bigint, memberCount: bigint, metaUri: string, mintTax: bigint, name: string, params: string, raisingToken: `0x${string}`, supply: bigint, symbol: string, tokenType: string, treasury: `0x${string}`, treasuryFee: bigint } };

export type FetchPlatformQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchPlatformQuery = { __typename?: 'Query', platformEntities: Array<{ __typename?: 'PlatformEntity', addr: `0x${string}`, route: `0x${string}`, admin: `0x${string}`, burnTax: bigint, mintTax: bigint, treasury: `0x${string}` }>, bondingCurveTypes: Array<{ __typename?: 'BondingCurveType', name: string, impl: `0x${string}` }> };

export type PlatformFieldsFragment = { __typename?: 'PlatformEntity', addr: `0x${string}`, route: `0x${string}`, admin: `0x${string}`, burnTax: bigint, mintTax: bigint, treasury: `0x${string}` };

export type BondingCurveTypeFieldsFragment = { __typename?: 'BondingCurveType', name: string, impl: `0x${string}` };

export type FetchPriceHoursWhereTokenQueryVariables = Exact<{
  address: Scalars['ID']['input'];
  fastTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type FetchPriceHoursWhereTokenQuery = { __typename?: 'Query', priceByHours: Array<{ __typename?: 'PriceByHour', minPrice: bigint, maxPrice: bigint, openPrice: bigint, closePrice: bigint, timestamp: bigint, tokenTvl: bigint }> };

export type FetchPriceDaysWhereTokenQueryVariables = Exact<{
  address: Scalars['ID']['input'];
  fastTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type FetchPriceDaysWhereTokenQuery = { __typename?: 'Query', priceByHours: Array<{ __typename?: 'PriceByHour', minPrice: bigint, maxPrice: bigint, openPrice: bigint, closePrice: bigint, timestamp: bigint, tokenTvl: bigint }> };

export type PriceByHourFieldsFragment = { __typename?: 'PriceByHour', minPrice: bigint, maxPrice: bigint, openPrice: bigint, closePrice: bigint, timestamp: bigint, tokenTvl: bigint };

export type PriceByDayFieldsFragment = { __typename?: 'PriceByDay', minPrice: bigint, maxPrice: bigint, openPrice: bigint, closePrice: bigint, timestamp: bigint, tokenTvl: bigint };

export type FetchTokensQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenEntity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type FetchTokensQuery = { __typename?: 'Query', tokenEntities: Array<{ __typename?: 'TokenEntity', addr: `0x${string}`, admin: `0x${string}`, creator: `0x${string}`, net: string, bondingCurveType: string, burnTax: bigint, createTimestamp: bigint, currentPrice: bigint, factory: `0x${string}`, index: bigint, lockValue: bigint, marketCap: bigint, memberCount: bigint, metaUri: string, mintTax: bigint, name: string, params: string, raisingToken: `0x${string}`, supply: bigint, symbol: string, tokenType: string, treasury: `0x${string}`, treasuryFee: bigint }> };

export type FetchTokenQueryVariables = Exact<{
  address: Scalars['ID']['input'];
}>;


export type FetchTokenQuery = { __typename?: 'Query', tokenEntity?: { __typename?: 'TokenEntity', addr: `0x${string}`, admin: `0x${string}`, creator: `0x${string}`, net: string, bondingCurveType: string, burnTax: bigint, createTimestamp: bigint, currentPrice: bigint, factory: `0x${string}`, index: bigint, lockValue: bigint, marketCap: bigint, memberCount: bigint, metaUri: string, mintTax: bigint, name: string, params: string, raisingToken: `0x${string}`, supply: bigint, symbol: string, tokenType: string, treasury: `0x${string}`, treasuryFee: bigint } | null };

export type FetchTokensWhereIndexQueryVariables = Exact<{
  index: Scalars['BigInt']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenEntity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type FetchTokensWhereIndexQuery = { __typename?: 'Query', tokenEntities: Array<{ __typename?: 'TokenEntity', addr: `0x${string}`, admin: `0x${string}`, creator: `0x${string}`, net: string, bondingCurveType: string, burnTax: bigint, createTimestamp: bigint, currentPrice: bigint, factory: `0x${string}`, index: bigint, lockValue: bigint, marketCap: bigint, memberCount: bigint, metaUri: string, mintTax: bigint, name: string, params: string, raisingToken: `0x${string}`, supply: bigint, symbol: string, tokenType: string, treasury: `0x${string}`, treasuryFee: bigint }> };

export type FetchTokensWhereAddressQueryVariables = Exact<{
  address: Scalars['Bytes']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenEntity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type FetchTokensWhereAddressQuery = { __typename?: 'Query', tokenEntities: Array<{ __typename?: 'TokenEntity', addr: `0x${string}`, admin: `0x${string}`, creator: `0x${string}`, net: string, bondingCurveType: string, burnTax: bigint, createTimestamp: bigint, currentPrice: bigint, factory: `0x${string}`, index: bigint, lockValue: bigint, marketCap: bigint, memberCount: bigint, metaUri: string, mintTax: bigint, name: string, params: string, raisingToken: `0x${string}`, supply: bigint, symbol: string, tokenType: string, treasury: `0x${string}`, treasuryFee: bigint }> };

export type FetchTokensWhereNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenEntity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type FetchTokensWhereNameQuery = { __typename?: 'Query', tokenEntities: Array<{ __typename?: 'TokenEntity', addr: `0x${string}`, admin: `0x${string}`, creator: `0x${string}`, net: string, bondingCurveType: string, burnTax: bigint, createTimestamp: bigint, currentPrice: bigint, factory: `0x${string}`, index: bigint, lockValue: bigint, marketCap: bigint, memberCount: bigint, metaUri: string, mintTax: bigint, name: string, params: string, raisingToken: `0x${string}`, supply: bigint, symbol: string, tokenType: string, treasury: `0x${string}`, treasuryFee: bigint }> };

export type FetchTokensWhereSymbolQueryVariables = Exact<{
  symbol: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenEntity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type FetchTokensWhereSymbolQuery = { __typename?: 'Query', tokenEntities: Array<{ __typename?: 'TokenEntity', addr: `0x${string}`, admin: `0x${string}`, creator: `0x${string}`, net: string, bondingCurveType: string, burnTax: bigint, createTimestamp: bigint, currentPrice: bigint, factory: `0x${string}`, index: bigint, lockValue: bigint, marketCap: bigint, memberCount: bigint, metaUri: string, mintTax: bigint, name: string, params: string, raisingToken: `0x${string}`, supply: bigint, symbol: string, tokenType: string, treasury: `0x${string}`, treasuryFee: bigint }> };

export type FetchOwnedTokensQueryVariables = Exact<{
  admin: Scalars['Bytes']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenEntity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type FetchOwnedTokensQuery = { __typename?: 'Query', tokenEntities: Array<{ __typename?: 'TokenEntity', addr: `0x${string}`, admin: `0x${string}`, creator: `0x${string}`, net: string, bondingCurveType: string, burnTax: bigint, createTimestamp: bigint, currentPrice: bigint, factory: `0x${string}`, index: bigint, lockValue: bigint, marketCap: bigint, memberCount: bigint, metaUri: string, mintTax: bigint, name: string, params: string, raisingToken: `0x${string}`, supply: bigint, symbol: string, tokenType: string, treasury: `0x${string}`, treasuryFee: bigint }> };

export type FetchCreateTokensQueryVariables = Exact<{
  creator: Scalars['Bytes']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenEntity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type FetchCreateTokensQuery = { __typename?: 'Query', tokenEntities: Array<{ __typename?: 'TokenEntity', addr: `0x${string}`, admin: `0x${string}`, creator: `0x${string}`, net: string, bondingCurveType: string, burnTax: bigint, createTimestamp: bigint, currentPrice: bigint, factory: `0x${string}`, index: bigint, lockValue: bigint, marketCap: bigint, memberCount: bigint, metaUri: string, mintTax: bigint, name: string, params: string, raisingToken: `0x${string}`, supply: bigint, symbol: string, tokenType: string, treasury: `0x${string}`, treasuryFee: bigint }> };

export type TokenFieldsFragment = { __typename?: 'TokenEntity', addr: `0x${string}`, admin: `0x${string}`, creator: `0x${string}`, net: string, bondingCurveType: string, burnTax: bigint, createTimestamp: bigint, currentPrice: bigint, factory: `0x${string}`, index: bigint, lockValue: bigint, marketCap: bigint, memberCount: bigint, metaUri: string, mintTax: bigint, name: string, params: string, raisingToken: `0x${string}`, supply: bigint, symbol: string, tokenType: string, treasury: `0x${string}`, treasuryFee: bigint };
