
import React, { useState, useEffect } from 'react'
import { database } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import './comment.css';
const useStyles = makeStyles({
    da: {
        marginRight: '2%',
        marginTop: '2%'
    }
})
function Comments(props) {
    const classes = useStyles();
    const [comments, setComments] = useState(null);
    useEffect(async () => {
        let arr = [];
        for (let i = 0; i < props.postData.comments.length; i++) {
            let cid = props.postData.comments[i];
            let data = await database.comments.doc(cid).get();
            let m ={
                s:data.data(),
                id:cid,
            }
             arr.push(m);
        }
        setComments(arr)
    }, [props.postData])
    let  handledelate =  async (id)=> {
            let newcomment = props.postData.comments.filter((id1)=> id1!=id);
            database.posts.doc(props.postData.postId).update({
                comments: newcomment,
            })
        let data = await database.comments.doc(id).delete();
    }
    return (
        <>
            {
                comments == null ? <CircularProgress /> :
                    comments.map((comment, index) => (
                        <div key={index} className='comment-div'>
                            <Avatar src={comment.s.uUrl} className={classes.da} />
                            <button onClick ={()=>{
                                handledelate(comment.id)
                            }}>  delate</button>
                            <p><span style={{ fontWeight: 'bold', display: 'inline-block' }} >{comment.s.uName}</span>&nbsp;&nbsp;{comment.s.text}</p>
                        </div>
                    ))
            }
        </>
    )
}

export default Comments