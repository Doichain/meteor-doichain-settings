import { Mongo } from 'meteor/mongo';

class SettingsCollection extends Mongo.Collection {
  insert(data, callback) {
    const ourData = data;
    ourData.createdAt = ourData.createdAt || new Date();
    const result = super.insert(ourData, callback);
    return result;
  }
  update(selector, modifier) {
    const result = super.update(selector, modifier);
    return result;
  }
  remove(selector) {
    const result = super.remove(selector);
    return result;
  }
}

export const Settings = new SettingsCollection('settings');

// Deny all client-side updates since we will be using methods to manage this collection
Settings.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

// This represents the keys Settings Meta objects that should be published
// to the client. If we add secret properties to Meta objects, don't list
// them here to keep them private to the server.
Settings.publicFields = {
  _id: 1,
  key: 1,
  value: 1
};
