const express= require('express')
const mongoose=require('mongoose')
const cors=require('cors')

const app=express()
app.use(cors())
app.use(express.json())

const {MongoClient}=require('mongodb')
const baseurl="mongodb+srv://Pushkar_15:Pushkar4515@quiz.5t0an4j.mongodb.net/?retryWrites=true&w=majority&appName=quiz";

app.listen(10000,(req,res)=>{
    console.log("server Running...")
})
app.get('',(req,res)=>{
    res.send("<h1>Server Started... </h1>")
})




app.get('/data',async(req,res)=>{
    const client= new MongoClient(baseurl)
    //console.log(client)
    try{
        await client.connect()
        const database=client.db('student')
        const question=database.collection('data')
        const readdata= await question.find().toArray()
        res.send(readdata)
    }
    finally{
        await client.close()
    }
})
app.get('/question',async(req,res)=>{
    const client= new MongoClient(baseurl)
    //console.log(client)
    try{
        await client.connect()
        const database=client.db('student')
        const question=database.collection('question')
        const readdata= await question.find().toArray()
        res.send(readdata)
    }
    finally{
        await client.close()
    }
})


app.post('/add',async(req,res)=>{
    const client= new MongoClient(baseurl)
    console.log("data added")
    try{
        await client.connect()
        const database=client.db('student')
        const student=database.collection('data')
        const addata= await student.insertOne(req.body)
        res.send(addata)
    }
    finally{
        await client.close()
    }
})
