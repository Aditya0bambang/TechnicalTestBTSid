const Checklist = require("../model/checklistModel");

class ChecklistController {
  static async getAllChecklist(req, res) {
    try {
      const allChecklist = await Checklist.find().lean();
      if (allChecklist.length == 0) {
        return res.status(404).json({
          statusCode: 404,
          message: "Checklist not found",
        });
      }
      res.status(200).json({
        statusCode: 200,
        message: "Checklist found",
        data: allChecklist,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async createNewChecklist(req, res) {
    try {
      const { name } = req.body;
      const newChecklist = new Checklist({
        listName: name,
      });
      const validateError = newChecklist.validateSync();
      if (validateError) {
        return res.status(400).json({
          statusCode: 400,
          message: "Invalid data",
        });
      }
      await newChecklist.save();
      res.status(201).json({
        statusCode: 201,
        message: "Checklist created",
        data: newChecklist,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async deleteChecklistById(req, res) {
    try {
      const { checklistId } = req.params;
      const deletedChecklist = await Checklist.findByIdAndDelete(
        checklistId
      ).lean();
      if (!deletedChecklist) {
        return res.status(404).json({
          statusCode: 404,
          message: "Checklist not found",
        });
      }
      res.status(200).json({
        statusCode: 200,
        message: "Checklist deleted",
        data: deletedChecklist,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = ChecklistController;
