const {Router} = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check,validationResult} = require('express-validator')
const User = require ('../models/User')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email!').isEmail(),
        check('password', 'Password must be more than 1 character')
            .isLength({min: 1})
    ],
    async (req, res) => {
        try{

            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect registration data'
                })
            }
            const {email, password} = req.body

            const candidate = await User.findOne({email})
            if (candidate) {
               return res.status(400).json({message: "This user already exists"})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            let regDate = new Date()
            const user = new User({email, password: hashedPassword, regDate })

            await user.save()

            res.status(201).json({message: "User created successfully"})

        } catch (e) {
            res.status(500).json({message: 'Something went wrong! Try again!'})
        }
})

// /api/auth/login
router.post(
    '/login',
    [
      check('email', 'Use correct email').normalizeEmail().isEmail(),
      check ('password', 'Enter correct password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login data'
                })
            }
            const {email, password} = req.body

            const user = await User.findOne({email})
            const isMatchByPassword = await bcrypt.compare(password, user.password)

            if (!user || !isMatchByPassword) {
                return res.status(400).json({message: 'Invalid email or password! Try again!'})
            }



            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, userID: user.id})

            // const lastLogin = new Date()
            // await User.findOneAndUpdate({email},{$set: {lastLogin : 1}})

        } catch (e) {
            res.status(500).json({message: 'Something went wrong! Try again!'})
        }

})

module.exports = router