var express = require('express');
var router = express.Router();

const studentsInfoController = require('../Controller/StudentInfo');
/* GET home page. */
router.get('/', studentsInfoController.getStartPage);

// router.post('/',studentsInfoController.postAddStudent);

module.exports = router;
