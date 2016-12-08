QUnit.module("affichage_test");

QUnit.test('test getArray', function(assert) {
    var fixture = '<div id="test"/>';
    var fixtureNode = document.getElementById('qunit-fixture');
    fixtureNode.innerHTML = fixture;
    var affichage = new Affichage("test", "test");
    var getDataStub = sinon.stub(window, 'avoirToutLeTableau', function(type, callback) {
        callback({
            donnees: {
                tableau: []
            }
        });
    });
    var createArrayStub = sinon.stub(affichage, 'createArray');

    affichage.getData();

    assert.ok(getDataStub.calledOnce);
    assert.ok(createArrayStub.calledOnce);

    window.avoirToutLeTableau.restore();
    affichage.createArray.restore();
});

QUnit.test('test createArray', function(assert) {
    var fixture = '<div id="test"/>';
    var fixtureNode = document.getElementById('qunit-fixture');
    fixtureNode.innerHTML = fixture;

    var affichage = new Affichage("test", "test");
    var creneau = new Creneau();
    creneau.debut = "20160907T143000";
    creneau.fin = "20160907T151500";
    creneau.resume = "De la protection de la vie privée à L'Inria";
    creneau.lieu = "M5 - A2";
    var data = {
        donnees: {
            tableau: [creneau]
        }
    };
    var expected =
    "<table class=\"table table-striped table-bordered\">"+
    "<thead>" +
    "<tr>" +
    "<th>#</th>" +
    "<th>debut</th>" +
    "<th>fin</th>" +
    "<th>resume</th>" +
    "<th>lieu</th>" +
    "</tr>" +
    "</thead>" +
    "<tbody>" +
    "<tr>" +
    "<th>0</th>" +
    "<td>20160907T143000</td>" +
    "<td>20160907T151500</td>" +
    "<td>De la protection de la vie privée à L'Inria</td>" +
    "<td>M5 - A2</td>" +
    "</tr>" +
    "</tbody>" +
    "</table>";

    affichage.createArray(data);

    assert.equal(expected, document.getElementById("test").innerHTML);
});

QUnit.test('test createArray with no data', function(assert) {
    var fixture = '<div id="test"/>';
    var fixtureNode = document.getElementById('qunit-fixture');
    fixtureNode.innerHTML = fixture;
    var affichage = new Affichage("test", "test");
    var data = {
        donnees: {
            tableau: null
        }
    };

    affichage.createArray(data);

    assert.deepEqual("Pas de donnée", document.getElementById("test").innerHTML);
});
