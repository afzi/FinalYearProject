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
  methods: {"logout":{"verb":"GET","url":"/api/v1/account/logout","args":[]},"updatePassword":{"verb":"PUT","url":"/api/v1/account/update-password/:userId?","args":["password"]},"updateProfile":{"verb":"PUT","url":"/api/v1/account/update-profile","args":["fullName"]},"login":{"verb":"PUT","url":"/api/v1/entrance/login","args":["username","password","rememberMe"]},"uniqueBirdName":{"verb":"GET","url":"/api/v1/bird/unique-bird-name","args":["echoName"]},"getBird":{"verb":"GET","url":"/api/v1/bird","args":["studId","newStudId","leftRingId","rightRingId","birdName","sex","fatherName","secondFatherName","groupName","motherName","nfcRingId","layDateFrom","layDateTo","hatchDateFrom","hatchDateTo","incDaysFrom","incDaysTo","whereHatched","whereFledged","whenFledged","whereReleased","whenReleased","researcherNotes","currentNestSite","currentCondition","includeConditions","includeVisits","includeNestsites","skip","limit"]},"rfidTagExists":{"verb":"GET","url":"/api/v1/rfidtag/rfid-tag-exists","args":["nfcFriendlyName","assignedStatus"]},"getRfid":{"verb":"GET","url":"/api/v1/rfidtag","args":["nfcRFID","isAssigned","nfcRFIDInternal","colour","skip","limit"]},"countRfid":{"verb":"GET","url":"/api/v1/rfidtag/count","args":["nfcRFID","isAssigned","nfcRFIDInternal","colour","skip","limit"]},"nestsiteExists":{"verb":"GET","url":"/api/v1/nestsite/nestsite-exists","args":["nestID"]},"getNestsite":{"verb":"GET","url":"/api/v1/nestsite","args":["nestID","nestDescription","distanceKmFrom","distanceKmTo","includeBirds","skip","limit"]},"countNestsite":{"verb":"GET","url":"/api/v1/nestsite/count","args":["nestID","nestDescription","distanceKmFrom","distanceKmTo"]},"createNestsite":{"verb":"POST","url":"/api/v1/nestsite","args":["nestID","nestDescription","distanceToHoppersKm","longitude","latitude"]},"editNestsite":{"verb":"PUT","url":"/api/v1/nestsite","args":["id","nestID","nestDescription","distanceToHoppersKm"]},"deleteNestsite":{"verb":"DELETE","url":"/api/v1/nestsite","args":["id"]},"createBird":{"verb":"POST","url":"/api/v1/bird","args":["studId","newStudId","leftRingId","rightRingId","echoName","sex","fatherName","secondFatherName","groupName","motherName","nfcRingId","layDate","hatchDate","incDays","whereHatched","whereFledged","whenFledged","whereReleased","whenReleased","notes","currentNestSite","currentNestSiteSince"]},"signup":{"verb":"POST","url":"/api/v1/entrance/signup","args":["fullName","username","password","hasRead","hasCreateEdit","hasEditFull","hasExport","hasAdmin"]},"updatePasswordAndLogin":{"verb":"POST","url":"/api/v1/entrance/update-password-and-login","args":["password","token"]},"importRfid":{"verb":"POST","url":"/api/v1/rfidtag","args":["csv"]},"liveView":{"verb":"GET","url":"/api/v1/live","args":["skip","limit"]},"countVisits":{"verb":"GET","url":"/api/v1/live/count-visits","args":[]}}
  /* eslint-enable */

});
