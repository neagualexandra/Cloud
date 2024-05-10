const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Insert name"],
        },
        mail: {
            type: String,
            required: [true, "Insert e-mail"],
        },
        age: {
            type: Number,
            required: [true, "Insert age"],

        },
        department: {
            type: String,
            required: [true, "Insert department"],
        },
    },
    {
        timestamps: true
    }
);
const user = mongoose.model("user", UserSchema);
module.exports = user;