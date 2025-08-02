const express = require("express");
const path = require("path");
const dotenv=require('dotenv');
const cors = require("cors");
const app = express()

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const port = process.env.port;

const getShortestRoute = require("./routes/getShortestRoute");

const corsOptions ={
    origin: "https://ecoyatra-meta.vercel.app",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}; 

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api", getShortestRoute);


app.get('/startServer', (req, res) => {
    res.status(200).send("Started the Server");
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})
