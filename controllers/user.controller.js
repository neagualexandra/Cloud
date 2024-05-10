const user = require('../models/user.model.js');


const getUsers = async (req, res) => {
    try {
        const users = await user.find({});
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}



const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userid = await user.findById(id);
        res.status(200).json(userid);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}
const createUser = async (req, res) => {
    try {
        const newUser = await user.create(req.body);
        res.status(200).json(newUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



const updateUser = async (req, res) => {
    try {

        const { id } = req.params;
        const User = await user.findByIdAndUpdate(id, req.body);

        if (!User) {
            return res.status(404).json({ message: "User not found" });
        }
        const updatedUser = await user.findById(id);
        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteduser = await user.findByIdAndDelete(id);
        if (!deleteduser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfuly" });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}


module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};