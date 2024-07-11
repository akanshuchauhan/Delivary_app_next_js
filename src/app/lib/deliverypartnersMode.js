import mongoose from 'mongoose';

const foodModel = new mongoose.Schema({
    name: String,
    price: Number,
    img_path: String,
    description: String,
    resto_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant' // Example of referencing another collection (if needed)
    }
});

// Check if the model already exists to prevent redefinition
export const foodSchema = mongoose.models.foods || mongoose.model('foods', foodModel);
