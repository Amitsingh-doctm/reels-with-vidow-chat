import React, { useContext, useEffect, useState } from 'react'
import Header from './Header';
import { AuthContext } from './contaxt';
import { database } from './firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadFile from './uploadFile';
import './feed.css';
import Posts from './post';


   
   
  function Feed() {
    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    
    useEffect(() => {
        const unsub = database.users.doc(currentUser.uid).onSnapshot((doc) => { // snapsot is used to say that some chages 
            // happedn due to chage the profie 
            // console.log(doc.data());
            setUserData(doc.data())
            console.log("aaaaaaaaaaaaaaaa")

        })
    },[currentUser])

    return (
        <>
            {userData == null ? <CircularProgress /> : <>
                <Header userData={userData} />
                <div style={{ height: '1.5vh' }} />
                <div className='feed-container'>
                    <div className='center'>
                        <UploadFile userData={userData} />
                        <Posts userData={userData} />
                    </div>
                </div>

            </>
            }
        </>
    )
}

export default Feed