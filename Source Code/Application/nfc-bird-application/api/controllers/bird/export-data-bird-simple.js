module.exports = {


    friendlyName: 'export data',


    description: 'create and download excel sheet based on input data array',

    inputs: {
        //BID
        name: { required: false, type: 'boolean' },
        id: { required: false, type: 'boolean' },
        sex: { required: false, type: 'boolean' },
        breeder: { required: false, type: 'boolean' },
        lastSeen: { required: false, type: 'boolean' },
        studid: { required: false, type: 'boolean' },
        newstudid: { required: false, type: 'boolean' },
        lring: { required: false, type: 'boolean' },
        rring: { required: false, type: 'boolean' },
        creator: { required: false, type: 'boolean' },
        //BPD
        mname: { required: false, type: 'boolean' },
        mstud: { required: false, type: 'boolean' },
        fname: { required: false, type: 'boolean' },
        fstud: { required: false, type: 'boolean' },
        sfname: { required: false, type: 'boolean' },
        sfstud: { required: false, type: 'boolean' },
        //BSD
        status: { required: false, type: 'boolean' },
        cnote: { required: false, type: 'boolean' },
        rnote: { required: false, type: 'boolean' },
        age: { required: false, type: 'boolean' },
        //BCD
        lay: { required: false, type: 'boolean' },
        laidwhere: { required: false, type: 'boolean' },
        hatchdate: { required: false, type: 'boolean' },
        hatchwhere: { required: false, type: 'boolean' },
        incdays: { required: false, type: 'boolean' },
        fledgedate: { required: false, type: 'boolean' },
        fledgewhere: { required: false, type: 'boolean' },
        releasedate: { required: false, type: 'boolean' },
        releasedwhere: { required: false, type: 'boolean' },

        //NSD
        currnestID: { required: false, type: 'boolean' },
        currnestDist: { required: false, type: 'boolean' },
        currnestDisc: { required: false, type: 'boolean' },
        currnestCord: { required: false, type: 'boolean' },
        prevnestID: { required: false, type: 'boolean' },
        prevnestDist: { required: false, type: 'boolean' },
        prevnestDisc: { required: false, type: 'boolean' },
        prevnestCord: { required: false, type: 'boolean' }
    },

    exits: {

        success: {
            description: 'Excel Sheet downloaded',
        },

        redirect: {
            description: 'Unknown Error',
            responseType: 'redirect'
        }

    },

    fn: async function (inputs) {
        const excel = require('node-excel-export');

        // The data set should have the following shape (Array of Objects)
        // The order of the keys is irrelevant, it is also irrelevant if the
        // dataset contains more fields as the report is build based on the
        // specification provided above. But you should have all the fields
        // that are listed in the report specification
        var BIRDQUERY = `
        SELECT bird.*, user.username, lnest.nestID as laidName,hnest.nestID as hatchName,fnest.nestID as flegName,rnest.nestID as relName FROM nfcbirds.bird 
        LEFT JOIN nfcbirds.user 
        ON bird.createdBy = user.id
        LEFT JOIN nfcbirds.nestsite AS lnest 
        ON bird.laidWhere = lnest.id 
        LEFT JOIN nfcbirds.nestsite AS hnest 
        ON bird.hatchedWhere = hnest.id 
        LEFT JOIN nfcbirds.nestsite AS fnest 
        ON bird.fledgedWhere = fnest.id 
        LEFT JOIN nfcbirds.nestsite AS rnest 
        ON bird.releasedWhere = rnest.id;`
        var rawResult = await sails.sendNativeQuery(BIRDQUERY);
        var parsedResult = [];
        var rows = rawResult.rows;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];

            var LASTSEENQUERY = `
            SELECT * FROM nfcbirds.visit 
            WHERE birdID = $1 ORDER BY nfcbirds.visit.createdAt DESC;`
            var visitResult = await sails.sendNativeQuery(LASTSEENQUERY, [row.id]);
            var visitRows = visitResult.rows;
            var seen = '';
            if (visitRows.length <= 0) {
                seen = 'NOT SEEN';
            }
            else {
                seen = TimeUtil.getTimeStampForUnix(visitRows[0].createdAt);
            }


            var CONQUERY = `
            SELECT * FROM nfcbirds.birdcondition 
            WHERE birdID = $1 ORDER BY nfcbirds.birdcondition.dateNoted DESC;`
            var conResult = await sails.sendNativeQuery(CONQUERY, [row.id]);
            var conRows = conResult.rows;
            var condition = '';
            if (conRows.length <= 0) {
                condition = '';
            }
            else {
                condition = conRows[0].birdCondition;
            }

            var NESTQUERY = `
            SELECT * FROM nfcbirds.birdnest 
            INNER JOIN nfcbirds.nestsite 
            ON nfcbirds.birdnest.nestID = nfcbirds.nestsite.id 
            WHERE birdID = $1 ORDER BY (CASE WHEN nfcbirds.birdnest.dateLeft IS NULL THEN 1 ELSE 0 END) DESC, 
            nfcbirds.birdnest.dateLeft DESC;`
            var nestResult = await sails.sendNativeQuery(NESTQUERY, [row.id]);
            var nestResultRows = nestResult.rows;
            var nestInfo = {
                current: '',
                currentDist: '',
                currentDisc: '',
                currentCoord: '',
                last: '',
                lastDist: '',
                lastDisc: '',
                lastCoord: ''
            };

            for (var j = 0; j < nestResultRows.length; j++) {
                nrr = nestResultRows[j];
                if (nrr.dateLeft === null) {
                    nestInfo.current = nrr.nestID;
                    nestInfo.currentDist = nrr.distanceToHoppersKm;
                    nestInfo.currentDisc = nrr.nestDescription;
                    nestInfo.currentCoord = nrr.latitude + ", " + nrr.longitude;
                    if (nrr.latitude === '') {
                        nestInfo.currentCoord = '';
                    }
                } else {
                    nestInfo.last = nrr.nestID;
                    nestInfo.lastDist = nrr.distanceToHoppersKm;
                    nestInfo.lastDisc = nrr.nestDescription;
                    nestInfo.lastCoord = nrr.latitude + ", " + nrr.longitude;
                    if (nrr.latitude === '') {
                        nestInfo.lastCoord = '';
                    }
                    j = nestResultRows.length + 1; //got all we need so we out out
                }
            }

            var age = TimeUtil.getAge(row.hatchDate);

            var bird = {
                //BID
                id: row.id,
                name: row.birdName,
                sex: row.sex,
                breeder: row.isBreeder,
                lastSeen: seen,
                studid: row.studID,
                newstudid: row.newStudID,
                lring: row.leftRingID,
                rring: row.rightRingID,
                creator: row.username,
                //BPD
                mname: row.motherName,
                mstud: row.motherStudID,
                fname: row.fatherName,
                fstud: row.fatherStudID,
                sfname: row.secondFatherName,
                sfstud: row.secondFatherStudID,
                //BSD
                status: row.status,
                cnote: condition,
                rnote: row.researcherNotes,
                age: age,
                //BCD
                lay: TimeUtil.getTimeStampForUnix(row.layDate),
                laidwhere: row.laidName,
                hatchdate: TimeUtil.getTimeStampForUnix(row.hatchDate),
                hatchwhere: row.hatchName,
                incdays: row.incubationDays,
                fledgedate: TimeUtil.getTimeStampForUnix(row.fledgeDate),
                fledgewhere: row.flegName,
                releasedate: TimeUtil.getTimeStampForUnix(row.releasedWhen),
                releasedwhere: row.relName,
                //NSD
                currnestID: nestInfo.current,
                currnestDist: nestInfo.currentDist,
                currnestDisc: nestInfo.currentDisc,
                currnestCord: nestInfo.currentCoord,
                prevnestID: nestInfo.last,
                prevnestDist: nestInfo.lastDist,
                prevnestDisc: nestInfo.lastDisc,
                prevnestCord: nestInfo.lastCoord
            }
            parsedResult.push(bird);
        }
        console.log(parsedResult);
        const dataset = parsedResult;

        // You can define styles as json object
        const styles = {
            headerPlain: {
                font: {
                    color: {
                        rgb: 'FF000000'
                    },
                    sz: 14,
                    bold: { required: false, type: 'boolean' }
                }
            },
            headerDark: {
                font: {
                    color: {
                        rgb: 'FF000000'
                    },
                    sz: 14,
                    bold: { required: false, type: 'boolean' }
                }
            },
            cellPlain: {
                color: {
                    rgb: 'FF000000'
                }
            },
            cellJustify: {
                font: {
                    color: {
                        rgb: 'FF000000'
                    },
                    bold: { required: false, type: 'boolean' }
                }
            }
        };

        //Here you specify the export structure
        var specification = {
        }

        //BID
        if (inputs.name) {
            var name = 'Bird Name';
            var len = name.length + 2;
            specification.name = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellJustify,
                width: `${len}`
            };
        }
        if (inputs.id) {
            var name = 'System ID';
            var len = name.length + 2;
            specification.id = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.sex) {
            var name = 'Gender';
            var len = name.length + 2;
            specification.sex = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.breeder) {
            var name = 'Is Breeder';
            var len = name.length + 2;
            specification.breeder = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.lastSeen) {
            var name = 'Last Seen Date';
            var len = name.length + 2;
            specification.lastSeen = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.studid) {
            var name = 'Stud ID';
            var len = name.length + 2;
            specification.studid = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.newstudid) {
            var name = 'New Stud ID';
            var len = name.length + 2;
            specification.newstudid = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.lring) {
            var name = 'Left Ring ID';
            var len = name.length + 15;
            specification.lring = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.rring) {
            var name = 'Right Ring ID';
            var len = name.length + 15;
            specification.rring = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.creator) {
            var name = 'Created By';
            var len = name.length + 2;
            specification.creator = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }

        //BPD
        if (inputs.mname) {
            var name = 'Female Parent';
            var len = name.length + 2;
            specification.mname = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.mstud) {
            var name = 'Female Parent Stud ID';
            var len = name.length + 2;
            specification.mstud = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.fname) {
            var name = 'Male Parent';
            var len = name.length + 2;
            specification.fname = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.fstud) {
            var name = 'Male Parent Stud ID';
            var len = name.length + 2;
            specification.fstud = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.sfname) {
            var name = 'Second Male Parent';
            var len = name.length + 2;
            specification.sfname = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.sfstud) {
            var name = 'Second Male Parent Stud ID';
            var len = name.length + 2;
            specification.sfstud = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        //BSD
        if (inputs.status) {
            var name = 'Status';
            var len = name.length + 2;
            specification.status = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.cnote) {
            var name = 'Condition';
            var len = name.length + 100
            specification.cnote = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.rnote) {
            var name = 'Note';
            var len = name.length + 100;
            specification.rnote = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.age) {
            var name = 'Age';
            var len = name.length + 20;
            specification.age = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        //BCD
        if (inputs.lay) {
            var name = 'Lay Date';
            var len = name.length + 2;
            specification.lay = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.laidwhere) {
            var name = 'Laid Where';
            var len = name.length + 2;
            specification.laidwhere = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.hatchdate) {
            var name = 'Hatch Date';
            var len = name.length + 2;
            specification.hatchdate = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.hatchwhere) {
            var name = 'Hatched Where';
            var len = name.length + 3;
            specification.hatchwhere = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.incdays) {
            var name = 'Incubation Days';
            var len = name.length + 2;
            specification.incdays = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.fledgedate) {
            var name = 'Fledge Date';
            var len = name.length + 2;
            specification.fledgedate = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.fledgewhere) {
            var name = 'Fledged Where';
            var len = name.length + 3;
            specification.fledgewhere = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.releasedate) {
            var name = 'Release Date';
            var len = name.length + 2;
            specification.releasedate = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.releasedwhere) {
            var name = 'Released Where';
            var len = name.length + 3;
            specification.releasedwhere = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        //NSD
        if (inputs.currnestID) {
            var name = 'Current Breeding Site';
            var len = name.length + 2;
            specification.currnestID = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.currnestDist) {
            var name = 'Current Distance To Hopper (km)';
            var len = name.length + 2;
            specification.currnestDist = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.currnestDisc) {
            var name = 'Current Breeding Site Description';
            var len = name.length + 100;
            specification.currnestDisc = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.currnestCord) {
            var name = 'Current Breeding Site Coordinates';
            var len = name.length + 2;
            specification.currnestCord = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.prevnestID) {
            var name = 'Previous Breeding Site';
            var len = name.length + 2;
            specification.prevnestID = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.prevnestDist) {
            var name = 'Previous Distance To Hopper (km)';
            var len = name.length + 2;
            specification.prevnestDist = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.prevnestDisc) {
            var name = 'Previous Breeding Site Description';
            var len = name.length + 100;
            specification.prevnestDisc = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        if (inputs.prevnestCord) {
            var name = 'Previous Breeding Site Coordinates';
            var len = name.length + 2;
            specification.prevnestCord = {
                displayName: name,
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: `${len}`
            };
        }
        // Create the excel report.
        // This function will return Buffer
        const report = excel.buildExport(
            [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
                {
                    name: 'Report', // <- Specify sheet name (optional)
                    specification: specification, // <- Report specification
                    data: dataset // <-- Report data
                }
            ]
        );

        var timestamp = new Date()
        this.res.attachment('report ' + TimeUtil.currentTimestamp() + '.xlsx');
        return this.res.send(report);
    },

};