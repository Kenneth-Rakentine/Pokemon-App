const express = require('express');
const router = express.Router();

// @route:   GET api/auth
// @desc:    Test route
// @access:  Public
router.get('/', (req, res) => res.send('Auth Route'));
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const { check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

// @route:   GET api/auth
// @desc:    Get USer Data
// @access:  Public
router.get('/', auth, async (req, res)=>{
    try{
        const user = await User.findById(req.user.id)

        res.json(user);
    } catch (err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', "Password Required").exists()
], async (req, res)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    // return res.send(req.body)

    const {email, password} = req.body

    try{
        let user = await USer.findOne({email})
        if (user) {
            res.status(400).json({errors: [{ msg: "Invalid Credentials' "}]})
        }

        

const isMatch = await bcrypt.compare(password, user.password)

if(!isMatch){
    res.status(400).json({errors: [{ msg: "Invalid Credentials' "}]})
}

    }catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }

})

module.exports = router;
