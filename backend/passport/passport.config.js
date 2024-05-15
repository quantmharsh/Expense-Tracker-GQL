import passport from "passport";
import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import { GraphQLLocalStrategy } from "graphql-passport";
export const configurePassport=async()=>{
    // using this to serialized the user using user.id 
    passport.serializeUser((user , done)=>{
        console.log("serialized user" , user)
        if (!user || !user.id) {
            console.error("Serialization failed: User data is invalid.");
            return done(new Error("Failed to serialize user into session"));
        }
        done(null , user.id)
    })
    passport.deserializeUser(async(id,done)=>{
        console.log("deserialized user")
        try {
            const user= await User.findById(id)
            done(null , user)
            
        } catch (error) {
            done(error)
            
        }
    })
    passport.use(
        new GraphQLLocalStrategy(async(username , password , done)=>{
            try {
                const user= await User.findOne({username})
                if(!user)
                    {
                        throw new  Error("Invalid username or password")
                    }
                    const validPasword= await  bcrypt.compare(password , user.password)
                    if(!validPasword)
                        {
                        throw new  Error("Invalid username or password")

                        }
                        return done(null, user);
                
            } catch (error) {
                return done(error)
                
            }
        })
    )
}