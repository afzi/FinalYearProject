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
  methods: {"exportData":{"verb":"GET","url":"/export","args":["reportSpec","reportData"]},"exportDataBirdSimple":{"verb":"GET","url":"/birds/export","args":["name","id","sex","breeder","lastSeen","studid","newstudid","nfcRingAssigned","nfcRing","lring","rring","creator","mname","mstud","fname","fstud","sfname","sfstud","status","cnote","rnote","age","lay","laidwhere","hatchdate","hatchwhere","incdays","fledgedate","fledgewhere","releasedate","releasedwhere","currnestID","currnestDist","currnestDisc","currnestCord","prevnestID","prevnestDist","prevnestDisc","prevnestCord"]},"logout":{"verb":"GET","url":"/api/v1/account/logout","args":[]},"updatePassword":{"verb":"PUT","url":"/api/v1/account/update-password/:userId?","args":["password"]},"updateProfile":{"verb":"PUT","url":"/api/v1/account/update-profile","args":["fullName"]},"login":{"verb":"PUT","url":"/api/v1/entrance/login","args":["username","password","rememberMe"]},"uniqueBirdName":{"verb":"GET","url":"/api/v1/bird/unique-bird-name","args":["echoName","excludeId"]},"getBird":{"verb":"GET","url":"/api/v1/bird","args":["id","studId","newStudId","leftRingId","rightRingId","birdName","sex","isBreeder","fatherName","secondFatherName","groupName","motherName","nfcRingId","layDateFrom","layDateTo","hatchDateFrom","hatchDateTo","incDaysFrom","incDaysTo","whereLaid","whereHatched","whereFledged","whenFledged","whereReleased","whenReleased","status","researcherNotes","currentNestSite","currentCondition","includeConditions","includeVisits","includeNestsites","skip","limit"]},"fullBird":{"verb":"GET","url":"/api/v1/bird/full","args":["id","birdName","groupName","layDate","status","sex","hatchDate","deathDate","currentCondition","incubationDays","lastSeenDate","motherName","laidWhere","currentNestSite","motherStudID","whereFledged","birdID","fatherName","whereReleased","studId","fatherStudID","whenReleased","newStudId","secondFatherName","rightRingId","secondFatherStudID","researcherNotes","leftRingId","createdOn","createdBy","DistanceToHopper"]},"rfidTagExists":{"verb":"GET","url":"/api/v1/rfidtag/rfid-tag-exists","args":["nfcFriendlyName","assignedStatus","excludeBirdId"]},"getRfid":{"verb":"GET","url":"/api/v1/rfidtag","args":["nfcRFID","isAssigned","nfcRFIDInternal","colour","skip","limit"]},"countRfid":{"verb":"GET","url":"/api/v1/rfidtag/count","args":["nfcRFID","isAssigned","nfcRFIDInternal","colour","skip","limit"]},"deleteRfid":{"verb":"DELETE","url":"/api/v1/rfidtag","args":["nfcRFID"]},"nestsiteExists":{"verb":"GET","url":"/api/v1/nestsite/nestsite-exists","args":["nestID"]},"getNestsite":{"verb":"GET","url":"/api/v1/nestsite","args":["nestID","nestDescription","distanceKmFrom","distanceKmTo","includeBirds","skip","limit"]},"countNestsite":{"verb":"GET","url":"/api/v1/nestsite/count","args":["nestID","nestDescription","distanceKmFrom","distanceKmTo"]},"getUser":{"verb":"GET","url":"/api/v1/user","args":["username","fullName","hasRead","hasCreateEdit","hasExport","hasEditFull","hasAdmin","isSuperAdmin","skip","limit"]},"countUser":{"verb":"GET","url":"/api/v1/user/count","args":["username","fullName","hasRead","hasCreateEdit","hasExport","hasEditFull","hasAdmin"]},"usernameExists":{"verb":"GET","url":"/api/v1/user/username-exists","args":["username","excludeId"]},"deleteUser":{"verb":"DELETE","url":"/api/v1/user","args":["id"]},"signup":{"verb":"POST","url":"/api/v1/account/signup","args":["fullName","username","password","hasRead","hasCreateEdit","hasEditFull","hasExport","hasAdmin"]},"editUser":{"verb":"PUT","url":"/api/v1/account/edit-user","args":["id","fullName","password","hasRead","hasCreateEdit","hasEditFull","hasExport","hasAdmin"]},"createNestsite":{"verb":"POST","url":"/api/v1/nestsite","args":["nestID","nestDescription","distanceToHoppersKm","longitude","latitude"]},"editNestsite":{"verb":"PUT","url":"/api/v1/nestsite","args":["id","nestID","nestDescription","distanceToHoppersKm"]},"deleteNestsite":{"verb":"DELETE","url":"/api/v1/nestsite","args":["id"]},"createBird":{"verb":"POST","url":"/api/v1/bird","args":["studID","newStudID","leftRingID","rightRingID","birdName","sex","status","isBreeder","fatherName","fatherStudID","secondFatherName","secondFatherStudID","groupName","motherName","motherStudID","nfcRingID","laidWhere","layDate","hatchDate","incubationDays","hatchedWhere","fledgedWhere","fledgeDate","releasedWhere","releasedWhen","researcherNotes","newBreedingSite","newBreedingSiteDate","newCondition","newConditionDate"]},"editBird":{"verb":"PUT","url":"/api/v1/bird","args":["id","studID","newStudID","leftRingID","rightRingID","birdName","sex","status","isBreeder","fatherName","fatherStudID","secondFatherName","secondFatherStudID","groupName","motherName","motherStudID","nfcRingID","laidWhere","layDate","hatchDate","incubationDays","hatchedWhere","fledgedWhere","fledgeDate","releasedWhere","releasedWhen","researcherNotes","newBreedingSite","newBreedingSiteDate","newCondition","newConditionDate"]},"countBirds":{"verb":"GET","url":"/api/v1/bird/count","args":["studId","newStudId","leftRingId","rightRingId","birdName","sex","isBreeder","fatherName","secondFatherName","groupName","motherName","nfcRingId","layDateFrom","layDateTo","hatchDateFrom","hatchDateTo","incDaysFrom","incDaysTo","whereHatched","whereFledged","whenFledged","whereReleased","whenReleased","researcherNotes","currentNestSite","currentCondition"]},"importRfid":{"verb":"POST","url":"/api/v1/rfidtag","args":["csv"]},"liveView":{"verb":"GET","url":"/api/v1/live","args":["searchTerm","offset","numOfRows","timeFrom","timeTo"]},"getSingleBirdVisit":{"verb":"GET","url":"/api/v1/bird/get-single-bird-visit","args":["birdName","offset","numOfRows"]},"getChangelog":{"verb":"GET","url":"/api/v1/changelog","args":["username","action","dateFrom","dateTo","newData","oldData","skip","limit"]},"countChangelog":{"verb":"GET","url":"/api/v1/changelog/count","args":["username","action","dateFrom","dateTo","newData","oldData"]},"tryAcquireRenewLock":{"verb":"PUT","url":"/api/v1/lock","args":["userId","action","duration"]}}
  /* eslint-enable */

});
