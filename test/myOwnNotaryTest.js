const NotaryContract = artifacts.require('./Notary.sol');

contract ('Mi propio test', function(accounts){
  // ponemos los casos de prueba
  let defaultAccount = accounts[1];
  it('Deploy contract', (defaultAccount) => {
    let instance = await NotaryContract.new({from: defaultAccount});

  });

  it ('Add an entry', (defaultAccount) => {
    let instance = await NotaryContract.deployed();
    let fileHash = '0x01234567890';
    let fileName = 'Spiderdman.comic';
    let comment = 'Spiderman is the best';
    let result = await instance.addEntry(fileHash, fileName, comment, {from:defaultAccount});
    assert.equal(result , true, 'error adding entry');
  });

  it ('Read an entry', (defaultAccount) => {
    // let'see if we can reuse previous instance
    let instance = await NotaryContract.deployed();
    let fileHash = '0x01234567890';
    let fileName = 'Spiderdman.comic';
    let comment = 'Spiderman is the best';
    let entryArray = await instance.getEntrySet(fileHash);
    assert.equal(entryArray[0], fileName);
    assert.equal(entryArray[1] > 0, true );
    assert.equal(entryArray[2], comment);
    assert.equal(NewEntry[3], defaultAccount);
  });

  it ('No double entry allowed', (defaultAccount) => {
    // let'see if we can reuse previous instance
    let instance = await NotaryContract.deployed();
    let fileHash = '0x01234567890';
    let fileName = 'Spiderdman.comic';
    let comment = 'Spiderman is the best';
    let result = await instance.addEntry((fileHash, fileName, comment, {from:defaultAccount});
    assert.equal(result, )

  });

  it ('Unexisting document not found', () => {

  });
})
