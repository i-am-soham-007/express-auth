var {User} = require('../../models/User');
var {Role} = require('../../models/Role');
var {UserRole} = require('../../models/UserRole');
//var {getadminRole} = require('../../middleware/adminAuth');

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var registerShow:any;
registerShow = (req:any,res:any,next:any) => {
    res.render('admin/auth/register')
}

var registerSave:any;
registerSave = async (req:any,res:any,next:any) => {
    const {name,email,password} = req.body;
    
    if(!name || !email || !password) {
        res.status(200).json({status:false, message:'All field are required'});
    } else {
        const checkEmailExist = await User.findOne({ email: email });
        if(checkEmailExist) {
            res.status(200).json({status:false, message:'REGISTER FAILED'});
        } else {
            const HashPassword = await bcrypt.hash(password,10);
            await User.create({
                firstName: req.body.name || '',
                lastName:req.body.name || '',
                email: req.body.email || '',
                password:HashPassword || '',
            });
            res.status(200).redirect("/admin/login")
            
        }
    }
}

var loginShow:any;
    loginShow = async (req:any,res:any,next:any) => {
        let token;
        let authAdmin = req.headers.cookie;
        if(authAdmin) {
            token = authAdmin.split("=")[1];
            jwt.verify(token,process.env.jwtSecret, (err:any, data:any) => {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).redirect("/admin")
                }
            })
        } 
    res.render('admin/auth/login')
}

var loginSave:any;
loginSave = async (req:any,res:any,next:any) => {
    const {email,password} = req.body;
    if(!email || !password) {
        res.status(200).redirect("/admin/login")
    }
    const checkUser = await User.findOne({ email: email });
    if(!checkUser) {
        res.status(200).redirect("/admin/login")
    } else {
        
        // here verify is admin or not
        // const isAdmin = await getadminRole();
        // console.log(`isAdmin `, isAdmin);
        // const checkRole = await UserRole.findOne({ user_id: checkUser.id,role_id:isAdmin});
        // if(!checkRole) {
        //     res.status(200).redirect("/admin/login")
        // } else {
            const dbPass = checkUser.password;
            const verified = bcrypt.compareSync(password, dbPass);
            if(!verified) {
                res.status(200).redirect("/admin/login")
            } else {
    
                const adminObj = {
                    user:{
                        id:checkUser.id,
                        email:checkUser.email
                    }
                }
                const options = {
                    expiresIn: '5m', // Set the token expiration time
                  };
                const token = jwt.sign(adminObj,process.env.jwtSecret,options);
                res.cookie('token',token,{httpOnly: true,maxAge:24 * 60 * 60 * 1000});
                res.status(200).redirect("/admin/")
            }
        //}
        
    }
}


var homePage:any;
homePage = (req:any,res:any,next:any) => {
    res.render('admin/home')
}

var adminLogout:any;
adminLogout = async (req:any,res:any,next:any) => {
    let authAdmin = req.headers.cookie;;
    const token = authAdmin.split("=")[1];
    res.clearCookie("token");
    jwt.verify(token, process.env.jwtSecret, (err:any, decoded:any) => {
        if (err) {
          res.status(401).redirect("/admin/login")
        }
        // Create a new short-lived token with an extremely short expiration time
        jwt.sign({ user: decoded.user }, process.env.jwtSecret, { expiresIn: '1s' });
        res.status(401).redirect("/admin/login")
      });
}

module.exports = {
    registerShow,
    registerSave,
    loginShow,
    loginSave,
    homePage,
    adminLogout
}


