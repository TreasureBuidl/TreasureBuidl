# Encoding 

When encoding a transaction the following information is needed:
- Target address
    - The address of the _contract_ that are calling a function of.
- Calldata 
    - The encoded function call, being the formatted and hashed function signature with the encoded parameters.
- Call value 
    - The amount of native tokens (i.e ETH) to send with the function call. Note that this field is unrelated to gas costs, and can be set to 0 if no native token needs to be sent. 

You don't need to be worried about the encoding of the function signature in treasure maps, as the contract does that itself. 

---

# Index 

#### [< Back to README](../README.md)

* #### [Treasure maps](#treasure-maps)
    * [Example run through](#example-run-through)
        * [1. Building target address array](#1-building-target-address-array)
        * [2. Building call value array](#2-building-call-value-array)
        * [3. Building function signature array](#3-building-function-signature-array)
        * [4. Building the encoded parameters array](#4-building-the-encoded-parameters-array)
        * [5. Pulling it all together](#5-pulling-it-all-together)

* #### [Debugging](#debugging)

---

## Treasure maps 

The point of treasure maps is to enable onchain transaction building and storage. This has many positive side effects, such as allowing for the approval of complex transactions in decentralised governance. On top of this one can easily re-run the same transaction (i.e payments) with surety of the exact nature of its affects.

To create treasure map you will need to generate the following information:
- An array of the target addresses for all the function calls. 
    - Format: Hex string array.
    - i.e `["0x123..", "0xabc..."]`
- An array of the function signatures. 
    - Format: function name, brackets and the data types of the parameters, NOT the parameter names. No spaces, comma between each as a string. 
    - i.e `["mint(address,uint256)", "transfer(address,uint256)"`
- An array of the encoded parameters. 
    - Format: encoded parameters, padded, starting with 0x. 
    - i.e 
    `["0x00000000000000000000000075537828f2ce51be7289709686a69cbfdbb714f10000000000000000000000000000000000000000000000000000000000000fa0", "0xa9059cbb00000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c800000000000000000000000000000000000000000000000000000000000003e8"]`
        - Here you can see two parameters within the hex, first is the address `0x75537828f2ce51be7289709686a69cbfdbb714f1` padded by 27 `0`s to make it `bytes32` sized. The second parameter is the number 4000 in hex padded by the appropriate number of `0`s to make it fit the `bytes32` size. 
- An array of the call values
    - Format: number array
    - i.e `[0, 0]`

All these arrays need to be of the same length, as every component is needed for every transaction call. 

### Example run through

Lets say we wanted to make the following transaction calls in this order:
- Transfer funds from an address
- Adding liquidity to an AMM
- Transferring some of the LP tokens to an address

Below we will go step by step through all the processing that needs to happen before we can create a map for this transaction. 

For this example, all function calls and addresses are fabricated.

##### 1. Building target address array
##### | `_targetAddr`

The first array we should build is the target array. These can be passed in stringified or as the raw hex with the `0x` prefix.

Stringified:
```solidity
[
    "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    "0x75537828f2ce51be7289709686a69cbfdbb714f1",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
]
```
Raw hex with `0x`prefix:
```solidity
[
    "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    "0x75537828f2ce51be7289709686a69cbfdbb714f1",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
]
```

You should double check these are the right addresses on the specific network you are connected to. 

This will be our `_targetAddr` param to pass in. 

##### 2. Building call value array 
##### | `_callValues`

The next array we can easily get out of the way is the call value array. Chances are you are not doing any transactions that require native tokens (i.e ETH).

These should be passed in as numbers.

```solidity
[
    0,
    0,
    0
]
```

This will be our `_callValues` param to pass in. 

##### 3. Building function signature array
##### | `_functionSig`

The function signatures need to be very specifically formatted or the hash will be incorrect and the function call will always revert. 

The function names for our transactions are as follows:
- `transferFrom(address _from, address _to, uint256 _amount)`
- `addLiquidity(address _tokenA, address _tokenB, uint256 _amountA, uint256 _amountB)`
- `transfer(address _to, uint256 _amount)`

The formatting we need to do is remove the parameter names, and the spaces between the parameter data types. After this formatting our parameters will look like this:

```solidity
[
    "transferFrom(address,address,uint256)",
    "addLiquidity(address,address,uint256,uint256)",
    "transfer(address,uint256)"
]
```

This will be our `_functionSig` param to pass in. 

##### 4. Building the encoded parameters array
##### | `_callData`

The most complicated array that we need build is the encoded parameters array. 

The encoded parameter needs to contain all the parameters needed by the function, and as such is a `bytes` type, and can handle dynamic sizes. 

For our functions we will be passing in the following parameters:

- `transferFrom(address _from, address _to, uint256 _amount)`
    - _from: `"0x90F79bf6EB2c4f870365E785982E1f101E93b906"`
    - _to: `"0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65"`
    - _amount: `5000`
- `addLiquidity(address _tokenA, address _tokenB, uint256 _amountA, uint256 _amountB)`
    - _tokenA: `"0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"`
    - _tokenB: `"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"`
    - _amountA: `5000`
    - _amountB: `254`
- `transfer(address _to, uint256 _amount)`
    - _to: `"0x90F79bf6EB2c4f870365E785982E1f101E93b906"`
    - _amount: `10`

We will need to encode these parameters. Below is the function that we will need to pass the parameters into the `paramBuilder()` function. Below is the formatting we will need in order to pass them in. All types as well as the parameters will all need to be strings:

- `transferFrom`
    - param types: `["address", "address", "uint256"]`
    - param data: `["0x90F79bf6EB2c4f870365E785982E1f101E93b906", "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65", "5000"]`
- `addLiquidity`
    - param types: `["address", "address", "uint256", "uint256"]`
    - param data: `["0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "5000", "254"]`
- `transfer`
    - param types: `["address", "uint256"]`
    - param data: `["0x90F79bf6EB2c4f870365E785982E1f101E93b906", "10"]`

```ts
function paramBuilder(
    paramType: Array<string>,
    params: Array<string>
): String {
    let encoded: String[] = new Array(params.length);

    for (let i = 0; i < params.length; i++) {
        encoded[i] = web3.eth.abi.encodeParameter(paramType[i], params[i]);
    }

    // Starts with 0x as first param needs to start with 0x.
    let concatEncoded: String = new String("0x");

    for (let i = 0; i < params.length; i++) {
        let fullEncoded: String = encoded[i];
        // Slices of the 0x
        fullEncoded = fullEncoded.slice(2);
        // Adds it to the string
        concatEncoded = concatEncoded.concat(fullEncoded.toString());
    }

    return concatEncoded;
}
```

The return from calling the above function with the formatted data you will get the following returns:

- `transferFrom`
    - `0x00000000000000000000000090f79bf6eb2c4f870365e785982e1f101e93b90600000000000000000000000015d34aaf54267db7d7c367839aaf71a00a2c6a650000000000000000000000000000000000000000000000000000000000001388`
- `addLiquidity`
    - `0x000000000000000000000000dc64a140aa3e981100a9beca4e685f962f0cf6c9000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000000000000000000000000000000000000000138800000000000000000000000000000000000000000000000000000000000000fe`
- `transfer`
    - `0x00000000000000000000000090f79bf6eb2c4f870365e785982e1f101e93b906000000000000000000000000000000000000000000000000000000000000000a`

As you can see, these will all be of different lengths depending on how many parameters the function needs.

```solidity
[
    "0x00000000000000000000000090f79bf6eb2c4f870365e785982e1f101e93b90600000000000000000000000015d34aaf54267db7d7c367839aaf71a00a2c6a650000000000000000000000000000000000000000000000000000000000001388",
    "0x000000000000000000000000dc64a140aa3e981100a9beca4e685f962f0cf6c9000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000000000000000000000000000000000000000138800000000000000000000000000000000000000000000000000000000000000fe",
    "0x00000000000000000000000090f79bf6eb2c4f870365e785982e1f101e93b906000000000000000000000000000000000000000000000000000000000000000a"
]
```

This will be our `_callData` param to pass in. 

##### 5. Pulling it all together

Don't forget about the description! 

Our function call will look like so:

```solidity
TreasureMap.createTreasure(
    "Moving funds out of user wallet, adding liquidity, taking some LP tokens as profit.",
    [
        "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
        "0x75537828f2ce51be7289709686a69cbfdbb714f1",
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
    ],
    [
        "transferFrom(address,address,uint256)",
        "addLiquidity(address,address,uint256,uint256)",
        "transfer(address,uint256)"
    ],
    [
        "0x00000000000000000000000090f79bf6eb2c4f870365e785982e1f101e93b90600000000000000000000000015d34aaf54267db7d7c367839aaf71a00a2c6a650000000000000000000000000000000000000000000000000000000000001388",
        "0x000000000000000000000000dc64a140aa3e981100a9beca4e685f962f0cf6c9000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000000000000000000000000000000000000000138800000000000000000000000000000000000000000000000000000000000000fe",
        "0x00000000000000000000000090f79bf6eb2c4f870365e785982e1f101e93b906000000000000000000000000000000000000000000000000000000000000000a"
    ],
    [
        0,
        0,
        0
    ]
)
```

The treasure map contract will emit the map ID with the following information:

```solidity
emit TreasureMapAdded(
    address indexed creator,
    uint256 indexed mapID,
    string description
);
```

---

## Debugging 

Below is a list of errors you may encounter when building and executing transactions, and what to do if you encounter them: 

| Error message | Where it happened | Why |
|:-------------:|:-----------------:|:----|
| `"MAP: Array lengths differ"` | `TreasureMap` => `createTreasure` | The arrays you passed in where not all the same length. Every transaction call needs a corresponding piece from each array. <br> __To debug:__ <br> Check which array is not the right length, and correct the missing field. 
| `"Map does not exist"` | `TreasurePlanet` => `execute` | The map ID you passed in does not exist on the treasure map contract. <br> __To debug:__ <br> You can check if a treasure map exists before calling it by calling `getTreasureMap(uint256 _id)` on the `TreasureMap`.
| `"MAP: Exploration failed"` | `TreasurePlanet` => `execute` | One of the calls within your bundle failed to run, so the entire transaction reverted. No state changes will persist. <br> __To debug:__ <br> **1.** Check the basics: <br> **a)** All transfers have the required approval. <br> **b)** Balances are enough for each needed asset. <br> **c)** All the target addresses are correct for the correct network. <br> **d)** The functions you are calling exist on the address on this network (etherscan will be easiest). <br> **e)** The addresses and function signatures line up, same for the parameters and call values. If any are out of order the whole transaction will fail every time, and **you will need to create a new map.** <br> **2.** Go through all of the calls by passing them in individually, running each of them until the failing transaction is found.  |
| `Ownable: caller is not the owner` | `TreasurePlanet` => `execute` | __To debug:__ <br> You need to call execute from the address of the owner. 