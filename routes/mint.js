const express = require('express')
const router = express.Router()
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

const User = require('../models/User');
const { db } = require('../models/User');


    const getAddresses = (list) => {
        db.collection('users').find({}).toArray((err, result) => {
            if(err){
                alert("Error Ocurred")
            }
            else{ 
                result.map((r) => {
                    console.log(r['address'])
                    list.push({"address:" : r['address']})
                })

                console.log(list)
            }
        })
    }


const getrh=(whitelistAddresses)=>{
  const leafNodes = whitelistAddresses.map(addr => {
      console.log("address: ", addr)
      keccak256(addr)
      console.log(keccak256(addr))
      });
  console.log(leafNodes)
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
  console.log(merkleTree)

  // 4. Get root hash of the `merkleeTree` in hexadecimal format (0x)
  // Print out the Entire Merkle Tree.
  const rootHash = merkleTree.getRoot();
  console.log('Whitelist Merkle Tree\n', merkleTree.toString());
  console.log("Root Hash: ", rootHash);
}


router.get("/mint", (req,res) => {
    



        User.find({})
        .then(() => {
                lists = []
                getAddresses(lists)
                console.log("AFter getAddress Function: ")
                console.log(lists)
                // getrh(lists)
                console.log("AFter getrh Function: ")
        })
            
})


module.exports = router