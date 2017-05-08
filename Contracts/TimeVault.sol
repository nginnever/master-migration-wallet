/// @title Time-locked vault of tokens allocated to Storj after variable amount of days
/// based on Lunyr Token

import 'zeppelin/contracts/token/StandardToken.sol';

contract TimeVault is SafeMath, StandardToken {
    address owner;
    StandardToken storjToken;
    uint256 unlockedAtTime;
    uint256 public timeLocked;

    /// @notice Constructor function sets the Storj Multisig address and
    /// total number of locked tokens to transfer
    function TimeVault(address _owner, uint256 _timeLocked, address _token) {
        if (_owner == 0x0) throw;
        storjToken = StandardToken(_token);
        timeLocked = _timeLocked;
        owner = _owner;
        // variable time locked in seconds since epoch
        unlockedAtTime = safeAdd(block.timestamp, timeLocked);
    }

    /// @notice Transfer locked tokens to Storj's multisig wallet
    function unlock() external {
        // Wait your turn!
        if (block.timestamp < unlockedAtTime) throw;
        // Will fail if allocation (and therefore toTransfer) is 0.
        if(!storjToken.transfer(owner, storjToken.balanceOf(this))) throw;
    }

    // disallow ether payment
    function () { throw; }
}