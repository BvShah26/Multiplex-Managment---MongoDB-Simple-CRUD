const express = require('express');
const router = express.Router();
router.use(express.json());

const MultiplexModel = require('../models/MultiplexModel');

router.get("/", (req, res) => {
    return res.json({ data: "Multiplex Home Page" });
});

// List All Multiplex
router.get("/list", async (req, res) => {
    const MultiplexList = await MultiplexModel.find();
    if (MultiplexList.length === 0) {
        return res.json({ data: "No Data Found in collection - Multiplex" })
    }
    return res.json({ data: MultiplexList });
});

//Display Multiplex where sepcific movie is screening
router.get("/listbymovie/:name", async (req, res) => {
    const name = req.params.name;
    const ScreenModel = require('../models/ScreenModel');
    const ScreenList = await ScreenModel.find({ MovieName: name });
    if (ScreenList.length != 0) {

        // We can't use await with forEach loop
        const output=[];
        var i=0;
        for (const element of ScreenList) {
            const MultiplexList=await MultiplexModel.find({MultiplexId:element.MultiplexId});
            output[i]=MultiplexList;
            i++;
        }
        return res.json({data:output});
    }
    return res.json({ data: `${name} : is not Screening In Any Multiplex` });
});

// Add New Multiplex
router.post("/new", async (req, res) => {
    const newDocument = req.body;
    const MultiplexList = await MultiplexModel.find({ MultiplexId: newDocument.MultiplexId });
    if (MultiplexList.length === 0) {
        MultiplexModel.create(newDocument);
        return res.json({ data: "New Document Added - Multiplex Collection" });
    }
    return res.json({ data: "Multiplex Id Already Added.." });
});

// Update ScreenId(s) by MultiplxName
router.put("/update/:name", async (req, res) => {
    const name = req.params.name;
    const MultiplexList = await MultiplexModel.find({ name: name });
    if (MultiplexList.length > 0) {
        const updatedDocument = req.body;
        const NewMultiplexList = await MultiplexModel.findOneAndUpdate(
            { name: name },
            { ScreenId: updatedDocument.ScreenId },
            { new: true },
            (err, doc) => {
                if (err) {
                    console.log("Update Multiplex Error : " + err);
                    return res.json({ data: "Not Updated" });
                }
                return res.json({ data: doc });
            }
        );
        return res.json({ data: NewMultiplexList });
    }
    return res.json({ data: `No Document Found With MultiplexName : ${name}` });
});

//delete Multiplex Document By MultiplexName
router.delete("/delete/:name", async (req, res) => {
    const name = req.params.name;
    const MultiplexList = await MultiplexModel.find({ name: name });
    if (MultiplexList.length != 0) {
        const DeleteDocument = await MultiplexModel.findOneAndDelete({ name: name }, (err, doc) => {
            if (err) {
                console.log("Delete Multiplex Error : " + err);
                return res.json({ data: "Document Not Deleted" });
            }
            return res.json({ data: `Docuemtn Delete With MultiplexName : ${name} ` });
        });
    }
    return res.json({ data: `No Multiplex Found With Name ${name}` });
});


module.exports = router;