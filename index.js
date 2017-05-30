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
let userRef=db.ref('user_groups');//giving a name to reference
let firebaseData={};
userRef.on('value',(snapshot)=>{
firebaseData=snapshot.val();
});

//initializing body parser to grap information from posts
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure app to handle CORS requests
app.use((req, res, next) =>{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, \
		content-type, Authorization');
	next();
});

//creating homepage route
app.get('/',(req,res)=>{
  res.send({message:'welcome to the homepage'});
});

//creating signup route
app.post('/signup',(req,res)=>{
  let names= req.body.names;
  let email = req.body.email;
  let password=req.body.password;

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(()=>{
    res.send({message:'signup successful'});

  },(e)=>{

    res.send(e.code);

  })
  
});

//creating signin route
app.post('/signin',(req,res)=>{
  let email = req.body.email;
  let password = req.body.password;

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(()=>{

    res.send({message:'signin successfully'});

  },(e)=>{
    res.send({message:'an error occurred',e});//handling error
  })
  
   });

//creating group route
app.post('/group',(req,res)=>{
  let userName=req.body.username;
  let groupName=req.body.groupname;
  let groupRef=userRef.child(groupName);
  let newGroup=groupRef.push({
    user_name:userName,
    group_name:groupName
  }).then(()=>{
    res.send({messae:'group created successfully',groupKey:newGroup.key});
  
  },
  (e)=>{
    res.send(e.code);//handling error
});

});

//adding user to group

app.post('/group/uid',(req,res)=>{
  let groupToAddName=req.body.group_name;
  let user_uid=req.body.uid;//using user uid to add members
  userRef.child(groupToAddName).update({
    newGroupMember:user_uid
  }).then(()=>{

    res.send({message:'user added to group successfully'})

  },(e)=>{
    res.send({message:'an error occured',errror:e})
  })
});
app.post('/signout',(req,res)=>{
  firebase.auth().signOut().then(()=>{

    res.send({message:'signout succeful'})

  },(e)=>{
    res.send({message:'an error occured'})
  })
})

//server listening in.
app.listen(process.env.PORT || 8080, ()=>{
  console.log('server running');
});
