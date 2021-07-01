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

    beforeEach(async () => {
        // Getting all the contracts
        // const TransactionLibrary = await ethers.getContractFactory("TransactionLibrary");
        const TokenOwnership = await ethers.getContractFactory("TokenOwnership");
        const TreasureMaps = await ethers.getContractFactory("TreasureMaps");
        const PlanetFactory = await ethers.getContractFactory("PlanetFactory");
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
        testTokenOne = await TokenOne.deploy("Token One", "TKN1");
        testTokenTwo = await TokenTwo.deploy("Token Two", "TKN2");
    });

    describe("Deploying a treasure planet", () => {
        it.only("Nominal deployment", async () => {
            let tx = await (
                await planetFactory.connect(planet_owner).createTreasurePlanet()
            ).wait();

            console.log(tx.events)
        });
    });
});