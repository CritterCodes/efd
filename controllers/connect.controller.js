import ConnectCoordinator from '../coordinators/connect.coordinator.js';


export const getCollector = async (req, res, next) => {
    try {
      const result = await ConnectCoordinator.getCollector(req.params.collectorID);
  
      if (result.error) {
        res.status(500).json({ error: result.error });
    } else if (result.redirect) {
        res.redirect(result.redirect);
    } else {
        res.status(200).json(result);
    }

    } catch (ex) {
        next(ex);
    }
};