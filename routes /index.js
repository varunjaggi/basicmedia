const express= require ('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')
const User= require('../models/users')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })
  
  // Init Upload
  const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
  }).single('file')


router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
      layout: 'login',
    })
  })

router.get('/dashboard', ensureAuth, async (req,res) =>{
  try{
    console.log("DASSSHH")
    res.render('dashboard',{
    name:req.user.firstName})
  }

  catch(err){
    console.log(err)
  }
})



//POST DATA TO DB
router.post('/update', ensureAuth,upload, async (req,res) =>{
    id={_id: req.user.id}
    newUpdate={
        firstName:req.body.name,
        Age:req.body.Age,
        Gender:req.body.Gender,
        Imagename:req.file.filename 
        }
    try{
        
          console.log(newUpdate)
          user = await User.updateOne(id,newUpdate,function(err,res){
            if (err) throw err;
            console.log("1 document updated");
          })
          res.redirect('/dashboard')
    }
  
    catch(err){
      console.log(err)
    }
  })




//Updating profile
router.get('/profile/update', ensureAuth, (req, res) => {
  res.render('profile/add')
})
router.get('/profile', ensureAuth, (req, res) => {
    //Ppost data 
  })
  

//View profile
router.get('/profile/view', ensureAuth, async (req, res) => {
    try{
        let user = await User.findOne({ _id: req.user.id })
        console.log(user)
        res.render('profile/view',{
            Name:user.firstName,
            Age:user.Age,
            Gender:user.Gender,
            file:user.Imagename
        })
    }
   catch(err){
       console.log(err)

   }
    
  })




module.exports=router;