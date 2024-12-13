const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const USER = mongoose.model("USER")
const {JwtSecret} = require("../key.js")
const requireLogin = require('../middleware/requireLogin.js')
router.get('/', (req, res) => {
    res.send("Hello Auth????");
});

// router.post('/signup', (req, res) => {
//     const { name, userName, email, password } = req.body;

//     if (!name || !userName || !email || !password) {
//         return res.status(422).json({ error: "Please add all the fields." });
//     }

//     USER.findOne({ $or: [{ email }, { userName }] })
//         .then((existingUser) => {
//             if (existingUser) {
//                 if (existingUser.email === email) {
//                     return res.status(422).json({ error: "User already exists with this email." });
//                 }
//                 if (existingUser.userName === userName) {
//                     return res.status(422).json({ error: "User already exists with this username." });
//                 }
//             }
//             bcrypt.hash(password,12).then((hashedPassword)=>{
//                 const user = new USER({
//                     name,
//                     userName,
//                     email,
//                     password: hashedPassword
//                 });
    
//                 user.save()
//                     .then((savedUser) => {
//                         res.json({ message: "Saved successfully.", user: savedUser });
//                     })
//                     .catch((err) => {
//                         console.error(err);
//                         res.status(500).json({ error: "Failed to save the user." });
//                     });
//             })
//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(500).json({ error: "Internal server error." });
//         });
// });

router.post('/signup', (req, res) => {
    
    // console.log(req.body);  

    const { name, userName, email, password } = req.body;

    if (!name || !userName || !email || !password) {
        return res.status(422).json({ error: "Please add all the fields." });
    }

    USER.findOne({ $or: [{ email }, { userName }] })
        .then((existingUser) => {
            if (existingUser) {
                if (existingUser.email === email) {
                    return res.status(422).json({ error: "User already exists with this email." });
                }
                if (existingUser.userName === userName) {
                    return res.status(422).json({ error: "User already exists with this username." });
                }
            }

            bcrypt.hash(password, 12).then((hashedPassword) => {
                const user = new USER({
                    name,
                    userName,
                    email, 
                    password: hashedPassword
                });

                user.save()
                    .then((savedUser) => {
                        res.json({ message: "Saved successfully.", user: savedUser });
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(500).json({ error: "Failed to save the user." });
                    });
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Internal server error." });
        });
});


router.post('/', (req, res) => {
    const { email, password } = req.body;
    if( !email || !password ){
        return res.status(422).json({ error: "Please add email and password." });

    }
    USER.findOne({ email:email }).then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({ error: "Invalid email or password." });
        }
        bcrypt.compare(password, savedUser.password)
        .then((match)=>{
            if(match){
                return res.status(200).json({match : "Signed in Successfully" });
                const token = jwt.sign({_id:savedUser.id}, JwtSecret)
                res.json(token)
                console.log(token); 
            }
            else{
                return res.status(422).json({ error: "Invalid email or password." });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Failed to authenticate user." });
        });
        
    })

})

router.get('/createPost',requireLogin,(req,res) => {
    console.log("hello helloooo!!!!!!!");
    
})

module.exports = router;
