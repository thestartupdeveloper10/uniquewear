const express = require('express');
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const adminLayout = '../views/layouts/admin';
const normalLayout = '../views/layouts/main';

router.get('/admin',(req, res) => {
    res.render('admin/index',{
        layout: adminLayout
    })
})

router.get('/admin/dashboard',(req, res) => {
    res.render('admin/dashboard',{
        layout: adminLayout
    })
})


// products

// working
router.get('/admin/productList',(req, res) => {
    res.render('admin/productList',{
        layout: adminLayout
    })
})

router.get('/admin/addProduct',(req, res) => {
    res.render('admin/addProduct',{
        layout: adminLayout
    })
})

router.get('/admin/updateProduct',(req, res) => {
    res.render('admin/updateProduct',{
        layout: adminLayout
    })
})


// orders
router.get('/admin/orderList',(req, res) => {
    res.render('admin/orderList',{
        layout: adminLayout
    })
})




router.get('/admin/users',(req, res) => {
    res.render('admin/users',{
        layout: adminLayout
    })
})

router.get('/admin/user',(req, res) => {
    res.render('admin/user',{
        layout: adminLayout
    })
})

router.get('/admin/newUser',(req, res) => {
    res.render('admin/createUser',{
        layout: adminLayout
    })
})



router.get('/admin/settings',(req, res) => {
    res.render('admin/settings',{
        layout: adminLayout
    })
})





module.exports = router;