const { default: mongoose } = require("mongoose");
const Checklist = require("../model/checklistModel");
const Todo = require("../model/todoModel");

class TodoController {
  static async createNewChecklistItemInCheckList(req, res) {
    try {
      const { itemName } = req.body;
      const { checklistId } = req.params;
      const checklist = await Checklist.findById(checklistId).lean();
      if (!checklist) {
        return res.status(404).json({
          statusCode: 404,
          message: "Checklist not found",
        });
      }
      const newItem = new Todo({
        taskName: itemName,
        isComplete: false,
        id_checklist: checklistId,
      });
      const validateError = newItem.validateSync();
      if (validateError) {
        return res.status(400).json({
          statusCode: 400,
          message: "Invalid data",
        });
      }
      await newItem.save();
      return res.status(201).json({
        statusCode: 201,
        message: "New task added",
        data: {
          itemName: newItem.taskName,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async getAllChecklistItemInChecklistById(req, res) {
    try {
      const { checklistid } = req.params;
      const foundTask = await Todo.find({
        id_checklist: mongoose.Types.ObjectId(checklistid),
      }).lean();
      if (foundTask.length == 0) {
        return res.status(404).json({
          statusCode: 404,
          message: "Item not found",
        });
      }
      res.status(200).json({
        statusCode: 200,
        message: "Item found",
        data: foundTask,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async getChecklistItemInChecklistById(req, res) {
    try {
      const { checklistid, checklistItemId } = req.params;
      const foundTask = await Todo.findById(checklistItemId).lean();
      if (!foundTask) {
        return res.status(404).json({
          statusCode: 404,
          message: "Item not found",
        });
      }
      res.status(200).json({
        statusCode: 200,
        message: "Item Found",
        data: foundTask,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async updateStatusChecklistItemInChecklistById(req, res) {
    try {
      const { checklistid, checklistItemId } = req.params;
      const foundTask = await Todo.findByIdAndUpdate(checklistItemId, {
        status: true,
      }).lean();
      if (!foundTask) {
        return res.status(404).json({
          statusCode: 404,
          message: "Item not found",
        });
      }
      res.status(204).json({
        statusCode: 204,
        message: "Item Status",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  }

  // created after time is up, just for finishing

  static async deleteItemByChecklistItemId(req, res) {
    try {
      const { checklistid, checklistItemId } = req.params;
      const foundTask = await Todo.findByIdAndDelete(checklistItemId).lean();
      if (!foundTask) {
        return res.status(404).json({
          statusCode: 404,
          message: "Item not found",
        });
      }
      res.status(204).json({
        statusCode: 204,
        message: "Item Deleted",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async renameItemByChecklistItemId(req, res) {
    try {
      const { checklistid, checklistItemId } = req.params;
      const { itemName } = req.body;
      const foundTask = await Todo.findByIdAndUpdate(
        checklistItemId,
        {
          taskName: itemName,
        },
        { new: true }
      ).lean();
      if (!foundTask) {
        return res.status(404).json({
          statusCode: 404,
          message: "Item not found",
        });
      }
      res.status(200).json({
        statusCode: 200,
        message: "Item Status",
        data: foundTask,
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

module.exports = TodoController;
