import {Meteor} from "meteor/meteor";
import { _ } from 'lodash';
import {Settings} from './imports/api/settings/settings'
import './imports/api/settings/server/publications';
import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';
checkNpmVersions({
    'react-meteor-hooks:':'0.3.1'
})

export function getSettings(_name,defaultValue) {
    const settingsAll = (process.env.TEST_METEOR_SETTINGS!==undefined)?JSON.parse(process.env.TEST_METEOR_SETTINGS):Meteor.settings;

   // console.log("settingsAll",settingsAll)
    let settingsJsonValue = _.get(settingsAll, _name);

    if (settingsJsonValue === undefined) {
        settingsJsonValue = defaultValue;
        console.log('using ' + defaultValue + ' for: ', _name);
    }

    _name = _name.replace(/\./g, "___");
    const selector = {key: _name}
    console.log('selector', selector)
    const settingsDbVAlue = Settings.findOne(selector)
    console.log('settingsDbVAlue found:', settingsDbVAlue?settingsDbVAlue.value:undefined);
    if (settingsDbVAlue === undefined || settingsDbVAlue.value === undefined) {
        if (settingsJsonValue !== undefined && settingsJsonValue !=="") {
            const data = {key: _name, value: (settingsJsonValue instanceof Object?JSON.stringify(settingsJsonValue):settingsJsonValue)}
            console.log(_name + ' not in db - but in json - adding it:' + JSON.stringify(data));
            Settings.insert(data);
        }
        if (defaultValue !== undefined && settingsJsonValue === undefined) {
            console.log(_name + ' not found in db - adding defaultValue it:', defaultValue)
            const data = {key: _name, value: defaultValue}
            Settings.insert(data);
        }
    } else {
        console.log('returning ' + _name + ' in db:', settingsDbVAlue.value);
        return settingsDbVAlue.value;
    }
    console.log('returning json:' + settingsJsonValue)
    return settingsJsonValue;
}