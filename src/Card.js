import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useState, useContext } from 'react'
import { database } from './firebase'
import { AuthContext } from './contaxt';
import  './form.css'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom"
const useStyles = makeStyles((theme) =>
    createStyles({

        root: {
            position :"relative",
            left:"41rem",
            top: "-1rem",
        }
,
        txt :{
            position: "relative",
            left: "1px",
            top:  "29px",
        }

        ,
      btt: {
        position: "relative",
        top: "14px",
        left: "60px",
      }
      ,
        button:  {
            position: "relative",
            left: "78px",
            top: "27px",
        }
       ,
      
    }),
);

  

export default function ValidationTextFields() {

    const classes = useStyles();
    let history = useHistory();
    const [id1, setid1] = useState(" ");
    const [id2, setid2] = useState(" ");
    const { login } = useContext(AuthContext);
    const [data, setd] = useState("");
    let u;
    const handleSubmit = async (e) => {
        let rid1 = id1.split(" ").join("")
        let rid2 = id2.split(" ").join("")
         console.log(rid1,rid2);
         
        console.log('hi');
        e.preventDefault()
        try {
            console.log('Logging in user')
            let res = await login(rid1,rid2)
            let r = await res.user.uid;
            console.log(r);
            u = await database.users.doc(r).get()
            console.log(u.data()); 
            setTimeout(() => {
                history.push("/home");
            }, 3000);

        }
        catch {
         

        }
    }
    
    return (
        <div className= "dd">
            <img className="img" src= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAmVBMVEX///9nZ2dcXFyPVI5TJF7p6ena2trv7+9ZWVnV1dWLTIrm5ubd3d3Qu9D7+fuJSYi/ob6ebZ21krTg0t+GQ4Xz7fLDqcOSWZGJb49NGVlGAFPMws+sm7BKEFZCAE/38/e+vr7Ly8uqgKlMTEyCOoGxsbHWw9W6mrqmeqaYZJeviq/o3ed/M36RWJCEPoPDtsaAY4czAEKlpaWiYO31AAAC2klEQVR4nO3da1PaQBiGYYhFMUBCS+jBthqLlnqoPfz/H1elIiom42t2n93E+/pkBkZyM0yyvISh1wMAAACAEPai4SlwtBhGYjHyVJj0IzEcUNigMAnOc2FS7gdWJp4Lx37+9/ONO1+4S2EDFGpQ2ASFGu4Lszvjbhbee0OxWrR1r3AwfLDmpdA/P4WbVX1HC5PT4xvl1pEmW9Y5ur7H7G7ru6Md8lP4P2uwVXh0klY7mV/fY1LcbhVLRzvkp3B39ef2+fCo2KlWrArz2620pYVXnS9MP1RLV4U7t1s7U0c7pC0MgUIzCuUoNKNQjkIzCuUoNKNQjkIzCuUimmI4k36jkMIGhXXTRGfyH+EKs+VUYRKuMAQKzSiUo9CMQjkKzSiUo9CMQjkKzSiUo9CsvjDTCFfY/TnNK5i1db/wMhcoQk4TJxIPLk3lbGFGoRyFZhTKUWhGoRyFZhTKUWhGoRyFZhTKiec0Z299OJvFU1j3DcuXKyIq9DNNzCMq9DPzvoqnMDt/58P5RTSFIVBoRqEchWYUylFoRqEchWYUylFoRqEchWb17/FnzWVPPmy11l31dTk37lDrZm0FhY+pX6VFU5G/Snvz5qw7xNnCjEI5Cs0olKPQjEI5Cs0olKPQjEI5Cs0olKPQrH4Sldf8NsLTfqbWEfAj8U8Ti84X5u0qfMHVl1etKsym782mrSoMgUIzCuUoNKNQrr2Fvz7W+L35mLG9hV8OPlU77ETh1zfVKGyCQmcoXKPQjEJnKFyj0IxCZyhco9CMQmcoXKPQTFd4eFDtTxcKLz7X2Xyc097C56LQjEI5Cs0olKPQjEI5Cs2iKxz7LizHgZWeC/tJcH3PhVGg8MWFi6HI6qlMqm9fjPwUZqOByOnqqF19u8vA+4U6N8fLZE/0YBR6QaFTr6RQvRjVF5b7Urt/++JC+WK0Ly8MgUJndIvRx2tPVWFvLxRVIAAAAADU+wcF1O1iwUKL8gAAAABJRU5ErkJggg==" /> 
        <form className={classes.root}  onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                    onChange ={(e)=> {setid1(e.target.value)}}
                    error
                    id1="outlined-error-helper-text"
                    label="id"
                    defaultValue="id"
                    value= {id1}
                   
                    variant="outlined"
                />
                <TextField
                    onChange={(e) => { setid2(e.target.value) }}
                    className= {classes.txt}
           
                    id2="outlined-error-helper-text"
                    label="Pssowrd"
                    defaultValue="password"
                    helperText="Incorrect entry."
                    variant="outlined"
                    value={id2}
                />
                
                <Button
                    type="submit"
                    
                    variant="contained"
                    color="inherit"

                    className={classes.button}
                >
                    Login
                </Button>
            
        </form>
           
        </div>
    );
}