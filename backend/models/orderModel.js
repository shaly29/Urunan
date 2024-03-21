// const mongoose = require('mongoose');
// const orderSchema = mongoose.Schema({
//     deliveryInfo: {
//         address: {
//             type: String,
//             required: true
//         },
//         district: {
//             type: String,
//             required: true
//         },
//         phoneNo: {
//             type: String,
//             required: true
//         },
//     },
//     user: {
//         type: mongoose.SchemaTypes.ObjectId,
//         required: true,
//         ref: 'User'
//     },
//     orderItems: [{
//         name: {
//             type: String,
//             required: true
//         },
//         quantity: {
//             type: Number,
//             required: true
//         },
//         image: {
//             public_id: String,
//         secure_url: String,
//         },
//         price: {
//             type: Number,
//             required: true
//         },
//         product: {
//             type: mongoose.SchemaTypes.ObjectId,
//             required: true,
//             ref: 'Product'
//         }
//     }],
//     itemsPrice: {
//         type: Number,
//         required: true,
//         default: 0.0
//     },
//     deliveryCharge: {
//         type: Number,
//         required: true,
//         default: 0.0
//     },
//     totalPrice: {
//         type: Number,
//         required: true,
//         default: 0.0
//     },
//     paymentInfo: {
//         id: {
//             type: String,
//             required: true
//         },
//         status: {
//             type: String,
//             required: true
//         }
//     },
//     paidAt: {
//         type: Date
//     },
//     deliveredAt: {
//         type: Date
//     },
//     orderStatus: {
//         type: String,
//         required: true,
//         default: 'Processing'
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// },
// { timestamps: true }
// );
// orderSchema.pre("remove", function (next) {
//     // Delete the images from Cloudinary when an order is removed
//     this.orderItems.forEach((item) => {
//       item.images.forEach((image) => {
//         cloudinary.uploader.destroy(image.public_id);
//       });
//     });
//     next();
//   });
//   const orderModel = mongoose.model('Order', orderSchema);

//   module.exports = orderModel;



const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        }
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        product: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: 'Product'
        }

    }],
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    paidAt: {
        type: Date
    },
    deliveredAt: {
        type: Date
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Processing'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;