const { expect } = require("chai");
const { ethers } = require('hardhat');

describe("Initial Tests", () =>  {
  // Contracts
  let TreasureMapsInstance: any;
  let TokenOneInstance: any;
  let TokenTwoInstance: any;
   
  // Signers
  let owner: any;
  let buyer: any;
  let buyer_two: any;
  let invalid: any;

  	beforeEach(async () => {
		// Getting all the contracts 
		const TreasureMaps = await ethers.getContractFactory("TreasureMaps");
		const TokenOne = await ethers.getContractFactory("Erc20_Token");
		const TokenTwo = await ethers.getContractFactory("Erc20_Token");

		// Getting signers
		[
			owner, 
			buyer, 
			buyer_two, 
			invalid
		] = await ethers.getSigners();

        console.log("0");

      	// Deploying contract
        TreasureMapsInstance = await TreasureMaps.deploy();
        console.log("1");
        TokenOneInstance = await TokenOne.deploy(
            "Token One",
            "TKN1"
        );
        console.log("1");
        TokenTwoInstance = await TokenTwo.deploy(
            "Token Two",
            "TKN2"
        );
        console.log("1");
        TokenOneInstance.mint(
            buyer.address,
            1000
        );
        console.log("1");
  	});

	describe("Minting maps", () => { 
		it("Nominal Mint", async () => {
            const description = "This is a test description for treasure";
            // Mint tokens on one, mint on two, transfer on one.
            const targets = [
                TokenOneInstance.address,
                TokenTwoInstance.address,
                TokenOneInstance.address
            ];
            const functions = [
                "mint(address,uint256)",
                "mint(address,uint256)",
                "transfer(address,uint256)"
            ];
            const calldata = [
                ethers.abiCoder.encode(
                    ["address","uint256"],
                    [buyer.address, 1000]
                ),
                ethers.abiCoder.encode(
                    ["address","uint256"],
                    [buyer.address, 2000]
                ),
                ethers.abiCoder.encode(
                    ["address","uint256"],
                    [buyer_two.address, 500]
                )
            ];
            const callValues = [
                0,
                0,
                0
            ];

            let tx = await (await TreasureMapsInstance.connect(buyer).createTreasure(
                description,
                targets,
                functions,
                calldata,
                callValues
            )).wait();

            console.log(tx);
		});
	});
});