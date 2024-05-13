import treetsModel from "../models/treets.model.js";
import cloudinary from "../config/cloudinary.config.js";


const treetsController = {
    addTreets: async (req, res) => {
        const file = req.file;
        const {name,price}=req.body;
        try {
            cloudinary.uploader.upload_stream({ resource_type: 'auto' }, async (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Error uploading to Cloudinary' });
                }

                const treets = new treetsModel({
                    name,
                    price,
                    treetsImageUrl:result.url,
                    createdBy:req.user.userId
                })

                await treets.save();
                res.json({
                    name:treets.name,
                    price:treets.price,
                    treetsImageUrl:treets.treetsImageUrl
                });
            }).end(file.buffer);
        } catch (err) {
            res.status(500).json({ error: `Error handling file upload: ${err.message}` });
        }
    },



    getAllTreets:async(req,res)=>{
        try{
            const treets = await treetsModel.find();
            if(!treets){
                return res.status(400).json({message:"No treets Addeded"})
            }
            res.status(200).json(treets);
        }catch(err){
            res.status(500).json({ error: `Error handling to get All Foods: ${err.message}` });
        }
    },



    getTreetsById:async(req,res)=>{
        try{
            const treets = await treetsModel.findById(req.params.id);
            if(!treets){
                return res.status(400).json({message:"No treets Addeded"})
            }
            res.status(200).json(treets);
        }catch(err){
            res.status(500).json({ error: `Error handling to get food: ${err.message}` });
        }
    },



    updateTreetsById:async(req,res)=>{
        try{
            const treets = await treetsModel.findById(req.params.id);  
            if(!treets){
                return res.status(400).json({message:"No treets Addeded"});
            }
            const updatetreets = await treetsModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
            res.status(200).json(updatetreets);
        }catch(err){
            res.status(500).json({ error: `Error handling to update food: ${err.message}` });
        }
    },



    deleteTreetsById:async(req,res)=>{
        try{
            const treets = await treetsModel.findById(req.params.id);  
            if(!treets){
                return res.status(400).json({message:"No Food exist with this Id"})
            }
            await treets.deleteOne();
            res.status(200).json({message:"treets deleted Succcssfully"});
        }catch(err){
            res.status(500).json({ error: `Error handling to update food: ${err.message}` });
        }
    }
}

export default treetsController;