const { expect } = require("chai");
const { ethers } = require('hardhat');
// const { Web3 } = require('web3');
const Web3 = require('web3');

describe("Initial Tests", () =>  {
  // Contracts
  let TreasureMapsInstance: any;
  let TreasurePlanetInstance: any;
  let TokenOneInstance: any;
  let TokenTwoInstance: any;
   
  // Signers
  let owner: any;
  let buyer: any;
  let buyer_two: any;
  let invalid: any;

  const provider = new ethers.getDefaultProvider();
  let web3 = new Web3(provider);

  	beforeEach(async () => {
		// Getting all the contracts 
		const TreasureMaps = await ethers.getContractFactory("TreasureMaps");
		const TreasurePlanet = await ethers.getContractFactory("TreasurePlanet");
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
        TreasureMapsInstance = await TreasureMaps.deploy();
        TreasurePlanetInstance = await TreasurePlanet.deploy(
            TreasureMapsInstance.address
        );
        TokenOneInstance = await TokenOne.deploy(
            "Token One",
            "TKN1"
        );
        TokenTwoInstance = await TokenTwo.deploy(
            "Token Two",
            "TKN2"
        );
        // TokenOneInstance.mint(
        //     TreasurePlanetInstance.address,
        //     1000
        // );
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

            // console.log(tx);
		});
	});

    function paramBuilder(paramType: Array<string>, params: Array<string>): String {
        let encoded:String[] = new Array(params.length);

        for (let i = 0; i < params.length; i++) {
            encoded[i] = web3.eth.abi.encodeParameter(
                paramType[i], params[i]
            );
        }

        // Starts with 0x as first param needs to start with 0x. 
        let concatEncoded: String = new String("0x");

        for (let i = 0; i < params.length; i++) {
            let fullEncoded:String = encoded[i];
            // Slices of the 0x
            fullEncoded = fullEncoded.slice(2);
            // Adds it to the string
            concatEncoded = concatEncoded.concat(fullEncoded.toString());
        }

        return concatEncoded;
    }

    describe("Executing maps", () => {
        it("Nominal Execution", async () => {
            const description = "This is a test description for treasure";
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
                paramBuilder(
                    [
                        "address",
                        "uint256"
                    ], 
                    [
                        buyer.address.toString(),
                        "1000"
                    ]
                ),
                paramBuilder(
                    [
                        "address",
                        "uint256"
                    ], 
                    [
                        buyer.address.toString(),
                        "2000"
                    ]
                )
            ];
            const callValues = [
                0,
                0
            ];

            //0x40c10f1900000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c800000000000000000000000000000000000000000000000000000000000003e8

            let tx = await (await TreasureMapsInstance.connect(buyer).createTreasure(
                description,
                targets,
                functions,
                calldata,
                callValues
            )).wait();

            // console.log(tx.events[1]);

            let data = await TreasureMapsInstance.getCoordinates(2);
            console.log(data)

            let balance1 = await TokenOneInstance.balanceOf(buyer.address);
            let balance2 = await TokenTwoInstance.balanceOf(buyer.address);

            // await TreasureMapsInstance.connect(buyer).testExecution(
            //     TokenOneInstance.address,
            //     0,
            //     "0x40c10f1900000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c800000000000000000000000000000000000000000000000000000000000003e8"
            // );
            await TreasureMapsInstance.connect(buyer).executeMap(2);

            let balance1After = await TokenOneInstance.balanceOf(buyer.address);
            let balance2After = await TokenTwoInstance.balanceOf(buyer.address);

            console.log(balance1.toString());
            console.log(balance2.toString());
            console.log(balance1After.toString());
            console.log(balance2After.toString());
        });

        it.only("Nominal Planet Execution", async () => {
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
                paramBuilder(
                    [
                        "address",
                        "uint256"
                    ], 
                    [
                        TreasurePlanetInstance.address.toString(),
                        "5000"
                    ]
                ),
                paramBuilder(
                    [
                        "address",
                        "uint256"
                    ], 
                    [
                        TreasurePlanetInstance.address.toString(),
                        "2000"
                    ]
                ),
                paramBuilder(
                    [
                        "address",
                        "uint256"
                    ], 
                    [
                        buyer_two.address.toString(),
                        "2000"
                    ]
                )
            ];
            const callValues = [
                0,
                0,
                0
            ];

            await TreasureMapsInstance.connect(buyer).createTreasure(
                description,
                targets,
                functions,
                calldata,
                callValues
            );

            let balance1 = await TokenOneInstance.balanceOf(TreasurePlanetInstance.address);
            let balance2 = await TokenOneInstance.balanceOf(buyer_two.address);
            let balance3 = await TokenTwoInstance.balanceOf(TreasurePlanetInstance.address);

            let tx = await (await 
                TreasurePlanetInstance.execute(2)
            ).wait();

            console.log(tx.events)

            let balance1After = await TokenOneInstance.balanceOf(TreasurePlanetInstance.address);
            let balance2After = await TokenOneInstance.balanceOf(buyer_two.address);
            let balance3After = await TokenTwoInstance.balanceOf(TreasurePlanetInstance.address);

            console.log(balance1.toString());
            console.log(balance2.toString());
            console.log(balance3.toString());
            console.log(balance1After.toString());
            console.log(balance2After.toString());
            console.log(balance3After.toString());
        });
    });
});