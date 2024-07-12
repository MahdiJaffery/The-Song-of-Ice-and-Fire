import passport from "passport";
import { Strategy } from "passport-local";
import { usernames } from "../src/App.mjs";

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