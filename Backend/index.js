const express=require("express")
var cors=require('cors')
require('./db')
const app=express();
app.use(cors())
app.use(express.json())




//ROUTES----->

app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/getnotes"))


app.listen(4000);
