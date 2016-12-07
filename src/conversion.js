class Conversion{

  constructor(icsData, jsonData){
    this.icsData = document.getElementById(icsData);
    this.jsonData = document.getElementById(jsonData);
    this.creneaux = [];
  }

  handleEvent(){
    if(this.creneaux.length===0){
      var icsData =  this.icsData.value;
      this.icsToJson(icsData);
      this.jsonData.value=JSON.stringify(this.creneaux);
    }else{
      this.sendToServer();
    }
  }

  icsToJson(icsData){
      var tableau = icsData.split("BEGIN:VEVENT");
      tableau.shift();
      for(var index=0;index<tableau.length;index++){

        var creneau = this.convertCreneau(tableau[index]);
        this.creneaux.push(creneau);
      }
    }

  convertCreneau(icsData){
    var subArray = icsData.split("\n");
    var creneau = new Creneau();

    for(var j=0; j<subArray.length ; j++){
        this.convertField(creneau,subArray[j]);
    }

    return creneau;
  }

  convertField(creneau,subArray){
     if(subArray.indexOf(":") != -1){

        var couple = subArray.split(":");

        if(couple[0].startsWith("DTSTART")){
          creneau.debut= couple[1];
        }
        if(couple[0].startsWith("DTEND")){
          creneau.fin= couple[1];
        }
        if(couple[0].startsWith("SUMMARY")){
          creneau.resume= couple[1];
        }
        if(couple[0].startsWith("LOCATION")){
          creneau.lieu= couple[1];
        }
      }
  }

  sendElement(){
    var creneauCourant;
    for(var i=0;i<this.creneaux.length;i++){
      creneauCourant=this.creneaux[i];
      ajouterElementDansTableauALaFin("tableauAlex",  creneauCourant,
        function () {
          console.log(creneauCourant+ " envoyé au serveur");
        },
        function () {
         console.log(creneauCourant+ " PAS envoyé au serveur");
       }
     );
   }

   this.createArray();
  }

  sendToServer(){
    var context=this;
    testerExistenceTableau("tableauAlex",function(json){
      if(json.donnees.existence){
        supprimerTableau("tableauAlex",function(){
          creerTableau("tableauAlex",function(){
              context.sendElement();
          });
        });
      }else{
        creerTableau("tableauAlex",function(){
          context.sendElement();
        });
      }
    });
  }

   createArray(){
    var tableau;
    var tr,trhead,td,th,div,tbody,thead;
    var creneauxCourant;
    var id=document.getElementById("tableau");
    var table= id.appendChild(document.createElement("table"));
    table.className="table table-striped";
    avoirToutLeTableau("tableauAlex", function (json) {
        tableau = json.donnees.tableau;

        thead =  table.appendChild(document.createElement("thead"));
        trhead = thead.appendChild(document.createElement("tr"));

        for (var item in tableau[0]){
          th = trhead.appendChild(document.createElement("th"));
          th.setAttribute("class","col-lg-3");
          th.innerHTML=item;
        }

        tbody = table.appendChild(document.createElement("tbody"));

        for(var i=0;i<tableau.length;i++) {
            tr = tbody.appendChild(document.createElement("tr"));
            creneauxCourant = tableau[i];
            for (var item in creneauxCourant){
              td = tr.appendChild(document.createElement("td"));
              td.setAttribute("class","col-lg-3");
              td.innerHTML=creneauxCourant[item];
            }
        }
    });
  }
}