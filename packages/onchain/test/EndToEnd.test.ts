export const { expect } = require("chai");
export const { ethers } = require("hardhat");
export const Web3 = require("web3");

describe("End To End Test", () => {
    const provider = new ethers.getDefaultProvider();
    let web3 = new Web3(provider);

    // Contracts
    let transactionLibrary: any;
    let tokenOwnership: any;
    let treasureMaps: any;
    let planetFactory: any;
    let treasurePlanet: any;
    let testTokenOne: any;
    let testTokenTwo: any;

    // Signers
    let original_deployer: any;
    let planet_owner: any;
    let new_planet_owner: any;
    let not_planet_owner: any;
    let map_creator: any;

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

    before(async () => {
        // Getting all the contracts
        // const TransactionLibrary = await ethers.getContractFactory("TransactionLibrary");
        const TokenOwnership = await ethers.getContractFactory("TokenOwnership");
        const TreasureMaps = await ethers.getContractFactory("TreasureMaps");
        const PlanetFactory = await ethers.getContractFactory("PlanetFactory");
        const TreasurePlanet = await ethers.getContractFactory("TreasurePlanet");
        const TokenOne = await ethers.getContractFactory("Erc20_Token");
        const TokenTwo = await ethers.getContractFactory("Erc20_Token");

        // Getting signers
        [
            original_deployer,
            planet_owner,
            new_planet_owner,
            not_planet_owner,
            map_creator
        ] = await ethers.getSigners();

        // Deploying contract
        // transactionLibrary = await TransactionLibrary.deploy();
        tokenOwnership = await TokenOwnership.deploy();
        treasureMaps = await TreasureMaps.deploy();
        planetFactory = await PlanetFactory.deploy(
            tokenOwnership.address,
            treasureMaps.address
        );
        await tokenOwnership.setFactory(planetFactory.address);
        testTokenOne = await TokenOne.deploy("Token One", "TKN1");
        testTokenTwo = await TokenTwo.deploy("Token Two", "TKN2");
    });

    describe("Treasure planet life cycle", () => {
        before(async () => {
            const TreasurePlanet = await ethers.getContractFactory("TreasurePlanet");

            let tx = await (
                await planetFactory.connect(planet_owner).createTreasurePlanet()
            ).wait();

            treasurePlanet = TreasurePlanet.attach(tx.events[2].args.planet);
        });

        it("Creating a treasure map", async () => {
            await testTokenOne.connect(map_creator).mint(
                treasurePlanet.address,
                4000
            );

            await testTokenOne.connect(map_creator).approve(
                treasurePlanet.address,
                4000
            );

            let tx = await (
                await treasureMaps.connect(map_creator).createTreasure(
                    "Example test treasure",
                    [
                        // testTokenOne.address,
                        testTokenOne.address,
                        testTokenOne.address,
                        testTokenOne.address
                    ],
                    [
                        // "transferFrom(address,address,uint256)",
                        "mint(address,uint256)",
                        "transfer(address,uint256)",
                        "transfer(address,uint256)"
                    ],
                    [
                        // paramBuilder(
                        //     ["address", "address", "uint256"],
                        //     [
                        //         map_creator.address.toString(),
                        //         treasurePlanet.address.toString(),
                        //         "4000"
                        //     ]
                        // ),
                        paramBuilder(
                            ["address", "uint256"],
                            [treasurePlanet.address.toString(), "4000"]
                        ),
                        paramBuilder(
                            ["address", "uint256"],
                            [not_planet_owner.address.toString(), "1000"]
                        ),
                        paramBuilder(
                            ["address", "uint256"],
                            [planet_owner.address.toString(), "1000"]
                        )
                    ],
                    [
                        // 0,
                        0,
                        0,
                        0
                    ]
                )
            ).wait();
        });

        it("Executing a treasure map", async () => {
            let treasureMapOne = await treasureMaps.getTreasureMap(1);

            console.log(treasureMapOne)

            let tx = await (await 
                treasurePlanet.connect(planet_owner).execute(1)
            ).wait();

        });
    });
});