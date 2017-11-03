const expect = require('chai').expect;
const AWS = require('aws-sdk');
const Consumer = require('sqs-consumer');
const sqsOutput = require('../analytics/workers/sendUserData.js');
const sqsInput = require('../analytics/workers/getClientInput.js');

describe ('Input SQS queue', () => {
  beforeEach( (done) => {
    params = {
      MessageBody:  { 
        userId: 72, 
        adClicks: {
          crafts: 6,
          design: 0,
          entertainment: 5,
          events: 3,
          fashion: 1,
          food: 6,
          photography: 7,
          products: 4,
          sports: 7, 
          travel: 5
        }, 
       engagementScore: 0.632,
       scoreDropped: true,
      },
      QueueUrl: 'https://sqs.us-west-2.amazonaws.com/470758207750/test',
      DelaySeconds: 0,
    };

    sqsOutput.sendMessage(params);
  });

  it ('Should receive messages from the queue', (done) => {
    // load aws credentials
    AWS.config.loadFromPath(__dirname + '/config.json');

    const consumer = Consumer.create({
      queueUrl: 'https://sqs.us-west-2.amazonaws.com/470758207750/test',
      waitTimeSeconds: 10,
      handleMessage: (message, done) => {
        message = JSON.parse(message.Body);
        expect(message.userId).to.equal(72);
        expect(message.engagementScore).to.equal(0.632);
        expect(message).to.have.property('adClicks');
        done();
      },
      sqs: new AWS.SQS(),
    });

    consumer.start();
  });
});
