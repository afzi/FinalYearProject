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
  methods: {"logout":{"verb":"GET","url":"/api/v1/account/logout","args":[]},"updatePassword":{"verb":"PUT","url":"/api/v1/account/update-password/:userId?","args":["password"]},"updateProfile":{"verb":"PUT","url":"/api/v1/account/update-profile","args":["fullName"]},"login":{"verb":"PUT","url":"/api/v1/entrance/login","args":["username","password","rememberMe"]},"uniqueBirdName":{"verb":"GET","url":"/api/v1/bird/unique-bird-name","args":["echoName","excludeId"]},"getBird":{"verb":"GET","url":"/api/v1/bird","args":["studId","newStudId","leftRingId","rightRingId","birdName","sex","fatherName","secondFatherName","groupName","motherName","nfcRingId","layDateFrom","layDateTo","hatchDateFrom","hatchDateTo","incDaysFrom","incDaysTo","whereHatched","whereFledged","whenFledged","whereReleased","whenReleased","researcherNotes","currentNestSite","currentCondition","includeConditions","isBreeder","includeVisits","includeNestsites","skip","limit"]},"rfidTagExists":{"verb":"GET","url":"/api/v1/rfidtag/rfid-tag-exists","args":["nfcFriendlyName","assignedStatus"]},"getRfid":{"verb":"GET","url":"/api/v1/rfidtag","args":["nfcRFID","isAssigned","nfcRFIDInternal","colour","skip","limit"]},"countRfid":{"verb":"GET","url":"/api/v1/rfidtag/count","args":["nfcRFID","isAssigned","nfcRFIDInternal","colour","skip","limit"]},"deleteRfid":{"verb":"DELETE","url":"/api/v1/rfidtag","args":["nfcRFID"]},"nestsiteExists":{"verb":"GET","url":"/api/v1/nestsite/nestsite-exists","args":["nestID"]},"getNestsite":{"verb":"GET","url":"/api/v1/nestsite","args":["nestID","nestDescription","distanceKmFrom","distanceKmTo","includeBirds","skip","limit"]},"countNestsite":{"verb":"GET","url":"/api/v1/nestsite/count","args":["nestID","nestDescription","distanceKmFrom","distanceKmTo"]},"getUser":{"verb":"GET","url":"/api/v1/user","args":["username","fullName","hasRead","hasCreateEdit","hasExport","hasEditFull","hasAdmin","skip","limit"]},"countUser":{"verb":"GET","url":"/api/v1/user/count","args":["username","fullName","hasRead","hasCreateEdit","hasExport","hasEditFull","hasAdmin"]},"usernameExists":{"verb":"GET","url":"/api/v1/user/username-exists","args":["username"]},"deleteUser":{"verb":"DELETE","url":"/api/v1/user","args":["id"]},"signup":{"verb":"POST","url":"/api/v1/account/signup","args":["fullName","username","password","hasRead","hasCreateEdit","hasEditFull","hasExport","hasAdmin"]},"editUser":{"verb":"PUT","url":"/api/v1/account/edit-user","args":["id","fullName","password","hasRead","hasCreateEdit","hasEditFull","hasExport","hasAdmin"]},"createNestsite":{"verb":"POST","url":"/api/v1/nestsite","args":["nestID","nestDescription","distanceToHoppersKm","longitude","latitude"]},"editNestsite":{"verb":"PUT","url":"/api/v1/nestsite","args":["id","nestID","nestDescription","distanceToHoppersKm"]},"deleteNestsite":{"verb":"DELETE","url":"/api/v1/nestsite","args":["id"]},"createBird":{"verb":"POST","url":"/api/v1/bird","args":["studId","newStudId","leftRingId","rightRingId","echoName","sex","fatherName","secondFatherName","groupName","motherName","nfcRingId","layDate","hatchDate","incDays","whereHatched","whereFledged","whenFledged","whereReleased","whenReleased","notes","currentNestSite","currentNestSiteSince"]},"editBird":{"verb":"PUT","url":"/api/v1/bird","args":["id","studID","newStudID","leftRingID","rightRingID","birdName","sex","fatherName","fatherStudID","secondFatherName","secondFatherStudID","groupName","motherName","motherStudID","nfcRingID","laidWhere","layDate","hatchDate","incubationDays","hatchedWhere","fledgedWhere","fledgeDate","releasedWhere","releasedWhen","researcherNotes","newBreedingSite","newBreedingSiteDate","newCondition","newConditionDate"]},"countBirds":{"verb":"GET","url":"/api/v1/bird/count","args":["studId","newStudId","leftRingId","rightRingId","birdName","sex","fatherName","secondFatherName","groupName","motherName","nfcRingId","layDateFrom","layDateTo","hatchDateFrom","hatchDateTo","incDaysFrom","incDaysTo","whereHatched","whereFledged","whenFledged","whereReleased","whenReleased","researcherNotes","currentNestSite","currentCondition"]},"updatePasswordAndLogin":{"verb":"POST","url":"/api/v1/entrance/update-password-and-login","args":["password","token"]},"importRfid":{"verb":"POST","url":"/api/v1/rfidtag","args":["csv"]},"liveView":{"verb":"GET","url":"/api/v1/live","args":["searchTerm","offset","numOfRows","timeFrom","timeTo"]},"countVisits":{"verb":"GET","url":"/api/v1/live/count-visits","args":[]},"getChangelog":{"verb":"GET","url":"/api/v1/changelog","args":["username","action","dateFrom","dateTo","data","skip","limit"]},"countChangelog":{"verb":"GET","url":"/api/v1/changelog/count","args":["username","action","dateFrom","dateTo","data"]}}
  /* eslint-enable */

});
