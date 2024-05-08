const express = require('express');
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

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



//REGISTER 

// GET
router.get('/register',(req, res) => {

    res.render('register')
})

router.post("/register", async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
  
    try {
      const savedUser = await newUser.save();
    //   res.status(201).json("User created successfully");
      res.redirect('/login')
    } catch (err) {
      res.status(500).json(err);
    }
  });



//LOGIN
router.get('/login',(req, res) => {
    res.render('login')
})
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong credentials!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password &&
      res.status(401).json("Wrong credentials!");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      {expiresIn:"3d"}
    );

    const { password, ...others } = user._doc;

    // res.status(200).json({...others, accessToken});
    res.redirect('/')
  } catch (err) {
    res.status(500).json(err);
  }
});

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