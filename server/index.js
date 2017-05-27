const express=require('express');
let bodyParser=require('body-parser');
let firebase=require('firebase');
let app=express ();

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

// initializing middle ware (body parser)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, \
		content-type, Authorization');
	next();
});
/*creating all routes*/

//homepage route
app.get('/',(req,res)=>{
  res.send('welcome to the homepage');
});
// signup route
app.post('/signup',(req,res)=>{
  let full_name = req.body.full_name;
         email =     req.body.email;
         password = req.body.password;
         firebase.auth().createUserWithEmailAndPassword(email, password)
         .then(res.json({message: 'User signed in'}))
         .catch((err) => {
             console.log((err.code));
});

});

//signin route
app.post('/signin',(req,res)=>{
  let email = req.body.email;
  let password = req.body.password;

firebase.auth().signInWithEmailAndPassword(email, password)
.then(res.json({message:'signed in'}))
.catch(function(error) {
   console.log(error.code);
   console.log(error.message);

});
})
/*app.post('/group',(req,res)=>{
  let name=req.body.name;
  let email=req.body.email;
  let groupName=req.body.group_name;
  let password=req.body.password;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user)=>{
        firebase.auth().onAuthStateChanged((user)=>{
          if(user){
          const groupKey= firebase.database().ref('group').push({
            "name":name,
            "groupname":groupName
          }).key
          }else{
          res.send('you are not signed-in')
        }
    })
  });
});*/



app.listen(process.env.PORT || 5000, ()=>{
  console.log('server running')
})
