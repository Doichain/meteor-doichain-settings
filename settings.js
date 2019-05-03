var Settings = new Meteor.Collection('Settings');

export const name = 'settings';

export function getSettings(_name,defaultValue){

    const settingsJsonValue = _.get(Meteor.settings, _name, defaultValue);
    console.log('found settings for '+_name+' in json:',settingsJsonValue);

    _name = _name.replace(/\./g, "___");
    const selector = {[_name]: { $exists: true }};
    const settingsDbVAlue = Settings.findOne(selector);
    //console.log('db: app.debug:',settingsDbVAlue);
    if(settingsDbVAlue===undefined){
        if(settingsJsonValue!==undefined){
            console.log('setting for '+_name +' not found in db - adding it.')
            Settings.insert({[_name]: settingsJsonValue});
        }
        if(defaultValue!==undefined && settingsJsonValue===undefined){
            console.log('setting for '+_name +' not found in db - adding it.')
            Settings.insert({[_name]: defaultValue});
        }
    }else{
        console.log('found settings for '+_name +' in db:',_.get(settingsDbVAlue,_name));
        return _.get(settingsDbVAlue,_name);
    }
    return settingsJsonValue;
}





/*
function getSettingJSONValue(name){
   /* var fields = name.split('.');
    console.log(fields)
    fields.forEach(function (element) {
        console.log('->'+element);
        const settingsObj = jsonQ(Meteor.settings).find(name);
        console.log(settingsObj);
    });*/

        //http://ignitersworld.com/lab/jsonQ.html#method-tf-find
//}