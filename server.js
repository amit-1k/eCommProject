/**
 * This will be the starting file of the project
 */


const express=require("express")
const mongoose=require("mongoose")
const app=express()
const server_config=require("./configs/server.config")
const db_config=require("./configs/db.config")
const user_model=require("./models/user.model")
const bcrypt=require("bcryptjs")

app.use(express.json())

/**
 * create an admin user at the starting of the application
 * if not already present
 */


// Connectio with mongodb
mongoose.connect(db_config.DB_URL)

const db=mongoose.connection

db.on("error",()=>{
    console.log("Error while connecting to the mongoDB")
})

db.once("open",()=>{
    console.log("Connected to MongoDB")
    init()
})

async function init(){
    try{
        let user=await user_model.findOne({userId : "admin"})

        if(user){
            console.log("admin is already present")
            return 
        }
    

    }catch(err){
        console.log("Error while reading the data ",err)
    }
  

    try{
        user=await user_model.create({
            name : "Amit",
            userId : "admin",
            email : "amitkumar@gmail.com",
            userType : "ADMIN",
            password : bcrypt.hashSync("welcome1",8)
        })
        console.log("admin create ",user)


    }catch(err){
        console.log("Error while create admin ",err)

    }
}                   

/**
 * Stich the route to the server
 */
require("./routers/auth.routes")
 


/**
 * Start the server
 */

app.listen(server_config.PORT,()=>{
    console.log("Server started at port num : ",server_config.PORT)
})
