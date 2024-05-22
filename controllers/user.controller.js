import UserCoordinator from '../coordinators/user.coordinator.js';

export const createUser = async (req, res, next) => {
    try {
        const result = await UserCoordinator.createUser(req.params.userID, req.body);

        if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json();
          }
    } catch (ex) {
        next(ex);
    }
};

export const getUserList = async (req, res, next) => {
    try {
        const result = await UserCoordinator.getUserList(req.body);

        if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json();
          }
    } catch (ex) {
        next(ex);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const result = await UserCoordinator.getUser(req.params.userID);

        if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json();
          }
    } catch (ex) {
        next(ex);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const result = await UserCoordinator.updateUser(req.params.userID, req.body);

        if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json();
          }
    } catch (ex) {
        next(ex);
    }
};

export const deleteUser = async (req, res, next) => {
  try {
      const result = await UserCoordinator.deleteUser(req.params.userID);

      if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json();
        }
  } catch (ex) {
      next(ex);
  }
};

export const addUserTasks = async (req, res, next) => {
  try {
    const result = await UserCoordinator.addUserTasks(req.params.userID, req.body.userTasks);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
}

export const updateUserTask = async (req, res, next) => {
  try {
    const result = await UserCoordinator.updateUserTask(req.params.userID, req.params.userTaskID, req.body.userTask);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
}

export const deleteUserTask = async (req, res, next) => {
  try {
    const result = await UserCoordinator.deleteUserTask(req.params.userID, req.params.userTaskID);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
}