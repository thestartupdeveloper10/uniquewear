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
router.get('/women_jewelary',(req, res) => {
    res.render('women_jewelary')
})

router.get('/women',(req, res) => {
    res.render('women_intro')
})


module.exports = router;