module.exports = {

    friendlyName: 'Get Birds',
  
  
    description: 'List/Filter birds.',
  
  
    extendedDescription:
  `This lists birds, according to filters (if given).`,
  
  
    inputs: {
      id: {
        required: false,
        type: 'string',
        description: 'ID of the bird to retrieve'
      },

      studId: {
        required: false,
        type: 'string',
        description: 'The STUD ID (legacy)'
      },

      newStudId: {
        required: false,
        type: 'string',
        description: 'The NEW STUD ID (legacy)'
      },
  
      leftRingId:  {
        required: false,
        type: 'string',
        description: 'The left ring ID (legacy)',
      },

      rightRingId: {
        required: false,
        type: 'string',
        description: 'The left ring ID (legacy)',
      },

      birdName: {
        required: false,
        type: 'string',
        description: 'The friendly name to assign to this bird.',
        extendedDescription: 'Must be unique'
      },

      sex: {
        required: false,
        type: 'string',
        description: 'The sex (male / female / unknown)',
        extendedDescription: 'Must be one of male / female / unknown'
      },
      
      createdBy: {
        required: false,
        type: 'string',
        description: 'Who created the bird'
      },
      
      isBreeder: {
        required: false,
        type: 'string',
        description: 'Whether th ebird is(breeder / not breeder / unknown)'
      },

      fatherName: {
        required: false,
        type: 'string',
        description: 'The name of the father bird.'
      },

      secondFatherName: {
        required: false,
        type: 'string',
        description: 'The name of the second father bird.'
      },

      groupName: {
        required: false,
        type: 'string',
        description: 'The group to assign this bird to.'
      },

      motherName: {
        required: false,
        type: 'string',
        description: 'The name of the mother bird.'
      },

      nfcRingId: { // TODO
        required: false,
        type: 'string',
        description: 'The RFID of the NFC ring attached to this bird.'
      },

      layDateFrom: {
        required: false,
        type: 'number',
        description: 'The date this bird was laid.',
        extendedDescription: 'Must be a valid timestamp'
      },

      layDateTo: {
        required: false,
        type: 'number',
        description: 'The date this bird was laid.',
        extendedDescription: 'Must be a valid timestamp'
      },

      hatchDateFrom: {
        required: false,
        type: 'number',
        description: 'The date this bird was hatched.',
        extendedDescription: 'Must be a valid timestamp'
      },

      hatchDateTo: {
        required: false,
        type: 'number',
        description: 'The date this bird was hatched.',
        extendedDescription: 'Must be a valid timestamp'
      },

      incDaysFrom: {
        required: false,
        type: 'number',
        description: 'The number of days this bird spent in incubation.'
      },

      
      incDaysTo: {
        required: false,
        type: 'number',
        description: 'The number of days this bird spent in incubation.'
      },
      whereLaid:{
        required: false,
        type: 'string',
        description: 'The location where the bird laid.'
      },

      whereHatched: {
        required: false,
        type: 'string',
        description: 'The location where the bird hatched.'
      },

      whereFledged: {
        required: false,
        type: 'string',
        description: 'The location where this bird fledged.'
      },

      whenFledged: {
        required: false,
        type: 'number',
        description: 'The date when this bird fledged.',
        extendedDescription: 'Must be a valid timestamp'
      },

      whereReleased: {
        required: false,
        type: 'string',
        description: 'The location where this bird was released.'
      },

      whenReleased: {
        required: false,
        type: 'number',
        description: 'The date when this bird was released.',
        extendedDescription: 'Must be a valid timestamp'
      },

      status: {
        required: false,
        type: 'string',
        description: 'status of bird'
      },

      researcherNotes: {
        required: false,
        type: 'string',
        description: 'Researcher notes.'
      },

      currentNestSite: { // TODO
        required: false,
        type: 'string',
        description: 'Where is the bird currently nesting'      
      },
      previousNestSite: { // TODO
        required: false,
        type: 'string',
        description: 'Where is the bird currently nesting'      
      },

        currentCondition: { // TODO
            required: false,
            type: 'string',
          description: 'The current condition of the bird'
        },

        includeConditions: {
          required: false,
          type: 'boolean',
          description: 'Whether to include the condition history of the bird'
        },

        includeVisits: {
          required: false,
          type: 'boolean',
          description: 'Whether to include the visit history of the bird'
        },

        includeNestsites: {
          required: false,
          type: 'boolean',
          description: 'Whether to include the nest site history of the bird'
        },

        skip: {
            required: false,
            type: 'number',
            description: 'How many records to skip (if used in pagination - where does the page begin)'
        },

        limit: {
            required: false,
            type: 'number',
            description: 'How many records to return (if used in pagination - what is the page size)'
        },

        sortItem: {
          required: false,
          type: 'string',
          defaultsTo: 'createdAt',
          description: 'Which field to sort by'
        },
  
        sortDirection: {
          required: false,
          type: 'string',
          defaultsTo: 'DESC',
          description: 'Which direction to sort in (ASC/DESC)'
        }
  
    },
  
    exits: {
  
      success: {
        description: 'All good dawg.'
      }
    },
  
  
    fn: async function (inputs) {
      console.log("Received request to list/filter birds")

      let query = {}
      if(inputs.id) query.id = inputs.id;
      if(inputs.studId) query.studID = {'contains': inputs.studId}
      if(inputs.status) query.status = {'contains': inputs.status}
      if(inputs.newStudId) query.newStudID = {'contains': inputs.newStudId}
      if(inputs.leftRingId) query.leftRingID = {'contains': inputs.leftRingId}
      if(inputs.rightRingId) query.rightRingID = {'contains': inputs.rightRingId}
      if(inputs.birdName) query.birdName = {'contains': inputs.birdName}
      if(inputs.sex) query.sex = inputs.sex
      
      if(inputs.fatherName) query.fatherName = {'contains': inputs.fatherName}
      if(inputs.motherName) query.motherName = {'contains': inputs.motherName}
      if(inputs.secondFatherName) query.secondFatherName = {'contains': inputs.secondFatherName}
      if(inputs.groupName) query.groupName = {'contains': inputs.groupName}
      if(inputs.researcherNotes) query.researcherNotes = {'contains': inputs.researcherNotes}
      
      if(inputs.layDateFrom) query.layDate = {'>=': inputs.layDateFrom}
      if(inputs.layDateTo) query.layDate['<='] = inputs.layDateTo;
      if(inputs.hatchDateFrom) query.hatchDate = {'>=': inputs.hatchDateFrom}
      if(inputs.hatchDateTo) query.hatchDate['<='] = inputs.hatchDateTo;
      if(inputs.incDaysFrom) query.incubationDays = {'>=': inputs.incDaysFrom};
      if(inputs.incDaysTo) query.incubationDays['<='] = inputs.incDaysTo;

      if(inputs.isBreeder) query.isBreeder = inputs.isBreeder;
      let finalQuery = {where: query}

      var manualSortFunction;
      if(inputs.sortItem === 'latestCondition') {
        if(inputs.sortDirection === 'ASC') {
          manualSortFunction = (el1, el2) => {
            if((!el1.conditionHistory || !el1.conditionHistory[0]) && (!el2.conditionHistory || !el2.conditionHistory[0])) return 0;
            if((!el1.conditionHistory || !el1.conditionHistory[0])) return 1;
            if((!el2.conditionHistory || !el2.conditionHistory[0])) return -1;
            return el1.conditionHistory[0].birdCondition.localeCompare(el2.conditionHistory[0].birdCondition)
          };
         } else {
          manualSortFunction = (el2, el1) => {
            if((!el1.conditionHistory || !el1.conditionHistory[0]) && (!el2.conditionHistory || !el2.conditionHistory[0])) return 0;
            if((!el1.conditionHistory || !el1.conditionHistory[0])) return 1;
            if((!el2.conditionHistory || !el2.conditionHistory[0])) return -1;
            return el1.conditionHistory[0].birdCondition.localeCompare(el2.conditionHistory[0].birdCondition)
          };
        }
      } else if(inputs.sortItem === 'hatchedWhere') {
        if(inputs.sortDirection === 'ASC') {
          manualSortFunction = (el1, el2) => {
            if(!el1.hatchedWhere && !el2.hatchedWhere) return 0;
            if(!el1.hatchedWhere) return 1;
            if(!el2.hatchedWhere) return -1;
            return el1.hatchedWhere.nestID.localeCompare(el2.hatchedWhere.nestID)
          };
         } else {
          manualSortFunction = (el2, el1) => {
            if(!el1.hatchedWhere && !el2.hatchedWhere) return 0;
            if(!el1.hatchedWhere) return 1;
            if(!el2.hatchedWhere) return -1;
            return el1.hatchedWhere.nestID.localeCompare(el2.hatchedWhere.nestID)
          };
        }
      } else if(inputs.sortItem === 'laidWhere') {
        if(inputs.sortDirection === 'ASC') {
          manualSortFunction = (el1, el2) => {
            if(!el1.laidWhere && !el2.laidWhere) return 0;
            if(!el1.laidWhere) return 1;
            if(!el2.laidWhere) return -1;
            return el1.laidWhere.nestID.localeCompare(el2.laidWhere.nestID)
          };
         } else {
          manualSortFunction = (el2, el1) => {
            if(!el1.laidWhere && !el2.laidWhere) return 0;
            if(!el1.laidWhere) return 1;
            if(!el2.laidWhere) return -1;
            return el1.laidWhere.nestID.localeCompare(el2.laidWhere.nestID)
          };
        }
      } else if(inputs.sortItem === 'releasedWhere') {
        if(inputs.sortDirection === 'ASC') {
          manualSortFunction = (el1, el2) => {
            if(!el1.releasedWhere && !el2.releasedWhere) return 0;
            if(!el1.releasedWhere) return 1;
            if(!el2.releasedWhere) return -1;
            return el1.releasedWhere.nestID.localeCompare(el2.releasedWhere.nestID)
          };
         } else {
          manualSortFunction = (el2, el1) => {
            if(!el1.releasedWhere && !el2.releasedWhere) return 0;
            if(!el1.releasedWhere) return 1;
            if(!el2.releasedWhere) return -1;
            return el1.releasedWhere.nestID.localeCompare(el2.releasedWhere.nestID)
          };
        }

      } else if(inputs.sortItem === 'fledgedWhere') {
        if(inputs.sortDirection === 'ASC') {
          manualSortFunction = (el1, el2) => {
            if(!el1.fledgedWhere && !el2.fledgedWhere) return 0;
            if(!el1.fledgedWhere) return 1;
            if(!el2.fledgedWhere) return -1;
            return el1.fledgedWhere.nestID.localeCompare(el2.fledgedWhere.nestID)
          };
         } else {
          manualSortFunction = (el2, el1) => {
            if(!el1.fledgedWhere && !el2.fledgedWhere) return 0;
            if(!el1.fledgedWhere) return 1;
            if(!el2.fledgedWhere) return -1;
            return el1.fledgedWhere.nestID.localeCompare(el2.fledgedWhere.nestID)
          };
        }
      } else if(inputs.sortItem === 'breedingSite') {
        if(inputs.sortDirection === 'ASC') {
          manualSortFunction = (el1, el2) => {
            if((!el1.nestsiteHistory || !el1.nestsiteHistory[0] || !el1.nestsiteHistory[0].nestID) && (!el2.nestsiteHistory || !el2.nestsiteHistory[0] || !el2.nestsiteHistory[0].nestID)) return 0;
            if((!el1.nestsiteHistory || !el1.nestsiteHistory[0] || !el1.nestsiteHistory[0].nestID)) return 1;
            if((!el2.nestsiteHistory || !el2.nestsiteHistory[0] || !el2.nestsiteHistory[0].nestID)) return -1;
            return el1.nestsiteHistory[0].nestID.nestID.localeCompare(el2.nestsiteHistory[0].nestID.nestID)
          };
         } else {
          manualSortFunction = (el2, el1) => {
            if((!el1.nestsiteHistory || !el1.nestsiteHistory[0] || !el1.nestsiteHistory[0].nestID) && (!el2.nestsiteHistory || !el2.nestsiteHistory[0] || !el2.nestsiteHistory[0].nestID)) return 0;
            if((!el1.nestsiteHistory || !el1.nestsiteHistory[0] || !el1.nestsiteHistory[0].nestID)) return 1;
            if((!el2.nestsiteHistory || !el2.nestsiteHistory[0] || !el2.nestsiteHistory[0].nestID)) return -1;
            return el1.nestsiteHistory[0].nestID.nestID.localeCompare(el2.nestsiteHistory[0].nestID.nestID)
          };
        }
      } else if(inputs.sortItem === 'previousBreedingSite') {
        if(inputs.sortDirection === 'ASC') {
          manualSortFunction = (el1, el2) => {
            if((!el1.nestsiteHistory || !el1.nestsiteHistory[1] || !el1.nestsiteHistory[1].nestID) && (!el2.nestsiteHistory || !el2.nestsiteHistory[1] || !el2.nestsiteHistory[1].nestID)) return 0;
            if((!el1.nestsiteHistory || !el1.nestsiteHistory[1] || !el1.nestsiteHistory[1].nestID)) return 1;
            if((!el2.nestsiteHistory || !el2.nestsiteHistory[1] || !el2.nestsiteHistory[1].nestID)) return -1;
            return el1.nestsiteHistory[1].nestID.nestID.localeCompare(el2.nestsiteHistory[1].nestID.nestID)
          };
         } else {
          manualSortFunction = (el2, el1) => {
            if((!el1.nestsiteHistory || !el1.nestsiteHistory[1] || !el1.nestsiteHistory[1].nestID) && (!el2.nestsiteHistory || !el2.nestsiteHistory[1] || !el2.nestsiteHistory[1].nestID)) return 0;
            if((!el1.nestsiteHistory || !el1.nestsiteHistory[1] || !el1.nestsiteHistory[1].nestID)) return 1;
            if((!el2.nestsiteHistory || !el2.nestsiteHistory[1] || !el2.nestsiteHistory[1].nestID)) return -1;
            return el1.nestsiteHistory[1].nestID.nestID.localeCompare(el2.nestsiteHistory[1].nestID.nestID)
          };
        }
      } else if(inputs.sortItem === 'lastSeen') {
        if(inputs.sortDirection === 'ASC') {
          manualSortFunction = (el1, el2) => {
            if((!el1.visitHistory || !el1.visitHistory[0]) && (!el2.visitHistory || !el2.visitHistory[0])) return 0;
            if((!el1.visitHistory || !el1.visitHistory[0])) return 1;
            if((!el2.visitHistory || !el2.visitHistory[0])) return -1;
            return el1.visitHistory[0].createdAt - el2.visitHistory[0].createdAt;
          };
         } else {
          manualSortFunction = (el1, el2) => {
            if((!el1.visitHistory || !el1.visitHistory[0]) && (!el2.visitHistory || !el2.visitHistory[0])) return 0;
            if((!el1.visitHistory || !el1.visitHistory[0])) return -1;
            if((!el2.visitHistory || !el2.visitHistory[0])) return 1;
            return el2.visitHistory[0].createdAt - el1.visitHistory[0].createdAt;
          };
        }
      } else if(inputs.sortItem === 'hasNFC') {
        if(inputs.sortDirection === 'DESC') {
          manualSortFunction = (el1, el2) => {
            if(el1.nfcRingID && el2.nfcRingID) return 0;
            if(el1.nfcRingID) return 1;
            if(el2.nfcRingID) return -1;
          }
        } else {
          manualSortFunction = (el1, el2) => {
            if(el1.nfcRingID && el2.nfcRingID) return 0;
            if(el1.nfcRingID) return -1;
            if(el2.nfcRingID) return 1;
          }
        }
      } else if(inputs.sortItem === 'nfcRingID') {
        if(inputs.sortDirection === 'ASC') {
          manualSortFunction = (el1, el2) => {
            if(!el1.nfcRingID && !el2.nfcRingID) return 0;
            if(!el1.nfcRingID) return 1;
            if(!el2.nfcRingID) return -1;
            return el1.nfcRingID.localeCompare(el2.nfcRingID)
          };
         } else {
          manualSortFunction = (el2, el1) => {
            if(!el1.nfcRingID && !el2.nfcRingID) return 0;
            if(!el1.nfcRingID) return 1;
            if(!el2.nfcRingID) return -1;
            return el1.nfcRingID.localeCompare(el2.nfcRingID)
          };
        }
      } else if(inputs.sortItem === 'fullName') {
        if(inputs.sortDirection === 'ASC') {
          manualSortFunction = (el1, el2) => {
            if(!el1.createdBy && !el2.createdBy) return 0;
            if(!el1.createdBy) return 1;
            if(!el2.createdBy) return -1;
            return el1.createdBy.fullName.localeCompare(el2.createdBy.fullName)
          };
         } else {
          manualSortFunction = (el2, el1) => {
            if(!el1.createdBy && !el2.createdBy) return 0;
            if(!el1.createdBy) return 1;
            if(!el2.createdBy) return -1;
            return el1.createdBy.fullName.localeCompare(el2.createdBy.fullName)
          };
        }
      } else {
        finalQuery.sort = `${inputs.sortItem} ${inputs.sortDirection}`
      }

      var result = await Bird.find(finalQuery).populate('hatchedWhere').populate('laidWhere').populate('fledgedWhere').populate('releasedWhere').populate('createdBy');

      var finalResult = [];

      for(let nextBird of result) {
        nextBird.age = TimeUtil.getAge(nextBird.hatchDate);
        var rfid = await RFIDTag.findOne({birdID: nextBird.id});

        if(rfid) nextBird.nfcRingID = rfid.nfcRFID;

        var allConditionsMatch = true;

        if(inputs.createdBy) {
          if(nextBird.createdBy && nextBird.createdBy.username === inputs.createdBy) {
            allConditionsMatch = true;
          } else allConditionsMatch = false;
        }

        if(inputs.whereLaid) {
          if(nextBird.laidWhere && nextBird.laidWhere.nestID === inputs.whereLaid) {
            allConditionsMatch = true;
          } else allConditionsMatch = false;
        }
        if(inputs.whereHatched) {
          if(nextBird.hatchedWhere && nextBird.hatchedWhere.nestID === inputs.whereHatched) {
            allConditionsMatch = true;
          } else allConditionsMatch = false;
        }
        if(inputs.whereFledged) {
          if(nextBird.fledgedWhere && nextBird.fledgedWhere.nestID === inputs.whereFledged) {
            allConditionsMatch = true;
          } else allConditionsMatch = false;
        }

        if(inputs.whereReleased) {
          if(nextBird.releasedWhere && nextBird.releasedWhere.nestID === inputs.whereReleased) {
            allConditionsMatch = true;
          } else allConditionsMatch = false;
        }

        if(inputs.includeConditions && allConditionsMatch) {
          var conditionHistory = await Birdcondition.find({where: {birdID: nextBird.id}, sort: 'dateNoted DESC'});
          if(inputs.currentCondition) {
            if(conditionHistory[0] && (conditionHistory[0].birdCondition === inputs.currentCondition)) {
              nextBird.conditionHistory = conditionHistory;
            } else {
              allConditionsMatch = false;
            }
          } else {
            nextBird.conditionHistory = conditionHistory;
          }
        }

        if(inputs.includeNestsites && allConditionsMatch) {
          var nestsiteHistory = await Birdnest.find({where: {birdID: nextBird.id}, sort: 'dateEntered DESC'}).populate('nestID');
          if(inputs.currentNestSite) {
            if(nestsiteHistory[0] && (nestsiteHistory[0].nestID.nestID === inputs.currentNestSite)) {
              nextBird.nestsiteHistory = nestsiteHistory;
            } else {
              allConditionsMatch = false;
            }
          } else {
            nextBird.nestsiteHistory = nestsiteHistory;
          }
        }

        if(inputs.includeNestsites && allConditionsMatch) {
          var nestsiteHistory = await Birdnest.find({where: {birdID: nextBird.id}, sort: 'dateEntered DESC'}).populate('nestID');
          if(inputs.previousNestSite) {
            if(nestsiteHistory[1] && (nestsiteHistory[1].nestID.nestID === inputs.previousNestSite)) {
              nextBird.nestsiteHistory = nestsiteHistory;
            } else {
              allConditionsMatch = false;
            }
          } else {
            nextBird.nestsiteHistory = nestsiteHistory;
          }
        }



        if(inputs.includeVisits && allConditionsMatch) {
          var visitHistory = await Visit.find({where: {birdID: nextBird.id}, sort: 'createdAt DESC'});
          nextBird.visitHistory = visitHistory;
        }

        if(allConditionsMatch) finalResult.push(nextBird);
      }
      

      if(inputs.skip) {
          finalResult = finalResult.slice(inputs.skip);
      }

      if(inputs.limit) {
        finalResult = finalResult.slice(0, inputs.limit);
      }

      if(manualSortFunction) finalResult.sort(manualSortFunction);

      // TODO rewrite this whole fucking controller to be more efficient. No, seriously, it's horrible.

      return finalResult;
    }
  
  };
  