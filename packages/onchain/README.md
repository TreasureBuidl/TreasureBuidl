<div align="center">
    <h1>TreasureBuidl</h1>
    <h3>Smart Contracts</h3>
    <h6>
        An onchain transaction builder with a built in escrow, enabling efficient treasury management for cross application investments. 
    </h6>
</div>

---

# Index 

* #### [Repo set up](#repo-set-up)
    * [Compile](#compile)
    * [Test](#test)
    * [Coverage](#coverage)
    * [Deploy](#deploy)
        * [Local](#local)
        * [Rinkeby](#rinkeby)

#### [> Encoding guide](./docs/encoding.md)
#### [> Deployments](./docs/deployments.md)

---

# Repo set up 

This repository uses yarn. 

You will need to start by installing the packages at the root of this repository by running:
```
yarn
```

Once package installation is complete navigate to this file (`cd packages/onchain`) and install the required packages by running:
```
yarn
```

Once all packages are installed you are able to run any of the following commands. 

### Compile 

To compile the contracts run: 
```
yarn build
```

If at any point the build script fails with a non-compile related error run:
```
yarn clean
```
You should now be able to run build without issue. 

### Test

To run the tests on the contracts run:
```
yarn test
```

### Coverage 

To run coverage on the contracts run:
```
yarn cover
```

Current coverage:
```bash
------------------------|----------|----------|----------|----------|----------------|
File                    |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
------------------------|----------|----------|----------|----------|----------------|
 shared/                |       48 |    26.32 |    39.29 |    46.15 |                |
  ModifiedErc721.sol    |       48 |    26.32 |    39.29 |    46.15 |... 552,557,563 |
 test-helpers/          |      100 |      100 |      100 |      100 |                |
  Erc20_Token.sol       |      100 |      100 |      100 |      100 |                |
  Erc721_Token.sol      |      100 |      100 |      100 |      100 |                |
 treasure-maps/         |    71.43 |       50 |    66.67 |    71.43 |                |
  TreasureMaps.sol      |    71.43 |       50 |    66.67 |    71.43 |... 141,143,150 |
 treasure-plannet/      |    78.33 |    53.13 |    82.61 |    81.36 |                |
  ModifiedOwnership.sol |    85.71 |    66.67 |    85.71 |     87.5 |          81,86 |
  PlannetFactory.sol    |      100 |      100 |      100 |      100 |                |
  TokenOwnership.sol    |    91.67 |     62.5 |      100 |     91.3 |        152,153 |
  TreasurePlanet.sol    |    43.75 |       30 |       50 |       50 |... 108,136,150 |
------------------------|----------|----------|----------|----------|----------------|
All files               |    63.98 |    39.19 |     62.3 |     63.8 |                |
------------------------|----------|----------|----------|----------|----------------|
```

**Note:**
- `ModifiedErc721` is mostly unchanged from the OpenZeppelin ERC721 implementation. 
- `TreasurePlanet` has receiving hooks for ERC721 and ERC1155, as well as ERC165. Only one hook is tested. 

### Deploy 

#### Local 

To deploy locally you will need to expose the local testnet (in a separate terminal within the `onchain` folder) by running: 
```
yarn start
```

Then in your original terminal run:
```
yarn deploy:local
```

#### Rinkeby

You can copy the `.env.example` and then rename it `.env`, and add an infura key as well as a private key for a rinkeby address that has rinkeby eth. 

Then run:

```
yarn deploy:rinkeby
```