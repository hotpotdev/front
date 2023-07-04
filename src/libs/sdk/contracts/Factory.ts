export const factoryAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8'
      }
    ],
    name: 'Initialized',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'tokenType',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'impl',
        type: 'address'
      }
    ],
    name: 'LogBondingCurveTypeImplAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newAccount',
        type: 'address'
      }
    ],
    name: 'LogPlatformAdminChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [],
    name: 'LogPlatformTaxChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newAccount',
        type: 'address'
      }
    ],
    name: 'LogPlatformTreasuryChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newRoute',
        type: 'address'
      }
    ],
    name: 'LogRouteChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'tokenType',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'bondingCurveType',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'deployedAddr',
        type: 'address'
      }
    ],
    name: 'LogTokenDeployed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'proxyAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'tokenType',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'implementAddr',
        type: 'address'
      }
    ],
    name: 'LogTokenImplementUpgraded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'tokenType',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'impl',
        type: 'address'
      }
    ],
    name: 'LogTokenTypeImplAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'proxyAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'rejecter',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'reason',
        type: 'string'
      }
    ],
    name: 'LogTokenUpgradeRejected',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'proxyAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timelock',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'implementAddr',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'requester',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      }
    ],
    name: 'LogTokenUpgradeRequested',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32'
      }
    ],
    name: 'RoleAdminChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'RoleGranted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'RoleRevoked',
    type: 'event'
  },
  {
    stateMutability: 'payable',
    type: 'fallback'
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'PLATFORM_ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'impl',
        type: 'address'
      }
    ],
    name: 'addBondingCurveImplement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'proxyAddr',
        type: 'address'
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'strategyReference',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'strategy',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'votingPeriod',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'votingDelay',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'proposalThreshold',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'quorumVotes',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'timelockDelay',
            type: 'uint256'
          }
        ],
        internalType: 'struct GovernorLib.GovInfo',
        name: 'govInfo',
        type: 'tuple'
      }
    ],
    name: 'createGovernorForToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'proxyAddress',
        type: 'address'
      }
    ],
    name: 'declareDoomsday',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'tokenType',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'bondingCurveType',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'metadata',
            type: 'string'
          },
          {
            internalType: 'address',
            name: 'projectAdmin',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'projectTreasury',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'projectMintTax',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'projectBurnTax',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'isSbt',
            type: 'bool'
          },
          {
            internalType: 'address',
            name: 'raisingTokenAddr',
            type: 'address'
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes'
          }
        ],
        internalType: 'struct IHotpotFactory.TokenInfo',
        name: 'token',
        type: 'tuple'
      },
      {
        internalType: 'uint256',
        name: 'mintfirstAmount',
        type: 'uint256'
      }
    ],
    name: 'deployToken',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'bondingCurveType',
        type: 'string'
      }
    ],
    name: 'getBondingCurveImplement',
    outputs: [
      {
        internalType: 'address',
        name: 'impl',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'tokenType',
        type: 'string'
      }
    ],
    name: 'getHotpotImplement',
    outputs: [
      {
        internalType: 'address',
        name: 'impl',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getPlatformAdmin',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getPlatformTreasury',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      }
    ],
    name: 'getRoleAdmin',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getRoute',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getTaxRateOfPlatform',
    outputs: [
      {
        internalType: 'uint256',
        name: 'platformMintTax',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'platformBurnTax',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256'
      }
    ],
    name: 'getToken',
    outputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getTokensLength',
    outputs: [
      {
        internalType: 'uint256',
        name: 'len',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'hasRole',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'platformAdmin',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'platformTreasury',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'route',
        type: 'address'
      }
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'proxyAddress',
        type: 'address'
      }
    ],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'proxyAddress',
        type: 'address'
      },
      {
        internalType: 'string',
        name: 'reason',
        type: 'string'
      }
    ],
    name: 'rejectUpgrade',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'proxyAddress',
        type: 'address'
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      }
    ],
    name: 'requestUpgrade',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newPlatformAdmin',
        type: 'address'
      }
    ],
    name: 'setPlatformAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'platformMintTax',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'platformBurnTax',
        type: 'uint256'
      }
    ],
    name: 'setPlatformTaxRate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newPlatformTreasury',
        type: 'address'
      }
    ],
    name: 'setPlatformTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'route',
        type: 'address'
      }
    ],
    name: 'setRoute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4'
      }
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'proxyAddress',
        type: 'address'
      }
    ],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'tokenType',
        type: 'string'
      },
      {
        internalType: 'address',
        name: 'impl',
        type: 'address'
      }
    ],
    name: 'updateHotpotImplement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'proxyAddress',
        type: 'address'
      }
    ],
    name: 'upgradeTokenImplement',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    stateMutability: 'payable',
    type: 'receive'
  }
];
