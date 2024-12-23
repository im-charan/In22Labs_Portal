const LocalStrategy = require('passport-local').Strategy;
const pool = require('../config/database');
const bcrypt = require('bcrypt');

function initialize(passport) {
  const authenticateUser = (req,user_name, user_password, done) => {
    const userIp = req.ip;
    pool.query(
      `SELECT * FROM in22labs.users WHERE user_name = $1`,[user_name],(err,results) => {
        if(err){
          throw err;
        }
        
        if(results.rows.length > 0){
          const user = results.rows[0];
          var date = new Date();
          var today = date.toISOString().slice(0,10);
          console.log(date);
            var lastLogin = user.last_login.toISOString().slice(0,10);
            if(user.user_login_attempts >= 5 && lastLogin === today){
              return done(null, false, {message: 'Maximum login attempts reached'});
            }
            console.log(user.user_password);
            bcrypt.compare(user_password, user.user_password, (err, isMatch) => {
              if(err){
                throw err;
              }
              if(isMatch){
                if(lastLogin < today && user.user_login_attempts >= 1){
                  pool.query(
                    `UPDATE in22labs.users SET user_login_attempts = 0,user_ip = $2, last_login = now() WHERE user_name = $1`,[user_name,userIp],(err,results) => {
                      if(err){
                        throw err;
                      }
                    }
                  )
                }
                pool.query(
                  `UPDATE in22labs.users SET last_login = now(), user_ip = $2 WHERE user_id = $1`,[user.user_id,userIp],(err,results) => {
                    if(err){
                      throw err;
                    }
                }
              )
              return done(null, user, {message: 'success'});
            }else{
              if(user.user_login_attempts >= 5 && lastLogin === today){
                return done(null, false, {message: 'Maximum login attempts reached'});
              }
              else{
                if(lastLogin < today && user.user_login_attempts >= 1){
                  pool.query(
                    `UPDATE in22labs.users SET user_login_attempts = 1,user_ip =$2 WHERE user_name = $1`,[user_name,userIp],(err,results) => {
                      if(err){
                        throw err;
                      }
                    }
                  )
                }
                else{
                  pool.query(
                    `UPDATE in22labs.users SET user_login_attempts = user_login_attempts + 1, user_ip = $2 WHERE user_name = $1`,[user_name,userIp],(err,results) => {
                      if(err){
                        throw err;
                      }
                    }
                  )
                }
              }
              
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
      passwordField: 'user_password',
      passReqToCallback: true,
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
        return done(null, results.rows[0], {message: ''});
      }
    );
  });
}

module.exports = initialize;