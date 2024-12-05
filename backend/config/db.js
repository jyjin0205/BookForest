const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoose = require('mongoose');

        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB Connected to:', process.env.MONGO_URI))
        .catch((err) => console.error('MongoDB connection error:', err));

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
