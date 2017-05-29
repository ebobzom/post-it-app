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
});

let db=firebase.database();//storing all data from firebase
let userRef=db.ref('user');
let firebaseData={};
userRef.on('value',(snapshot)=>{
firebaseData=snapshot.val();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) =>{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, \
		content-type, Authorization');
	next();
});


app.get('/',(req,res)=>{
  res.send('welcome to the homepage');
});

app.post('/signup',function (req,res){
  let names= req.body.names;
  let email = req.body.email;
  let password=req.body.password;

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(res.send('sign-up successful'))
  .catch((error)=>{
  res.send(error.code);
  });
});

app.post('/signin',(req,res)=>{
  let email = req.body.email;
  let password = req.body.password;

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(res.send('signin successful'))
  .catch((error) =>{
     res.send(error.code);
   });
   });

app.post('/group',(req,res)=>{
  let userName=req.body.username;
  let groupName=req.body.groupname;
  userRef.push({
    user_name:userName,
    group_name:groupName
  });

});


//server listening in.
app.listen(process.env.PORT || 8080, ()=>{
  console.log('server running');
});
