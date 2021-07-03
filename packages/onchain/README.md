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