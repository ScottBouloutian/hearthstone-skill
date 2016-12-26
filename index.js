'use strict';

const Alexa = require('alexa-sdk');
const cards = require('./cards.json');
const ld = require('lodash');

const APP_ID = 'amzn1.ask.skill.a404dd31-1199-4fda-a182-ef2184be4724';
const handlers = {
    LaunchRequest: function LaunchRequest() {
        this.emit('GetRandomCard');
    },
    GetRandomCardIntent: function GetRandomCardIntent() {
        this.emit('GetRandomCard');
    },
    GetRandomCard: function GetRandomCard() {
        const card = ld.sample(cards);
        let speechOutput = `${card.name} is a ${card.playerClass} ${card.type} from the ${card.cardSet} set.`;
        if ('flavor' in card) {
            speechOutput += ` ${card.flavor}`;
        }
        this.emit(':tell', speechOutput);
    },
    'AMAZON.HelpIntent': function HelpIntent() {
        const speechOutput = 'You can say give me a random card, or, you can say exit... What can I help you with?';
        const reprompt = 'What can I help you with?';
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function CancelIntent() {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function StopIntent() {
        this.emit(':tell', 'Goodbye!');
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
