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