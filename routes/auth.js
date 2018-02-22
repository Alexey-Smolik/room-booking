const routes = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const users = require('../models').users;
const config = require('../config/main');


passport.use(new LocalStrategy(
    (username, password, done) => {
        users.find({ where: { username: username, password: password }})
            .then((user) => {
                if (!user) return done(null, false, { message: 'Неверные параметры входа' });
                return done(null, user);
            })
            .catch((err) => {
                return done(err);
            })
    }
));

passport.use(new VKontakteStrategy({
        clientID: config.vkStrategy.appId,
        clientSecret: config.vkStrategy.secretKey,
        callbackURL:  `/auth/vkontakte/callback`
    },
    function(accessToken, refreshToken, params, profile, done) {
        users.findOrCreate({
            where: { provider: profile.provider, personal_id: profile.id.toString() },
            defaults: { username: profile.username, provider: profile.provider, personal_id: profile.id.toString() }
        })
            .then(user => {
                //console.log(user[0].dataValues);
                if (!user) return done(null, false);
                return done(null, user[0].dataValues);
            })
            .catch(err => {
                return done(err);
            });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    users.find({where: { id: id }})
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err, null);
            console.log(err);
        })
});

routes.post('/login', (req, res) => {
    users.create(req.body)
        .then(user => {
            res.status(201).redirect('/');
        })
        .catch(err => {
            res.status(501).send({ status: "error", message: err.message });
        });
});

routes.post('/local', passport.authenticate('local', { successRedirect: '/main.html', failureRedirect: '/' }));
routes.get('/vk', passport.authenticate('vkontakte'));
routes.get('/vkontakte/callback', passport.authenticate('vkontakte', { successRedirect: '/main.html', failureRedirect: '/' }));

routes.get('/logout', (req, res) => {
    console.log(req.isAuthenticated());
    req.logOut();
    res.status(200).clearCookie('connect.sid', {
        path: '/'
    });
    req.session.destroy((err) => {
        res.redirect('/');
    });
});

module.exports = routes;