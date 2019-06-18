import { Meteor } from 'meteor/meteor';
import { Settings } from '../settings'

Meteor.publish('settings', function () {

  if(Roles.userIsInRole(this.userId, 'admin')){
      return Settings.find({},  {
        fields: Settings.publicFields,
      });
  }
});
