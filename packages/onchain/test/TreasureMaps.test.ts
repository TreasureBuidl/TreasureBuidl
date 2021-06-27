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
            
            // console.log(ethers)
            // console.log(ethers.utils.keccak256(buyer_two.address, 500))
            // console.log(ethers.utils.solidityKeccak256(
            //     ["address","uint256"],
            //     [buyer_two.address, 500]
            // ))
            // console.log(ethers.RLP.encode(buyer_two.address, 500))
            // Mint tokens on one, mint on two, transfer on one.
            const description = "This is a test description for treasure";
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
                ethers.utils.solidityKeccak256(
                    ["address","uint256"],
                    [buyer.address, 1000]
                ),
                ethers.utils.solidityKeccak256(
                    ["address","uint256"],
                    [buyer.address, 2000]
                ),
                ethers.utils.solidityKeccak256(
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

    describe("Executing maps", () => {
        it("Nominal Execution", async () => {
            const description = "This is a test description for treasure";

            console.log(buyer.address)
            const targets = [
                TokenOneInstance.address,
                TokenTwoInstance.address
                // TokenOneInstance.address
            ];
            const functions = [
                "mint(address,uint256)",
                "mint(address,uint256)"
                // "transfer(address,uint256)"
            ];
            const calldata = [
                "00000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c800000000000000000000000000000000000000000000000000000000000003e8",
                "00000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c800000000000000000000000000000000000000000000000000000000000007d0"
                // ethers.utils.keccak256(
                //     buyer.address, 1000
                // ),
                // ethers.utils.keccak256(
                //     buyer.address, 2000
                // ),
                // ethers.utils.solidityKeccak256(
                //     ["address","uint256"],
                //     [buyer_two.address, 500]
                // )
            ];
            const callValues = [
                0,
                0
                // 0
            ];

            let tx = await (await TreasureMapsInstance.connect(buyer).createTreasure(
                description,
                targets,
                functions,
                calldata,
                callValues
            )).wait();

            let balance1 = await TokenOneInstance.balanceOf(buyer.address);
            let balance2 = await TokenTwoInstance.balanceOf(buyer.address);

            await TreasureMapsInstance.connect(buyer).executeMap(1,2);

            let balance1After = await TokenOneInstance.balanceOf(buyer.address);
            let balance2After = await TokenTwoInstance.balanceOf(buyer.address);

            console.log(balance1.toString());
            console.log(balance2.toString());
            console.log(balance1After.toString());
            console.log(balance2After.toString());
        });
    });
});