class Affichage {

    constructor(id, name) {
        this.tableau = document.getElementById(id);
        this.name = name;
    }

    /*
    handleEvent() {
        supprimerTableau(this.name, this.clearArray());
    }
    */

    getData() {
        var context = this;
        var table = this.tableau.appendChild(document.createElement("table"));
        table.className = "table table-striped table-bordered";
        avoirToutLeTableau(this.name, function(data) {
            context.createArray(table, data);
        });
    }

    createArray(table, data) {
        var tableau;
        var tr, trhead, td, th, div, tbody, thead;
        var creneauxCourant;
        tableau = data.donnees.tableau;

        thead = table.appendChild(document.createElement("thead"));
        trhead = thead.appendChild(document.createElement("tr"));

        trhead.appendChild(document.createElement("th")).innerHTML = "#";

        for (var item in tableau[0]) {
            th = trhead.appendChild(document.createElement("th"));
            th.innerHTML = item;
        }

        tbody = table.appendChild(document.createElement("tbody"));

        for (var i = 0; i < tableau.length; i++) {
            tr = tbody.appendChild(document.createElement("tr"));
            creneauxCourant = tableau[i];
            tr.appendChild(document.createElement("th")).innerHTML = i;
            for (var item in creneauxCourant) {
                td = tr.appendChild(document.createElement("td"));
                td.innerHTML = creneauxCourant[item];
            }
        }
    }

    /*
    clearArray() {
        this.tableau.innerHTML = "";
    }
    */
}
