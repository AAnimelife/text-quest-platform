// backend/server.js
const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5005;
    app.listen(PORT, () => console.log(`Server started: localhost:${PORT}`));
  })
  .catch(err => console.log("MongoDB error:", err));
