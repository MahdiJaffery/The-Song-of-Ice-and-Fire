import passport from "passport";
import { Strategy } from "passport-local";
import { usernames } from "../src/App.mjs";

passport.serializeUser((user, done) => {
    console.log(`Inside Serialize`)
    console.log(user)
    done(null, user.username);
})

passport.deserializeUser((username, done) => {
    console.log(`Inside Deserialize`)
    console.log(username);
    try {
        const findUser = usernames.find((user) => user.username === username);
        if (!findUser) throw new Error('User not Found');
        done(null, findUser);
    } catch (err) {
        done(err, null);
    }
})

export default passport.use(
    new Strategy((username, password, done) => {
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
        try {
            const findUser = usernames.find((user) => user.username === username);
            if (!findUser)
                throw new Error('User not Found');
            if (findUser.password !== password)
                throw new Error('Incorrect Password');
            done(null, findUser);
        } catch (err) {
            done(err, null);
        }
    })
);