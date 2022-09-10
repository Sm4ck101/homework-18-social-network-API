const {User} = require("../models")

const getAllUsers = async (req, res)=>{
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error)   {
        console.log("Get all users errors", error)
        res.status(500).json(error)
    }
}

module.exports = {getAllUsers}