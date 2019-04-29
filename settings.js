var Settings = new Meteor.Collection('Settings');

//database overwrites settings.json
//if db is empty json fills database
//if json file is also empty uses given defaultValue for db

export const name = 'settings';

export function getSettings(_name,defaultValue){

    const settingsJsonValue = _.get(Meteor.settings, _name, defaultValue);
    console.log('found settings for '+_name+' in json: app.debug:',settingsJsonValue);

    _name = _name.replace(/\./g, "___");
    const selector = {[_name]: { $exists: true }};
    const settingsDbVAlue = Settings.findOne(selector);
    console.log('db: app.debug:',settingsDbVAlue);
    if(settingsDbVAlue===undefined){
        console.log('setting for '+_name +' not found in db, adding it for for the first time.')
        Settings.insert({[_name]: settingsJsonValue});
    }else{
        console.log(' found settings for '+_name +' in db:',_.get(settingsDbVAlue,_name));
        return settingsDbVAlue;
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