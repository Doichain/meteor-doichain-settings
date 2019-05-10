//import {Meteor} from "meteor/meteor";
import { _ } from 'lodash';
import { Mongo } from 'meteor/mongo';
var Settings = new Mongo.Collection('Settings');

export const name = 'settings';
export const SettingsCollection = Settings;
export function getSettings(_name,defaultValue){
    //let settingsJsonValue = _.get(Meteor.settings, _name);
   // console.log(Meteor.settings.send.doichain.host);
    const settingsAll = Meteor.settings;

    //console.log(_.get(settingsAll,_name));
    let settingsJsonValue = _.get(settingsAll,_name); //Meteor.settings[_name];
    console.log('found '+_name+' in json:',settingsJsonValue);
    if(settingsJsonValue===undefined){
        settingsJsonValue = defaultValue;
        console.log('using '+defaultValue+' for: ',_name);
    }


    _name = _name.replace(/\./g, "___");
    const selector = {[_name]: { $exists: true }};
    const settingsDbVAlue = Settings.findOne(selector);

    if(settingsDbVAlue===undefined){
        if(settingsJsonValue!==undefined){
            console.log(_name +' not in db - but in json - adding it:'+settingsJsonValue);
            Settings.insert({[_name]: settingsJsonValue});
        }
        if(defaultValue!==undefined && settingsJsonValue===undefined){
            console.log(_name +' not found in db - adding it.')
            Settings.insert({[_name]: defaultValue});
        }
    }else{
        console.log('found '+_name +' in db:',_.get(settingsDbVAlue,_name));
        console.log('returning db:'+_.get(settingsDbVAlue,_name))
        return _.get(settingsDbVAlue,_name);
    }
    console.log('returning json:'+settingsJsonValue)
    return settingsJsonValue;
}