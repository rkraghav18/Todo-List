const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const config=require('./config/database')
const app=express();

const port=process.env.PORT||3000;

mongoose.connect('mongodb://localhost/dbtodo');
let db=mongoose.connection;

db.once('open',function(){
    console.log('Connected');
});

db.on('error',function(err){
    console.log(err);
})

// app.use(express.static('public'))
// 
app.use(express.static(__dirname+'/public'));

app.use(bodyparser.urlencoded({extended:false}))

app.use(bodyparser.json())

let Todo=require('./models/todoslist')

app.set('view engine','pug');



app.get('/items/add',function(req,res){
		res.render('add',{
			title:'What are you upto?'
		})
})

app.post('/items/add',function(req,res){
	// req.checkBody('todo','Cannot be empty').notEmpty();

 //    let errors=req.validationErrors();

 //    if(errors){
 //        res.render('add',{
 //            title:'What are you upto?',
 //            errors:errors
 //        })
 //    }
 //    else{
    let todos=new Todo();
    todos.username=req.body.username;
    todos.todo=req.body.todo;
    todos.isDone=Boolean(req.body.isDone);
    todos.save(function(err){
        if(err){
            console.log(err);
            return;
        }
        else{
            res.redirect('/');
        }
    })
//}
})

app.get('/items/edit/:id',function(req,res){
	Todo.findById(req.params.id,function(err,item){
		res.render('edit',{
			title:'Want to make some changes? Go ahead.',
			item:item
		})
	})
})

app.post('/items/edit/:id',function(req,res){
	let todos={};
	todos.username=req.body.username;
	todos.todo=req.body.todo;
	todos.isDone=Boolean(req.body.isDone);

	let query={_id:req.params.id}

	Todo.update(query,todos,function(err){
		if(err)
			console.log(err);
		else
			res.redirect('/');
	})
})

app.get('/items/delete/:id',function(req,res){
    let query = {_id:req.params.id}
    Todo.findById(req.params.id,function(err,todos){
             Todo.remove(query,function(err){
        if(err){
            console.log(err);
        }
        res.send('Success');
    })
    })

   
})

app.get('/',function(req,res)
{
	// var curs= db.collection("todoslist").find();
	// curs.each(function(err,doc)
	// {
	// 	console.log(doc);
	// });

	Todo.find({},function(err,todoslist)
	{
		if(err)
			console.log(err);
		else
		{
			res.render('home',
			{
				title:'Things to be done today',
				todoslist:todoslist
			})
		}
	})
})

app.listen(port,function () {
	console.log('Server started on port '+port);
});