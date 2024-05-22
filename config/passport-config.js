// [efd]/config/passport-config.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { findUserById, saveUserData } from '../services/userService.js';

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    const userId = profile.id;
    try {
        let user = await findUserById(userId);
        if (user) {
            done(null, user);
        } else {
            const newUser = {
                id: userId,
                email: profile.emails[0].value,
                picture: profile.photos[0].value,
                username: 'New User'
            };
            await saveUserData(userId, newUser);
            done(null, newUser);
        }
    } catch (error) {
        done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await findUserById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;
