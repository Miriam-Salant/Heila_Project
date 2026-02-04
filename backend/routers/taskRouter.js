const express = require("express")
const router = express.Router()
const taskController = require("../controllers/taskController")

router.get("/", taskController.getTasks)
router.get("/:id", taskController.getTaskById)
router.post("/addTask", taskController.addTask)
router.put("/updateTask", taskController.updateTask)
router.delete("/deleteTask", taskController.deleteTask)

module.exports = router
