

import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from "dotenv";

//for passport authentication
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";
import {  buildContext } from "graphql-passport";
import { configurePassport } from "./passport/passport.config.js";

import { connectDB } from "./db/connectDB.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const httpServer = http.createServer(app);

// creating store
const MongoDbStore= connectMongo(session)
const store= MongoDbStore({
  uri:process.env.MONGO_URI,
  collection:"sessions"

})
store.on("error" ,(err)=>console.log(err));

// middleware for session in mongodb
app.use(
  session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
      maxAge:1000*60*60*24*7,  //1 week 
      httpOnly:true  //prevent cross site scripting
    },
    store:store
  })
)

// initializing the passport
app.use(passport.initialize());
app.use(passport.session());


const server= new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers:mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],


});
await server.start();
app.use(
    '/',
    cors({
      origin:"http://localhost:3000/",
      credentials:true

    }),
    express.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    // context is a third parameter in graphql where we pass all contexts. basically req ,res
    //the contexts that we will pass here that we can use in graphql resolvers
    expressMiddleware(server, {
      context: async ({ req , res}) => buildContext({req ,res}),
    }),
  );
  
  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  await connectDB();
  
  console.log(`🚀 Server ready at http://localhost:4000/`);