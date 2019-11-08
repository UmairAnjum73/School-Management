
var name,email,image, rollNo,contactNo,address,department ;

const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
var url = "mongodb+srv://Admin:admin123@cluster0-a1rux.mongodb.net/test?retryWrites=true&w=majority";

var dbo;
var mdb;
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     dbo = db.db("studentDb");
//     mdb = db;
//   });

mongoose.connect(url,{
    // useMongoClient:true
    useNewUrlParser :true
},(err,reuslt)=>{
    if (err) throw err;
    
    console.log("Mongose connected "+  reuslt);
});

// const students = [];

const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : String,
    email: String,
    image: String,
    rollNo: String,
    contactNo: String,
    address: String,
    department: String 
});

module.exports = mongoose.model('Student',studentSchema);


// module.exports.addStudent= (req)=>{
//     name = req.body.name;
//     email = req.body.email;
//     image = req.body.image;
//     rollNo = req.body.rollNo;
//     contactNo = req.body.contactNo;
//     address = req.body.address;
//     department = req.body.department;

//     students.push({name, email,image,rollNo,contactNo,address,department});

// }




// module.exports = {
//     dbo,
//     mdb
// }  

// class StudentObj {
//     constructor(name,email,rollNo,image,contactNo,department,address) {
//     this.name = name;
//     this.email = email;
//     this.image = image;
//     this.rollNo = rollNo;
//     this.contactNo = contactNo;
//     this.address = address;
//     this.department = department;
//     }
// }

// module.exports = new StudentObj();