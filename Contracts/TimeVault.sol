pragma solidity ^0.4.8;

/// @title Time-locked vault of tokens allocated to Storj after variable amount of days
/// based on Lunyr Token

import 'zeppelin/contracts/token/StandardToken.sol';

contract STORJVault is SafeMath {

    StandardToken storjToken;
    address owner;
    uint256 unlockedAtTime;
    uint256 public constant timeLocked;



    /// @notice Constructor function sets the Storj Multisig address and
    /// total number of locked tokens to transfer
    function STORJVault(address _owner, uint256 _timeLocked) internal {
        if (_owner == 0x0) throw;
        timeLocked = _timeLocked;
        storjToken = StandardToken(msg.sender);
        owner = _owner;
        // variable time locked in seconds since epoch
        unlockedAtTime = safeAdd(block.timestamp, timeLocked);
    }

    /// @notice Transfer locked tokens to Storj's multisig wallet
    function unlock() external {
        // Wait your turn!
        if (block.timestamp < unlockedAtTime) throw;
        // Will fail if allocation (and therefore toTransfer) is 0.
        if (!storjToken.transfer(storjMultisig, storjToken.balanceOf(this))) throw;
    }

    // disallow ether payment
    function () { throw; }
}
