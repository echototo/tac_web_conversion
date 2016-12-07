class Affichage {

    constructor(id) {
        this.tableau = document.getElementById(id);
    }

    createArray() {
        var tableau;
        var tr, trhead, td, th, div, tbody, thead;
        var creneauxCourant;
        var id = this.tableau;
        var table = id.appendChild(document.createElement("table"));
        table.className = "table table-striped";
        avoirToutLeTableau("tableauAlex", function(json) {
            tableau = json.donnees.tableau;

            thead = table.appendChild(document.createElement("thead"));
            trhead = thead.appendChild(document.createElement("tr"));

            for (var item in tableau[0]) {
                th = trhead.appendChild(document.createElement("th"));
                th.setAttribute("class", "col-lg-3");
                th.innerHTML = item;
            }

            tbody = table.appendChild(document.createElement("tbody"));

            for (var i = 0; i < tableau.length; i++) {
                tr = tbody.appendChild(document.createElement("tr"));
                creneauxCourant = tableau[i];
                for (var item in creneauxCourant) {
                    td = tr.appendChild(document.createElement("td"));
                    td.setAttribute("class", "col-lg-3");
                    td.innerHTML = creneauxCourant[item];
                }
            }
        });
    }
}