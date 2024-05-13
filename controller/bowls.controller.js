import bowlsModel from "../models/bowls.model.js";
import cloudinary from "../config/cloudinary.config.js";


const bowlsController = {
    addbowls: async (req, res) => {
        const file = req.file;
        const {name,price}=req.body;
        try {
            cloudinary.uploader.upload_stream({ resource_type: 'auto' }, async (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Error uploading to Cloudinary' });
                }

                const bowls = new bowlsModel({
                    name,
                    price,
                    bowlsImageUrl:result.url,
                    createdBy:req.user.userId
                })

                await bowls.save();
                res.json({
                    name:bowls.name,
                    price:bowls.price,
                    bowlsImageUrl:bowls.bowlsImageUrl
                });
            }).end(file.buffer);
        } catch (err) {
            res.status(500).json({ error: `Error handling file upload: ${err.message}` });
        }
    },



    getAllbowls:async(req,res)=>{
        try{
            const bowls = await bowlsModel.find();
            if(!bowls){
                return res.status(400).json({message:"No bowls Addeded"})
            }
            res.status(200).json(bowls);
        }catch(err){
            res.status(500).json({ error: `Error handling to get All Foods: ${err.message}` });
        }
    },



    getbowlsById:async(req,res)=>{
        try{
            const bowls = await bowlsModel.findById(req.params.id);
            if(!bowls){
                return res.status(400).json({message:"No bowls Addeded"})
            }
            res.status(200).json(bowls);
        }catch(err){
            res.status(500).json({ error: `Error handling to get food: ${err.message}` });
        }
    },



    updatebowlsById:async(req,res)=>{
        try{
            const bowls = await bowlsModel.findById(req.params.id);  
            if(!bowls){
                return res.status(400).json({message:"No bowls Addeded"});
            }
            const updatebowls = await bowlsModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
            res.status(200).json(updatebowls);
        }catch(err){
            res.status(500).json({ error: `Error handling to update food: ${err.message}` });
        }
    },



    deletebowlsById:async(req,res)=>{
        try{
            const bowls = await bowlsModel.findById(req.params.id);  
            if(!bowls){
                return res.status(400).json({message:"No Food exist with this Id"})
            }
            await bowls.deleteOne();
            res.status(200).json({message:"bowls deleted Succcssfully"});
        }catch(err){
            res.status(500).json({ error: `Error handling to update food: ${err.message}` });
        }
    }
}

export default bowlsController;