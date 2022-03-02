const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const shelterSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    languages: {
        type: Array,
        required: true
    },
    contactInfo:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    available: Boolean,
    requestFrom:{
        type: { type: Schema.Types.ObjectId, ref: 'User' 
        }
    },
    author:{
        type: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        // Note that longitude comes first in a GeoJSON coordinate array, not latitude.
        coordinates: {
            type: [Number],
            required: true,
            
        },
    }, 
    address:{
    type: string,
    required: true
        
    },
    // owner will be added later on
});

module.exports = model('Shelter', shelterSchema);
