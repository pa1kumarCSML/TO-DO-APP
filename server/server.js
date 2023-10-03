const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 5000;
const CONNECTION_STRING = 'mongodb+srv://derangulapavankumar:TmX9BkDpuh8EIMyI@cluster0.xqb3pgl.mongodb.net/todoTracker?retryWrites=true&w=majority';

// Middleware
app.use(bodyParser.json());
app.use(cors());


// MongoDB Atlas Connection (replace connection string)

mongoose
    .connect(CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });



// Define routes here...

app.use('/api/todo', require('./routes/todoRouter'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});