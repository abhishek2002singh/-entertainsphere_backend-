const User = require('../models/auth');
const {Auth} = require('../middleware/authMiddleware');

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select('-password'); // Exclude password from the response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { firstName ,lastName ,age ,gender,photoUrl , about ,skills , mobileNumber } = req.body;

        // Find the user by ID and update their profile
        const updatedUser = await User.findByIdAndUpdate(userId, { firstName ,lastName ,age ,gender,photoUrl , about ,skills , mobileNumber}, { new: true })
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}