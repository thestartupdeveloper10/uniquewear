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

router.get('/admin/products',(req, res) => {
    res.render('admin/products',{
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

router.get('/admin/newProduct',(req, res) => {
    res.render('admin/newProduct',{
        layout: adminLayout
    })
})

router.get('/admin/settings',(req, res) => {
    res.render('admin/settings',{
        layout: adminLayout
    })
})

router.get('/admin/addProduct',(req, res) => {
    res.render('admin/addProduct',{
        layout: adminLayout
    })
})
router.get('/men',(req, res) => {
    res.render('men_intro')
})

router.get('/men/tuxedo',(req, res) => {
    res.render('men_tuxedo')
})

router.get('/men/men_watches',(req, res) => {
    res.render('men_watches')
})

router.get('/product_check',(req, res) => {
    res.render('product_check')
})


router.get('/women',(req, res) => {
    res.render('women_intro')
})

router.get('/women/women_jewelary',(req, res) => {
    res.render('women_jewelary')
})


module.exports = router;