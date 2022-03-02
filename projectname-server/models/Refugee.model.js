const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const refugeeSchema = new Schema({
    // type:{
    //     type: String,
    //     required: true,
    //     enum:["Refugee", "Host"]
    // },
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
    author:{
        type: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    currentlyBasedIn:{
        type: String,
        required: true
    }
    // owner will be added later on
});

module.exports = model('Refugee', refugeeSchema);
