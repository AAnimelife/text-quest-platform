const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser:true,
    // useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected!"))
.catch(err => console.log("Error to connect MongoDB:", err));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/quests', require('./routes/questRoutes'));
app.use('/api/pages', require('./routes/pageRoutes'));

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => console.log(`Server started: localhost: ${PORT}`));