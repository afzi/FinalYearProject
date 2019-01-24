parasails.registerUtility('isValidRfidTag', async function isValidRfidTag(supposedRfidTag) {
    return await Cloud.rfidTagExists.with({nfcFriendlyName: supposedRfidTag});
});