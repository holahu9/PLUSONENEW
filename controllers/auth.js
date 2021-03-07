const bcrypt = require('bcryptjs');
const {UserDB,UserField} = require('./../database/user');

exports.login = async (req,res) => {
    try{
        const{email, password} = req.body;
        if(!email || !password ){
            return res.status(400).render('login', {
                message: 'please provide an email and password'
            })
        }
        // check user 
        const user = await UserDB.findOne({
          where:{
              [UserField.email]:email
          },
          raw: true
        })
        // when user null => email not exists
        if(!user){
            return res.status(400).render('login', {
              message: 'email not found'
            })
        }
        // check password
        const resultCheckPassword = await bcrypt.compare(password,user.password);
        if(!resultCheckPassword){
          // when password fail
          res.status(401).render('login',{
              message: 'Password is incorrect'
          })
        }
        // when login success => set session for users
        req.session.user = user ;
        // redirect to home
        return res.status(200).redirect("/");
    }catch(error){
        console.log(error);
    }
}
// signup function
 exports.signup = async (req,res)=> {

  const {first_name, last_name, phone_number, email, password, passwordConfirm} = req.body;
// the password need to be stored in safe place
       const hashedPassword = await bcrypt.hash(password, 8);
       let user = await UserDB.findOne({
        where:{
          [UserField.email]:email
        }
      })
      // if the user exists show error 
      if(user){
        return res.render('signup', {
            message: 'user is exits'
        });
      }
      // create new user 
      await UserDB.create({
        [UserField.email]:email,
        [UserField.last_name]:last_name,
        [UserField.first_name]:first_name,
        [UserField.phone_number]:phone_number,
        [UserField.password]:hashedPassword
      })
      // Create User Success => render signup
      return res.render('signup', {
        message: 'register success'
    });
}
// check user login 
exports.isLoggedIn = async  (req, res, next) => {
    if(req.session.user){
      const user = await UserDB.findOne({
        where:{
          [UserField.id]:req.session.user.id
        },
        raw: true
      })
      req.user = user ;
    }
    
    next();
  }
  //logout function
  exports.logout = async (req, res) => {
    req.session.destroy();
  
    return res.redirect('/');
  }
exports.changeAvatar = async(req,res)=>{
  if(!req.user){
    return res.redirect("/");
  }
  if(req.file){
      await UserDB.update({
          avatar:"/avatar/"+req.file.filename
      },{where:{[UserField.id]:req.user.id}})
  }
  return res.redirect("/profile");
}