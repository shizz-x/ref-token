// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract ReffererToken is ERC20 {

    struct UserStruct {
        address refferer;
        uint mintedAmount;
        uint refferalsMintedAmount;
        uint[10] possibleRewardByLevel;
    }

    struct RankOfLeader {
        uint leaderCommitment;
        uint refferalSum;
        uint rewardPercent;
    }


    uint private _maxSupply = 3000000*10**decimals();
    
    uint private _ownerInitialPercent = 50;

    uint private _minMintPerTransactionInWei = 1000000000;

    uint private _tokensPerWei = 10000;

    address private _owner;

    bool private _mintStarts = true;

    mapping(address => UserStruct) public Users;

    modifier _ownerOnly(){
      require(msg.sender == _owner);
      _;
    }

    RankOfLeader[10] private leaderRanks;

    uint private constant MAX_LEVEL = 10; // 0 - 9 = 10
    

    constructor() ERC20("My Slutty Token", "MST") {
        _owner = msg.sender;
        

        
        // commitments in ETH 
        uint multiplier = 10**decimals() / _tokensPerWei;   

        leaderRanks[0] = RankOfLeader(1 * multiplier, 0, 7);
        leaderRanks[1] = RankOfLeader(2 * multiplier, 5 * multiplier, 4);
        leaderRanks[2] = RankOfLeader(3 * multiplier, 10 * multiplier, 3);
        leaderRanks[3] = RankOfLeader(4 * multiplier, 50 * multiplier, 2);
        leaderRanks[4] = RankOfLeader(5 * multiplier, 100 * multiplier, 2);
        leaderRanks[5] = RankOfLeader(6 * multiplier, 250 * multiplier, 2);
        leaderRanks[6] = RankOfLeader(7 * multiplier, 500 * multiplier, 1);
        leaderRanks[7] = RankOfLeader(8 * multiplier, 1000 * multiplier, 1);
        leaderRanks[8] = RankOfLeader(9 * multiplier, 2000 * multiplier, 1);
        leaderRanks[9] = RankOfLeader(10 * multiplier, 3000 * multiplier, 1);

        uint ownerShares = _maxSupply / 100 * _ownerInitialPercent;

        _mint(msg.sender, ownerShares);
    }

    function mintWithRefferer(address refferer, uint amount) external payable{
        require(totalSupply() + amount < _maxSupply);
        require(amount >= _minMintPerTransactionInWei, "toooooo low");
        require(amount == msg.value * _tokensPerWei);
        require(refferer != msg.sender, "Sorry, dummy abuser");
        require(_mintStarts, "Mint not started");
        require(Users[refferer].refferer != msg.sender, "very ez");

        _mint(msg.sender, amount);
        Users[msg.sender].mintedAmount += amount;

        if (Users[msg.sender].refferer == address(0)){
            Users[msg.sender].refferer = refferer;
        }

        address upperRefferer = Users[msg.sender].refferer;

        uint value = msg.value;

        uint level = 0;

        while (upperRefferer != address(0)){
            Users[upperRefferer].refferalsMintedAmount += value;
            Users[upperRefferer].possibleRewardByLevel[level] += value / 100 * leaderRanks[level].rewardPercent;
            upperRefferer = Users[upperRefferer].refferer;
            if(level < MAX_LEVEL - 1){
                level += 1;
            }
            if(level + 1== MAX_LEVEL){
              break;
            }
        }

    }

    function withdraw() external {
        require(Users[msg.sender].refferalsMintedAmount > 0 && leaderRanks[0].leaderCommitment <= Users[msg.sender].mintedAmount, "Nothing to withdraw");
        

        uint reward = 0;

        for(uint level = 0; level < MAX_LEVEL; level++){
            if(
                leaderRanks[level].leaderCommitment <= Users[msg.sender].mintedAmount &&
             leaderRanks[level].refferalSum <= Users[msg.sender].refferalsMintedAmount
             ){
                reward += Users[msg.sender].possibleRewardByLevel[level];
                Users[msg.sender].possibleRewardByLevel[level] = 0;
            }
            else{
                break;
            }
        }
        require(reward > 0);

        payable(msg.sender).transfer(reward);
        

    }
    

    
    function getUserRefferer(address user) external view returns (UserStruct memory) {
        return Users[user];
    }
    function maxSupply() public view virtual returns (uint256) {
        return _maxSupply;
    }
    function minBuy() public view virtual returns (uint256) {
        return _minMintPerTransactionInWei;
    }
    function mintPrice() public view virtual returns (uint256) {
        return _tokensPerWei;
    }
    function mintStarts() public view virtual returns (bool) {
        return _mintStarts;
    }
    function getPosibleReward(address user) public view virtual returns (uint256){
        uint reward = 0;

        for(uint level = 0; level < MAX_LEVEL; level++){
            if(
                leaderRanks[level].leaderCommitment <= Users[user].mintedAmount &&
                leaderRanks[level].refferalSum <= Users[user].refferalsMintedAmount
             ){
                reward += Users[user].possibleRewardByLevel[level];
            }
            else{
                break;
            }
        }
        return reward;
    }
    
}
