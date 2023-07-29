const express = require("express")
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require("express-validator")
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken")
const jwtSecret = "MyNameIsPrasadAndThisIsMyWebsite"

router.post("/createuser",
    [body('name', "Only alphabets are allowed").isAlpha(),
    body('password', "Minimum length of password is 5").isLength({ min: 5 }),
    body('location', "Only alphanumeric characters are allowed").isAlphanumeric(),
    body('email', "Email is incorrect").isEmail()]
    , async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const salt = await bcryptjs.genSalt(10);
        let securepassword = await bcryptjs.hash(req.body.password, salt)

        let email = req.body.email
        if (await User.findOne({ email })) {
            console.log("Email ID in Use")
            res.json({ success: false });
        }
        else {
            try {
                await User.create({
                    name: req.body.name,
                    password: securepassword,
                    location: req.body.location,
                    email: req.body.email
                }).then(res.json({ success: true }))
            } catch (err) {
                console.error(err)
                res.json({ success: false });
            }
        }

    })

router.post("/loginuser", [body('email', "Email is incorrect").isEmail()], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const salt = await bcryptjs.genSalt(10);
    let securepassword = await bcryptjs.hash(req.body.password, salt)

    try {
        let email = req.body.email
        let userData = await User.findOne({ email })
        if (!userData) { return res.json({ success: false }); }
        let pwdCompare = await bcryptjs.compare(req.body.password, userData.password);
        if (!pwdCompare) { return res.json({ success: false }); }
        const data = {
            user: {
                id: userData.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret)
        return res.json({ success: true, authToken: authToken });
    } catch (err) {
    console.error(err)
    return res.json({ success: false });
}

})

module.exports = router;