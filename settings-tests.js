import { name as packageName, getSettings,SettingsCollection } from "./settings";
import {chai} from 'meteor/practicalmeteor:chai';

describe('basic test', function () {

    it('basic tests should just work ', function(){
      expect(packageName).to.be.a('string');
      expect(packageName).to.equal("settings");
    });

    it('calls getSettings with default value but no value in json', function () {
      //1. Remove all Settings
      SettingsCollection.find({}).forEach(function (element) {
        console.log("deleting:",element);
        SettingsCollection.remove({_id:element._id});
      })
      let currentSettings = SettingsCollection.find({}).fetch();
      expect(currentSettings).to.have.lengthOf(0);

      let testCityEkaterinburg = getSettings('testCity', 'Ekaterinburg');
      expect(testCityEkaterinburg).to.equal("Ekaterinburg");
    });

    it('calls getSettings with existing value in db but not in json', function () {
      let testCityEkaterinburg = getSettings('testCity');
      expect(testCityEkaterinburg).to.equal("Ekaterinburg");
    });

    it('calls getSettings with existing value in json but but not in db', function () {
      const testStreet = getSettings('testStreet');
      console.log(SettingsCollection.find({}).fetch());
      expect(testStreet).to.equal("Waldstraße 43");

    });

    it('calls getSettings with existing value in json but but new in db', function () {
      const testStreetOld = SettingsCollection.find({testStreet: "Waldstraße 43"}).fetch();
      expect(testStreetOld[0].testStreet).to.equal("Waldstraße 43");
      SettingsCollection.update({_id:testStreetOld[0]._id},{$set:{testStreet: "Karl Heine Straße 55"}});
      const testStreet = getSettings('testStreet');
      expect(testStreet).to.equal("Karl Heine Straße 55");
    });

    it('calls getSettings with existing value in json with points', function () {
        const testCity = getSettings('app.testCity');
        expect(testCity).to.equal("Leipzig");
        const testStreet = getSettings('app.testStreet');
        expect(testStreet).to.equal("Karl-Heine-Straße 55");
    });

  });