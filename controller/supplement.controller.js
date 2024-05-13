import supplementModel from "../models/supplement.model.js";
import cloudinary from "../config/cloudinary.config.js";


const SupplementController = {
    addSupplement: async (req, res) => {
        const file = req.file;
        const {name,price}=req.body;
        try {
            cloudinary.uploader.upload_stream({ resource_type: 'auto' }, async (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Error uploading to Cloudinary' });
                }

                const supplement = new supplementModel({
                    name,
                    price,
                    supplementImageUrl:result.url,
                    createdBy:req.user.userId
                })

                await supplement.save();
                res.json({
                    name:supplement.name,
                    price:supplement.price,
                    supplementImageUrl:supplement.supplementImageUrl
                });
            }).end(file.buffer);
        } catch (err) {
            res.status(500).json({ error: `Error handling file upload: ${err.message}` });
        }
    },



    getAllSupplement:async(req,res)=>{
        try{
            const supplement = await supplementModel.find();
            if(!supplement){
                return res.status(400).json({message:"No supplement Addeded"})
            }
            res.status(200).json(supplement);
        }catch(err){
            res.status(500).json({ error: `Error handling to get All Foods: ${err.message}` });
        }
    },



    getSupplementById:async(req,res)=>{
        try{
            const supplement = await supplementModel.findById(req.params.id);
            if(!supplement){
                return res.status(400).json({message:"No supplement Addeded"})
            }
            res.status(200).json(supplement);
        }catch(err){
            res.status(500).json({ error: `Error handling to get food: ${err.message}` });
        }
    },



    updateSupplementById:async(req,res)=>{
        try{
            const supplement = await supplementModel.findById(req.params.id);  
            if(!supplement){
                return res.status(400).json({message:"No supplement Addeded"});
            }
            const updatesupplement = await supplementModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
            res.status(200).json(updatesupplement);
        }catch(err){
            res.status(500).json({ error: `Error handling to update food: ${err.message}` });
        }
    },



    deleteSupplementById:async(req,res)=>{
        try{
            const supplement = await supplementModel.findById(req.params.id);  
            if(!supplement){
                return res.status(400).json({message:"No Food exist with this Id"})
            }
            await supplement.deleteOne();
            res.status(200).json({message:"supplement deleted Succcssfully"});
        }catch(err){
            res.status(500).json({ error: `Error handling to update food: ${err.message}` });
        }
    }
}

export default SupplementController;