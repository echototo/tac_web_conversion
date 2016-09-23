class Creneau{
  constructor(debut,fin,resume,lieu){
    this.debut=debut;
    this.fin=fin;
    this.resume=resume;
    this.lieu=lieu;
  }
}

class Conversion{
  constructor(icsData, jsonData){
    this.icsData = icsData;
    this.jsonData = jsonData;
    this.creneaux=new Array;
  }

  handleEvent(){
    if(this.creneaux.length===0){
      this.creneauxFunction();
      document.getElementById(this.jsonData).value=JSON.stringify(this.creneaux);
    }else{
      this.envoyerAuServeur();
    }
  }

  convert(){
    var string = document.getElementById(this.icsData).value;
    var tableau = string.split("BEGIN:VEVENT");
    var aAfficher="";
    tableau.shift();
    for(var i=0;i<tableau.length;i++){
      var subArray=tableau[i].split("\n");
      subArray.shift();
      aAfficher+="{\n";
      var j;
      for(j=0;j<subArray.length-3;j++){
        var champ = subArray[j];
        if(champ.indexOf(":")!=-1){
          var couple = champ.split(":");
          aAfficher += " "+couple[0]+" : '"+couple[1]+"',";
        }
      }
      champ = subArray[j++];
      if(champ.indexOf(":")!=-1){
        var couple = champ.split(":");
        aAfficher += " "+couple[0]+" : '"+couple[1]+"'\n";
      }
      aAfficher+="}\n"
    }
    return aAfficher;
  }

  creneauxFunction(){
    var str = document.getElementById(this.icsData).value;
    var tableau = str.split("BEGIN:VEVENT");
    tableau.shift();
    for(var index=0;index<tableau.length;index++){
      var subArray=tableau[index].split("\n");
      var creneau = new Creneau();
      for(var j=0;j<subArray.length;j++){
        if(subArray[j].indexOf(":")!=-1){
          var couple = subArray[j].split(":");
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
      this.creneaux.push(creneau);
    }
  }

  sendElement(){
    console.log("totoro");
    var creneauCourant;
    for(var i=0;i<this.creneaux.length;i++){
      creneauCourant=this.creneaux[i];
      ajouterElementDansTableauALaFin("tableauAlex",  creneauCourant,
        function () {
          console.log(creneauCourant+ "envoyé au serveur");
        },
        function () {
         console.log(creneauCourant+ "PAS envoyé au serveur");
       }
     );
   }

   this.createArray();
  }


  createArray(){
    var tableau;
    var tr,trhead,td,th,div,tbody,thead;
    var creneauxCourant;
    var id=document.getElementById("tableau");
    var table= id.appendChild(document.createElement("table"));
    table.className="table table-striped";
    avoirToutLeTableau("tableauLePallec", function (json) {
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
        console.log(table);
    });
  }

  envoyerAuServeur(){
    var context=this;
    testerExistenceTableau("tableauAlex",function(json){
      if(json.donnees.existence){
        supprimerTableau("tableauAlex",function(){
          console.log("supprimer");
          creerTableau("tableauAlex",function(){
            console.log("recréer");
              context.sendElement();
          });
        });
      }else{
        creerTableau("tableauAlex",function(){
          console.log("créer");
          context.sendElement();
        });
      }
    });
  }



}


document.getElementById("convertir").addEventListener("click", new Conversion("icsData","jsonData"));


/*
function Conversion(icsData,jsonData){
  this.icsData = icsData;
  this.jsonData = jsonData;
  this.creneaux=new Array;
}

function Creneau (debut){
  var debut;
  this.__defineGetter__("debut",function(){
      return debut;
  });
  this.__defineSetter__("debut",function(value){
    if(value.startsWith("T")){
      debut=value;
    }
  });
  this.debut=debut;
  this.fin=fin;
  this.resume=resume;
  this.lieu=lieu;
}

Conversion.prototype.handleEvent = function(){
  this.creneauxFunction();
  document.getElementById(this.jsonData).value=JSON.stringify(this.creneaux);
}

Conversion.prototype.convert = function(){
  var string = document.getElementById(this.icsData).value;
  var tableau = string.split("BEGIN:VEVENT");
  var aAfficher="";
  tableau.shift();
  for(var i=0;i<tableau.length;i++){
    var subArray=tableau[i].split("\n");
    subArray.shift();
    aAfficher+="{\n";
    var j;
    for(j=0;j<subArray.length-3;j++){
      var champ = subArray[j];
      if(champ.indexOf(":")!=-1){
        var couple = champ.split(":");
        aAfficher += " "+couple[0]+" : '"+couple[1]+"',";
      }
    }this.icsData = icsData;
this.jsonData = jsonData;
this.creneaux=new Array;

    champ = subArray[j++];
    if(champ.indexOf(":")!=-1){
      var couple = champ.split(":");
      aAfficher += " "+couple[0]+" : '"+couple[1]+"'\n";
    }
    aAfficher+="}\n"
    console.log(aAfficher);
  }
  return aAfficher;
}

Conversion.prototype.creneauxFunction = function(){
  var str = document.getElementById(this.icsData).value;
  var tableau = str.split("BEGIN:VEVENT");
  tableau.shift();
  for(var index=0;index<tableau.length;index++){
    var subArray=tableau[index].split("\n");
    var creneau = new Creneau();
    for(j=0;j<subArray.length;j++){
      if(subArray[j].indexOf(":")!=-1){
        var couple = subArray[j].split(":");
        console.log(couple);
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
    this.creneaux.push(creneau);
  }
}
/*
Conversion = {
  handleEvent:function(){
    this.convertEvent();
  },
  convertEvent:function(){
    var string = document.getElementById("icsData").value;
    var tableau = string.split("BEGIN:VEVENT");
    var aAfficher="";
    tableau.shift();
    for(var i=0;i<tableau.length;i++){
      var subArray=tableau[i].split("\n");
      subArray.shift();
      aAfficher+="{\n";
      var j;
      for(j=0;j<subArray.length-3;j++){
        var champ = subArray[j];
        if(champ.indexOf(":")!=-1){
          var couple = cfacebook.comhamp.split(":");
          aAfficher += " "+couple[0]+" : '"+couple[1]+"',";
        }Event:function(){
    this.convertEvent();
  },
  convertEvent:function(){
    var string = document.getElementById("icsData").value;
    var tableau = string.split("BEGIN:VEVENT");
    var aAfficher="";
    tableau.shift(
      }
      champ = subArray[j++];
      if(champ.indexOf(":")!=-1){
        var couple = champ.split(":");
        aAfficher += " "+couple[0]+" : '"+couple[1]+"'\n";
      }
      aAfficher+="}\n"
      console.log(aAfficher);
    }
    document.getElementById("jsonData").value=aAfficher;
  }
}
*/
