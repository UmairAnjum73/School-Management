let multer = require('multer');
let upload = multer();
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var validator = require('validator');
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
var url = "mongodb+srv://Admin:admin123@cluster0-a1rux.mongodb.net/test?retryWrites=true&w=majority";

const Student = require('../models/Student');


mongoose.connect(url,{
  // useMongoClient:true
  useNewUrlParser :true
},(err,reuslt)=>{
  if (err) throw err;

  console.log("Connected" + reuslt);

} ).catch(err=>{
  console.log("Mongo db connection error");
});

var {dbo,mdb} = require('../models/Student');


// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   dbo = db.db("studentDb");
//   mdb = db;
// });


exports.getStartPage = (req, res, next) =>{
    res.render('index', { title: 'Express' });
  };


module.exports.getAllStudents =(req, res, next) => {

  Student.find()
  .exec()
  .then(docs => {
    console.log(docs);
    //   if (docs.length >= 0) {
    res.status(200).json(docs);
    //   } else {
    //       res.status(404).json({
    //           message: 'No entries found'
    //       });
    //   }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });

  // dbo.collection("students").find().toArray((err, result) => {
  //   if (err) throw err;
  //   console.log("Complete result is" + JSON.stringify(result));
  //   res.send(JSON.stringify(result));

  // });
};

module.exports.getStudentById = (req, res, next) => {
  console.log("id is " + req.query.id);


  // if (!req.query.id) {
  //   res.send("Invalid");
  // }

  // if (!validator.isMongoId(req.query.id)) {
  //   res.send("Invalid id ")
  // }
  // else {
  //   dbo.collection("students").findOne({ "_id": ObjectId(req.query.id) }, async function (err, result) {
  //     if (err) throw err;
  //     console.log("row we got " + result);
  //     res.send(result);
      
  //   });
  // }
  const id = req.query.id;
  Student.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

module.exports.editStudentInfo = (req, res, next) => {
  console.log("id is " + JSON.stringify (req.body));

  if (!req.body._id) {
    return res.send("Invalid_id");
  }

  if (!validator.isMongoId(req.body._id)) {
    return res.send("Invalid id ")
  }
  else {

    // var myquery = { _id: ObjectId(req.body._id) };

    // var newvalues = {
      // $set: {
      //   "name": req.body.name, "email": req.body.email,
      //   "image": req.body.image, "rollNo": req.body.rollNo, "contactNo": req.body.contactNo,
      //   "address": req.body.address, "department": req.body.department
      // }
    // };

    // dbo.collection("students").updateOne(myquery, newvalues, function (err, result) {
    //   if (err) throw err;
    //   console.log("result we got " + result);
    //   res.send(result);
      
    // });

  const id = req.body._id;
  // const updateOps = {};
  // for (const ops of req.body) {
  //   updateOps[ops.propName] = ops.value;
  // }
  Student.update({ _id: id }, {  $set: {
    "name": req.body.name, "email": req.body.email,
    "image": req.body.image, "rollNo": req.body.rollNo, "contactNo": req.body.contactNo,
    "address": req.body.address, "department": req.body.department
  } })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

  }
};

module.exports.removeStudent = (req, res, next) => {
  console.log("id is " + req.body._id);

  // if (!req.body._id) {
  //   return res.send("Invalid");

  // }

  // if (!validator.isMongoId(req.body._id)) {
  //   return res.send("Invalid id ")
  // }
  // else {

  //   var myquery = { _id: ObjectId(req.body._id) };

  //   dbo.collection("students").deleteOne(myquery, function (err, result) {
  //     if (err) throw err;
  //     console.log("result we got " + result);
  //     res.send(result);
      
  //   });
  // }
  const id = req.body._id;
  Student.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

};


module.exports.addStudentToDb = async (req, res, next) => {


  console.log("******************res",req.body);

  if(!req.body.name){

    return res.send("Name is invalid");
    
  }else if (!req.body.email){

    return res.send("Email is invalid");

  }else if (!req.body.image){

    return res.send("Image is invalid");

  }else if (!req.body.rollNo){
    
    return res.send("RollNo is invalid");

  }else if (!req.body.contactNo){
    
    return res.send("Contact no is invalid");

  }else if (!req.body.address){
    
    return res.send("address is invalid");

  }else if (!req.body.department){
    
    return res.send("Department is invalid");

  }

  else{

  // const student = new Student({
  //   "name": req.body.name, "email": req.body.email,
  //   "image": req.body.image, "rollNo": req.body.rollNo,
  //   "contactNo": req.body.contactNo,
  //   "address": req.body.address, "department": req.body.department
  // });  

  const studentObj = new Student ({
    _id: new mongoose.Types.ObjectId() ,
    "name": req.body.name, 
    "email": req.body.email,
    "image": req.body.image, 
    "rollNo": req.body.rollNo,
    "contactNo": req.body.contactNo,
    "address": req.body.address, 
    "department": req.body.department
  });
  studentObj.save().then((result) =>{
    console.log("test****************"  , result);
    res.status(201).json({
      message: "Handling POST requests to /products",
      createdStudent: result
    });
  }).catch(err =>{
    console.log(err)
  });
  // const result = await insertIntoDb(studentObj);
  // res.send(result);
}
  // console.log("Req :"+ req.body.name);
};



insertIntoDb = function (students) {

  return new Promise(function (resolve, reject) {
   
      dbo.collection("students").insertOne(students, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        resolve("Student Added Successfully");

      });
  });
}

function isEmpty(value) {
  return (value == null || value.length === 0);
}



