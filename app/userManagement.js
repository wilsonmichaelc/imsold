// app/userManagement.js

var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

module.exports = {
  selectUsers: function () {
    // whatever
    connection.query("SELECT * FROM Users", function(err, rows){
      if(err){
        return done(err);
      }else if(rows.length){
        return rows;
      }
    });
  },
  bar: function () {
    // whatever
  }
};
