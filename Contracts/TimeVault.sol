/// @title Time-locked vault of tokens allocated to Storj after 180 days
contract STORJVault is SafeMath {

    // flag to determine if address is for a real contract or not
    bool public isSOTRJVault = false;

    StorjToken storjToken;
    address storjMultisig;
    uint256 unlockedAtBlockNumber;
    uint256 public constant numBlocksLocked = 1110857;

    /// @notice Constructor function sets the Storj Multisig address and
    /// total number of locked tokens to transfer
    function STORJVault(address _storjMultisig) internal {
        if (_storjMultisig == 0x0) throw;
        storjToken = StorjToken(msg.sender);
        sotrjMultisig = _storjMultisig;
        isSTORJVault = true;
        unlockedAtBlockNumber = safeAdd(block.number, numBlocksLocked); // 180 days of blocks later
    }
}
