var NotaryArtifact = artifacts.require("./Notary.sol");

contract ("NotaryContract", function(accounts){
    // accounts are fetched automatically and made available in this function
    it('first test case', function(){
        return NotaryArtifact.deployed().then(function(instance){
            // we have access to the instance
            // console.log(instance);
        });
    });

    it('should not have an entry for a test-hash', async function(){
        return NotaryArtifact.deployed().then(async function(instance){
            try {
                await instance.getEntrySet('0x123456789012345678901234567890');
                // if we expect the sentence above to fail and it happens that it executes ok,
                // then we can force this test case to fail with the sentence below:
                assert.fail(true, true, "expected an exception, but it just went through!");
            } catch(err) {
                    if (err.message.search("revert") >= 0) {
                        assert.equal(err.message.search("revert") >= 0, true, 'Error message unexpected!!');
                    } else {
                        throw err;
                    };
            };
        });
    });

    it('Adding and reading an entry', async () => {

        try {
            let instance = await NotaryArtifact.new();

            await instance.addEntry('0x1234567890', 'firstFile.doc', 'The first file added');

            let entry = await instance.getEntrySet('0x1234567890');

            // console.log('entry read from blockchain: ', entry);

            assert.equal(entry[0], 'firstFile.doc' );
            assert.equal(entry[1] >= 1, true);
            assert.equal(entry[2], 'The first file added');
            assert.equal(entry[3], accounts[0]);

        } catch (err) {
            throw err;
        };
    });

    it('Checking double addition', async () =>{
        try {
            let instance2 = await NotaryArtifact.deployed();

            await instance2.addEntry('0x1234567890', 'firstFile.doc', 'The first file added');

            await instance2.addEntry('0x1234567890', 'secondFile.doc', 'The second file added');


        } catch (err) {
            // console.log ("error thrown: ", err);
            assert.equal(err.message.search('require') >= 0, true );
            // throw err;
        };
    });
});
