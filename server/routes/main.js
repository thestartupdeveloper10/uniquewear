const express = require('express');
const router = express.Router();


router.get('/',(req, res) => {
    res.render('index')
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

router.get('/login',(req, res) => {
    res.render('login')
})

router.get('/register',(req, res) => {
    res.render('register')
})

router.get('/cart',(req, res) => {
    res.render('cart')
})

router.get('/products',(req, res) => {
    res.render('grid_products')
})

router.get('/collections',(req, res) => {
    res.render('collections')
})

router.get('/swiper',(req, res) => {
    res.render('swiper')
})

module.exports = router;