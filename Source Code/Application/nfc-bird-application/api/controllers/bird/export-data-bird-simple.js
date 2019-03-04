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
            var bird = {
                birdName: row.birdName,
                studID: row.studID,
                sex: row.sex,
                fatherName: row.fatherName,
                motherName: row.motherName,
                hatchDate: row.hatchDate,
                isBreeder: row.isBreeder,
                currentSite: 'TODO',
                distance: 'TODO',
                lastSite: 'TODO'
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
            hatchDate: {
                displayName: 'Hatch Date',
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