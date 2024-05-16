const express = require('express');
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const Product = require('../models/Product')
const multer = require('multer') 
const crypto = require('crypto') 
const sharp = require('sharp') 
const { uploadFile, deleteFile, getObjectSignedUrl } = require("../config/s3") 

const adminLayout = '../views/layouts/admin';
const normalLayout = '../views/layouts/main';


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')


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


router.post('/admin/addProduct', upload.single('image'), async (req, res) => {
    try {
        const { title, desc, categories, size, color, price, stock } = req.body;
        const file = req.file;

        if (!title || !desc || !categories || !size || !color || !price || !stock || !file) {
            return res.status(400).send('All fields are required');
        }

        const imageName = generateFileName(); // Generate a unique file name for the image

        // Resize and process the image using Sharp
        const fileBuffer = await sharp(file.buffer)
            .resize({ height: 1920, width: 1080, fit: "contain" })
            .toBuffer();

        // Upload the processed image to your storage service
        await uploadFile(fileBuffer, imageName, file.mimetype);

        // Create the product object with the required properties
        const newProduct = new Product({
            title,
            desc,
            img: imageName, // Assign the generated image name to the img property
            categories,
            size,
            color,
            price,
            inStock: stock
        });

        // Save the product to the database
        await newProduct.save();

        res.redirect('/admin/productList');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


  router.delete('/admin/addProduct/:id', async (req, res) => {
    try {
      // Find the blog post by ID
      const product = await Product.findById(req.params.id);
  
      // If the blog post doesn't exist, return a 404 Not Found error
      if (!product) {
        return res.status(404).send('Product not found');
      }
      await deleteFile(post.imageName)
      // Delete the blog post from the database
      await Product.findByIdAndDelete(req.params.id);
    //   res.redirect('/home');
         res.status(200).json("Product Removed");
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  router.put('/admin/addProduct/:id', async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        desc: req.body.desc,
        img: req.body.img,
        categories: req.body.categories,
        size: req.body.size,
        color:req.body.color,
        price: req.body.price,
        inStock: req.body.stock,
        });
  
        // res.redirect(`/home/edit-match/${req.params.id}`);
        res.status(200).json("Product updated");
    } catch (error) {
        console.log(error);
    }
  });



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