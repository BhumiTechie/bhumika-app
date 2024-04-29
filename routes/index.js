var express = require('express');
var router = express.Router();
var userModel = require('./users');
var passport = require('passport');
var upload = require('./multer');


const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */


router.get('/profile', isLoggedIn, async function (req, res, next) {
  let userdata = await userModel.findOne({ username: req.session.passport.user });
  // console.log(userdata)
  // userdata.photo = req.file.f
  // console.log(req.file)
  res.render('profile', { userdata });
});

router.post('/upload', isLoggedIn, upload.single('image'),async function(req,res,next){
  console.log(req.file.filename)
  console.log(req.user)
  req.user.photo = req.file.filename
  await req.user.save()
  res.redirect('/profile')
})

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res, next) {
   var newUser = new userModel({
    username : req.body.username,
    email : req.body.email,
    photo : req.body.photo
   })
    userModel.register(newUser, req.body.password)
    .then(function(user){
      passport.authenticate("local")(req,res,function(){
        res.redirect('/profile');
      })
    }).catch(err=>{
      console.log(err)
      res.send(err)
    })

});

router.get('/login', function(req,res,next){
  res.render('login');
})

router.post('/login',passport.authenticate("local",{
  successRedirect:'/profile',
  failureRedirect:'/'
}),function(req,res){}
)


router.get("/logout",function(req,res,next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})


function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
