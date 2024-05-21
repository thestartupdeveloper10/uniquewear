const express = require('express');
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { uploadFile, deleteFile, getObjectSignedUrl } = require("../config/s3") 

const Products = require('../models/Product')

router.get('/', async (req, res) => {
  try {
      const products = await Products.find().limit(10);
      for (let product of products) {
          product.imgUrl = await getObjectSignedUrl(product.img);
      }
      res.render('index', { products });
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});

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
    const classicTwo = await Products.find({categories:"Tuxedo_intro"}).sort({
      createdAt:-1}).limit(2)
      for (let two of classicTwo) {
        two.imgUrl = await getObjectSignedUrl(two.img)
      }
    res.render('men_tuxedo',{
      tuxedos,
      classicFront,
      classicTwo
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

router.get('/men/tuxedo/:id', async (req, res) => {
  const single_product = await Products.findOne({ _id: req.params.id });

  const  single_product_imgUrl = await getObjectSignedUrl(single_product.img)
  
  res.render('product_check',{
    single_product,
    single_product_imgUrl
  })
})



router.get('/men/watches',async (req, res) => {
  const watches = await Products.find({categories:"Watches"}).limit(3)
  const watches_first = await Products.find({categories:"Watches_intro"}).limit(2)
  const watches_second = await Products.find({categories:"Watches"}).sort({
    createdAt:-1}).limit(4)
  const watches_third = await Products.find({categories:"Watches"}).sort({
      createdAt:1}).limit(2)
  const fourth_third = await Products.find({categories:"Watches"}).sort({
        createdAt:-1}).limit(2)

for (let watch of fourth_third) {
          watch.imgUrl = await getObjectSignedUrl(watch.img)
        }
      for (let watch of watches_first) {
        watch.imgUrl = await getObjectSignedUrl(watch.img)
      }
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
      watches_third,
      fourth_third
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

router.get('/men/watches/:id', async (req, res) => {
  const single_product = await Products.findOne({ _id: req.params.id });

  const  single_product_imgUrl = await getObjectSignedUrl(single_product.img)
  
  res.render('product_check',{
    single_product,
    single_product_imgUrl
  })
})


router.get('/men/shoes',async (req, res) => {
  const shoes = await Products.find({ categories: { $in: ["Shoes"] } })
  
  for (let shoe of shoes) {
  shoe.imgUrl = await getObjectSignedUrl(shoe.img)
        }
    res.render('men_shoes',{
      shoes,
    })
})

router.get('/men/shoes/:id', async (req, res) => {
  const single_product = await Products.findOne({ _id: req.params.id });

  const  single_product_imgUrl = await getObjectSignedUrl(single_product.img)
  
  res.render('product_check',{
    single_product,
    single_product_imgUrl
  })
})

router.get('/men/shirts',async (req, res) => {
  const shirts = await Products.find({categories:"Shirts"})
  

for (let shirt of shirts) {
  shirt.imgUrl = await getObjectSignedUrl(shirt.img)
        }
    res.render('men_shirt',{
     shirts,
    })
})


router.get('/men/shirts/:id', async (req, res) => {
  const single_product = await Products.findOne({ _id: req.params.id });

  const  single_product_imgUrl = await getObjectSignedUrl(single_product.img)
  
  res.render('product_check',{
    single_product,
    single_product_imgUrl
  })
})



router.get('/men/belts',async (req, res) => {
  const belts = await Products.find({categories:"Belts"})
  

for (let belt of belts) {
  belt.imgUrl = await getObjectSignedUrl(belt.img)
        }
    res.render('men_belts',{
      belts,
    })
})

router.get('/men/belts/:id', async (req, res) => {
  const single_product = await Products.findOne({ _id: req.params.id });

  const  single_product_imgUrl = await getObjectSignedUrl(single_product.img)
  
  res.render('product_check',{
    single_product,
    single_product_imgUrl
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