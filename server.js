const express= require('express')
const mongoose=require('mongoose')
const cors=require('cors')

const app=express()
app.use(cors())
app.use(express.json())

const {MongoClient}=require('mongodb')
const baseurl="mongodb://localhost:27017/Quiz";

app.listen(4500,(req,res)=>{
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
        const database=client.db('Quiz')
        const question=database.collection('StudentData')
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
        const database=client.db('Quiz')
        const question=database.collection('Questions')
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
        const database=client.db('Quiz')
        const student=database.collection('StudentData')
        const addata= await student.insertOne(req.body)
        res.send(addata)
    }
    finally{
        await client.close()
    }
})
app.get('/dataone',async(req,res)=>{
    const client= new MongoClient(baseurl)
    //console.log(client)
    try{
        await client.connect()
        const database=client.db('Quiz')
        const question=database.collection('StudentData')
        const readdata= await question.findOne(req.body)
        res.send(readdata)
    }
    finally{
        await client.close()
    }
})
