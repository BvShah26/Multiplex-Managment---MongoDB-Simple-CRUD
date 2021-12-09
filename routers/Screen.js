const express = require('express');
const router = express.Router();
router.use(express.json());

const ScreenModel = require('../models/ScreenModel');

router.get("/", (req, res) => {
    return res.json({ data: "Screen Home Page" });
});

// List All Screen
router.get("/list", async (req, res) => {
    const ScreenList = await ScreenModel.find();
    if (ScreenList.length === 0) {
        return res.json({ data: "No Data Found in collection - Screen" })
    }
    return res.json({ data: ScreenList });
});

// List All Screen of Specific Multiplex
router.get("/listbymultiplex/:name", async (req, res) => {
    const name = req.params.name;
    const MultiplexModel = require('../models/MultiplexModel');
    const MultiplexList = await MultiplexModel.find({ name: name });
    if (MultiplexList.length != 0) {
        const ScreenList = await ScreenModel.find({ MultiplexId: MultiplexList[0].MultiplexId });
        return res.json(ScreenList);
    }
    return res.json({ data: `No Multiplex Found with MultiplexName  : ${name}` });
});

// Add New Screen
router.post("/new", async (req, res) => {
    const newDocument = req.body;
    const ScreenList = await ScreenModel.find({ ScreenId: newDocument.ScreenId });
    if (ScreenList.length === 0) {
        ScreenModel.create(newDocument);
        return res.json({ data: "New Document Added - Screem Collection" });
    }
    return res.json({ data: "Screen Id Already Added.." });
});

// Update MovieName by ScreenId
router.put("/update/:sid", async (req, res) => {
    const sid = req.params.sid;
    const ScreenList = await ScreenModel.find({ ScreenId: sid });
    if (ScreenList.length > 0) {
        const updatedDocument = req.body;
        const NewScreenList = await ScreenModel.findOneAndUpdate(
            { ScreenId: sid },
            { MovieName: updatedDocument.MovieName },
            { new: true },
            (err, doc) => {
                if (err) {
                    console.log("MovieName Update Error : " + err);
                    return res.json({ data: "Document Not Updated" })
                }
                return res.json({ data: doc });
            });
    }
    return res.json({ data: `No Document Found With ScreenId : ${sid}` });
});

//delete Screen Document By MovieName
router.delete("/delete/:name", async (req, res) => {
    const name = req.params.name;
    const ScreenList = await ScreenModel.find({ MovieName: name });
    if (ScreenList.length != 0) {
        const DeleteDocument = await ScreenModel.findOneAndDelete({ MovieName: name }, (err, doc) => {
            if (err) {
                console.log("Delete Screen Error : " + err);
                return res.json({ data: "Document Not Deleted" });
            }
            return res.json({ data: `Document Deleted With MovieName : ${name} ` });
        });
    }
    return res.json({ data: `No Screen Found With MovieName : ${name}` });
});


module.exports = router;