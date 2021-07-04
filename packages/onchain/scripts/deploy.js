// The deployment script
const main = async () => {
    // Contracts
    let tokenOwnership;
    let treasureMaps;
    let planetFactory;
    let testTokenOne;

    // Getting the first signer as the deployer
    const [deployer] = await ethers.getSigners();
    // Saving the info to be logged in the table (deployer address)
    var deployerLog = { Label: "Deploying Address", Info: deployer.address };
    // Saving the info to be logged in the table (deployer address)
    var deployerBalanceLog = {
    Label: "Deployer ETH Balance",
    Info: (await deployer.getBalance()).toString(),
    };

    // Gets the abi, bytecode & name of the contract
    const TokenOwnership = await ethers.getContractFactory("TokenOwnership");
    const TreasureMaps = await ethers.getContractFactory("TreasureMaps");
    const PlanetFactory = await ethers.getContractFactory("PlanetFactory");
    const TokenOne = await ethers.getContractFactory("Erc20_Token");

    // Deploying contract
    tokenOwnership = await TokenOwnership.deploy();
    var ownershipLog = { Label: "Deployed Token Ownership", Info: tokenOwnership.address };

    treasureMaps = await TreasureMaps.deploy();
    var treasureMapLog = { Label: "Deployed Treasure Maps", Info: treasureMaps.address };
    
    planetFactory = await PlanetFactory.deploy(
    tokenOwnership.address,
    treasureMaps.address
    );
    var planetFactoryLog = { Label: "Deployed Planet Factory", Info: planetFactory.address };
    
    testTokenOne = await TokenOne.deploy("Token One", "TKN1");
    var testTokenLog = { Label: "Deployed Test Token", Info: testTokenOne.address };
    
    await tokenOwnership.setFactory(planetFactory.address);
    
    console.table([
        deployerLog, 
        deployerBalanceLog, 
        ownershipLog,
        treasureMapLog,
        planetFactoryLog,
        testTokenLog
    ]);
};
// Runs the deployment script, catching any errors
main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
