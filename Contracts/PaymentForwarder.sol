pragma solidity ^0.4.8;

contract PaymentForwarder {
    event Purchase(uint128 indexed customerId, uint amount);
    address public wallet;
    
    function PaymentForwarder(address ownerWallet){
        wallet = ownerWallet;
    }
    
    function buy(uint128 customerId)
        payable
        public
    {
        if (!wallet.send(msg.value))
            throw;
        Purchase(customerId, msg.value);
    }

}
