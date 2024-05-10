const express = require('express')
const mongoose = require('mongoose')
const app = express()
const user = require('./models/user.model.js');
const userRoute = require('./routes/user.route.js');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//routes
app.use("/api/users", userRoute);


app.get('/', (req, res) => {
    res.send("Hello from Node API");
});

//conexiune db
mongoose.connect("mongodb+srv://ale:Z4f5osLLivOT4huD@db.9vtesfy.mongodb.net/Node-API?retryWrites=true&w=majority&appName=DB")
    .then(() => {
        console.log("Connected to db");
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(() => {
        console.error("Error connecting to db:");
    });

