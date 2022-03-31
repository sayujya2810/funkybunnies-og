const express = require('express')
const router = express.Router()
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

const User = require('../models/User');
const OgUser = require('../models/OgUser')
const { db } = require('../models/User');
var fs = require('fs')


 const getAddresses = async () => {
        // db.collection('users').find({}).toArray((err, result) => {
        //     if(err){
        //         alert("Error Ocurred")
        //     }
        //     else{ 
        //         result.map((r) => {
        //             console.log(r['address'])
        //             list.push(r['address'])
        //         })

        //         console.log(list)
        //     }
        // })

        const list = await User.find().populate('address')
        let myList = []
        // console.log(list)
        list.map((l) => {
                    // console.log(l['address'])
                    myList.push(l['address'])
                })

                // getrh(myList)
                console.log("this is Address List::::")

                // console.log(myList)
                return myList;
    }

    const getrh = async (whitelistAddresses)=>{
      // const leafNodes = await whitelistAddresses.map(addr => {
      // console.log("address: ", addr)
      // keccak256(addr)
      // // console.log("keccak: ",keccak256(addr))
      // });
//   console.log("Leaf Nodes: ", leafNodes)
  const merkleTree = new MerkleTree(whitelistAddresses, keccak256, { sortPairs: true});
  console.log(merkleTree)

  // 4. Get root hash of the `merkleeTree` in hexadecimal format (0x)
  // Print out the Entire Merkle Tree.
  const rootHash = merkleTree.getRoot();
  console.log('Whitelist Merkle Tree\n', merkleTree.toString());
  console.log("Root Hash: ", rootHash);
}



router.post('/adduser', async (req,res) => {


    const {email, address} = req.body

    if(!email || !address){
        return res.status(422).json({error:"Please Enter all the creds"})
    }

     
    User.findOne({email:email})
    .then((userExist) => {
        if(userExist){
            return res.status(422).json({error:"User already Whitelisted"})
        }

        const oguser = new OgUser({address:address, email:email})

        oguser.save().then(() => {
            res.status(201).json({message:"User Successfully Whitelisted"})
        }).catch((err) => {
            res.status(500).json({error:"Failed to whitelist"})
        })

    })
    .catch((err) => {
        console.log("err in whitelisting")
    })

})

router.post('/addoguser', async (req,res) => {


    const {ogemail, ogaddress} = req.body

    console.log({ogaddress, ogemail})

    if(!ogemail || !ogaddress){
        return res.status(422).json({error:"Please Enter all the creds"})
    }

     
    OgUser.findOne({ogemail:ogemail})
    .then((userExist) => {
        if(userExist){
            return res.status(422).json({error:"User already OG Whitelisted"})
        }

        const ogUser = new OgUser({ogaddress:ogaddress, ogemail:ogemail})

        ogUser.save().then(() => {
            res.status(201).json({message:"User Successfully Whitelisted  OG"})
        }).catch((err) => {
            res.status(500).json({error:"Failed to whitelist OG"})
        })

    })
    .catch((err) => {
        console.log("err in whitelisting OG")
    })

    

    // // lists = []
    // let flag = false

    // // User.find({})
    //     // .then(() => {
    //             const lists =  await getAddresses()
    //             console.log(lists)
    //             await getrh(lists)
                // setTimeout(() => {
                //     console.log("AFter getAddresses Function: ")
                // console.log(lists)
                // getrh(lists)
                // }, 10000)
                
        // })
        // .then( ()=>{

        //         // setTimeout(()=>{
        //         console.log("at then()  2")
        //         getrh(lists)
        //         console.log(getrh(lists))
        //         console.log("AFter getrh Function: ")
        //         // }, 1000)

        // })

    // .catch((err) => {
    //     console.log(err);
    // })


    

    

    

    
    // console.log({email, address})
    // res.json({message: {email, address}})
    // res.send("register page")
})





module.exports = router;