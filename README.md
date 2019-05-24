# Description
1. reads settings.json as usual
2. if values is provided in settings.json its stored in db.
3. if value is provided in db and different as in settings.json, db value is used instead
4. if no value is provided a default value is stored in db for the first time.


# Usage 
```
meteor add doichain:settings

import {getSettings } from 'meteor/doichain:settings';

const defaultValue = 'what-ever-it-should-be-in-case whether its in settings.json nor in db)
const settingsValue = getSettings('settings.name',defaultValue);
```
 

# TODO
- add reactivity to settings in db (if value is changed in db - should be changed for the application)
- add basic client settings-UI for React framework
- add basic client settings-UI for blaze framework