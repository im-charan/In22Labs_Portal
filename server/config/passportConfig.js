const LocalStrategy = require('passport-local').Strategy;
const pool = require('../config/database');
const bcrypt = require('bcrypt');

function initialize(passport) {
  const authenticateUser = (user_name, user_password, done) => { 
    pool.query(
      `SELECT * FROM in22labs.users WHERE user_name = $1`,[user_name],(err,results) => {
        if(err){
          throw err;
        }
        console.log(results.rowCount);
        
        if(results.rows.length > 0){
          const user = results.rows[0];
          console.log(user.user_password);
          bcrypt.compare(user_password, user.user_password, (err, isMatch) => {
            if(err){
              throw err;
            }
            if(isMatch){
              return done(null, user, {message: 'success'});
            }else{
              return done(null, false, {message: 'Password is not correct'});
            }
          });
        }
        else{
          return done(null, false, {message: 'User not found'});
        }
      }
    )
  }

  passport.use(
    new LocalStrategy({
      usernameField: 'user_name',
      passwordField: 'user_password'
    },
    authenticateUser
  )
  ); 

  passport.serializeUser((user, done) => done(null, user.user_id));

  passport.deserializeUser((user_id, done) => {
    pool.query(
      `SELECT * FROM in22labs.users WHERE user_id = $1`,[user_id],(err,results) => {
        if(err){
          throw err;
        }
        return done(null, results.rows[0]);
      }
    );
  });
}

module.exports = initialize;