const express = require('express');
const   router = express.Router();

    const { getusers, AuthData,CreateUser,canUpdateUserData } = require('../controllers/usercontrollers');


router.get('/list2',getusers)
// router.get('/login',AuthData)
router.post('/login',AuthData)

router.post('/newUser',CreateUser)
router.patch('/Update',canUpdateUserData)

module.exports = router;