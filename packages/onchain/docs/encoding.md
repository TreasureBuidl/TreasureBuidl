# Encoding 

When encoding a transaction the following information is needed:
- Target address
    - The address of the _contract_ that are calling a function of.
- Calldata 
    - The encoded function call, being the formatted and hashed function signature with the encoded parameters.
- Call value 
    - The amount of native tokens (i.e ETH) to send with the function call. Note that this field is unrelated to gas costs, and can be set to 0 if no native token needs to be sent. 

You don't need to be worried about the encoding of the function signature in treasure maps, as the contract does that itself. 

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
