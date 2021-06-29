pragma solidity 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
* @notice This contract contains function signatures and details for integrated protocols.
* Each integrated protocol has variables defining the deployed contract addresses on testnets and mainnet,
* an array of function signatures, an array of function descriptions and an array of parameter descriptions.
*/
contract TransactionLibrary is Ownable {
	// Information about project calls 
	struct ProjectInfo {
		// index in array is network ID for address at network
		address[] targetsAtNetwork;
		// Array of all function sigs in encoding format. 
		string[] functionSig;
		// Array of all function sigs for display purposes.
		string[] fullFunctionSig;
		// Array of descriptions for each function.
		string[] description;
		// Array of descriptions for all params for each function. 
		string[] paramToolTips;
	}
	// Mapping for all projects 
	mapping(bytes32 => ProjectInfo) internal projects;
	// Array of all listed projects. I.e bytes32(abi.encodePacked("Uniswap Router V2"));
	bytes32[] public listedProjects;
	// Counter for listed projects
	uint256 public projectCount;

	//-------------------------------------------------------------------------
	// PRELOADED PROJECTS
	//-------------------------------------------------------------------------
	// The various pre-loaded functions for interactions.
	// Uniswap V2
	uint256[] public univ2Networks;
	address[] public univ2TargetsAtNetworks;
	string[] public univ2FunctionSig;
	string[] public univ2FullFunctionSig;
	string[] public univ2Description;
	string[] public univ2ParamToolTips;
	// Aave
	uint256[] public aaveNetworks;
	address[] public aaveTargetsAtNetworks;
	string[] public aaveFunctionSig;
	string[] public aaveFullFunctionSig;
	string[] public aaveDescription;
	string[] public aaveParamToolTips;
	// Compound 
	uint256[] public compNetworks;
	address[] public compTargetsAtNetworks;
	string[] public compFunctionSig;
	string[] public compFullFunctionSig;
	string[] public compDescription;
	string[] public compParamToolTips;


	event ProjectAdded(
		string projectNameForHash,
		bytes32 indexed projectHash,
		uint256[] indexed networks,
		address[] indexed targetAtNetworks,
		string[] functionSig,
		string[] fullFunctionSig,
		string[] description,
		string[] paramToolTips
	);

	constructor() Ownable() {
		// Sets all the state variables up.
		_initiateComp();
		// Adds all the info to storage correctly formatted.
		_addProject(
			"Compound",
			compNetworks,
			compTargetsAtNetworks,
			compFunctionSig,
			compFullFunctionSig,
			compDescription,
			compParamToolTips
		);
		// Sets all the state variables up.
		_initiateUni();
		// Adds all the info to storage correctly formatted.
		_addProject(
			"Uniswap Router V2",
			univ2Networks,
			univ2TargetsAtNetworks,
			univ2FunctionSig,
			univ2FullFunctionSig,
			univ2Description,
			univ2ParamToolTips
		);
		// Sets all the state variables up.
		_initiateAave();
		// Adds all the info to storage correctly formatted.
		_addProject(
			"Aave",
			aaveNetworks,
			aaveTargetsAtNetworks,
			aaveFunctionSig,
			aaveFullFunctionSig,
			aaveDescription,
			aaveParamToolTips
		);
	}

	function getProjectCount() external view returns(uint256) {
		return projectCount;
	}

	function getAllListedProjects() external view returns(bytes32[] memory) {
		return listedProjects;
	}

	function getProjectInfo(
		bytes32 _project, 
		uint256 _networkID
	) 
		external 
		view 
		returns(
			address target,
			string[] memory functionSig,
			string[] memory fullFunctionSig,
			string[] memory description,
			string[] memory paramToolTips
		) 
	{
		target = projects[_project].targetsAtNetwork[_networkID];
		functionSig = projects[_project].functionSig;
		fullFunctionSig = projects[_project].fullFunctionSig;
		description = projects[_project].description;
		paramToolTips = projects[_project].paramToolTips;
	}

	function addProject(
		string memory _projectNameForHash,
		uint256[] memory _networks,
		address[] memory _targetAtNetworks,
		string[] memory _functionSig,
		string[] memory _fullFunctionSig,
		string[] memory _description,
		string[] memory _paramToolTips
	)
		external
		onlyOwner() 
	{
		require(
			_networks.length == _targetAtNetworks.length,
			"Networks and targets mismatch"
		);
		require(
			_functionSig.length == _fullFunctionSig.length &&
			_description.length == _fullFunctionSig.length &&
			_paramToolTips.length == _fullFunctionSig.length,
			"Functions & params length differ"
		);

		_addProject(
			_projectNameForHash,
			_networks,
			_targetAtNetworks,
			_functionSig,
			_fullFunctionSig,
			_description,
			_paramToolTips
		);
	}

	function _addProject(
		string memory _projectNameForHash,
		uint256[] memory _networks,
		address[] memory _targetAtNetworks,
		string[] memory _functionSig,
		string[] memory _fullFunctionSig,
		string[] memory _description,
		string[] memory _paramToolTips
	)
		internal
	{
		bytes32 projectHash = bytes32(keccak256(abi.encode(_projectNameForHash)));

		projectCount += 1;
		listedProjects[projectCount] = projectHash;

		projects[projectHash].functionSig = _functionSig;
		projects[projectHash].fullFunctionSig = _fullFunctionSig;
		projects[projectHash].description = _description;
		projects[projectHash].paramToolTips = _paramToolTips;

		for (uint256 i = 0; i < _networks.length; i++) {
			projects[projectHash].targetsAtNetwork[
				_networks[i]
			] = _targetAtNetworks[i];
		}

		emit ProjectAdded(
			_projectNameForHash,
			projectHash,
			_networks,
			_targetAtNetworks,
			_functionSig,
			_fullFunctionSig,
			_description,
			_paramToolTips
		);
	}

	function _initiateUni() internal {
		univ2Networks[0] = 1;
		univ2Networks[1] = 4;
		univ2Networks[2] = 42;

		univ2TargetsAtNetworks[0] = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
		univ2TargetsAtNetworks[1] = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
		univ2TargetsAtNetworks[2] = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
	
		univ2FunctionSig[0] = "addLiquidity(address,address,uint,uint,uint,uint,address,uint)";
		univ2FunctionSig[1] = "removeLiquidity(address,address,uint,uint,uint,address,uint)";
		univ2FunctionSig[2] = "swapExactTokensForTokens(uint,uint,address[],address,uint)";
		univ2FunctionSig[3] = "swapTokensForExactTokens(uint,uint,address[],address,uint)";
	
		univ2FullFunctionSig[0] = "addLiquidity(address tokenA,address tokenB,uint amountADesired,uint amountBDesired,uint amountAMin,uint amountBMin,address to,uint deadline) external returns (uint amountA, uint amountB, uint liquidity)";
		univ2FullFunctionSig[1] = "removeLiquidity(address tokenA,address tokenB,uint liquidity,uint amountAMin,uint amountBMin,address to,uint deadline) external returns (uint amountA, uint amountB)";
		univ2FullFunctionSig[2] = "swapExactTokensForTokens(uint amountIn,uint amountOutMin,address[] calldata path,address to,uint deadline) external returns (uint[] memory amounts)";
		univ2FullFunctionSig[3] = "swapTokensForExactTokens(uint amountOut,uint amountInMax,address[] calldata path,address to,uint deadline) external returns (uint[] memory amounts)";

		univ2Description[0] = "Adds liquidity to an ERC-20 to ERC-20 pool.";
		univ2Description[1] = "Removes liquidity from an ERC-20 to ERC-20 pool.";
		univ2Description[2] = "Swaps an exact amount of input tokens for as many output tokens as possible, along the route determined by the path. The first element of path is the input token, the last is the output token, and any intermediate elements represent intermediate pairs to trade through (if, for example, a direct pair does not exist).";
		univ2Description[3] = "Receive an exact amount of output tokens for as few input tokens as possible, along the route determined by the path. The first element of path is the input token, the last is the output token, and any intermediate elements represent intermediate tokens to trade through (if, for example, a direct pair does not exist).";
	
		univ2ParamToolTips[0] = "tokenA - The contract address of the desired token. tokenB - The contract address of the desired token. amountADesired - The amount of tokenA to add as liquidity if the B/A price is <= amountBDesired/amountADesired (A depreciates). amountBDesired - The amount of tokenB to add as liquidity if the A/B price is <= amountADesired/amountBDesired (B depreciates). amountAMin - Bounds the extent to which the B/A price can go up before the transaction reverts. Must be <= amountADesired. amountBMin - Bounds the extent to which the A/B price can go up before the transaction reverts. Must be <= amountBDesired. to - Recipient of the liquidity tokens. deadline - Unix timestamp after which the transaction will revert.";
		univ2ParamToolTips[1] = "tokenA - The contract address of the desired token. tokenB - The contract address of the desired token. liquidity - The amount of liquidity tokens to remove. amountAMin - The minimum amount of tokenA that must be received for the transaction not to revert. amountBMin - The minimum amount of tokenB that must be received for the transaction not to revert. to - Recipient of the underlying assets. deadline - Unix timestamp after which the transaction will revert. amountA - The amount of tokenA received. amountB - The amount of tokenB received.";
		univ2ParamToolTips[2] = "amountIn - The amount of input tokens to send. amountOutMin - The minimum amount of output tokens that must be received for the transaction not to revert. path - An array of token addresses. path.length must be >= 2. Pools for each consecutive pair of addresses must exist and have liquidity. to - Recipient of the output tokens. deadline - Unix timestamp after which the transaction will revert. amounts - The input token amount and all subsequent output token amounts.";
		univ2ParamToolTips[3] = "amountOut - The amount of output tokens to receive. amountInMax - The maximum amount of input tokens that can be required before the transaction reverts. path - An array of token addresses. path.length must be >= 2. Pools for each consecutive pair of addresses must exist and have liquidity. to - Recipient of the output tokens. deadline - Unix timestamp after which the transaction will revert. amounts - The input token amount and all subsequent output token amounts.";
	}
	
	function _initiateAave() internal {
		aaveNetworks[0] = 1;
		aaveNetworks[1] = 42;
		
		aaveTargetsAtNetworks[0] = 0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9;
		aaveTargetsAtNetworks[1] = 0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe;
		  
		aaveFunctionSig[0] = "deposit(address,uint256,address,uint16)";
		aaveFunctionSig[1] = "withdraw(address,uint256,address)";
		aaveFunctionSig[2] = "borrow(address,uint256,uint256,uint16,address)";
		aaveFunctionSig[3] = "repay(address,uint256,uint256,address)";
		aaveFunctionSig[4] = "flashLoan(address,address[],uint256[],uint256[],address,bytes,uint16)";
	
		aaveFullFunctionSig[0] = "deposit(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external";
		aaveFullFunctionSig[1] = "withdraw(address asset, uint256 amount, address to) external returns (uint256)";
		aaveFullFunctionSig[2] = "borrow(address asset, uint256 amount, uint256 interestRateMode, uint16 referralCode, address onBehalfOf) external";
		aaveFullFunctionSig[3] = "repay(address asset, uint256 amount, uint256 rateMode, address onBehalfOf) external returns (uint256)";
		aaveFullFunctionSig[4] = "flashLoan(address receiverAddress, address[] calldata assets, uint256[] calldata amounts, uint256[] modes, address onBehalfOf, bytes calldata params, uint16 referralCode) external";

		aaveDescription[0] = "Deposits a certain amount of an asset into the protocol, minting the same amount of corresponding aTokens, and transferring them to the onBehalfOf address.";
		aaveDescription[1] = "Withdraws amount of the underlying asset, i.e. redeems the underlying token and burns the aTokens.";
		aaveDescription[2] = "Borrows amount of asset with interestRateMode, sending the amount to msg.sender, with the debt being incurred by onBehalfOf.";
		aaveDescription[3] = "Repays onBehalfOf's debt amount of asset which has a rateMode.";
		aaveDescription[4] = "Sends the requested amounts of assets to the receiverAddress contract, passing the included params.";

		aaveParamToolTips[0] = "asset - address of the underlying asset. amount - amount deposited, expressed in wei units. onBehalfOf - address whom will receive the aTokens. Use msg.sender when the aTokens should be sent to the caller. referralCode - referral code for our referral program. Use 0 for no referral.";
		aaveParamToolTips[1] = "asset - address of the underlying asset, not the aToken. amount - amount deposited, expressed in wei units. Use type(uint).max to withdraw the entire balance. to - address that will receive the asset";
		aaveParamToolTips[2] = "asset - address of the underlying asset. amount - amount to be borrowed, expressed in wei units. interestRateMode - the type of borrow debt. Stable: 1, Variable: 2. referralCode - referral code for our referral program. Use 0 for no referral code. onBehalfOf - address of user who will incur the debt. Use msg.sender when not calling on behalf of a different user.";
		aaveParamToolTips[3] = "asset - address of the underlying asset. amount - amount to be borrowed, expressed in wei units. Use uint(-1) to repay the entire debt,  ONLY when the repayment is not executed on behalf of a 3rd party. In case of repayments on behalf of another user, it's recommended to send an _amount slightly higher than the current borrowed amount. rateMode - the type of borrow debt. Stable: 1, Variable: 2. onBehalfOf - address of user who will incur the debt. Use msg.sender when not calling on behalf of a different user.";
		aaveParamToolTips[4] = "receiverAddress - address of the contract receiving the funds. Must implement the IFlashLoanReceiver interface. assets - addresses of the reserves to flashloan. amounts - amounts of assets to flashloan. This needs to contain the same number of elements as assets. modes - the types of debt to open if the flashloan is not returned. 0: Don't open any debt, just revert 1: stable mode debt 2: variable mode debt. onBehalfOf - if the associated mode is not 0 then the incurred debt will be applied to the onBehalfOf address. Note: onBehalfOf must already have approved sufficient borrow allowance of the associated asset to msg.sender. params - bytes-encoded parameters to be used by the receiverAddress contract. referralCode - referral code for our referral program";
	}
	
	function _initiateComp() internal {
		// comp works slightly differently to the other contracts. to call these 
		// functions, the getAllMarkets function needs to be called on the 
		// comptroller, which returns a list of addresses for all ctokens, 
		// which the below functions can be used on.

		compNetworks[0] = 1;
		compNetworks[1] = 4;
		compNetworks[2] = 42;

		compTargetsAtNetworks[0] = 0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B;
		compTargetsAtNetworks[1] = 0x2EAa9D77AE4D8f9cdD9FAAcd44016E746485bddb;
		compTargetsAtNetworks[2] = 0x5eAe89DC1C671724A672ff0630122ee834098657;

		compFunctionSig[0] = "mint(uint)";
		compFunctionSig[1] = "redeem(uint)";
		compFunctionSig[2] = "borrow(uint)";
		compFunctionSig[3] = "repayBorrow(uint)";

		aaveFullFunctionSig[0] = "mint(uint mintAmount) returns (uint)";
		aaveFullFunctionSig[1] = "redeem(uint redeemTokens) returns (uint)";
		aaveFullFunctionSig[2] = "borrow(uint borrowAmount) returns (uint)"; 
		aaveFullFunctionSig[3] = "repayBorrow(uint repayAmount) returns (uint)";

		compDescription[0] = "The mint function transfers an asset into the protocol, which begins accumulating interest based on the current Supply Rate for the asset. The user receives a quantity of cTokens equal to the underlying tokens supplied, divided by the current Exchange Rate.";
		compDescription[1] = "The redeem function converts a specified quantity of cTokens into the underlying asset, and returns them to the user. The amount of underlying tokens received is equal to the quantity of cTokens redeemed, multiplied by the current Exchange Rate. The amount redeemed must be less than the user's Account Liquidity and the market's available liquidity.";
		compDescription[2] = "The borrow function transfers an asset from the protocol to the user, and creates a borrow balance which begins accumulating interest based on the Borrow Rate for the asset. The amount borrowed must be less than the user's Account Liquidity and the market's available liquidity.";
		compDescription[3] = "The repay function transfers an asset into the protocol, reducing the user's borrow balance.";

		compParamToolTips[0] = "mintAmount - The amount of the asset to be supplied, in units of the underlying asset.";
		compParamToolTips[1] = "redeemTokens - The number of cTokens to be redeemed.";
		compParamToolTips[2] = "borrowAmount - The amount of the underlying asset to be borrowed.";
		compParamToolTips[3] = "repayAmount - The amount of the underlying borrowed asset to be repaid. A value of -1 can be used to repay the full amount.";
	
	}
}