const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const fs = require('fs');
const app = express();
const port = 3000;
let isLoggedIn = false;

app.use(express.json()); // Lar serveren forstå JSON som kommer inn
app.use(express.static('./')); // Serverer html-filen og json-filen din

mongoose.connect(MONGOKEY)
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.error("Could not connect to MongoDB:", err));

// 2. Create the User Blueprint (Schema)
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    avatar: String
});

// lag user mal
const User = mongoose.model('User', UserSchema);

// Registering av ny bruker
app.post('/register', async (req, res) => {
    const { username, password, avatar } = req.body;

    try {
        // 10 er god styrke
        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            username: username,
            password: hashedPassword,
            avatar: avatar
        });

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
        // 1. Finn brukeren KUN ved hjelp av brukernavn
        const user = await User.findOne({ username: username });

        if (!user) {
            // Fant ingen bruker med det navnet
            return res.json({ status: "error", message: "Wrong username or password" });
        }

        // 2. Sjekk om passordet stemmer med hashen i databasen
        // bcrypt.compare(passordet_brukeren_skrev, passordet_i_databasen)
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Passordet er riktig!
            isLoggedIn = true;
            res.json({
                status: "ok",
                message: "Login successful",
                username: user.username,
                avatar: user.avatar

            });
        } else {
            // Feil passord
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
        if (nyMelding.message === "/slett" && nyMelding.username === "djswaxy" && isLoggedIn === true)  { //sjekk om admin
            // Hvis meldingen er nøyaktig "/slett", tømmer vi listen!
            chatLog = [];
            console.log("Chat-loggen er tømt av admin " + nyMelding.username);
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
app.post('/SLETTMELDINGER', (req, res) => {
    // 1. Lag en tom liste
    const tomListe = [];

    // 2. Skriv den tomme listen over den gamle chatlog.json-filen
    fs.writeFile('./chatlog.json', JSON.stringify(tomListe), (err) => {
        if (err) {
            console.error("Kunne ikke slette chatlog:", err);
            res.status(500).send("Feil ved sletting");
            return;
        }
        // 3. Send tommel opp tilbake til nettleseren
        console.log("Chatloggen ble slettet av en admin.");
        res.sendStatus(200); // 200 betyr OK
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