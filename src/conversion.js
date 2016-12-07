class Conversion {

    constructor(icsData, jsonData) {
        this.icsData = document.getElementById(icsData);
        this.jsonData = document.getElementById(jsonData);
        this.creneaux = [];
    }

    handleEvent() {
        if (this.creneaux.length === 0) {
            var icsData = this.icsData.value;
            this.icsToJson(icsData);
            this.jsonData.value = JSON.stringify(this.creneaux);
        } else {
            this.sendToServer();
        }
    }

    icsToJson(icsData) {
        var tableau = icsData.split("BEGIN:VEVENT");
        tableau.shift();
        for (var index = 0; index < tableau.length; index++) {

            var creneau = this.convertCreneau(tableau[index]);
            this.creneaux.push(creneau);
        }
    }

    convertCreneau(icsData) {
        var subArray = icsData.split("\n");
        var creneau = new Creneau();

        for (var j = 0; j < subArray.length; j++) {
            this.convertField(creneau, subArray[j]);
        }

        return creneau;
    }

    convertField(creneau, subArray) {
        if (subArray.indexOf(":") != -1) {

            var couple = subArray.split(":");

            if (couple[0].startsWith("DTSTART")) {
                creneau.debut = couple[1];
            }
            if (couple[0].startsWith("DTEND")) {
                creneau.fin = couple[1];
            }
            if (couple[0].startsWith("SUMMARY")) {
                creneau.resume = couple[1];
            }
            if (couple[0].startsWith("LOCATION")) {
                creneau.lieu = couple[1];
            }
        }
    }

    sendToServer() {
        var context = this;
        testerExistenceTableau("tableauAlex", function(json) {
            if (!json.donnees.existence) {
                creerTableau("tableauAlex");
            }
            context.sendElement();
        });
    }

    sendElement() {
        var creneauCourant;
        for (var i = 0; i < this.creneaux.length; i++) {
            creneauCourant = this.creneaux[i];
            ajouterElementDansTableauALaFin("tableauAlex", creneauCourant,
                function() {
                    console.log(creneauCourant + " envoyé au serveur");
                },
                function() {
                    console.log(creneauCourant + " PAS envoyé au serveur");
                }
            );
        }
    }
}