const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    // maxLength: [100, "Product name cannot exceed 100 characters"]
  },


  price: {
    type: Number,
    required: true,
    default: 0.0
  },

  description: {
    type: String,
    required: [true, "Please enter product description"]
  },
  ratings: {
    type: String,
    default: 0
  },
  image: {
    public_id: {
      type: String,

    },
    url: {
      type: String,

    }
  },

  category: { type: String, enum: ['Honda', 'Scooter', 'Tvs', 'Plusure'], required: true },

  seller: String,


  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [20, 'Product stock cannot exceed 20']
  },
  
  numOfReviews: {
    type: Number,
    default: 0
  },

  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      rating: {
        type: String,
        required: true
      },
      comment: {
        type: String,
        required: true
      }
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId
  }
  ,
  createdAt: {
    type: Date,
    default: Date.now()
  }

});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;


