const { hash, compare } = require("bcrypt");
const Manager = require("../../models/managerModel");
const { filter } = require("../../controllers/managerConroller/managerFunctionalty")

module.exports = {
  getAllManagers: async (req, res) => {
    try {
      const unfilterObj = await Manager.find();

      const managers = filter(unfilterObj)

      return res.status(200).json({
        message: "successfully to get managers",
        success: true,
        managers,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in get managers",
        success: false,
        error: error.message,
      });
    }
  },
  addManager: async (req, res) => {
    try {
      const { manager_password, manager_email } = req.body;

      if ((!manager_password, !manager_email)) {
        throw new Error("yoe need to insert all credential fields");
      }

      const hashpass = await hash(manager_password, 10);

      if (!hashpass) throw new Error("try again");

      const user = req.body;

      user.manager_password = hashpass;

      // await new Manager.create(req.body);

      const newManager = new Manager(req.body);
      await newManager.save();


      user.manager_password = "*******";

      return res.status(200).json({
        message: "successfully to register user",
        success: true,
        user: req.body,
      });
    } catch (error) {
      return res.status(500).json({
        message: "not successfully to register user",
        success: false,
        error: error.message,
      });
    }
  },
  upDataManager: async (req, res) => {
    try {
      const { manager_password, manager_email } = req.body;

      if ((!manager_password, !manager_email)) {
        throw new Error("you need to insert all credential fields");
      }

      const managerId = req.params.id;

      const manager = await Manager.findByIdAndUpdate(managerId, req.body);

      return res.status(200).json({
        message: "successfully to update manager",
        success: true,
        manager,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in update manager",
        success: false,
        error: error.message,
      });
    }
  },
  deleteManager: async (req, res) => {
    try {

      const id = req.params.id;
      const obj = await Manager.findByIdAndDelete(id);

      return res.status(200).json({
        message: "successfully to delete manger",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "did not delete manager",
        success: false,
        error: error.message,
      });
    }
  },
};
