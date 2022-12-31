const User = require('../model/user')
const passport = require('passport')

exports.registerPage = async (req, res) => {
    try {
        res.render('register', {title : 'REGISTER'})
      } catch (error) {
        console.log(error)
        res.send(error)      
    }
}

exports.loginPage = (req, res) => {
    try {
        res.render('login', {title : 'LOGIN'})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}   

exports.register = async (req, res, next) => {
    try {
        const user = await User.register(
            {username : req.body.username, email: req.body.email }, req.body.password)
        res.redirect('login');
      } catch (error) {
        res.render('register', { error : error.message });
      }
}

exports.login = async (req, res, next) => {
    try {
        await passport.authenticate('local', (err, user, info) => {

          if (err) { 
            return res.render('login', {error : info.message}) 
        }

          if (!user) { 
            return res.render('login', {error : info.message})
         }

          req.logIn(user, (err) => {
            if (err) { 
                return res.render('login', {error : info.message})
            }

        return res.redirect('/dashboard');
          
    })
    })(req, res, next)

      } catch (error) {
        return res.render('login', {error : info.message});
      }
}


exports.logout = (req, res) => {
      req.session.destroy()
      res.clearCookie('session-id')
      res.redirect('/login')
}