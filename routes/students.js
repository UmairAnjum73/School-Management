var express = require('express');
var router = express.Router();
let multer = require('multer');
let upload = multer();

var student = require('../Controller/StudentInfo');

// getAll students from Db
/** 
 * @swagger 
 * /users/:
 *   get:   
 *     tags:
 *      - "students"
 *     description: user fetch list of students. 
 *     responses:
 *       '200':
 *         description: list of students 
 */   
router.get('/', student.getAllStudents);


// find one student by id

/** 
 * @swagger 
 * /users/byId:
 *   get:
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id to get student
 *     tags:
 *      - "students"
 *     description: user fetch a student by giving an id. 
 *     responses:
 *       '200':
 *         description: object of student 
 */  
router.get('/byId', upload.fields([]), student.getStudentById);

// api for edit info of a student
/**
 * @swagger
 *
 * /users/editInfo:
 *   put:
 *     tags:
 *     - "student"
 *     description: add student to db.
 *     requestBody:
 *        descripion: student data
 *        required: true
 *        content:
 *          multipart/form-data:
 *              schema:
 *                  type: object
 *                  required: 
 *                   - department
 *                   - address
 *                   - rollno
 *                   - image
 *                   - name
 *                   - email
 *                   - contactNo
 *                  properties:
 *                     _id: 
 *                       type: "string" 
 *                     name: 
 *                       type: "string"
 *                       example: abc
 *                     image:
 *                       type: string
 *                     address:
 *                       type: "string"
 *                     contactNo:
 *                       type: "string"
 *                     department:
 *                       type: "string"
 *                     rollNo:
 *                       type: "number"
 *                     email: 
 *                       type: "email"
 *                 
 *     responses:
 *       '200':
 *         description: OK
 */
router.put('/editInfo', upload.fields([]), student.editStudentInfo);

// api for delete a student from student table
/**
 * @swagger
 *
 * /users/deleteStudent:
 *   delete:
 *     tags:
 *     - "student"
 *     description: delete student from db.
 *     requestBody:
 *        descripion: student data
 *        required: true
 *        content:
 *          multipart/form-data:
 *              schema:
 *                  type: object
 *                  required: 
 *                   - _id
 *                  properties: 
 *                     _id: 
 *                       type: "string"                 
 *     responses:
 *       '200':
 *         description: OK
 */
router.delete('/deleteStudent', upload.fields([]), student.removeStudent);

/* Add student to db */
/**
 * @swagger
 *
 * /users/:
 *   post:
 *     tags:
 *     - "student"
 *     description: add student to db.
 *     requestBody:
 *        descripion: student data
 *        required: true
 *        content:
 *          multipart/form-data:
 *              schema:
 *                  type: object
 *                  required: 
 *                   - department
 *                   - address
 *                   - rollno
 *                   - image
 *                   - name
 *                   - email
 *                   - contactNo
 *                  properties: 
 *                     name: 
 *                       type: "string"
 *                       example: abc
 *                     image:
 *                       type: string
 *                     address:
 *                       type: "string"
 *                     contactNo:
 *                       type: "string"
 *                     department:
 *                       type: "string"
 *                     rollNo:
 *                       type: "number"
 *                     email: 
 *                       type: "email"
 *                 
 *     responses:
 *       '200':
 *         description: OK
 */
router.post('/', upload.fields([]),student.addStudentToDb);





module.exports = router;


