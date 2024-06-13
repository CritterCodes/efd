import ConnectModel from '../models/connect.model.js';

export default class ConnectCoordinator {

    static getCollector = async (collectorID) => await ConnectModel.getCollector(collectorID);
    
}