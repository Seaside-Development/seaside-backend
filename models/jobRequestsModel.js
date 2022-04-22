const mongoose = require('mongoose');

const jobRequestsSchema = new mongoose.Schema({
    $jsonSchema: {
        bsonType: 'object',
        required: [
          'status',
          'parish',
          'length',
          'complexity',
          'industry'
        ],
        properties: {
          contractor: {
            bsonType: 'string',
            description: 'contractor hired for the job, NOT MANDATORY'
          },
          industry: {
            'enum': [
              'Gardening',
              'Construction',
              'Plumbing',
              'Electrical'
            ],
            description: 'The industry that the job relates to. MANDATORY'
          },
          parish: {
            'enum': [
              'St. Lucy',
              'St. Peter',
              'St. James',
              'St. Andrew',
              'St. Thomas',
              'St. Joseph',
              'St. Michael',
              'St. George',
              'St. John',
              'Christ Church',
              'St. Philip'
            ],
            description: 'location of the job. MANDATORY'
          },
          description: {
            bsonType: 'string',
            description: 'a breif description of the the problem. NOT MANDATORY'
          },
          length: {
            bsonType: 'bool',
            description: 'true means long term false means short-term. MANDATORY'
          },
          complexity: {
            bsonType: 'bool',
            description: 'true means complex, false means simple. MANDATORY'
          },
          status: {
            'enum': [
              'Completed',
              'In Progress',
              'Not Started'
            ],
            description: 'status of the job, MANDATORY'
          },
          startDate: {
            bsonType: 'date',
            description: 'the date the job started. NOT MADNATORY'
          },
          endDate: {
            bsonType: 'date',
            description: 'the date the job was completed. NOT MADNATORY'
          },
          review: {
            bsonType: 'object',
            required: [
              'contractor',
              'details',
              'rating'
            ],
            properties: {
              contractor: {
                bsonType: 'string',
                description: 'contractor that did the job. MANDATORY'
              },
              details: {
                bsonType: 'string',
                description: 'The review describing the experience. MANDATORY'
              },
              rating: {
                bsonType: 'int',
                minimum: 1,
                maximum: 5,
                description: 'A numerical expression describing quality of service. MANDATORY'
              }
            }
          }
        }
      }
 });

module.exports = mongoose.model('JobRequests', jobRequestsSchema);