import groomingModel from "../models/grooming.model.js";
import cloudinary from "../config/cloudinary.config.js";


const groomingController = {
    addGrooming: async (req, res) => {
        const file = req.file;
        const {name,price}=req.body;
        try {
            cloudinary.uploader.upload_stream({ resource_type: 'auto' }, async (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Error uploading to Cloudinary' });
                }

                const grooming = new groomingModel({
                    name,
                    price,
                    groomingImageUrl:result.url,
                    createdBy:req.user.userId
                })

                await grooming.save();
                res.json({
                    name:grooming.name,
                    price:grooming.price,
                    groomingImageUrl:grooming.groomingImageUrl
                });
            }).end(file.buffer);
        } catch (err) {
            res.status(500).json({ error: `Error handling file upload: ${err.message}` });
        }
    },



    getAllGrooming:async(req,res)=>{
        try{
            const grooming = await groomingModel.find();
            if(!grooming){
                return res.status(400).json({message:"No grooming Addeded"})
            }
            res.status(200).json(grooming);
        }catch(err){
            res.status(500).json({ error: `Error handling to get All Foods: ${err.message}` });
        }
    },



    getGroomingById:async(req,res)=>{
        try{
            const grooming = await groomingModel.findById(req.params.id);
            if(!grooming){
                return res.status(400).json({message:"No grooming Addeded"})
            }
            res.status(200).json(grooming);
        }catch(err){
            res.status(500).json({ error: `Error handling to get food: ${err.message}` });
        }
    },



    updateGroomingById:async(req,res)=>{
        try{
            const grooming = await groomingModel.findById(req.params.id);  
            if(!grooming){
                return res.status(400).json({message:"No grooming Addeded"});
            }
            const updategrooming = await groomingModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
            res.status(200).json(updategrooming);
        }catch(err){
            res.status(500).json({ error: `Error handling to update food: ${err.message}` });
        }
    },



    deleteGroomingById:async(req,res)=>{
        try{
            const grooming = await groomingModel.findById(req.params.id);  
            if(!grooming){
                return res.status(400).json({message:"No Food exist with this Id"})
            }
            await grooming.deleteOne();
            res.status(200).json({message:"grooming deleted Succcssfully"});
        }catch(err){
            res.status(500).json({ error: `Error handling to update food: ${err.message}` });
        }
    }
}

export default groomingController;