const express = require('express');
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { uploadFile, deleteFile, getObjectSignedUrl } = require("../config/s3") 

const Products = require('../models/Product')

router.get('/', async (req, res) => {
    const newProducts = await Products.find().limit(10);
    for (let newProduct of newProducts) {
      newProduct.imgUrl = await getObjectSignedUrl(newProduct.img)
    }
    res.render('index',{ newProducts })
})

router.get('/men', async (req, res) => {
  const tuxedoProducts = await Products.find({ categories: { $in: ["Tuxedo_intro"] } });
  const watchProducts = await Products.find({ categories: { $in: ["Watches"] } });

  // Randomly select a tuxedo product
  const randomTuxedoIndex = Math.floor(Math.random() * tuxedoProducts.length);
  const tuxedoProduct = tuxedoProducts[randomTuxedoIndex];

  // Randomly select a watch product
  const randomWatchIndex = Math.floor(Math.random() * watchProducts.length);
  const watchProduct = watchProducts[randomWatchIndex];

  if (tuxedoProduct) {
    tuxedoProduct.imgUrl = await getObjectSignedUrl(tuxedoProduct.img);
  }

  if (watchProduct) {
    watchProduct.imgUrl = await getObjectSignedUrl(watchProduct.img);
  }

  res.render('men_intro', {
    tuxedoProduct,
    watchProduct
  });
});

router.get('/men/tuxedo', async (req, res) => {
  const classicFront = await Products.find({title:"Classic Black Tie Tuxedo"})
  for (let front of classicFront) {
    front.imgUrl = await getObjectSignedUrl(front.img)
  }
    const tuxedos = await Products.find({categories:"Tuxedo"}).limit(3)
    for (let tuxedo of tuxedos) {
      tuxedo.imgUrl = await getObjectSignedUrl(tuxedo.img)
    }
    res.render('men_tuxedo',{
      tuxedos,
      classicFront
    })
})

router.get('/men/tuxedo/all', async (req, res) => {
  
  const tuxedos = await Products.find({categories:"Tuxedo"})
  for (let tuxedo of tuxedos) {
    tuxedo.imgUrl = await getObjectSignedUrl(tuxedo.img)
  }
  res.render('allTuxedos',{
    tuxedos,
    
  })
})

router.get('/men/men_watches',async (req, res) => {
  const watches = await Products.find({categories:"Watches"}).limit(3)
  const watches_second = await Products.find({categories:"Watches"}).sort({
    createdAt:-1}).limit(4)
  const watches_third = await Products.find({categories:"Watches"}).sort({
      createdAt:1}).limit(2)
  for (let watch of watches) {
    watch.imgUrl = await getObjectSignedUrl(watch.img)
  }

  for (let watch of watches_second) {
    watch.imgUrl = await getObjectSignedUrl(watch.img)
  }

  for (let watch of watches_third ) {
    watch.imgUrl = await getObjectSignedUrl(watch.img)
  }
    res.render('men_watches',{
      watches,
      watches_second,
      watches_third
    })
})

router.get('/men/watches/all', async (req, res) => {
  const watches = await Products.find({categories:"Watches"})
  for (let watch of watches) {
    watch.imgUrl = await getObjectSignedUrl(watch.img)
  }
  res.render('allWatches',{
    watches
  })
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