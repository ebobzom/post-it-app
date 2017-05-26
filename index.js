const express=require('express');

const bodyParser=require('body-parser');

const firebase=require('firebase');

let app=express();

//initializing firebase
firebase.initializeApp({
    apiKey: "AIzaSyCQi_g6UBIqgs5XrOlCIRe30gTNJ-SmtsY",
    authDomain: "post-it-deb5e.firebaseapp.com",
    databaseURL: "https://post-it-deb5e.firebaseio.com",
    projectId: "post-it-deb5e",
    storageBucket: "post-it-deb5e.appspot.com",
    messagingSenderId: "61667378041"
})

let firebaseData=firebase.database();
let userRef=firebaseData.ref('user');

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, \
		content-type, Authorization');
	next();
});

app.get('/',(req,res)=>{
  res.send('welcome to the homepage');
});

app.post('/signup',(req,res) =>{
  let firstName=req.boby.firstname;
  let email =req.body.email;
  let password=req.body.password;
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .catch((error)=>{
  res.send('signup not successful');
  });
});

app.post('/signin',(req,res)=>{
  let email = req.body.email;
  let password = req.body.password;

firebase.auth().signInWithEmailAndPassword(email, password)
  .then(res.json({message:'signed in'}))
  .catch(function(error) {
     res.send(error.code);
   });
   });

//server listening in.
app.listen(process.env.PORT || 4000, ()=>{
  console.log('server running');
});
