/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  '*': 'is-logged-in',

  // READ policies
  'bird/count-birds': 'has-read',
  'bird/get-single-bird-visit': 'has-read',
  'bird/get-bird': 'has-read',
  'bird/view-get-bird': 'has-read',
  'nestsite/count-nestsite': 'has-read',
  'nestsite/get-nestsite': 'has-read',
  'nestsite/view-create-nestsite': 'has-read',
  'rfidtag/count-rfid': 'has-read',
  'rfidtag/get-rfid': 'has-read',
  'rfidtag/view-import-rfid': 'has-read',

  // CREATE EDIT / EDIT FULL policies. On this level, CREATE EDIT and EDIT full will be treated the same. The controller is responsible for ensuring the separation between the two.
  'bird/create-bird': 'has-edit',
  'bird/edit-bird': 'has-edit',
  'bird/unique-bird-name': 'has-edit',
  'lock/*': 'has-edit',
  'nestsite/delete-nestsite': 'has-edit',
  'nestsite/create-nestsite': 'has-edit',
  'nestsite/edit-nestsite': 'has-edit',
  'nestsite/nestsite-exists': 'has-edit',
  'rfidtag/delete-rfid': 'has-edit',
  'rfidtag/import-rfid': 'has-edit',
  'rfidtag/rfid-tag-exists': 'has-edit',

  // EXPORT policies
  'bird/export-data-bird-simple': 'has-export',

  // ADMIN policies
  'account/count-user': 'has-admin',
  'account/delete-user': 'has-admin',
  'account/edit-user': 'has-admin',
  'account/get-user': 'has-admin',
  'account/signup': 'has-admin',
  'account/username-exists': 'has-admin',
  'account/view-manage-users': 'has-admin',
  'changelog/count-changelog': 'has-admin',
  'changelog/get-changelog': 'has-admin',
  'changelog/view-user-activity-monitor': 'has-admin',

  // Bypass all above policies for:
  'entrance/*': true,
  'account/logout': true,
  'view-homepage-or-redirect': true,
};
