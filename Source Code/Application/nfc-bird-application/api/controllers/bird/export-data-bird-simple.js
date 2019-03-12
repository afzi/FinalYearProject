module.exports = {


    friendlyName: 'export data',


    description: 'create and download excel sheet based on input data array',

    inputs: {
        //TODO: Implement filtering handling for reports
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

    fn: async function(inputs) {
        const excel = require('node-excel-export');

        // The data set should have the following shape (Array of Objects)
        // The order of the keys is irrelevant, it is also irrelevant if the
        // dataset contains more fields as the report is build based on the
        // specification provided above. But you should have all the fields
        // that are listed in the report specification
        var BIRDQUERY = `SELECT * FROM nfcbirds.bird;`
        var rawResult = await sails.sendNativeQuery(BIRDQUERY);
        var parsedResult = [];
        var rows = rawResult.rows;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var NESTQUERY = `
            SELECT * FROM nfcbirds.birdnest 
            INNER JOIN nfcbirds.nestsite 
            ON nfcbirds.birdnest.nestID = nfcbirds.nestsite.id 
            WHERE birdID = $1 ORDER BY nfcbirds.birdnest.dateLeft ASC;`
            var nestResult = await sails.sendNativeQuery(NESTQUERY,[row.id]);
            var nestResultRows = nestResult.rows;
            var nestInfo = {
                current: '',
                currentDist: '',
                currentDisc: '',
                currentLat: '',
                currentLong: '',
                last: '',
                lastDist: '',
                lastDisc: '',
                lastLat: '',
                lastLong: '',
            };
            for(var j = 0; j<nestResultRows.length; j++){
                nrr = nestResultRows[j];
                if(nrr.dateLeft === null){
                    nestInfo.current = nrr.nestID;
                    nestInfo.currentDist = nrr.distanceToHoppersKm;
                    nestInfo.currentDisc = nrr.nestDescription;
                    nestInfo.currentLat = nrr.latitude;
                    nestInfo.currentLong = nrr.longitude;
                } else{
                    nestInfo.last = nrr.nestID;
                    nestInfo.lastDist = nrr.distanceToHoppersKm;
                    nestInfo.lastDisc = nrr.nestDescription;
                    nestInfo.lastLat = nrr.latitude;
                    nestInfo.lastLong = nrr.longitude;
                    j = nestResultRows.length + 1; //got all we need so we out out
                }
            }

            var age = TimeUtil.getAge(row.hatchDate);

            var bird = {
                birdName: row.birdName,
                studID: row.studID,
                sex: row.sex,
                fatherName: row.fatherName,
                motherName: row.motherName,
                age: age,
                isBreeder: row.isBreeder,
                currentSite: nestInfo.current,
                distance: nestInfo.currentDist,
                lastSite: nestInfo.last
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
                    bold: true
                }
            },
            headerDark: {
                fill: {
                    fgColor: {
                        rgb: 'FF86CBDF'
                    }
                },
                font: {
                    color: {
                        rgb: 'FF000000'
                    },
                    sz: 14,
                    bold: true
                }
            },
            cellPlain: {
                color: {
                    rgb: 'FF000000'
                }
            },
            cellJustify: {
                fill: {
                    fgColor: {
                        rgb: '0AD3D3D3'
                    }
                },
                font: {
                    color: {
                        rgb: 'FF000000'
                    },
                    bold: true
                }
            }
        };

        //Here you specify the export structure
        const specification = {
            birdName: {
                displayName: 'Bird Name',
                headerStyle: styles.headerDark,
                cellStyle: styles.cellJustify,
                width: '10'

            },
            studID: {
                displayName: 'Stud ID',
                headerStyle: styles.headerDark,
                width: '10'
            },
            sex: {
                displayName: 'Gender',
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: '10'
            },
            fatherName: {
                displayName: 'Father Name',
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: '15'
            },
            motherName: {
                displayName: 'Mother Name',
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: '15'
            },
            age: {
                displayName: 'Age',
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: '15'
            },
            isBreeder: {
                displayName: 'Breeder',
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: '10'
            },
            currentSite: {
                displayName: 'Current Breeding Site',
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: '25'
            },
            distance: {
                displayName: 'Distance To Hopper',
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: '25'
            },
            lastSite: {
                displayName: 'Previous Breeding Site',
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPlain,
                width: '25'
            },
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

        this.res.attachment('report.xlsx');
        return this.res.send(report);
    },

};