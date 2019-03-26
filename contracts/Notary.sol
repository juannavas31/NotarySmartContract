// pragma solidity >=0.4.21 <0.6.0;

pragma solidity ^0.4.24;


contract Notary {
   struct MyNotaryEntry {
      string filename;
      string comments;
      uint timestamp;
      bytes32 checksum;  // the hash of the file
      bool isSet;
      address owner;
   }
   mapping (bytes32 => MyNotaryEntry) public myMapping;

   //definition of an event,
   // the args are the information the event will emit

   event NewEntry(bytes32 _checksum, string _fileName, address indexed _owner);

   function addEntry(bytes32 _checksum, string _fileName, string _comments) public {
      require(!myMapping[_checksum].isSet);

      myMapping[_checksum].isSet = true;
      myMapping[_checksum].filename = _fileName;
      myMapping[_checksum].timestamp = now;
      myMapping[_checksum].owner = msg.sender;
      myMapping[_checksum].comments = _comments;

      // let's emit an event to notify the operacion succeeded
      emit NewEntry(_checksum, _fileName, msg.sender);

   }

   function getEntrySet(bytes32 _checksum) public view returns(string, uint, string, address) {
      require(myMapping[_checksum].isSet);
      return(myMapping[_checksum].filename,
             myMapping[_checksum].timestamp,
             myMapping[_checksum].comments,
             myMapping[_checksum].owner);

   }
}
