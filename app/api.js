// app/api.js

var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(app, passport){

  // =====================================
  // GetUsers SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/api/users', isAdminOrSuper, function(req, res) {
    connection.query("SELECT id, name, email, Admin, SuperUser, CreatedAt FROM Users", function(err, rows){
      if(err){
        return done(err);
      }else if(rows.length){
        res.send(JSON.stringify(rows));
      }
    });
  });

  // =====================================
  // GetUser SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/api/users/:user', isAdminOrSuper, function(req, res) {
    var id = req.params.user;
    connection.query("SELECT id, name, email, Admin, SuperUser, CreatedAt FROM Users WHERE id = ? ",[id], function(err, rows){
      if(err){
        return done(err);
      }else if(rows.length){
        res.send(JSON.stringify(rows));
      }
    });

  });

  // =====================================
  // UpdateUser SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.put('/api/users', function(req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var email = req.body.email;
    if(id == req.user.id || isAdminOrSuper){
      connection.query("UPDATE Users SET name = ?, email = ? WHERE id = ?",[name, email, id], function(err, rows){
        if(err){
          res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        }else{
          res.json({"Error" : false, "Message" : "Profile updated successfully"});
        }
      });
    }else{
      res.json({"Error" : true, "Message" : "Only admins can update other profiles"});
    }
  });

};

// route middleware to make sure user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

// route middleware to make sure user is logged in AND an administrator
function isAdmin(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		if(req.user.Admin){
			return next();
		}

	// if they aren't redirect them to the home page
	res.redirect('/');
}

// route middleware to make sure user is logged in AND a super user
function isSuperUser(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		if(req.user.SuperUser){
			return next();
		}

	// if they aren't redirect them to the home page
	res.redirect('/');
}

// route middleware to make sure user is logged in AND a super user
function isAdminOrSuper(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		if(req.user.SuperUser || req.user.Admin){
			return next();
		}

	// if they aren't redirect them to the home page
	res.redirect('/');
}
