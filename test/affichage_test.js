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

    var getDataStub = sinon.stub(window, 'avoirToutLeTableau', function(type, callback) {
        callback({
            donnees: {
                tableau: [creneau]
            }
        });
    });

    var expected="<table><thead><th><"

    assert.equal(1,1);
    window.avoirToutLeTableau.restore();
});
