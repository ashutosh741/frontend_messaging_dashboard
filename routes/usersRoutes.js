const express = require('express');
const   router = express.Router();

const { getusers, AuthData } = require('../controllers/usercontrollers');


router.get('/list2',getusers)
// router.get('/login',AuthData)
router.post('/login',AuthData)

module.exports = router;