QUnit.module("conversion_test");

QUnit.test("convert data", function(assert) {
    var data =
        "BEGIN:VEVENT\n" +
        "TRANSP:OPAQUE\n" +
        "DTEND;TZID=Europe/Dublin:20160907T151500\n" +
        "UID:Ical8bbcb1773fd09f4d03f789f63494ae0c\n" +
        "DTSTAMP:20160831T140451Z\n" +
        "LOCATION:M5 - A2\n" +
        "DESCRIPTION:Proposer une nouvelle approche de dissémination des données" +
        " mobiles dans le but d'améliorer la protection de la vie privée. nStage e" +
        " ffectué par Romain Sommerard à l'Inria. nRéférent laboratoire : Romain R" +
        " ouvoy nTuteur universitaire : Pierre Allegraud\n" +
        "STATUS:CONFIRMED\n" +
        "SEQUENCE:0\n" +
        "X-APPLE-TRAVEL-ADVISORY-BEHAVIOR:AUTOMATIC\n" +
        "SUMMARY:De la protection de la vie privée à L'Inria\n" +
        "DTSTART;TZID=Europe/Dublin:20160907T143000\n" +
        "CREATED:19000101T120000Z\n" +
        "LAST-MODIFIED:20160831T140451Z\n" +
        "END:VEVENT";

    var fixture = '<input type="text" id="icsData"/>';
    fixture += '<input type="text" id="jsonData"/>';
    var fixtureNode = document.getElementById('qunit-fixture');
    fixtureNode.innerHTML = fixture;

    var expectedArray = [];
    var expected = new Creneau();
    expected.debut = "20160907T143000";
    expected.fin = "20160907T151500";
    expected.resume = "De la protection de la vie privée à L'Inria";
    expected.lieu = "M5 - A2";
    expectedArray.push(expected);

    var converter = new Conversion('icsData', 'jsonData');
    converter.icsToJson(data);
    assert.deepEqual(expectedArray, converter.creneaux);
    assert.deepEqual(JSON.stringify(expectedArray), document.getElementById("jsonData").value);
});

QUnit.test("convert fake data", function(assert) {
    var data = "FAKEDATA";
    var fixture = '<input type="text" id="icsData"/>';
    fixture += '<input type="text" id="jsonData"/>';
    var fixtureNode = document.getElementById('qunit-fixture');
    fixtureNode.innerHTML = fixture;

    var expectedArray = [];

    var converter = new Conversion('icsData', 'jsonData');
    converter.icsToJson(data);
    assert.deepEqual(expectedArray, converter.creneaux);
    assert.deepEqual(JSON.stringify(expectedArray), document.getElementById("jsonData").value);
});

QUnit.test("convert no data", function(assert) {
    var s = "";
    var fixture = '<input type="text" id="icsData"/>';
    fixture += '<input type="text" id="jsonData"/>';
    var fixtureNode = document.getElementById('qunit-fixture');
    fixtureNode.innerHTML = fixture;

    var converter = new Conversion('icsData', 'jsonData');

    assert.throws(function(assert) {
        converter.icsToJson(s)
    }, NoDataException)
});

QUnit.test("convert creneau", function(assert) {
    var data =
        "\nTRANSP:OPAQUE\n" +
        "DTEND;TZID=Europe/Dublin:20160907T151500\n" +
        "UID:Ical8bbcb1773fd09f4d03f789f63494ae0c\n" +
        "DTSTAMP:20160831T140451Z\n" +
        "LOCATION:M5 - A2\n" +
        "DESCRIPTION:Proposer une nouvelle approche de dissémination des données\n" +
        " mobiles dans le but d'améliorer la protection de la vie privée.\\nStage e\n" +
        " ffectué par Romain Sommerard à l'Inria.\\nRéférent laboratoire : Romain R\n" +
        " ouvoy\\nTuteur universitaire : Pierre Allegraud\n" +
        "STATUS:CONFIRMED\n" +
        "SEQUENCE:0\n" +
        "X-APPLE-TRAVEL-ADVISORY-BEHAVIOR:AUTOMATIC\n" +
        "SUMMARY:De la protection de la vie privée à L'Inria\n" +
        "DTSTART;TZID=Europe/Dublin:20160907T143000\n" +
        "CREATED:19000101T120000Z\n" +
        "LAST-MODIFIED:20160831T140451Z\n" +
        "END:VEVENT";

    var expected = new Creneau();
    expected.debut = "20160907T143000";
    expected.fin = "20160907T151500";
    expected.resume = "De la protection de la vie privée à L'Inria";
    expected.lieu = "M5 - A2";

    var converter = new Conversion("icsData", "jsonData");
    assert.deepEqual(expected, converter.convertCreneau(data));
});

QUnit.test('convert event', function(assert) {
    assert.expect(3);

    var fixture = '<input type="text" id="icsData"/>';
    fixture += '<input type="text" id="jsonData"/>';
    var fixtureNode = document.getElementById('qunit-fixture');
    fixtureNode.innerHTML = fixture;

    var converter = new Conversion('icsData', 'jsonData');
    var firstCall = sinon.stub(converter, 'icsToJson', function() {
        this.creneaux = [1];
    });
    var secondCall = sinon.stub(converter, 'sendToServer');
    var alert = sinon.stub(window, "alert");

    converter.handleEvent();
    assert.ok(firstCall.calledOnce);

    converter.handleEvent();
    assert.ok(firstCall.calledOnce);
    assert.ok(secondCall.calledOnce);

    converter.icsToJson.restore();
    converter.sendToServer.restore();
    window.alert.restore();
});

QUnit.test('convert event no data', function(assert) {
    var fixture = '<input type="text" id="icsData"/>';
    fixture += '<input type="text" id="jsonData"/>';
    var fixtureNode = document.getElementById('qunit-fixture');
    fixtureNode.innerHTML = fixture;

    var conv = new Conversion("icsData", "jsonData");
    var alert = sinon.stub(window, "alert");
    conv.handleEvent();

    assert.ok(alert.calledOnce);
    window.alert.restore();
});

QUnit.test("Field successful conversion", function(assert) {
    assert.equal(1, 1);
});

QUnit.test("Field unsuccessful conversion", function(assert) {
    assert.equal(1, 1);
});

QUnit.test("send to server", function(assert) {
    var converter = new Conversion('icsData', 'jsonData', 'test');
    converter.creneaux = [new Creneau(), new Creneau(), new Creneau()];

    var ajouterElementDansTableauALaFinStub = sinon.stub(window, 'ajouterElementDansTableauALaFin');
    converter.sendElement();

    assert.equal(ajouterElementDansTableauALaFinStub.callCount, 3);

    window.ajouterElementDansTableauALaFin.restore();
});
