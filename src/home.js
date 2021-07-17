import React from 'react';
import {useEffect, useState, useContext } from 'react'
import { AuthContext } from './contaxt';
import { database } from './firebase'
import firebase from './firebase';
import Card from './Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const Home =  () => {
    const { currentUser } = useContext(AuthContext);
   let id= currentUser.uid;
   let u;
   console.log(id);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const [data, setd] = useState("");
    let handle= async ()=>{
        await database.users.doc(id).set({
       product: email,
        price: password,
    })}
    useEffect( async () => {
        u = await database.users.doc(id).get();
        setEmail(u.data().price);
        setPassword(u.data().product)    
    },[]);
    
    return (
        <div>
            <div>
                <label htmlFor=''>product</label>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor=''>value</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type='submit' onClick= {handle} disabled={loading}>Login</button>
        </div>
    );
    }
export default Home;
