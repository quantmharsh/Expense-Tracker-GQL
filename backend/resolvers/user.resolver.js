import {transactions, users} from "../dummyData/data.js"
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import Transaction from "../models/transaction.model.js"

const userResolver={
    // input in mutation will be same as what we hve done in user.typedef.js
    Mutation:{
        signUp:async(_ , {input} , context)=>{
            try {

                const{username ,name ,password , gender }=input;
                if(!username ||!name ||!password || !gender)
                    {
                        throw new Error("All field are required")
                    }
                    const existingUser= await User.findOne({username});
                    if(existingUser)
                        {
                            throw new Error("User Already Exists!")
                        }
                        const salt=await bcrypt.genSalt(10);
                        const hashedPassword= await bcrypt.hash(password  ,salt);
                        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
				        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
                        const newUser=new User({
                            username,
                            name,
                            password:hashedPassword,
                            gender,
                            profilePicture:gender==="male"?boyProfilePic:girlProfilePic,

                        })
                        await newUser.save();
                        console.log("new user is", newUser)
                        await context.login(newUser);
                        console.log("New User in user.resolver" , newUser)
                        return newUser;

            } catch (error) {
                console.log("Error while doing Signup " , error);
                throw new Error(error.message ||"Internal Serval Error")
                
            }


        },
        login:async(_ , {input} ,context)=>{
            try {
                const{username ,password}=input
                if(!username || !password)
                    {
                        throw new Error("All fields are required");
                    }
                    const {user}=await context.authenticate("graphql-local" ,{username , password})
                    await context.login(user);
                    return user;

                
            } catch (error) {
                console.log("Error while doing login " , error);

                
                throw new Error(error.message ||"Internal Serval Error")
                
            }
        },
        logout:async(_ ,__ , context)=>{
            try {
                await context.logout();
                context.req.session.destroy((error)=>{
                    if(error)
                        {
                            throw new Error("Error...")
                        }
                 })
                 context.res.clearCookie("connect.sid");
                 return {message:"User loggedout successfully..."};
                
            } catch (error) {
                console.log("Error while doing logout " , error);

                
                throw new Error(error.message ||"Internal Serval Error")
                
            }
        }

    },
    // Query are the queries that we have written in user.typeDef . their implementationsare written here
    Query:{
        // (parents ,args  , context , info)this are 4 parameter that we pass in query
        // destructor context getting from  index.js 
        authUser:async(_,__, context)=>
            {
                try {
                    const user=await context.getUser();
                    return user;
                    
                } catch (error) {
                    console.log("Error in authuser " , error);

                
                    throw new Error(error.message ||"Internal Serval Error")
                }

            },
        // here passing args not parents 
        user:async(_ ,{userId} ,{req ,res})=>{
            try {
                const user=await User.findById(userId);
                return user;
            } catch (error) {
                console.log("Error in user query" , error);

                
                throw new Error(error.message ||"error getting user")
                
            }
        }
    },
    //adding user Transaction relationship. it is the type created by us
    User:{
        transactions:async(parent ,_,__)=>{
            try {
                const transactions= await Transaction.find({userId:parent._id})
                return transactions;
                
            } catch (error) {
                console.log("Error in user transaction resolver" , error);

                
                throw new Error(error.message ||"error getting user")
            }
        }
    }
    
}
export default userResolver;