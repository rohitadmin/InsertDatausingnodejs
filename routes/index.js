var express = require('express');
var router = express.Router();
var StudentData = require('../models/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Insert Data' });
});


//view data
router.get('/viewstudent', function(req, res, next) {
  StudentData.find((err, studentsData) => {
    if(err) throw err;
    res.render('index', {
      studentsData
    });
});
});

//get student id
// router.get('/Students/:id', function(req, res) {
//   var id = req.params.id;
//   if(!ObjectsID.is valid(id)){
//     return res.status(404).send();
//   }
//   StudentData.findById(id).then((studentsData) => {
//     if(!studentsData)
//     {
//       return res.status(404).send();
//     }
//     res.render('index', {
//       studentsData
//     });

// });
// });


//Delete data
router.delete('/delete/:id', function(req, res) {
  var id = req.paramas.id;
  StudentData.findByIdAndRemove(id, (err) => {
    if(err) throw err;
    console.log('not delete');
});
  res.redirect('/');
});


//insert data
router.post('/insert', function(req,res,next){
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
    
//form validator
 req.checkBody("firstname","firstname is required").notEmpty(),
 req.checkBody("lastname","lastname is required").notEmpty(),
 req.checkBody("email","email is not valid").isEmail();

//check Errors
var errors = req.validationErrors();

 if(errors){
    console.log('errors');
    res.render('index',{
        errors: errors
    });
} else{
    var NewStudentdata = new StudentData({
      firstname: firstname,
      lastname: lastname,
      email: email    
    }); 
     console.log('no errors');
     

    StudentData.createStudent(NewStudentdata,function(err, studentsData) {
      if(err) throw err;
      req.flash(studentsData);
      console.log(studentsData);
    });
    res.redirect('/');
    res.location('/');
}
});

module.exports = router;
