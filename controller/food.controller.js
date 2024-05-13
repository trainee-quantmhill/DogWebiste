import foodModel from "../models/food.model.js";
import cloudinary from "../config/cloudinary.config.js";


const foodController = {
    addFood: async (req, res) => {
        const file = req.file;
        const {name,price}=req.body;
        try {
            cloudinary.uploader.upload_stream({ resource_type: 'auto' }, async (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Error uploading to Cloudinary' });
                }

                const food = new foodModel({
                    name,
                    price,
                    foodImageUrl:result.url,
                    createdBy:req.user.userId
                })

                await food.save();
                res.json({
                    name:food.name,
                    price:food.price,
                    foodImageUrl:food.foodImageUrl
                });
            }).end(file.buffer);
        } catch (err) {
            res.status(500).json({ error: `Error handling file upload: ${err.message}` });
        }
    },



    getAllFoods:async(req,res)=>{
        try{
            const foods = await foodModel.find();
            if(!foods){
                return res.status(400).json({message:"No Foods Addeded"})
            }

            res.status(200).json(foods);
        }catch(err){
            res.status(500).json({ error: `Error handling to get All Foods: ${err.message}` });
        }
    },



    getFoodById:async(req,res)=>{
        try{
            const food = await foodModel.findById(req.params.id);
            if(!food){
                return res.status(400).json({message:"No Foods Addeded"})
            }

            res.status(200).json(food);
        }catch(err){
            res.status(500).json({ error: `Error handling to get food: ${err.message}` });
        }
    },



    updateFoodById:async(req,res)=>{
        try{
            const food = await foodModel.findById(req.params.id);  
            console.log("food",food);
            if(!food){
                return res.status(400).json({message:"No Foods Addeded"})
            }
            const updateFood = await foodModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
            res.status(200).json(updateFood);
        }catch(err){
            res.status(500).json({ error: `Error handling to update food: ${err.message}` });
        }
    },



    deleteFoodById:async(req,res)=>{
        try{
            const food = await foodModel.findById(req.params.id);  
            if(!food){
                return res.status(400).json({message:"No Food exist with this Id"})
            }
            await food.deleteOne();
            res.status(200).json({message:"Food deleted Succcssfully"});
        }catch(err){
            res.status(500).json({ error: `Error handling to update food: ${err.message}` });
        }
    }
}

export default foodController;