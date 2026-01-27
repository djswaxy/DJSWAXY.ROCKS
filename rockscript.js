
const Duckbutton = document.getElementById("secretbutton");
const secretinput = document.getElementById("secretinput");
const chatbutton = document.getElementById("chatbutton");
let saveddata = [];


    // Set the date we're counting down to
    let countDownDate = new Date("Dec 18, 2026 12:00:00").getTime();

    // Update the count down every 1 second
    let x = setInterval(function() {

    // Get today's date and time
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("demo").innerHTML = days + "d<br> " + hours + "h<br> "
    + minutes + "m<br> " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
}
}, 1000);

document.addEventListener('play', function(e){
    var audios = document.getElementsByTagName('audio');
    for(var i = 0, len = audios.length; i < len;i++){
        if(audios[i] != e.target){
            audios[i].pause();
        }
    }
}, true);

const Sound1 = document.getElementById("Silverflame");
const Sound2 = document.getElementById("SpaceOddity");
const Sound3 = document.getElementById("SuspendedInGaffa");
const Sound4 = document.getElementById("AwesomeMixVol1");


function Toggle1() {
    return Sound1.paused ? Sound1.play() : Sound1.pause();
}
function Toggle2() {
    return Sound2.paused ? Sound2.play() : Sound2.pause();
}
function Toggle3() {
    return Sound3.paused ? Sound3.play() : Sound3.pause();
}
function Toggle4() {
    return Sound4.paused ? Sound4.play() : Sound4.pause();
}


function getdata() {
    fetch("./chatlog.json?v=" + Date.now())
        .then(response => response.json()) // Parse JSON
        .then(data => {
            saveddata = data;
            document.getElementById("chatlog").innerHTML = ""; //clear all chats
            data.forEach(entry => {
                    logpusher(entry);
                }
            ) // Work with JSON data
        })
}

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
            const brukerFarge = data.color || "#00008BFF";
            newP.innerHTML = `<span style='color: ${brukerFarge}; font-weight: bold;'>${data.username}</span>: ${data.message}`;
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
// 21 + 14 + 14 + 14 Cards = 63 kort.


function Tarot() {
    const TarotRow = document.getElementById("TarotRow");
    const TarotDataRow = document.getElementById("TarotDataRow");
    document.getElementById("tarotmeaninglink").style.display = "flex";
    TarotRow.innerHTML = "";
    TarotDataRow.innerHTML = "";
    // Gjør kortene synlige.
    TarotRow.style.display = "flex";

    fetch("./tarot-images.json", {})
        .then(response => response.json()) // Parse JSON
    .then(data => {

        const cards = data.cards;
        let tarotcard1 = [Math.floor(Math.random() * cards.length),Math.floor(Math.random()*2)];
        let tarotcard2 = [Math.floor(Math.random() * cards.length),Math.floor(Math.random()*2)];
        let tarotcard3 = [Math.floor(Math.random() * cards.length),Math.floor(Math.random()*2)];
        let cardnumber = 0;
        const valgteKort = [tarotcard1, tarotcard2, tarotcard3];


        valgteKort.forEach(kort => {
            let p = document.createElement("p");
            let img = document.createElement("img");
            let kortindex = kort[0];
            let retning = kort[1];
            let kortData = cards[kortindex];
            // Her kan du også legge til mer info, f.eks: kort.name + " (" + kort.number + ")"

            if (retning === 0) {
                 facing = "Upside Down"
                img.style.transform = "rotate(180deg)";
            }
            else {
                 facing = "Upright"
            }

            cardnumber++;
            p.innerHTML = "Card " + cardnumber +" - "+ "<strong>"+facing+": "+kortData.name +
                ": " + kortData.arcana+ "</strong>"+" "+ "suit: " + kortData.suit;
            p.style.color = "white";
            img.src = "./cards/" + kortData.img;
            img.width = 175;
            img.height = 300;
            TarotDataRow.appendChild(p);
            TarotRow.appendChild(img);
        });

    })
}
        let nameset = 0;
        let username = "";
        if (chatbutton) {
          chatbutton.addEventListener("click", pressedfirstquestion);
            }
        function pressedfirstquestion() {
            const chatinput = document.getElementById("chatinput");
            if (loggedInUser) {
                username = loggedInUser;
                addchat(username);
            }
            else {
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

                else if (chatmessage === "/slett" && loggedInUser === "djswaxy") {
                    fetch("/SLETTMELDINGER", {
                        method: "POST"
                    })
                        .then(response => {
                            if (response.ok) {
                                document.getElementById("chatlog").innerHTML = "";
                                saveddata = []; // Nullstill lokal hukommelse
                                alert("🧹 POOF! Chatloggen er slettet for alle.");
                            }
                        })
                    chatinput.value = "";
                    return;
                }
                else {

                }
                const FavColor = localStorage.getItem("FavColor") || "blue"; // ikke logget ind -> bruk blå!
                const newEntry = {
                    username: username,
                    message: chatmessage,
                    color: FavColor
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




            }
        }
        //setInterval(getdata,1000);
setInterval(() => {
    fetch("./chatlog.json?v=" + Date.now()) // ?v=... hindrer at nettleseren husker gammel data
        .then(response => response.json())
        .then(data => {

            // SJEKK: Har serveren færre meldinger enn oss? Da er det slettet!
            if (data.length < saveddata.length) {
                document.getElementById("chatlog").innerHTML = ""; // Tøm skjermen
                saveddata = []; // Tøm minnet
                // Hvis du vil laste inn eventuelle nye meldinger som kom etter sletting:
                data.forEach(entry => logpusher(entry));
            }

            // SJEKK: Har serveren flere meldinger enn oss? Legg til de nye.
            else if (data.length > saveddata.length) {
                const newMessages = data.slice(saveddata.length);
                newMessages.forEach(entry => logpusher(entry));
            }

            // Oppdater saveddata til slutt
            saveddata = data;
        });
}, 2000); // Sjekker hvert 2. sekund



























































const bannedslurs = ["nigger", "nigga", "n1igger", "retard","homo","niggger","niggger","n!igger"]