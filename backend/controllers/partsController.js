
const cloudinary = require('../utils/cloudinary'); // Import Cloudinary library
const PartModel = require('../models/partsModel'); // Import your PartModel
const multer = require('../utils/multer')

  
exports.createPart = async (req, res) => {
  
           // Upload image to Cloudinary
           const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "Urunan_parts",
          
    
        });


        

 // Create a new Part instance
 const part = new PartModel({
    name: req.body.name,
 
    description: req.body.description,
    image: {
        public_id: result.public_id,
        url: result.secure_url
    },
    category: req.body.category,
    sellerName: req.body.sellerName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    icNo: req.body.icNo
});
    
 try{   
// Save the part to the database
    const savedPart = await part.save();

    // Respond with the saved part
    res.status(200).json(savedPart);
        

    } catch (error) {
        // Handle errors
        console.error("Error creating part:", error);
        res.status(400).json({ message: "Failed to create part" });
    }
};


// Get Parts API - /api/v1/parts
exports.getParts = async (req, res, next) => {
    try {
        const query = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        } : {};

        const parts = await PartModel.find(query);

        if (parts.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No parts found.'
            });
        }

        res.json({
            success: true,
            parts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
};


//Get Single Product API - /api/v1/product/:id
exports.getSinglePart = async (req, res, next) => {
    try {
        const part = await PartModel.findById(req.params.id);
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
exports.deletePart = async (req, res, next) => {
    try {
        const partId = req.params.id; // Corrected variable name from 'productId' to 'partId'

        // Check if the part exists
        const part = await PartModel.findById(partId); // Corrected variable name from 'productId' to 'partId'
        if (!part) {
            return res.status(404).json({
                success: false,
                message: 'Part not found' // Updated error message to 'Part not found'
            });
        }

        // Delete the part
        await PartModel.findByIdAndDelete(partId); // Corrected variable name from 'productId' to 'partId'

        // Return success response
        res.json({
            success: true,
            message: 'Part deleted successfully' // Updated success message to 'Part deleted successfully'
        });
    } catch (error) {
        // Handle errors
        console.error('Error deleting part:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error' // Updated error message to 'Internal server error'
        });
    }
}



// Update Single Part API - PUT or PATCH /api/v1/part/:id
exports.updatePart = async (req, res, next) => {
    try {
        const partId = req.params.id;
        const updateData = req.body; // Data to update the part

        // Check if the part exists
        let part = await PartModel.findById(partId);
        if (!part) {
            return res.status(404).json({
                success: false,
                message: 'Part not found'
            });
        }

        // Update the part
        part = await PartModel.findByIdAndUpdate(partId, updateData, { new: true });

        // Return success response with updated part data
        res.json({
            success: true,
            part
        });
    } catch (error) {
        // Handle errors
        console.error('Error updating part:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}
