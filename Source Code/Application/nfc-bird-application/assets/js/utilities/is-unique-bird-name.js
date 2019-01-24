parasails.registerUtility('isUniqueBirdName', async function isUniqueBirdName(supposedBirdName) {
    return await Cloud.uniqueBirdName.with({echoName: supposedBirdName});
});