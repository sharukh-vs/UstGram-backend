const User = require('../models/User');
const bcrypt = require('bcryptjs');
const getDataUrl = require('../util/urlGenerator');
const cloudinary = require('cloudinary')


exports.getUsers = async(req, res) => {
    const users = await User.find();
    res.json(users);
}

exports.addUser = async(req, res) => {
    const newUser = User(req.body);
    await newUser.save();
    res.status(200).json(newUser);
}

exports.register = async(req, res) => {
    const { name, email, password, gender } = req.body;
    console.log(req.file);
    const existingUser = await User.findOne({email: email});
    if(existingUser) {
        res.status(400).json({message: "user exists with the email"});
    }

    if(!name || !email || !password || !gender) {
        return res.status(400).json({message: "All fields are required"});
     }
     

    const hashPassword = await bcrypt.hash(password, 10);

    const file = req.file;
    const fileUrl = getDataUrl(file);

    const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content);

    const user = await User.create({
        name,
        email,
        password: hashPassword,
        gender,
        profilePic: {
            id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    });

    res.status(201).json({msg: "User created", user});
}