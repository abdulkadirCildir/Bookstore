const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        console.log(process.env.MONGODB_URI)
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log("Successfully connected to DB")
    } catch (error) {
        console.log("Error connecting DB", error)
    }
};

module.exports = connectDB;

// Database i cagirdik, bunu da server.js te yaptik..
// mongoose, databese mongoDB/Atlas