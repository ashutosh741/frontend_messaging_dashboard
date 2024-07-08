const express = require('express');
const   router = express.Router();

    const { createTemplate, updateTemplate,deleteTemplate,fetchAllTemplates} = require('../controllers/templateController');
const Verify = require('../verifyToken');
// const Verify = require('../verifyToken');


router.post('/newtemplate',Verify,createTemplate);
router.patch('/Update/:TemplateId',Verify,updateTemplate);
router.delete('/Delete/:TemplateId',Verify,deleteTemplate);
router.get('/ViewTemplates',Verify,fetchAllTemplates);
router.get('/ViewTemplates/:TemplateId',Verify,fetchAllTemplates);


module.exports = router;