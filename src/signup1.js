import React from 'react';
import {
    createStyles,
    alpha,
    Theme,
    ThemeProvider,
    withStyles,
    makeStyles,
    createTheme,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { green } from '@material-ui/core/colors';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import './form.css'

import {useEffect, useState, useContext } from 'react';
import { AuthContext } from './contaxt';
import { storage, database } from './firebase';
import { useHistory } from "react-router-dom"



const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'green',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'red',
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'green',
            },
        },
    },
})(TextField);

const BootstrapInput = withStyles((theme) =>
    createStyles({
        root: {
            'label + &': {
                marginTop: theme.spacing(3),
            },
        },
        input: {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.common.white,
            border: '1px solid #ced4da',
            fontSize: 16,
            width: 'auto',
            padding: '10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
                borderColor: theme.palette.primary.main,
            },
        },
    }),
)(InputBase);

const useStylesReddit = makeStyles((theme) =>
    createStyles({
        root: {
            border: '1px solid #e2e2e1',
            overflow: 'hidden',
            borderRadius: 4,
            backgroundColor: '#fcfcfb',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            '&:hover': {
                backgroundColor: '#fff',
            },
            '&$focused': {
                backgroundColor: '#fff',
                boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
                borderColor: theme.palette.primary.main,
            },
        },
        focused: {},
    }),
);

function RedditTextField(props) {
    const classes = useStylesReddit();

    return (
        <TextField
            InputProps={{ classes, disableUnderline: true }}
            {...props}
        />
    );
}

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',

            flexWrap: 'wrap',
          
        flexdirection: "column",
width: "204px",
position: "relative",
margin: "auto",
            top: "142px",
            left: "14rem",
        },
        b:{
            position: "relative",
            left: "27px",
        }
        ,
        i:{
            position: "absolute",
            top: "9px",
            left:"-387px",
            height: "245px",
        }
        ,
         d:{
             top: "273px",
             left: "54px",
             position: "absolute",
        }
        ,
        margin: {
            margin: theme.spacing(1),
        },
    }),
);

const ValidationTextField = withStyles({
    root: {
        '& input:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& input:invalid + fieldset': {
            borderColor: 'red',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            padding: '4px !important', // override inline-style
        },
    },
})(TextField);
const theme = createTheme({
    palette: {
        primary: green,
    },
});
export default function CustomizedInputs() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);
    const [progress1, setProgress]= useState(0);
    const { signup } = useContext(AuthContext);
    let history = useHistory();
    console.log(signup);
    const handleSignup = async (e) => {
        console.log("signupstart")
        e.preventDefault();
        try {
            setLoading(false);
            console.log(email,password);
            let res = await signup(email,password);
            console.log(res);
            let uid = res.user.uid;
            console.log(uid);
            const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            // fn 1 -> progress tracking
            // fn2 -> error
            // fn3 -> success
            uploadTaskListener.on('state_changed', fn1, fn2, fn3);
            function fn1(snapshot) {
           let  progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                 console.log('Upload is ' + progress + '% done');
                 setProgress(progress);
            }
            function fn2(error) {
                setError(error);
                setTimeout(() => {
                    setError('')
                }, 2000); 
            }
            async function fn3() {
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
                console.log(downloadUrl);
                await database.users.doc(uid).set({
                    email: email,
                    userId: uid,
                    msg:[],
                    freindslist: [],
                    username: name,
                    createdAt: database.getCurrentTimeStamp(),
                    profileUrl: downloadUrl,
                    postIds: []
                })
                setLoading(true);
                history.push("/login")
                console.log('User has Signed up');
            }
        }
        catch (err) {
          console.log(err);
        }
    }
    const handleFileSubmit = (e) => {
        let file = e.target.files[0];
        console.log(file);
        if (file != null) { 
            setFile(file)
        }
    }
    return (
        <div class="sign">  
            <form className={classes.root} onSubmit={handleSignup}  noValidate>
            <ThemeProvider theme={theme}>  
                  <TextField
                    className={classes.margin}
                    label="username"
                    variant="outlined"
                    id="mui-theme-provider-outlined-input"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                  />
                  <TextField
                    className={classes.margin}
                    label="emailid"
                    variant="outlined"
                    id="mui-theme-provider-outlined-input"
                            onChange={(e) => setEmail(e.target.value)}
                            value ={email}
                  /> 
                  <TextField
                    className={classes.margin}
                    label="password"
                    variant="outlined"
                    id="mui-theme-provider-outlined-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                   />
                    <Button
                    variant="contained"
                    component="label"
                    className={classes.b}
                        >
                    upload photo
                    <input
                            onChange={handleFileSubmit}
                        type="file"
                        hidden
                    />
                </Button>
                    <img className={classes.i}   src="data:image/jpeg;base64,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"></img>
                    <Button className={classes.d} type='submit'  variant="contained" color="primary">Sign in</Button>
                    {loading != false ? " ": <progress class="amount-progress" value="10" max={110- progress1}></progress>}
            </ThemeProvider>
        </form>
        </div>
    );
}