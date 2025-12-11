const express = require('express');
const mongoose = require("mongoose");
const fs = require('fs');
const app = express();
const port = 3000;


app.use(express.json()); // Lar serveren forstå JSON som kommer inn
app.use(express.static('./')); // Serverer html-filen og json-filen din

mongoose.connect('mongodb+srv://emilostberg23_db_user:Vovov123%21%23%23%21@djswaxycluster.ml4pmmq.mongodb.net/?appName=djswaxycluster')
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.error("Could not connect to MongoDB:", err));

// 2. Create the User Blueprint (Schema)
const UserSchema = new mongoose.Schema({
    username: String,
    password: String, // Note: In real apps, never save passwords as plain text!
    avatar: String
});

// 3. Create the Model
const User = mongoose.model('User', UserSchema);

// 4. The Registration Route
app.post('/register', async (req, res) => {
    const { username, password, avatar } = req.body;

    try {
        // Create a new user in memory
        const user = await User.findOne({ username: username });
        if (!user) {
            const newUser = new User({
                username: username,
                password: password,
                avatar: avatar
            });
        }
        if (user) {
            alert(`User already exists!`);
            return;
        }


        // Save to database
        await newUser.save();

        console.log("New user saved:", username);
        res.json({ status: "ok", message: "User created!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Could not save user" });
    }
});
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username AND password
        const user = await User.findOne({ username: username, password: password });

        if (user) {
            // Found them! Send back their details (including avatar)
            res.json({
                status: "ok",
                message: "Login successful",
                username: user.username,
                avatar: user.avatar
            });
        } else {
            // No match found
            res.json({ status: "error", message: "Wrong username or password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Server error" });
    }
});
// Dette er "Postkassen" som tar imot meldingene fra Frontend
app.post('/lagre-melding', (req, res) => {
    const nyMelding = req.body;

    // 1. Les filen først
    fs.readFile('chatlog.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Feil ved lesing');
        }

        let chatLog = JSON.parse(data);

        // --- HER ER MAGIEN ---
        if (nyMelding.message === "/slett") {
            // Hvis meldingen er nøyaktig "/slett", tømmer vi listen!
            chatLog = [];
            console.log("Chat-loggen er tømt av brukeren " + nyMelding.username);
        }
        else {
            // Hvis ikke, lagre som normalt
            chatLog.push(nyMelding);
        }
        // ---------------------

        // 2. Skriv resultatet tilbake til filen
        fs.writeFile('chatlog.json', JSON.stringify(chatLog, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Feil ved lagring');
            }
            // Send svar tilbake til frontend om at det gikk bra
            res.json({ status: "ok", action: nyMelding.message === "/slett" ? "cleared" : "saved" });
        });
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
/*
app.listen(port, () => {
    console.log(`Serveren kjører på http://localhost:${port}`);
});

*/