export const { expect } = require("chai");
export const { ethers } = require("hardhat");
export const Web3 = require("web3");

describe("End To End Test", () => {
    const provider = new ethers.getDefaultProvider();
    let web3 = new Web3(provider);

    // Contracts
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
        const TokenTwo = await ethers.getContractFactory("Erc721_Token");

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
        it("Creating a treasure planet", async () => {
            const TreasurePlanet = await ethers.getContractFactory("TreasurePlanet");

            let tx = await (
                await planetFactory.connect(planet_owner).createTreasurePlanet()
            ).wait();

            treasurePlanet = TreasurePlanet.attach(tx.events[2].args.planet);

            let reverseCheck = await tokenOwnership.getOwnedContract(
                planet_owner.address
            );
        });

        it("Cannot create more than one planet per address", async () => {
            await expect(
                planetFactory.connect(planet_owner).createTreasurePlanet()
            ).to.be.revertedWith(
                "Owner has token"
            );
        });

        it("Creating a treasure map", async () => {
            let tx = await (
                await treasureMaps.connect(map_creator).createTreasure(
                    "Example test treasure",
                    [
                        testTokenOne.address,
                        testTokenOne.address,
                        testTokenOne.address
                    ],
                    [
                        "mint(address,uint256)",
                        "transfer(address,uint256)",
                        "transfer(address,uint256)"
                    ],
                    [
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
                        0,
                        0,
                        0
                    ]
                )
            ).wait();
        });

        it("Cannot create treasure map with invalid inputs", async () => {
            await expect(
                treasureMaps.connect(map_creator).createTreasure(
                    "Example test treasure",
                    [
                        testTokenOne.address.toString(),
                        testTokenOne.address.toString()
                    ],
                    [
                        "mint(address,uint256)",
                        "transfer(address,uint256)",
                        "transfer(address,uint256)"
                    ],
                    [
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
                        0,
                        0,
                        0
                    ]
                )
            ).to.be.revertedWith(
                "MAP: Array lengths differ"
            );
        });

        it("Executing a treasure map", async () => { 
            let treasureMapOne = await treasureMaps.getTreasureMap(1);

            let tx = await (await 
                treasurePlanet.connect(planet_owner).execute(1)
            ).wait();
        });

        it("Cannot execute treasure map that does not exist", async () => {
            await expect(
                treasurePlanet.connect(planet_owner).execute(2)
            ).to.be.revertedWith(
                "Map does not exist"
            );
        });

        it("Cannot execute on plant if not owner", async () => {
            await expect(
                treasurePlanet.connect(not_planet_owner).execute(1)
            ).to.be.revertedWith(
                "Ownable: caller is not the owner"
            );
        });

        it("Transferring ownership rights of planet", async () => {
            let token = await tokenOwnership.getOwnerToken(planet_owner.address);

            await tokenOwnership.connect(planet_owner).transferFrom(
                planet_owner.address,
                new_planet_owner.address,
                token.toString()
            );
                
            let ownedAfter = await tokenOwnership.getOwnedContract(planet_owner.address);
            let tokenAfter = await tokenOwnership.getOwnerToken(planet_owner.address);
            let newOwnedAfter = await tokenOwnership.getOwnedContract(new_planet_owner.address);
            let newTokenAfter = await tokenOwnership.getOwnerToken(new_planet_owner.address);

            expect(
				ownedAfter.toString(),
				"Owner has not lost ownership"
			).to.equal(
				"0x0000000000000000000000000000000000000000"
			);
            expect(
				tokenAfter.toString(),
				"Owner has not lost ownership"
			).to.equal(
				"0"
			);
            expect(
				newOwnedAfter.toString(),
				"New owner has not gained ownership"
			).to.equal(
				treasurePlanet.address.toString()
			);
            expect(
				newTokenAfter.toString(),
				"New owner has not gained ownership"
			).to.equal(
				"1"
			);
        });

        it("Cannot transfer ownership if not owner", async () => {
            await expect(
                tokenOwnership.connect(not_planet_owner).transferFrom(
                    planet_owner.address,
                    new_planet_owner.address,
                    1
                )
            ).to.be.revertedWith(
                "ERC721: transfer caller is not owner nor approved"
            );
        });
    });

    describe("Token receiving hook tests", () => {
        it("Creating a treasure planet", async () => {
            const TreasurePlanet = await ethers.getContractFactory("TreasurePlanet");

            let tx = await (
                await planetFactory.connect(planet_owner).createTreasurePlanet()
            ).wait();

            treasurePlanet = TreasurePlanet.attach(tx.events[2].args.planet);

            let reverseCheck = await tokenOwnership.getOwnedContract(
                planet_owner.address
            );
        });

        it("ERC721 token", async () => {
            let mintTx = await (
                await testTokenTwo.connect(planet_owner).mint(
                    planet_owner.address
                )
            ).wait();

            let nftTokenID = mintTx.events[0].args.tokenId.toString();

            await testTokenTwo.connect(planet_owner).approve(
                treasurePlanet.address,
                nftTokenID
            );

            let tx = await (
                await treasureMaps.connect(planet_owner).createTreasure(
                    "Example test treasure",
                    [
                        testTokenTwo.address
                    ],
                    [
                        "safeTransferFrom(address,address,uint256)"
                    ],
                    [
                        paramBuilder(
                            ["address", "address", "uint256"],
                            [
                                planet_owner.address.toString(), 
                                treasurePlanet.address.toString(), 
                                nftTokenID
                            ]
                        )
                    ],
                    [
                        0
                    ]
                )
            ).wait();

            let mapID = tx.events[1].args.mapID.toString();
            let ownerBefore = await testTokenTwo.balanceOf(planet_owner.address);
            let planetBefore = await testTokenTwo.balanceOf(treasurePlanet.address);

            let txTwo = await (
                await treasurePlanet.connect(planet_owner).execute(
                    mapID.toString()
                )
            ).wait();

            let ownerAfter = await testTokenTwo.balanceOf(planet_owner.address);
            let planetAfter = await testTokenTwo.balanceOf(treasurePlanet.address);

            expect(
				ownerBefore.toString(),
				"Owner does not own token before"
			).to.equal(
				"1"
			);
            expect(
				ownerAfter.toString(),
				"Owner still own token after"
			).to.equal(
				"0"
			);
            expect(
				planetBefore.toString(),
                "Planet owns token before"
			).to.equal(
				"0"
			);
            expect(
				planetAfter.toString(),
				"Planet does not own token after"
			).to.equal(
				"1"
			);
        });
    });
});