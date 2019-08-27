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

Settings.allow({
  insert(userId, doc) {
    // The user must be logged in and the document must be owned by the user.
    return false; //userId && doc.owner === userId;
  },

  update(userId, doc, fields, modifier) {
    // Can only change your own documents.
    return Roles.userIsInRole(userId, ['admin']) //doc.owner === userId;
  },

  remove(userId, doc) {
    // Can only remove your own documents.
    return false;//doc.owner === userId;
  }
});
Settings.deny({
  insert() { return true; },
  update() {
    return Roles.userIsInRole(this.userId, ['admin'])
  },
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
