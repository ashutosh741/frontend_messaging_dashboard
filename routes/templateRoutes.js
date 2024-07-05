const express = require('express');
const   router = express.Router();

    const { createTemplate} = require('../controllers/templateController');
// const Verify = require('../verifyToken');


router.post('/newtemplate',createTemplate);
// router.patch('/Update/:TemplateId',Verify,canUpdateTemplateData);
// router.delete('/Delete',Verify,deleteTemplate);

module.exports = router;