const User = require('../models/User')
const {Router} = require("express");
const router = Router()

router.get('/all', async (req, res) => {
    return res.status(200).json(await User.find());
})

router.post('/block', async (req, res) => {
    const filter = {email: req.body.userEmails};
    const updateDoc = {$set: {isBlocked: req.body.isBlockAction}};

    await User.updateMany(filter, updateDoc)

    const users = await User.find();
    return res.status(200).json(users);
})

module.exports = router;