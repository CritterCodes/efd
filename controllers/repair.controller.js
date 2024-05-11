import RepairCoordinator from '../coordinators/repair.coordinator.js';

export const createRepair = async (req, res, next) => {
    try {
        const result = await RepairCoordinator.createRepair(req.body);

        if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json();
          }
    } catch (ex) {
        next(ex);
    }
};

export const getRepairList = async (req, res, next) => {
    try {
        const result = await RepairCoordinator.getRepairList(req.body);

        if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json();
          }
    } catch (ex) {
        next(ex);
    }
};

export const getRepair = async (req, res, next) => {
    try {
        const result = await RepairCoordinator.getRepair(req.params.repairID);

        if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json();
          }
    } catch (ex) {
        next(ex);
    }
};

export const updateRepair = async (req, res, next) => {
    try {
        const result = await RepairCoordinator.updateRepair(req.params.repairID, req.body);

        if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json();
          }
    } catch (ex) {
        next(ex);
    }
};

export const deleteRepair = async (req, res, next) => {
    try {
        const result = await RepairCoordinator.deleteRepair(req.params.repairID);

        if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json();
          }
    } catch (ex) {
        next(ex);
    }
};
