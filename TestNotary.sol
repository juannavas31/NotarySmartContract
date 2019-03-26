pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "../contracts/Notary.sol";
import "truffle/DeployedAddresses.sol";


contract TestNotary {
    // we need to define a function per test case
    // testing addEntry

    function testAddEntry(){
        Notary myNotaryInstance = Notary(DeployedAddresses.Notary());

        myNotaryInstance.addEntry('0x12345678901234567890', 'firstFile.doc', 'the first file');

        // to read the entry, we can do it in several ways.
        // remember there are storage variables (persistent through transactions)
        // and memory variables (in-memory, non-persistent)
        // storage variables costs more gas, while memory variables are cheap.
        // usually, memory values can be stored in storage variables.
        // but reference types (like arrays) can become a problem, as we get a referenece
        // which is a pointer to the actual variable. Solidity can't covert that implicitly now.
        // We are going to define the reference types as memory types

        string memory fileName;
        uint timestamp;
        string memory comment;
        address sender;

        // and now we use destructuring for the assignment of values to those variables:
        (fileName, timestamp, comment, sender) = myNotaryInstance.getEntrySet('0x12345678901234567890');

        Assert.equal(fileName, 'firstFile.doc', "Test should be the filename" );
        Assert.equal(sender, address(this), "Same address for this caller (smart contract) is the one who created the entry");
    }

    function testExceptions() public {
        // we will test the exceptions with low level functions as workaround
        // in this case, we don't need the instance, but the address of a smart contract to test
        address notaryAddress = address(DeployedAddresses.Notary());

        // the function call to getEntrySet() is hashed with keccak256 and we take the first 4 bytes.
        // note that in this case, the argument to the getEntrySet is a non-existing entry
        // as we want to check an exception
        bool successTransac = notaryAddress.call(bytes4(keccak256("getEntrySet(bytes32)")),
                                                                  '0x12345678901234567811');

        Assert.equal(successTransac, false, "The transaction should fail");
    }
}
