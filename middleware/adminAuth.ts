var jwt =require('jsonwebtoken');
var {Role} = require('../models/Role');
var adminAuthMiddleware:any;
adminAuthMiddleware = async (req:any,res:any,next:any) => {
    let token;
    
    let authAdmin = req.headers.cookie;; //req.headers.Authorization || req.headers.Authorization;
    if(authAdmin) {
        token = authAdmin.split("=")[1];
        jwt.verify(token,process.env.jwtSecret, (err:any, data:any) => {
            if(err) {
                res.status(500).send(err);
            } else {
                next();
            }
        })

        if(!token) {
            res.status(401).redirect("/admin/login")
        }
    } else {
        res.status(401).redirect("/admin/login")
    }
}

var getadminRole:any;
getadminRole = async () => {
  const isAdminRole = await Role.findOne({ name: 'admin'});
  
  if(isAdminRole) {
    console.log(` isAdminRole => `, isAdminRole._id);
    return isAdminRole._id;
  } else {
    return null;
  }
}


module.exports = {
    adminAuthMiddleware,
    getadminRole
}
