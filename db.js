var mysql = require('mysql2/promise');
var mysqlpool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "Dropadi123@",
    database:"messagingdashboard"
    
  }); 


  module.exports = mysqlpool




// ################ for ssms  sql server connection with nodejs############


// SQL Server configuration
// var config = {
//     //  "user": "DESKTOP-MGDKG3E\Spicejet",
//     // "password": "11111", 
//     "server": "DESKTOP-MGDKG3E\\SQLEXPRESS", 
//         "database": "MessagingDashboard", 
//             "options": {
//         "encrypt": true, 
//     }
// }

// module.exports=config;






// var Connection = require('tedious').Connection;  
// var config = {  
//     server: 'your_server.database.windows.net',  //update me
//     authentication: {
//         type: 'default',
//         options: {
//             userName: 'your_username', //update me
//             password: 'your_password'  //update me
//         }
//     },
//     options: {
//         // If you are on Microsoft Azure, you need encryption:
//         encrypt: true,
//         database: 'your_database'  //update me
//     }
// };  
// var connection = new Connection(config);  
// connection.on('connect', function(err) {  
//     // If no error, then good to proceed.  
//     console.log("Connected");  
//     executeStatement1();  
// });

// connection.connect();