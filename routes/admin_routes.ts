const express = require('express');
const router = express.Router();
const AdminAuth =require('../middleware/adminAuth')
var {registerShow,registerSave,loginShow,loginSave,homePage,adminLogout} = require('../controllers/Admin/AuthController')

router.get('/admin/register', registerShow)

router.post('/admin/register', registerSave)

router.get('/admin/login',loginShow)

router.post('/admin/login', loginSave)

router.get('/admin',AdminAuth.adminAuthMiddleware, homePage)

router.post('/admin/logout', adminLogout)
 
module.exports = {
    router: router
}