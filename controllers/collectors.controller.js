import CollectorCoordinator from '../coordinators/collectors.coordinator.js';

export const createCollector = async (req, res, next) => {
    try {
        const result = await CollectorCoordinator.createCollector(req.body);

        if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json();
          }
    } catch (ex) {
        next(ex);
    }
};

export const getCollectorList = async (req, res, next) => {
    try {
        const result = await CollectorCoordinator.getCollectorList(req.body);

        if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json();
          }
    } catch (ex) {
        next(ex);
    }
};

export const getCollector = async (req, res, next) => {
    try {
        const result = await CollectorCoordinator.getCollector(req.params.identifier);

        if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json();
          }
    } catch (ex) {
        next(ex);
    }
};

export const updateCollector = async (req, res, next) => {
    try {
        const result = await CollectorCoordinator.updateCollector(req.params.collectorID, req.body);

        if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json();
          }
    } catch (ex) {
        next(ex);
    }
};

export const deleteCollector = async (req, res, next) => {
  try {
      const result = await CollectorCoordinator.deleteCollector(req.params.collectorID);

      if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json();
        }
  } catch (ex) {
      next(ex);
  }
};

export const addCollectorTasks = async (req, res, next) => {
  try {
    const result = await CollectorCoordinator.addCollectorTasks(req.params.collectorID, req.body.collectorTasks);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
}

export const updateCollectorTask = async (req, res, next) => {
  try {
    const result = await CollectorCoordinator.updateCollectorTask(req.params.collectorID, req.params.collectorTaskID, req.body.collectorTask);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
}

export const deleteCollectorTask = async (req, res, next) => {
  try {
    const result = await CollectorCoordinator.deleteCollectorTask(req.params.collectorID, req.params.CollectorTaskID);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
}