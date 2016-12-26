'use strict';

const request = require('request');
const ld = require('lodash');
const fs = require('fs');

const hsQuery = (path) => {
    const url = `https://omgvamp-hearthstone-v1.p.mashape.com${path}`;
    return new Promise((resolve, reject) => {
        request.get({
            url,
            headers: {
                'X-Mashape-Key': process.env.MASHAPE_KEY,
            },
            json: true,
        }, (error, response, body) => {
            if (error) {
                reject(error);
            } else if (response.statusCode === 200) {
                resolve(body);
            } else {
                reject(new Error(body.message));
            }
        });
    });
};

hsQuery('/info').then(info => (
    hsQuery('/cards').then((cards) => {
        const standardCards = ld.chain(cards)
            .pick(info.standard)
            .values()
            .flatten()
            .filter(card => (('img' in card) && card.type !== 'Hero'))
            .value();
        fs.writeFileSync('cards.json', JSON.stringify(standardCards, null, 4), 'utf-8');
    })
)).catch((error) => {
    throw error;
});
