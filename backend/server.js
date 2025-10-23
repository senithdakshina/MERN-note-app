import expres from "express"
// const expres = require("express")
const app = expres()

app.get("/api/notes",(req,res)=>{
    res.send("you got 5 notes");
})

app.listen(5001, () => {
    console.log('server stated on PORT')
});
dsd