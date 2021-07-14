const express = require('express')
const TodoModel = require('./model')
const mongoose = require('mongoose')
const cors = require("cors");
mongoose.connect('mongodb+srv://Asad:arsenal101@cluster0.lfcbh.mongodb.net/todo-app?retryWrites=true&w=majority').then(
  ()=> {
    console.log('Mongodb has been connected.')
  }
)

const bodyParser = require('body-parser')
const app = express()
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

//set middleware for the request
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post('/savePost',(request,response,next)=> {

  console.log('hitting endpoint of savePost!!')
  const post = request.body;
  console.log(post.name)
  console.log(post.desc)
  const todoModel = new TodoModel({
    name : post.name,
    desc : post.desc
  })
  todoModel.save().then((savedItem)=> {
    response.json(savedItem)
  }).catch(
    (error) => {
      console.log(error.message)
    }
  )

})

app.delete('/deletePost/:id',(request,response,next)=> {

  const id = request.params.id;
  TodoModel.deleteOne({_id: id}).then(()=> {
    response.json({
      message :
    'successfully deleted!'
    }
    )})


})


app.post('/editPost',(request,response,next)=> {

  const post = request.body
  console.log('body: '+ post)
  TodoModel.findOne({_id : post.id}).then (todo => {
    console.log('id found :' + todo._id)
      TodoModel.updateOne({_id: todo._id}, {name : post.name,desc : post.desc }).then(()=> {
        response.json({
            message :
              'successfully editted!'
          }
        )})

    }
  )


})

app.get('/getAll',(request,response,next)=> {


  TodoModel.find().then((allTodos)=> {
    response.json({
        todos : allTodos,
      message : 'Success'
      }
    )})


})


module.exports = app
