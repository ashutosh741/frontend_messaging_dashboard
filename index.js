const express = require('express');
const cors = require('cors');
const templateRoute = require('./routes/usersRoutes');
const templateRoute1 = require('./routes/templateRoutes');

// const config =require('./db');
// const sql=require('mssql');
const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


const PORT = 8080;
  
app.use(express.json());

app.use("/api/v1/user", templateRoute);
app.use("/api/v1/auth", templateRoute);
app.use("/api/v1/CreateUser", templateRoute);
app.use("/api/v1/Updateuser", templateRoute);
app.use("/api/v1/Deleteuser", templateRoute);

// ######   apis for sms template ########
app.use("/api/v1/createtemplate", templateRoute1);
app.use("/api/v1/UpdateTemplate", templateRoute1);
app.use("/api/v1/FetchAllTemplate", templateRoute1);
app.use("/api/v1/DeleteTemplate", templateRoute1);



// ####### SSMS connection ########

// sql.connect(config, err => {
//   if (err) {
//       throw err;
//   }
//   console.log("Connection Successful ssms!");
// });

app.listen(PORT, () => {
  console.log(`server runing: ${PORT}`);
})
