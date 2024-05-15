const userTypeDef=`#graphQl
 type  User{
    _id: ID!
    username: String!
    name: String!
    password:String!
    profilePicture: String
    gender: String!

 }
 type Query{
   
    authUser:User
    user(userId:ID!):User
 }
 type Mutation{
    signUp(input:SignupInput!):User
    login(input:LoginInput!):User
    logout:LogOutResponse
 }
 input SignupInput{
    username: String!
    name: String!
    password: String!
    gender: String!
 }
 input LoginInput{
    username: String!
    password: String!
 }
 type LogOutResponse{
    message: String!
 }
`
export default userTypeDef;