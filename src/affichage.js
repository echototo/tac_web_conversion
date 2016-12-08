class Affichage {

    constructor(id, name) {
        this.tableau = document.getElementById(id);
        this.name = name;
    }

    getData() {
        var context = this;

        avoirToutLeTableau(this.name, function(data) {
            context.createArray(data);
        });
    }

    createArray(data) {
      var tableau;
      var tr, trhead, td, th, tbody, thead;
      var creneauxCourant;

        if((tableau=data.donnees.tableau)===null){
            this.tableau.innerHTML="Pas de donnée";
            return;
        }

        var table = this.tableau.appendChild(document.createElement("table"));
        table.className = "table table-striped table-bordered";

        thead = table.appendChild(document.createElement("thead"));
        trhead = thead.appendChild(document.createElement("tr"));
        trhead.appendChild(document.createElement("th")).innerHTML = "#";

        Object.keys(tableau[0]).forEach(function(key) {
          th = trhead.appendChild(document.createElement("th"));
          th.innerHTML = key;
        });

        tbody = table.appendChild(document.createElement("tbody"));

        for (var i = 0; i < tableau.length; i++) {
            tr = tbody.appendChild(document.createElement("tr"));
            creneauxCourant = tableau[i];
            tr.appendChild(document.createElement("th")).innerHTML = i;

            Object.keys(creneauxCourant).forEach(function(key) {
              td = tr.appendChild(document.createElement("td"));
              td.innerHTML = creneauxCourant[key];
            });
        }
    }
}
