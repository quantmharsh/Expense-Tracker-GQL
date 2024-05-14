import {users} from "../dummyData/data.js"

const userResolver={
    // Query are the queries that we have written in user.typeDef . their implementationsare written here
    Query:{
        // (parents ,args  , context , info)this are 4 parameter that we pass in query
        // destructor context getting from  index.js 
        users:(_,_,{req ,res})=>{
            return users;
        },
        // here passing args not parents 
        user:(_ ,{userId} ,{req ,res})=>{
            return users.find((user)=>user._id===userId)
        }
    },
    Mutation:{

    }
}
export default userResolver;