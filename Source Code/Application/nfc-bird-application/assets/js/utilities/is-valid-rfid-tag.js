parasails.registerUtility('isValidRfidTag', function isValidRfidTag(supposedRfidTag) {
    return Cloud.rfidTagExists.with({nfcFriendlyName: supposedRfidTag});
});