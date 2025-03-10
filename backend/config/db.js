const mongoose = require('mongoose');

const connectBD = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected!");
    } catch (err) {
        console.log("MongoDB error:", err);
        process.exit(1);
    }
}

module.exports = connectBD;