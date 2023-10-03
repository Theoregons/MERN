const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        roles: [{
            type: String,
            required: true,
            default : "customer",
            min: 2,
            max: 50,
        }],
        active: {
            type: Boolean,
            required: true,
            default : true,
        },
        picturePath: {
            type: String,
            default: "",
        },
        friends: {
            type: Array,
            default: [],
        },
        location: String,
        viewedProfile: Number,
        impressions: Number,
    },
    { timestamps: true }
);

// const User = mongoose.model("User", UserSchema);

module.exports = mongoose.model('User', UserSchema )