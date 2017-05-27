let express=require('express');
let bodyParser=require('body-parser');
let firebase=require('firebase');
let app=express ();

firebase.initializeApp({
  apiKey: "AIzaSyCQi_g6UBIqgs5XrOlCIRe30gTNJ-SmtsY",
    authDomain: "post-it-deb5e.firebaseapp.com",
    databaseURL: "https://post-it-deb5e.firebaseio.com",
    projectId: "post-it-deb5e",
    storageBucket: "post-it-deb5e.appspot.com",
    messagingSenderId: "61667378041"

});
let db=firebase.database();
let userRef=db.ref('user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, \
		content-type, Authorization');
	next();
});

app.get('/',(req,res)=>{
  res.send('welcome to the home page');
});
let apiRouter= express.Router();
app.post('/signup',(req,res)=>{
  let full_name = req.body.full_name;
         email =     req.body.email;
         password = req.body.password;
         firebase.auth().createUserWithEmailAndPassword(email, password)
         .then(res.json({message: "Success: A user has been successfuly registered."}))
         .catch((err) => {
             console.log((err.code));
});
});


app.listen(process.env.PORT || 4000, ()=>{
  console.log('server running')
})
