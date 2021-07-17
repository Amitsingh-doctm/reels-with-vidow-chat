
import React, { useState, useContext } from 'react'
import { AuthContext } from './contaxt';
import {database } from './firebase'
import firebase from './firebase'
import { useHistory } from "react-router-dom"
function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const [data,setd]= useState("");
    let history = useHistory();
    let u;


    const handleSubmit = async (e) => {
        console.log('hi'); 
        e.preventDefault()
    try {
            console.log('Logging in user')
            setLoading(true)
           let res = await login(email, password)
             let r=  await res.user.uid;
                 u= await database.users.doc(r).get()
                 console.log(u.data());    
                 setLoading(false);
            }
    catch {
            setError("Failed to log in")
            setTimeout(() => setError(''), 2000)
            setLoading(false)
        }
      }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor=''>Email</label>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor=''>Password</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit' disabled={loading}>Login</button>
                <p>{ loading ? "loading":""}</p>
                <p> {data} </p>
            </form>
        </div>
    )
}

export default Login
