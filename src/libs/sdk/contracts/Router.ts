
export const routerAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'fromTokenAddr',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'toTokenAddr',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'getAmountOut',
    outputs: [
      {
        internalType: 'uint256',
        name: 'returnAmount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'raisingTokenAmount',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'fromTokenAddr',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'toTokenAddr',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'minReturn',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256'
      }
    ],
    name: 'swap',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
