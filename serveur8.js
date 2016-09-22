// créer un fichier bidon

//url = "http://www.lifl.fr/miny/masterinfo/tableau.php";
url = "http://btrd.me/tac/tableau.php";
dataType = "jsonp";
method = "get";

function success(json) {
    console.log(json);
    retourJSON = json;
}

function error(event) {
    console.log("Erreur : la requête AJAX n'a pas abouti : ");
    console.log(event);
}

function requeteGenerique(data) {
    var allData = {
        url: url,
        dataType: dataType,
        method: method,
        data: data,
        success: success,
        error: error
    };
    if (arguments.length > 1 && arguments[1]!=undefined)
        allData.success = arguments [1];
    if (arguments.length > 2 && arguments[2]!=undefined)
        allData.error = arguments [2];
    $.ajax(allData);
}

function creerTableau(nomTableau, success, error) {
    requeteGenerique(
        {
            nomTableau: nomTableau,
            action: "creerTableau"
        }
        , success, error
    );
}

function supprimerTableau(nomTableau, success, error) {
    requeteGenerique(
        {
            nomTableau: nomTableau,
            action: "supprimerTableau"
        }, success, error
    );
}

function testerExistenceTableau(nomTableau, success, error) {
    requeteGenerique(
        {
            nomTableau: nomTableau,
            action: "testerExistenceTableau"
        },
        success, error
    );
}

function ajouterElementsDansTableauALaFin(nomTableau, tableauElements, success, error) {
    requeteGenerique(
        {
            nomTableau: nomTableau,
            action: "ajouterElementsDansTableau",
            elementsAAjouter: tableauElements
        },
        success,
        error
    );
}

function ajouterElementDansTableauALaFin(nomTableau, element, success, error) {
    requeteGenerique(
        {
            nomTableau: nomTableau,
            action: "ajouterElementsDansTableau",
            elementsAAjouter: [element],
        },
        success,
        error
    );
}

function ajouterElementsDansTableauALaFin2(nomTableau, success, error) {
    var tableauElements = new Array();
    for (var i = 1; i < arguments.length; i++)
        tableauElements.push(arguments[i]);

    requeteGenerique(
        {
            nomTableau: nomTableau,
            action: "ajouterElementsDansTableau",
            elementsAAjouter: tableauElements
        },
        success, error
    );
}


function ajouterElementsDansTableauA(nomTableau, emplacement, success, error) {
    var tableauElements = new Array();
    for (var i = 1; i < arguments.length; i++)
        tableauElements.push(arguments[i]);

    requeteGenerique(
        {
            nomTableau: nomTableau,
            action: "ajouterElementsDansTableau",
            elementsAAjouter: tableauElements,
            emplacement: emplacement
        },
        success, error
    );
}


function supprimerUnElementDansTableau(nomTableau, emplacement, success, error) {
    requeteGenerique(
        {
            nomTableau: nomTableau,
            action: "supprimerUnElementDansTableau",
            emplacement: emplacement
        },
        success, error
    );
}


function avoirElementDansTableau(nomTableau, emplacement, success, error) {
    requeteGenerique(
        {
            nomTableau: nomTableau,
            action: "avoirElementDansTableau",
            emplacement: emplacement
        },
        success, error
    );
}


function modifierUnElementDansTableau(nomTableau, element, emplacement, success, error) {
    requeteGenerique(
        {
            nomTableau: nomTableau,
            action: "modifierUnElementDansTableau",
            element: element,
            emplacement: emplacement
        },
        success, error
    );
}


function avoirToutLeTableau(nomTableau, success, error) {
    return requeteGenerique(
        {
            nomTableau: nomTableau,
            action: "avoirToutLeTableau"
        },
        success, error
    );
}

// exemple :
// reponse = {}
// avoirToutLeTableau("tableauZave",function (json) {reponse.tab=json.donnees.tableau;})
