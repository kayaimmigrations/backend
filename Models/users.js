import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,

        

        validate: {
            validator: function (value) {

                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
            },
            message: 'Invalid email format'
        }
    },


    
    password: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(value) {
                return value.length >= 8;
            },
            message: 'Password must be between 8 and 15 characters'
        }
    },

    

    



});

const userModel = mongoose.model('user', userSchema);

export default userModel;