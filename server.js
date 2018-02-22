var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Authors');

// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, '/Client/dist')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));

var AuthorSchema = new mongoose.Schema({
 name: {required: true, type: String, minlength: [3, "Author name should be at least 3 characters!"]},
}, {timestamps: true})

mongoose.model('Author', AuthorSchema);
var Author = mongoose.model('Author');

// Use native promises
mongoose.Promise = global.Promise;

app.post('/authors', function(req, res) {
  let author = new Author({name: req.body.name});
  console.log(author);
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  author.save(function(err, task) {
    // if there is an error console.log that something went wrong!
    if(err){
      res.send({error: "something went wrong"});
    } else { // else console.log that we did well and then redirect to the root route
      res.json({success: "successfully added an author!"});
    }
   })
})

app.get('/authors', function(req, res) {
      Author.find({}, function(err, author) {
      if(err){
        console.log(err);
        res.json({error: err});
      }else{
        res.json({authors: author});
      }
    });
});

app.get('/authors/:id', function(req, res) {
      Author.find({_id: req.params.id}, function(err, author) {
      if(err){
        console.log(err);
        res.send({error: err});
      }else{
        res.json({authors: author});
      }
    });
});

app.put("/authors/:id", function (req, res){
    console.log("its in the put");
    Author.findById(req.params.id, function(err, author) {
//    Task.update({_id: req.params.id}, {$set: {title: req.body.name, description: req.body.desc, completed: true}}, function(err, animals){    
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
      res.send({error: err});
    } else { // else console.log that we did well and then redirect to the root route
      author.name = req.body.name
      console.log(author.name);
      author.save(function (err, author) {
          if(err){
            console.log({error: err});
          }else{
            res.json({success: "successfully updated a task!"});
          }
      })
    }
   })
});


app.delete("/authors/:id", function (req, res){
    Author.findByIdAndRemove({_id: req.params.id}, function(err, person) {
      if(err){
        console.log(err);
        res.json({error: err});
      }else{
        res.json({success: "Delete successfully"});                                                                                         
      }
    });
});

app.all("*",(req,res,next) => {
  res.sendfile(path.resolve('./Client/dist/index.html'));
})

// Setting our Server to Listen on Port: 8000
app.listen(4000, function() {
    console.log("listening on port 4000");
})
