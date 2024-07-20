const request = require('request');
require('dotenv').config();

const sendMessage = (req, res) => {
    const { to, templateName,languageCode} = req.body;
    const resData = {
        status: false,
        answer: ''
    };

    try {
        const options = {
            method: 'POST',
            url: 'https://graph.facebook.com/v19.0/379175768603995/messages',
            headers: {
                Authorization: `Bearer EAARBT4C5Ya4BOwDZAWabAQ9IeIZBXEwi8MwQ4PRSx4gZC8Bp37LY5hTlEgxZA7zozKM60yOk5ZASlhZCNX9q7VKbP3WUeR2mDESrE5ZBFRbRQqjFjBVkBtd37phSg7kNZBlmXmpwD7OnaN9ZBM2RTJAZCJBafXqm5OTheJhLAaUbuZCZBduebK8VT31jqzM0KLqBiZBkWvVMVZCMfX28eO8tbeZBDcZD`,
                'Content-Type': 'application/json'
            },
            body: {
                messaging_product: 'whatsapp',
                to: to,
                type: 'template',
                template: {
                    name: templateName,
                    language: {
                        code: languageCode
                    }
                }
            },
            json: true
        };

        request(options, (error, response, body) => {
            if (error) {
                resData.status = false;
                resData.answer = error.message;
                return res.status(500).json(resData);
            }
            
            resData.status = true;
            resData.respondData = body;
            return res.status(200).json(resData);
        });
    } catch (e) {
        resData.status = false;
        resData.answer = e.message;
        return res.status(500).json(resData);
    }
};


const sendMessage1 = (req, res) => {
    const { to, templateName, languageCode, variables } = req.body;

    const resData = {
        status: false,
        answer: ''
    };

    try {
        const options = {
            method: 'POST',
            url: 'https://graph.facebook.com/v17.0/108110622388455/messages',
            headers: {
                Authorization: `Bearer ${process.env.SECRET_KEY}`,
                'Content-Type': 'application/json'
            },
            body: {
                messaging_product: 'whatsapp',
                to: to || process.env.TO,
                type: 'template',
                template: {
                    name: templateName || 'hello_world',
                    language: {
                        code: languageCode || 'en_US'
                    },
                    components: [
                        {
                            type: 'body',
                            parameters: variables.map((variable) => ({
                                type: 'text',
                                text: variable
                            }))
                        }
                    ]
                }
            },
            json: true
        };

        request(options, (error, response, body) => {
            if (error) {
                resData.status = false;
                resData.answer = error.message;
                return res.status(500).json(resData);
            }
            
            resData.status = true;
            resData.respondData = body;
            return res.status(200).json(resData);
        });
    } catch (e) {
        resData.status = false;
        resData.answer = e.message;
        return res.status(500).json(resData);
    }
};


const sendWinnerMessage = (req, res) => {
    const { to, templateName, languageCode, variables } = req.body;

    const resData = {
        status: false,
        answer: ''
    };

    try {
        const options = {
            method: 'POST',
            url: 'https://graph.facebook.com/v17.0/108110622388455/messages',
            headers: {
                Authorization: `Bearer ${process.env.SECRET_KEY}`,
                'Content-Type': 'application/json'
            },
            body: {
                messaging_product: 'whatsapp',
                to: to || process.env.TO,
                type: 'template',
                template: {
                    name: templateName || 'hello_world',
                    language: {
                        code: languageCode || 'en_US'
                    },
                    components: [
                        {
                            type: 'body',
                            parameters: variables.map((variable) => ({
                                type: 'text',
                                text: variable
                            }))
                        }
                    ]
                }
            },
            json: true
        };

        request(options, (error, response, body) => {
            if (error) {
                resData.status = false;
                resData.answer = error.message;
                return res.status(500).json(resData);
            }
            
            resData.status = true;
            resData.respondData = body;
            return res.status(200).json(resData);
        });
    } catch (e) {
        resData.status = false;
        resData.answer = e.message;
        return res.status(500).json(resData);
    }
};

module.exports = {
    sendMessage,
    sendMessage1
};
