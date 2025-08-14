const express = require('express')
const router = express.Router();
const Task = require('../models/Task')
const auth = require("../middleware/auth")

router.post("/", auth, async (req, res) => {  
    try {
      const { title, description } = req.body;
  
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "No user found in request" });
      }
  
      const task = await Task.create({
        title,
        description,
        user: req.user.id, 
      });
  
      res.status(201).json(task);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ message: error.message });
    }
  });
  
console.log('task loaded',Task.modelName);

router.get("/", auth, async (req,res) => {
    try{
        const task = await Task.find({ user: req.user.id })
        res.status(200).json(task)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get("/:id", auth , async(req, res) => {
    try{
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
        if(!task){
            return res.status(400).json({error : "task not found"})
        }
        res.status(200).json(task)
    }catch(err){
        res.status(500).json({message : err.message})
    }
})

// router.put("/:id", auth, async (req, res) => {
//     try {
//         const task = await Task.findOneAndUpdate(
//             { _id: req.params.id, user: req.user.id }, // filtering by both
//             { $set: req.body },
//             { new: true }
//           );
          
  
//       if (!task) return res.status(404).json({ error: "Task not found" });
  
//       res.json(task);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   });

router.put("/:id", auth, async (req, res) => {
    try {
        const allowedFields = ["title", "completed"]; 
        const updates = {};
        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { $set: updates },
            { new: true }
        );

        if (!task) return res.status(404).json({ error: "Task not found" });

        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

  

router.delete("/:id",auth ,async (req,res) => {
    try{
        const task = await Task.findByIdAndDelete({ _id: req.params.id, user: req.user.id });
        if(!task){
            return res.status(400).json({message : "task not found"})
        }
        res.status(200).json('Task deleted successfully')
    }catch(error){
        res.status(500).json({message : error.message})
    }
})

router.get("/search",auth, async (req, res) => {
    try {
      const { title } = req.query;
  
      if (!title) {
        return res.status(400).json({ error: "Please provide a title to search" });
      }
  
      const tasks = await Task.find({
        title: { $regex: title, $options: "i" }
      });
  
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports= router