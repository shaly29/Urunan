const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({

    name:  { type: String, required: true },

  

    description:  { type: String, required: true },
    
    image :{
        public_id: {
          type: String,
     
        },
        url: {
          type: String,
         
        }
      },
    category: { type: String,  enum: [ 'Repair Part', 'Repair Part and re-sell'], required: true  },

    sellerName:  { type: String, required: true },
    
 
    email: { type: String, required: true },
   phoneNumber: { type: String, required: true },
   address: { type: String, required: true },
   icNo: { type: String, required: true },
  //  createdAt: Date
});

const partModel = mongoose.model('Part', partSchema);

module.exports = partModel;

