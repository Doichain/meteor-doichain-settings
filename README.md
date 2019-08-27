# Description
1. reads settings.json as usual
2. if values is provided in settings.json its stored in db.
3. if value is provided in db and different as in settings.json, db value is used instead
4. if no value is provided a default value is stored in db for the first time.
5. React-UI displays and writes settings from and to db

# Usage read settings 
```
meteor add doichain:settings

import {getSettings } from 'meteor/doichain:settings';

const defaultValue = 'what-ever-it-should-be-in-case whether its in settings.json nor in db)
const settingsValue = getSettings('settings.name',defaultValue);
``` 

# Usage settings-react component 
(works only if current user has admin role according to alanning:roles)
```
import React  from 'react'
import SettingsTable from "meteor/doichain:settings";

const Settings = props => {
    return (<SettingsTable/>)
}

export default Settings;

```
 
# Bugs
- add reactivity to settings in db (if value is changed in db - should be changed for the application)