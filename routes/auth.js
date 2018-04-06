const routes = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const AnonymIdStrategy = require('passport-anonym-uuid').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;
const users = require('../models').users;
const config = require('../config/main');
const bcrypt = require('bcryptjs');

// Local Strategy for authorization
passport.use(new LocalStrategy(
    (username, password, done) => {
        users.find({ where: { username: username }})
            .then((user) => {
                if (!user){
                    return done(null, false, { message: 'Wrong username' });
                } else {
                    bcrypt.compare(password, user.password, (err, success) => {
                        if (success) {
                            return done(null, user.dataValues);
                        } else {
                            return done(null, false, { message: 'Wrong password' });
                        }
                    });
                }
            })
            .catch((err) => {
                return done(err);
            })
    }
));

// Anonymus strategy for authorization
passport.use(new AnonymIdStrategy());

// Vkontakte Strategy for authorization
passport.use(new VKontakteStrategy({
        clientID: config.vkStrategy.appId,
        clientSecret: config.vkStrategy.secretKey,
        callbackURL:  `/auth/vkontakte/callback`
    },
    function(accessToken, refreshToken, params, profile, done) {
        users.findOrCreate({
            where: { provider: profile.provider, personal_id: profile.id.toString() },
            defaults: { username: profile.username, provider: profile.provider, personal_id: profile.id.toString(), role: 3 }
        })
            .then(user => {
                if (!user) return done(null, false);
                return done(null, user[0].dataValues);
            })
            .catch(err => {
                return done(err);
            });
    }
));

// Facebook Strategy for authorization
passport.use(new FacebookStrategy({
        clientID: config.FacebookStrategy.appId,
        clientSecret: config.FacebookStrategy.secretKey,
        callbackURL: `/auth/facebook/callback`
    },
    function(accessToken, refreshToken, params, profile, done) {
        users.findOrCreate({
            where: { provider: profile.provider, personal_id: profile.id },
            defaults: { username: profile.displayName, provider: profile.provider, personal_id: profile.id, role: 3 }
        })
            .then(user => {
                if (!user) return done(null, false);
                return done(null, user[0].dataValues);
            })
            .catch(err => {
                return done(err);
            });
    }
));

// Twitter Strategy for authorization
passport.use(new TwitterStrategy({
        consumerKey: config.TwitterStrategy.consumerKey,
        consumerSecret: config.TwitterStrategy.consumerSecret,
        callbackURL: `/auth/twitter/callback`
    },
    function(accessToken, refreshToken, profile, done) {
        users.findOrCreate({
            where: { provider: 'twitter', personal_id: profile.user_id },
            defaults: { username: profile.screen_name, provider: 'twitter', personal_id: profile.user_id, role: 3 }
        })
            .then(user => {
                if (!user) return done(null, false);
                return done(null, user[0].dataValues);
            })
            .catch(err => {
                return done(err);
            });
    }
));

// Google Strategy for authorization
passport.use(new GoogleStrategy({
        clientID: config.GoogleStrategy.clientID,
        clientSecret: config.GoogleStrategy.clientSecret,
        callbackURL: '/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        users.findOrCreate({
            where: { provider: profile.provider, personal_id: profile.id },
            defaults: { username: profile.displayName, provider: profile.provider, personal_id: profile.id, role: 3 }
        })
            .then(user => {
                if (!user) return done(null, false);
                return done(null, user[0].dataValues);
            })
            .catch(err => {
                return done(err);
            });
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);

    /*users.find({where: { id: id }})
        .then(user => {
            done(null, user.dataValues);
        })
        .catch(err => {
            done(err, null);
        })*/
});

routes.post('/login', (req, res) => {
    users.create(req.body)
        .then(user => {
            res.status(201).redirect('/');
        })
        .catch(err => {
            res.status(501).send({ message: err.message });
        });
});

routes.post('/local', passport.authenticate('local', { successRedirect: '/room', failureRedirect: '/' }));

routes.get('/anonymus', passport.authenticate('anonymId', { successRedirect: '/room', failureRedirect: '/' }));

routes.get('/vk', passport.authenticate('vkontakte'));
routes.get('/vkontakte/callback', passport.authenticate('vkontakte', { successRedirect: '/room', failureRedirect: '/' }));

routes.get('/fb', passport.authenticate('facebook'));
routes.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/room', failureRedirect: '/' }));

routes.get('/twitter', passport.authenticate('twitter'));
routes.get('/twitter/callback', passport.authenticate('twitter', { successRedirect: '/room', failureRedirect: '/' }));

routes.get('/google', passport.authenticate('google', { scope: ['profile'] }));
routes.get('/google/callback', passport.authenticate('google', { successRedirect: '/room', failureRedirect: '/' }));

routes.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = routes;