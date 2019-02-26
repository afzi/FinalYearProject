/**
	This model is used for locking pages that should only be accessed by one user to prevent conflicts
*/

module.exports = {
    updatedAt: false,
    attributes: {
        //entryDate added by sails
        //primaryKey provided by sails ID

        action: {
            type: "ref",
            columnType: "varchar",
            required: true
        },
        user: {
            model: "user",
            required: true
        },
        expiresAt: {
            type: "ref",
            columnType: "bigint(20)",
            required: true
        }
        
    }
};