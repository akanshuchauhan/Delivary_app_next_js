import mongoose from 'mongoose';

const foodModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img_path: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    resto_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant', // Example of referencing another collection
        required: true
    }
});

const Food = mongoose.models.Food || mongoose.model('Food', foodModel);

export { Food };
