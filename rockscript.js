const Duckbutton = document.getElementById("secretbutton");
const secretinput = document.getElementById("secretinput");

let saveddata = [];

fetch("./chatlog.json")
    .then(response => response.json()) // Parse JSON

    .then(data => {
        saveddata = data;


        // Nå er "data" en liste, så vi kan bruke .forEach direkte
        data.forEach(entry => {
                logpusher(entry);

            }
        ) // Work with JSON data


    })
    .catch(error => console.error('Error fetching JSON:', error));

        function logpusher(data) {
            const newP = document.createElement("p");
            newP.innerHTML = `<span style='color: blue; font-weight: bold;'>${data.username}</span>: ${data.message}`;
            document.getElementById("chatlog").appendChild(newP);
            const chatLog = document.getElementById("chatlog");
            chatLog.scrollTop = chatLog.scrollHeight;
        }


        Duckbutton.addEventListener("click", (e) => {
            if (secretinput.value === "andedammen") {
                window.location.href = "./dammen.html";
            } else {
                alert("FEJL!");
            }
        })
        const Countbutton = document.getElementById("counterbtn");
        const countervalue = document.getElementById("CounterValue");
        const titletext = document.getElementById("djswaxyrockstext");
        let counter = 0;
        Countbutton.addEventListener("click", (e) => {
            counter++;
            countervalue.innerText = "" + counter;
            if (counter % 2) {
                titletext.innerHTML = "djswaxy.rocks \\_0.O_/ "
            }
            else {
                titletext.innerHTML = "skcor.yxawsjd \\_0.O_/ "
            }

        })


        let nameset = 0;
        let username = "";
        if (chatbutton) {
          chatbutton.addEventListener("click", pressedfirstquestion);
            }
        function pressedfirstquestion() {
            const chatinput = document.getElementById("chatinput");
            if (nameset === 0) {
                if (bannedslurs.includes(chatinput.value)) {
                    username = "iamstupid";
                }
                else {
                    username = chatinput.value;
                }

                chatinput.value = "";
                nameset++;
                document.getElementById("chatinput").placeholder = "type a message now!";

            } else {
                addchat(username);
            }

            function addchat(username) {
                const chatinput = document.getElementById("chatinput");
                let chatmessage = chatinput.value;
                const newP = document.createElement("p");
                if (bannedslurs.includes(chatmessage)) {
                    chatmessage = "iamstupid";
                }
                else if (chatmessage === "/hackermode") {
                    // Endre bakgrunnen på HELE siden
                    document.body.style.backgroundColor = "black";
                    document.body.style.fontFamily = "Courier New, monospace";

                    // Endre selve chat-boksen (ID chatlog)
                    const chatLog = document.getElementById("chatlog");
                    chatLog.style.backgroundColor = "black";
                    chatLog.style.color = "#00FF00"; // Grønn tekst
                    chatLog.style.border = "1px solid #00FF00"; // Kul grønn kantlinje

                    chatinput.value = "";
                    return;
                }
                else if (chatmessage === "/normalmode") {
                    const chatLog = document.getElementById("chatlog");
                    document.body.style.backgroundColor = "";
                    chatLog.style.backgroundColor = "";
                    document.body.style.fontFamily = "";
                    document.getElementById("chatlog").style.color = "";
                    document.getElementsByClassName("ChatDiv").style.backgroundColor = "";
                    chatLog.style.border = ""; // Kul grønn kantlinje
                    chatinput.value = "";
                    return;
                }
                else {

                }
                const newEntry = {
                    username: username,
                    message: chatmessage,
                };
                //logpusher(newEntry);
                saveddata.push(newEntry);

                fetch("./lagre-melding", {

                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newEntry)

                })

            .then(response => response.json())
                .then(data => {
                    if (data.action === "cleared") {
                        document.getElementById("chatlog").innerHTML = "";
                        alert("🧹 Chatten er tømt!");
                    }
                    else {
                        //logpusher(newEntry); //putter i Diven så det ikke blir delay.
                    }

                })
                chatinput.value = "";
            }
        }
// Sjekk etter nye meldinger hvert 2. sekund (2000ms)
setInterval(() => {
    fetch("./chatlog.json")
        .then(response => response.json())
        .then(data => {
            // Hvis serveren har FLERE meldinger enn oss -> Legg til de nye
            if (data.length > saveddata.length) {
                // Hent bare de nye meldingene (slice)
                const newMessages = data.slice(saveddata.length);

                newMessages.forEach(entry => logpusher(entry));
                saveddata = data; // Oppdater hukommelsen vår
            }
            // Hvis serveren har FÆRRE meldinger (noen skrev /slett) -> Tøm alt
            else if (data.length < saveddata.length) {
                document.getElementById("chatlog").innerHTML = "";
                saveddata = data;
            }
        });
}, 2000);











const bannedslurs = ["nigger", "nigga", "n1igger", "retard","homo","niggger","niggger","n!igger"]