
import authModel from "../models/auth.model.js";


const authController = {
    userRegistration: async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body;

            //validation
            if (!firstName || !lastName || !email || !password) {
                return res.status(400).json({ error: "Please provide all required information: firstName, lastName, email, and password." });

            }

            const existUser = await authModel.findOne({ email });
            if (existUser) {
                return res.status(401).json({ error: "User already exists with this email address." });
            }


            //Password length validation
            if (password.length < 6) {
                return res.status(400).json({ error: "Password should be at least 6 characters long." });
            }


            const user = await authModel.create({
                firstName,
                lastName,
                email,
                password
            })

            //call token function
            const token = await user.createJWT();

            res.status(201).send({
                success: true,
                message: 'User  Created Sucessfully',
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                },
                token
            })
        } catch (err) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    },


    userLogin: async (req, res) => {
        try {
            const { email, password } = req.body;

            //validation
            if (!email || !password) {
                return res.status(400).json({ error: "Please provide all required information: email, and password." });
            }


            //find user by email
            const user = await authModel.findOne({ email })
            if (!user) {
                return res.status(401).json({ error: "Invalid email or password." });
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ error: "Invalid email or password." });
            }

            //create authentication
            const token = user.createJWT()

            res.status(200).json({
                success: true,
                message: 'Login sucessfully',
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    location: user.location,
                },
                token
            })

        } catch (err) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    },


    // getUserProfile: async (req, res) => {
    //     try {
    //         console.log("hello log")
    //         console.log("userid", req.user.userId);
    //         const existUser = await authModel.findById(req.user.userId);
    //         if (!existUser) {
    //             return res.status(400).json({ error: "User does not exist with this Email" });
    //         }

    //         res.status(200).json({
    //             firstName: existUser.firstName,
    //             lastName: existUser.lastName,
    //             email: existUser.email,
    //             address: existUser.address,
    //         })
    //     } catch (err) {
    //         res.status(500).json({ message: "Internal Server Error" })
    //     }
    // },


    // updateUserProfile: async (req, res) => {
    //     try {
    //         const existUser = await authModel.findById(req.user.userId);

    //         if (!existUser) {
    //             return res.status(400).json({ error: "User does not exist with this Email" });
    //         }

    //         const { firstName,lastName,email,address,password, newPassword, confirmPassword } = req.body;
            
    //         //Email Validation
    //         if(existUser.email!==email){
    //             return res.status(400).json({error:"You Entered email is Incorrect"});
    //         }

    //         //Password Validation1
    //         const isMatch = await existUser.comparePassword(password);
    //         if (!isMatch) {
    //             return res.status(401).json({ error: "Invalid email or password." });
    //         }

    //         //Password Validation2
    //         if (newPassword !== confirmPassword) {
    //             return res.status(400).json({ error: "newPassword and confirmPassword Should be same " });
    //         }


    //         //Password length validation
    //         if (newPassword.length < 6) {
    //             return res.status(400).json({ error: "Password should be at least 6 characters long." });
    //         }

    //         //Update Details
    //         existUser.password = newPassword;
    //         existUser.address=address;
    //         existUser.firstName = firstName;
    //         existUser.lastName = lastName;

    //         await existUser.save();
    //         res.status(200).json({message:"Profile updated sucessfully"})
    //     } catch (err) {
    //         res.status(500).json({ message: "Internal Server Error" })
    //     }
    // },


}


export default authController;