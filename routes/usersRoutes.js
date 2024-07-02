const express = require('express');
const   router = express.Router();

    const { getusers, AuthData,CreateUser,canUpdateUserData ,deleteData} = require('../controllers/usercontrollers');
const Verify = require('../verifyToken');


router.get('/users',getusers)
// router.get('/login',AuthData)
router.post('/login',AuthData)

router.post('/newUser', Verify,CreateUser);
router.patch('/Update/:UserName',Verify,canUpdateUserData);
router.delete('/Delete',Verify,deleteData);

module.exports = router;