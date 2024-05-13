/* eslint-disable import/extensions */
import { v4 as uuid } from 'uuid';
import CollectorModel from '../models/collectors.model.js';
import Collector from '../classes/collector.js';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import collectorSchema from '../schemas/collector.json' assert { type: 'json' };

const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(collectorSchema);

export default class CollectorCoordinator {
    static createCollector = async (collector) => {
        try {
            collector.collectorID = `collector-${uuid().slice(-8)}`;
            collector.receivedDate = `${new Date()}`;
            const newCollector = new Collector(
                collector.collectorID,
                collector.userID,
                collector.username,
                collector.description,
                collector.picture,
                collector.bio,
                collector.websites,
                collector.socials
            );

            const valid = validate(newCollector);
            if (!valid) {
                const error = new Error('Validation failed');
                error.statusCode = 400;
                error.type = 'ValidationError';
                error.details = validate.errors;
                throw error;
            }
            const response = await CollectorModel.createCollector(newCollector);
            return response;
        } catch (err) {
            console.error('There was an error creating your collector before sending to the model. Error:', err);
        }
    };

    static getCollectorList = async (search) => {
        try {
            const filter = Object.keys(search)[0];
            const value = search[filter];
            const response = await CollectorModel.getCollectorList(filter, value);
            return response;
        } catch (err) {
            console.error('There was an error building your search. Error:', err);
        }
    };

    static getCollector = async (collectorID) => await CollectorModel.getCollector(collectorID);

    static updateCollector = async (collectorID, update) => {
        collectorID, userID, picture, bio, websites, socials
        const updatedCollector = new Collector();
        updatedCollector.collectorID = collectorID;
        updatedCollector.receivedDate = "";
        Object.keys(update).forEach((key) => {
            switch (key) {
                case 'username':
                updatedCollector.username = update.status;
                break;
                case 'picture':
                updatedCollector.picture = update.promiseDate;
                break;
                case 'bio':
                updatedCollector.bio = update.metalType;
                break;
                case 'websites':
                updatedCollector.websites = update.metalType;
                break;
                case 'socials':
                updatedCollector.socials = update.metalType;
                break;
                default:
                break;
            }
        });
/*
        const valid = validate(updatedCollector);
        if (!valid) {
        const error = new Error('Validation failed');
        error.statusCode = 400;
        error.type = 'ValidationError';
        error.details = validate.errors;
        throw error;
        }*/

        return await CollectorModel.updateCollector(collectorID, update, updatedCollector);
    }

    static deleteCollector = async (collectorID, collectorTaskID) => await CollectorModel.deleteCollector(collectorID, collectorTaskID);

    static addCollectorSocials = async (collectorID, tasks) => await CollectorModel.addCollectorTasks(collectorID, tasks);

    static updateCollectorSocial = async (collectorID, collectorTaskID, update) => await CollectorModel.updateCollectorTask(collectorID, collectorTaskID, update);

    static deleteCollectorTask = async (collectorID, collectorTaskID) => await CollectorModel.deleteCollectorTask(collectorID, collectorTaskID);
    
}