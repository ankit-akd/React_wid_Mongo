const mongoose = require('mongoose');
//newest version of mongodb support async await for connection
async function connectToDatabase(){
    try{
        await mongoose.connect('mongodb://localhost:27017/school',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connection successfull to MongoDB!!");
    } catch(err){
        console.log(err);
    }
}

connectToDatabase();
    const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        date:{
            type: Date,
            default: Date.now,
        },
    });
    const User = mongoose.model('users', UserSchema);
    User.createIndexes();

    const express = require('express');
    const app = express();
    const cors = require("cors");
    console.log("App listening on port 5000");
    app.use(express.json());
    app.use(cors());
    app.get("/", (req, resp) => {
        resp.send("App works fine");
    });

    app.post("/register", async(req,resp) => {
        try{
            const user = new User(req.body);
            let result = await user.save();
            result = result.toObject();
            if(result) {
                delete result.password;
                resp.send(req.body);
                console.log(result);
            }else{
                console.log("User already registered");
            }
        } catch (e) {
            resp.send("Something wen wrong");
        }
    });
    app.listen(5000);