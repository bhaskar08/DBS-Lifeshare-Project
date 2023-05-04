const cookieParser = require('cookie-parser');
const cors=require('cors')
const express = require('express')
const multer = require('multer')
const app=express();

//middlewares
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
}));

// const corsOptions ={
//     allRoutes: true,
//     origin: '*',
//     credentials: true,
//     methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
//     headers: 'content-type'
// }
// app.use(cors(corsOptions));

app.use(cookieParser());



app.use('/api/auth',require('./Routes/auth'));
app.use("/api/users", require('./Routes/users'));
app.use('/api/posts',require('./Routes/posts'));
app.use("/api/comments", require('./Routes/comments'));
app.use("/api/likes", require('./Routes/likes'));
app.use("/api/relationships", require('./Routes/relationship'));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../social-media/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage });


app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});

app.listen(5000,()=>{
    console.log("API Working");
})