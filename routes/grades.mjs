import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import Grade from "../models/Grades.mjs";

const router = express.Router();

// Create a single grade entry
// router.post("/", async (req, res) => {
//   let collection = await db.collection("grades");
//   let newDocument = req.body;

//   // rename fields for backwards compatibility
//   if (newDocument.student_id) {
//     newDocument.learner_id = newDocument.student_id;
//     delete newDocument.student_id;
//   }

//   let result = await collection.insertOne(newDocument);
//   res.send(result).status(204);
// });

//create a single grade entry REFACTORED
router.post("/", async (req, res) =>{
  let newDocument = req.body; 

  if (newDocument.student_id) {
    newDocument.learner_id = newDocument.student_id;
    delete newDocument.student_id;
  }

  const result = await Grade.create(newDocument);
  res.status(204).send(result); 
  if (!result) res.status(500).send(error)
})

// Get a single grade entry
// router.get("/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { _id: ObjectId(req.params.id) };
//   let result = await collection.findOne(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

//Get a single grade entry REFACTORED 
router.get("/:id", async (req, res) => {
  const result = await Grade.findById(req.params.id); 
  if (!result) res.status(404).send("Not found"); 
  else res.status(200).send(result)
});



// Add a score to a grade entry
// router.patch("/:id/add", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { _id: ObjectId(req.params.id) };

//   let result = await collection.updateOne(query, {
//     $push: { scores: req.body }
//   });

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// Add a score to a grade entry REFACTORED
router.patch("/:id/add", async (req, res) => {
  const result = await Grade.findByIdAndUpdate(
    req.params.id,
    {$push : {scores: req.body}},
    {new: true}
  );
  if (!result) res.status(404).send("Not found");
  else res.status(200).send(result);
});

// Remove a score from a grade entry
// router.patch("/:id/remove", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { _id: ObjectId(req.params.id) };

//   let result = await collection.updateOne(query, {
//     $pull: { scores: req.body }
//   });

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// Remove a score from a grade entry REFACTORED
router.patch("/:id/remove", async (req, res) => {
  const result = await Grade.findByIdAndUpdate(
    req.params.id,
    {$pull: {scores: req.body}},
    {new: true}
  );
  if (!result) res.status(404).send("Not found");
  else res.status(200).send(result);
});

// Delete a single grade entry
// router.delete("/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { _id: ObjectId(req.params.id) };
//   let result = await collection.deleteOne(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// Delete a single grade entry REFACTORED
router.delete("/:id", async (req, res) => {
  const result = await Grade.findByIdAndDelete(req.params.id);
  if (!result) res.status(404).send("Not found");
  else res.status(200).send(result)
});

// Get route for backwards compatibility
router.get("/student/:id", async (req, res) => {
  res.redirect(`learner/${req.params.id}`);
});

// Get a learner's grade data
// router.get("/learner/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { learner_id: Number(req.params.id) };

//   // Check for class_id parameter
//   if (req.query.class) query.class_id = Number(req.query.class);

//   let result = await collection.find(query).toArray();

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// Get a learner's grade data REFACTORED
router.get("/learner/:id", async (req, res) => {
  const query = {learner_id: Number(req.params.id)}; 
  if (req.query.class) query.class_id = Number(req.query.class); 

  const result = await Grade.find(query); 
  if (!result.length) res.status(404).send("Not found");
  else res.status(200).send(result)
});

// Delete a learner's grade data
// router.delete("/learner/:id", async (req, res) => {
  //   let collection = await db.collection("grades");
  //   let query = { learner_id: Number(req.params.id) };
  
  //   let result = await collection.deleteOne(query);
  
  //   if (!result) res.send("Not found").status(404);
  //   else res.send(result).status(200);
  // });
  
// Delete a learner's grade data REFACTORED
router.delete("/learner/:id", async (req, res) => {
  const result = await Grade.findOneAndDelete(req.params.id); 
  if (!result) res.status(404).send("Not found");
  else res.status(200).send(result)
});

// Get a class's grade data
// router.get("/class/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { class_id: Number(req.params.id) };

//   // Check for learner_id parameter
//   if (req.query.learner) query.learner_id = Number(req.query.learner);

//   let result = await collection.find(query).toArray();

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// Get a class's grade data REFACTORED
router.get("/class/:id", async (req, res) => {
  const query = {class_id: Number(req.params.id)}; 
  if (req.query.learner) query.learner_id = Number(req.query.learner); 
  const result = await Grade.find(query);
  if (!result.length) res.status(404).send("Not found"); 
  else res.status(200).send(result)
});

// Update a class id
// router.patch("/class/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { class_id: Number(req.params.id) };

//   let result = await collection.updateMany(query, {
//     $set: { class_id: req.body.class_id }
//   });

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// Update a class id REFACTORED
router.patch("/class/:id", async (req, res) => {
  const result = await Grade.updateMany(
    {class_id: Number(req.params.id)},
    {$set: {class_id: req.body.class_id}}
  ); 
  if (!result) res.status(404).send("Not found");
  else res.status(200).send(result);
});

// Delete a class
// router.delete("/class/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { class_id: Number(req.params.id) };

//   let result = await collection.deleteMany(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });


// Delete a class REFACTORED
router.delete("/class/:id", async (req, res) => {
  const result = await Grade.deleteMany({class_id: Number(req.params.id)});
  if (!result) res.status(404).send("Not found");
  else res.status(200).send(result);
});

export default router;
