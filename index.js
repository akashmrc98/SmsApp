var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const helmet = require("helmet");
const morgan = require("morgan");
const https = require("https");
const fs = require("fs");

const privateKey = fs.readFileSync("server.key");
const certificate = fs.readFileSync("server.cert");

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

var smsRoutes = require("./routes/smsRoute");
var registrationRoutes = require("./routes/registrationRoute");
var editRoutes = require("./routes/searchRoute");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "views")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(
  session({ secret: "1@a2#b3$5c", saveUninitialized: true, resave: false })
);

app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(flash());


 
 app.get("/", (req,res,next)=>{
   res.redirect("/sms")
 })
 

app.use(registrationRoutes);
app.use(smsRoutes);
app.use(editRoutes);

const URI =
  "mongodb+srv://akashmrc98:akashs1@cluster0-abxao.mongodb.net/test?retryWrites=true&w=majority";

const uri = "mongodb://localhost/message";

// app.listen(process.env.PORT || 3001);
mongoose
  .connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(result => {
    https
      .createServer(
        {
          key: privateKey,
          cert: certificate
        },
        app
      )
      .listen(3001);
  })
  .catch(err => {
    console.log(err);
  });
