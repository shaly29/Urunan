const ProductModel = require('../models/productModel');
const multer = require('../utils/multer')
const cloudinary = require('../utils/cloudinary');
const catchAsyncError = require('../middlewares/catchAsyncError');




exports.createProduct = async (req, res) => {
    try {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Urunan_products",
      });
  
      // Create a new Product instance
      const product = new ProductModel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: {
          public_id: result.public_id,
          url: result.secure_url
        },
        category: req.body.category,
        seller: req.body.seller,
        stock:req.body.stock,
        ratings: req.body.ratings // Assuming ratings field is also present
      });
  
      // Save the product to the database
      const savedProduct = await product.save();
  
      // Respond with the saved product
      res.status(200).json(savedProduct);
    } catch (error) {
      // Handle errors
      console.error("Error creating product:", error);
      res.status(400).json({ message: "Failed to create product" });
    }
  };
  
// Get Products API - /api/v1/products
exports.getProducts = async (req, res, next) => {


    try {
        const query = req.query.keyword ? { 
            name: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        } : {};

        const products = await ProductModel.find(query);

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No products found.'
            });
        }

        res.json({
            success: true,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
};


//Get Single Product API - /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        res.json({
            success: true,
            product
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Unable to get Product with that ID'
        })
    }
}

// Delete Single Product API - DELETE /api/v1/product/:id
exports.deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        
        // Check if the product exists
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Delete the product
        await ProductModel.findByIdAndDelete(productId);

        // Return success response
        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        // Handle errors
        console.error('Error deleting product:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}
// Update Single Product API - PUT or PATCH /api/v1/product/:id
exports.updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const updateData = req.body; // Data to update the product

        // Check if the product exists
        let product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Update the product
        product = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });

        // Return success response with updated product data
        res.json({
            success: true,
            product
        });
    } catch (error) {
        // Handle errors
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}



// Create Review - api/v1/review
exports.createReview = catchAsyncError(async (req, res, next) => {
    const { productId, rating, comment } = req.body;

    const review = {
        user: req.user.id,
        rating,
        comment
    };

    try {
        let product = await ProductModel.findById(productId);

        // If product not found
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Check if user has already reviewed the product
        const existingReview = product.reviews.find(review => {
            return review.user.toString() === req.user.id.toString();
        });

        if (existingReview) {
            // Update the existing review
            existingReview.comment = comment;
            existingReview.rating = rating;
        } else {
            // Create a new review
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
        }

        // Calculate the average rating of the product
        product.ratings = product.reviews.reduce((acc, review) => {
            return review.rating + acc;
        }, 0) / product.reviews.length;
        product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

        await product.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

//Get Reviews - api/v1/reviews?id={productId}
exports.getReviews = catchAsyncError(async (req, res, next) =>{
    const product = await ProductModel.findById(req.query.id).populate('reviews.user','name email');

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//Delete Review - api/v1/review
exports.deleteReview = catchAsyncError(async (req, res, next) =>{
    const product = await ProductModel.findById(req.query.productId);
    
    //filtering the reviews which does match the deleting review id
    const reviews = product.reviews.filter(review => {
       return review._id.toString() !== req.query.id.toString()
    });
    //number of reviews 
    const numOfReviews = reviews.length;

    //finding the average with the filtered reviews
    let ratings = reviews.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / reviews.length;
    ratings = isNaN(ratings)?0:ratings;

    //save the product document
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        numOfReviews,
        ratings
    })
    res.status(200).json({
        success: true
    })


});

// get admin products  - api/v1/admin/products
exports.getAdminProducts = catchAsyncError(async (req, res, next) =>{
    const products = await ProductModel.find();
    res.status(200).send({
        success: true,
        products
    })
});