import {LOGIN, SIGNUP} from './types'
import axios from 'axios'

export function login({email, password}){
    console.log(`EMAIL: ${email}, PASSWORD: ${password}`)
    // TODO: axios
    return {
        type: LOGIN,
        payload: 'token'
    }
}
export function signup({email, password}){
    // TODO: axios
    return {
        type: SIGNUP,
        payload: 'token'
    }
}