const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const user = require('../../models/User');
const User = require('../../models/User');

// @route:   GET api/users
// @desc:    Test route
// @access:  Public
router.get('/', (req, res) => res.send('User Route'));

// @route:   POST api/users
// @desc:    Register user route
// @access:  Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
], async (req, res)=>{

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }


    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if(user) {
            res.status(400).json({errors: [{msg: 'user already exists'}]});
            
                
            user = new User({
                name,
                email,
                password
            })

            //create a salt
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)

            //save user to db
            await user.save()

            //create a jwt payload
            const payload = {
                user:{
                    id: user._id
                }
            }

            //create, sign, and send JWT token 
            jwt.sign(
                payload,
                process.env.jwtSecret, //JWT secret
                {expiresIn: 36000},
                (err, token) => {
                    if (err)  throw err;

                    res.json({token})
                }
            )

        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
    

});




module.exports = router;
