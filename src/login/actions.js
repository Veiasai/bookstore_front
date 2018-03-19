import {SUBMIT_LOGIN} from "./actiontypes";

export const submitLogin = (username, password) => ({
    type: SUBMIT_LOGIN,
    username: username,
    password: password,
})