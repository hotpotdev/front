

export const bondingCurveAbi = [
  {
    inputs: [],
    name: 'BondingCurveType',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'daoTokenAmount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'daoTokenCurrentSupply',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: 'parameters',
        type: 'bytes'
      }
    ],
    name: 'calculateBurnAmountFromBondingCurve',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'nativeTokenAmount',
        type: 'uint256'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'nativeTokenAmount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'daoTokenCurrentSupply',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: 'parameters',
        type: 'bytes'
      }
    ],
    name: 'calculateMintAmountFromBondingCurve',
    outputs: [
      {
        internalType: 'uint256',
        name: 'daoTokenAmount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'daoTokenCurrentSupply',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: 'parameters',
        type: 'bytes'
      }
    ],
    name: 'price',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  }
];
