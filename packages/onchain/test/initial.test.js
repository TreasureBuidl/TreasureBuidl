const { expect } = require("chai");
const { ethers, network } = require('hardhat');

describe("Initial Tests", () =>  {
  // Contracts
  let TxBuidlerInstance;
  let MockedInstance;
  let TokenOneInstance;
  let TokenTwoInstance;
   
  // Signers
  let owner;
  let buyer;
  let buyer_two;
  let invalid;

  	beforeEach(async () => {
		// Getting all the contracts 
		const TxBuidler = await ethers.getContractFactory("TxBuidler");
		const Mocked = await ethers.getContractFactory("SimpleMock");
		const TokenOne = await ethers.getContractFactory("Erc20_Token");
		const TokenTwo = await ethers.getContractFactory("Erc20_Token");

		// Getting signers
		[
			owner, 
			buyer, 
			buyer_two, 
			invalid
		] = await ethers.getSigners();

      	// Deploying contract
        TxBuidlerInstance = await TxBuidler.deploy();
        MockedInstance = await Mocked.deploy();
        TokenOneInstance = await TokenOne.deploy(
            "Token One",
            "TKN1"
        );
        TokenTwoInstance = await TokenTwo.deploy(
            "Token Two",
            "TKN2"
        );
        TokenOneInstance.mint(
            buyer.address,
            1000
        );
  	});

	describe("Minting tokens", () => { 
		it("Can mint a token", async () => {
            TxBuidlerInstance.connect(buyer).callWrapper(
                MockedInstance.address,
                [
                    TokenOneInstance.address,
                    TokenTwoInstance.address
                ],
                [
                    10,
                    10
                ]
            );
		});
	});
});