import expres from "express"
// const expres = require("express")
const app = expres()

app.listen(5001, () => {
    console.log('server stated on PORT')
});
