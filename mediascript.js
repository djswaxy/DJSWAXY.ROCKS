function hentDagensDikt() {

    fetch("./poems.json")
        .then(response => response.json())
        .then(alleDikt => {
            // 1. Velg dikt basert på dato (samme logikk som sist)
            const iDag = new Date();
            const dagNummer = Math.floor(iDag.getTime() / (1000 * 60 * 60 * 24));
            const diktIndeks = dagNummer % alleDikt.poems.length;

            const dagensDikt = alleDikt.poems[diktIndeks];


            document.getElementById("diktTittel").innerHTML = "" + dagensDikt.title || "Uten tittel";
            document.getElementById("diktForfatter").innerHTML = dagensDikt.author;
            //ocument.getElementById("diktDynasti").innerHTML = "(" + dagensDikt.dynasty + "-dynastiet)";

            //fikser linjene
            let formatertTekst = dagensDikt.text.split("|").join("<br>");

            document.getElementById("diktTekst").innerHTML = dagensDikt.text;
        })
        .catch(error => console.error("Kunne ikke laste dikt:", error));
}

hentDagensDikt();