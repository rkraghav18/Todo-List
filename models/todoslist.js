let mongoose=require('mongoose');

let todosSchema=mongoose.Schema({
	username:{
		type:String,
		required:true
	},
	todo:{
		type:String,
		required:true
	},
	isDone:{
		type:Boolean,
		required:true
	}
})

let Todo = module.exports = mongoose.model('Todo', todosSchema);