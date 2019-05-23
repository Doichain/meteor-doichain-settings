import { Meteor } from 'meteor/meteor';
import { Settings } from '../settings'

Meteor.publish('settings', function () {
  return Settings.find({},  {
    fields: Settings.publicFields,
  });
});
