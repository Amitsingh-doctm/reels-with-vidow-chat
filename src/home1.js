

import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { AuthContext } from './contaxt';
import { useEffect, useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { database } from './firebase'
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);
export default function MultilineTextFields() {
    const [name, setname] = useState("");
    const [url, seturl] = useState("");
    const [subgectname,setsub]= useState("");
    const [camera,setcamera] = useState("");
    const [warning,setwar] = useState("");
    const [markes,setma]= useState("");
    const [Attempt,setatte]= useState("");
    const [loading,setloading] = useState("");
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const { currentUser } = useContext(AuthContext);
    let id = currentUser.uid;

    let s1="";
    let s2="";

    let r = async () => {
        let u = await database.users.doc(id).get();
        setname(u.data().username);
        s1= u.data().username;
        s2= u.data().profileUrl;
        seturl(u.data().profileUrl);
        console.log(u.data().profileUrl);

    }
    r();
let sub = async ()=> {
     await database.users.doc(id).set({
         username:s1,
         profileUrl:s2,
         subgectname:subgectname,
         camera:camera,
         warning:warning,
         markes:markes,
         Attempt:Attempt,
         })
         setloading(false);
         r();
}
let u;
       
    useEffect(async () => {
        u = await database.users.doc(id).get();
        setname(u.data().username);
        seturl(u.data().profileUrl);
        setsub(u.data().subgectname);
        setcamera(u.data().camera);
        setwar(u.data().warning);
        setma(u.data().markes);
        setatte(u.data().Attempt);

    }, []);


const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <h3>Welocome {name} please give reviwe of mock test </h3>
            <img class="img1" src={url} />
            <div class="hc">
                <TextField
                    id="ou
                    tlined-multiline-flexible"
                    label="Sugect name"
                    multiline
                    maxRows={4}
                    value={subgectname}
                    onChange={(e)=>  setsub(e.target.value)}
                    variant="outlined"
                />
                <TextField
                    id="outlined-multiline-flexible"
                    label="camera"
                    multiline
                    maxRows={4}
                    value={camera}
                    onChange={(e)=> setcamera(e.target.value) }
                    variant="outlined"
                />
                <TextField
                    id="outlined-multiline-flexible"
                    label="warnings and reason"
                    multiline
                    maxRows={4}
                    value={warning}
                    onChange={(e)=> setwar(e.target.value)}
                    variant="outlined"
                />
                <TextField
                    id="outlined-multiline-flexible"
                    label="Marks"
                    multiline
                    maxRows={4}
                    value={markes}
                    onChange={(e)=> setma(e.target.value) }
                    variant="outlined"
                />
                <TextField
                    id="outlined-multiline-flexible"
                    label="Attempted"
                    multiline
                    maxRows={4}
                    value={Attempt}
                    onChange={(e)=> setatte(e.target.value)}
                    variant="outlined"
                />
                <Button  onClick={sub}  variant="contained" color="primary">
                    Submit
                </Button>
            </div>
        </form>
    );
}


























