parasails.registerUtility('isUniqueBirdName', function isUniqueBirdName(supposedBirdName) {
    return Cloud.isUniqueBirdName.with({echoName: supposedBirdName});
});