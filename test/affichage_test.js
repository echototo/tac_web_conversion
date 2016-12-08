QUnit.module("affichage_test");

QUnit.test('test getArray', function(assert) {
  var fixture = '<div id="test"/>';
  var fixtureNode = document.getElementById('qunit-fixture');
  fixtureNode.innerHTML = fixture;

  var aff = new Affichage("test","test");
  var getDataStub = sinon.stub(window, 'avoirToutLeTableau', function(type, callback) { callback({donnees: { tableau: []}}); });
  var createArrayStub = sinon.stub(aff, 'createArray');

  aff.getData();

  assert.ok(getDataStub.calledOnce);
  assert.ok(createArrayStub.calledOnce);

  window.avoirToutLeTableau.restore();
  aff.createArray.restore();
});

QUnit.test('test createArray', function(assert) {
});

QUnit.test('test event',function(assert){
});
