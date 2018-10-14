var mongoose = require('mongoose');

//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/student');
//mongoose.set('useCreateIndex', true);

var db = mongoose.connection;

//create collections or schema

var StudentDetail = mongoose.Schema({
	firstname:{
		type: String,
		unique: true
	},
	lastname:{
		type: String
	},
	email: {
		type: String
	}
});

var StudentInsert = module.exports = mongoose.model('StudentInsert',StudentDetail);

module.exports.createStudent = function(newStudent, callback){
	newStudent.save(callback);
}