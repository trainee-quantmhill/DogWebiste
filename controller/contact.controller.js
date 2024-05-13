import contactUsModel from "../models/contactUs.model.js";
import nodemailer from 'nodemailer';

const contactUsController = {
    sendMessage: async (req, res) => {
        try {
            const { name, email, subject, message } = req.body;
            console.log(req.body)

            //validation
            if (!name || !email || !subject || !message) {
                return res.status(400).json({ error: "Please provide all required information: name, email ,subject, message." });
            }

            console.log("all comes")
            const userMessageDetail = new contactUsModel({
                name,
                email,
                subject,
                message,
                createdBy:req.user.userId
            })

            await userMessageDetail.save();

            //Send Messsage
            let mailTransporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "us85370@gmail.com",
                    pass: "dhqq uoet oqtb xrxm"
                }
            })
    
            let details = {
                from: "us85370@gmail.com",
                to: userMessageDetail.email,
                subject: `Thanks For Giving Me Feedback ${name}`,
                text: `Thanks For Your Message You Have sent to us ---> ${message}`,
            }
            mailTransporter.sendMail(details, (err) => {
                if (err) {
                    console.log("It has an error", err);
                }
                else {
                    res.status(200).json({ message: "Thanks for Contact us" })
                }
            })
        } catch (err) {

        }
    },


    seeMessage: async(req,res)=>{
        try{
            const user = await contactUsModel.find();
            if(!user){
                return res.status(400).json({error:"User does not exist with this Id"});
            }

            res.status(200).json(user);
        }catch(err){

        }
    }
}



export default contactUsController;