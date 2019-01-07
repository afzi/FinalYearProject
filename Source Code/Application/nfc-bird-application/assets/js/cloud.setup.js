/**
 * cloud.setup.js
 *
 * Configuration for this Sails app's generated browser SDK ("Cloud").
 *
 * Above all, the purpose of this file is to provide endpoint definitions,
 * each of which corresponds with one particular route+action on the server.
 *
 * > This file was automatically generated.
 * > (To regenerate, run `sails run rebuild-cloud-sdk`)
 */

Cloud.setup({

  /* eslint-disable */
  methods: {"logout":{"verb":"GET","url":"/api/v1/account/logout","args":[]},"updatePassword":{"verb":"PUT","url":"/api/v1/account/update-password/:userId?","args":["password"]},"updateProfile":{"verb":"PUT","url":"/api/v1/account/update-profile","args":["fullName"]},"login":{"verb":"PUT","url":"/api/v1/entrance/login","args":["username","password","rememberMe"]},"signup":{"verb":"POST","url":"/api/v1/entrance/signup","args":["username","password","fullName"]},"updatePasswordAndLogin":{"verb":"POST","url":"/api/v1/entrance/update-password-and-login","args":["password","token"]},"createBird":{"verb":"POST","url":"/api/v1/bird/create-bird","args":["studId","leftRingId","rightRingId","echoName","sex","motherId","fatherId","fatherName","secondFatherId","secondFatherName","groupName","motherName","nfcRingId","layDate","hatchDate","incDays","whereHatched","whereFledged","whenFledged","whereReleased","whenReleased"]}}
  /* eslint-enable */

});
