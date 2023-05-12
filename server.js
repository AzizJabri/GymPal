const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");


//ROUTES IMPORTS
const auth = require("./src/routers")
//


//MIDDLEWARES IMPORTS

//


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/auth", auth)

app.get("/", (req, res) => {
    res.send(`Hello World !`);
});



module.exports = app;