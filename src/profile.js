
import React from 'react';
import { storage, database } from './firebase';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from './contaxt';
import { useHistory } from "react-router-dom";
import './frnd.css';
import './chat.css';
import './profile.css';
const Profile = () => {
  const [msg1, setvalue] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [oldms, setoldms] = useState([]);
  const [otherms, setotherms] = useState([]);
  const [arr, setarr] = useState([]);
  const [userlist, setuserlist] = useState([]);
  const [frl, setfr] = useState([]);
  const [sfr, setar] = useState([]);
  const [acpl, setacp] = useState([]);
  const [list, setli] = useState([]);
  const [org, setorg] = useState([]);
  const [freind,setfreind] = useState([]);
  const[state,setstate]= useState("none");
  const[chatid,setchatid]= useState("");
  const[prev,setprev]=useState([]);
  const[state1,setstate1]= useState(false);
  let n = arr.filter((id) => id != currentUser.id)

  useEffect(() => {
    database.users.onSnapshot(snapshot => {
      let s = snapshot.docs.map(doc => doc.data()).map((txt) => txt);
      setli(s);
      let x = s.filter(ele => ele.userId != currentUser.uid);
      let self = s.filter(ele => ele.userId == currentUser.uid);
      let b= x.filter(ele => ele.userId== chatid);
      console.log(b,chatid);
    let r=  x.filter(ele=> self[0].freind.includes(ele.userId)==false);
      setuserlist(r);
      setorg(self[0].freind)

      setfr(self[0].freindslist);
      setacp(self[0].acceptList);
      let m = x.filter(user => check2(self[0].acceptList, user.userId));
      let f = s.filter(user => self[0].freind.includes(user.userId))
      let c=  x.filter(user => user.userId==chatid)
      setfreind(f)
      console.log(c,chatid);
      setar(m);
      setoldms([])
      let arr3 = [];
      if (x[0] != 'undefined') {
        console.log(self[0].msg);
        let k= self[0].msg;
        setprev(k);
        let v= [];
        for(let i=0;i<k.length;i++)
        {
          if(k[i].chatid == chatid)
          { 
            v.push({msg:k[i].msg1,date:k[i].f,id:1});
          }
        }
        setoldms(v); 
        let g= c[0]?.msg;
        if(g!=undefined){
        for(let i=0;i<g.length;i++)
        {
          if(g[i].chatid==currentUser.uid)
          {
            v.push({ msg: g[i].msg1, date: g[i].f, id: 2 });
          }
        }
      }
      v.sort(function (a, b) {
          var c = new Date(a.date);
          var d = new Date(b.date);
          return c - d;
        });
        console.log(v);
        setotherms(v);
      
      }
    })
  }, [state,chatid])
  console.log(sfr)
  let check2 = (arr, id) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].sfr == id) {
        return true;
      }
    }
  }
  let reaust = async (id, e) => {
    let res = await database.users.doc(currentUser.uid).update({
      freindslist: [...frl, {
        frid: id,
      }],
    })
    let oldacceptListuser = list.filter((user) => user.userId == id);
    let oldacceptList = oldacceptListuser[0].acceptList;
    let res2 = await database.users.doc(id).update({
      acceptList: [...oldacceptList, {
        sfr: currentUser.uid,
      }],
    })
  }
  console.log("render")
  let msg;
  console.log(prev);
  let handle = async () => {
  
    setstate1(true);
    let d = new Date();
    var n1 = d.toLocaleTimeString();
    var n2 = d.toDateString();
    let x = n1.toUpperCase();
    let g = n2.slice(4);
    let f = g + " " + x;
    let res = await database.users.doc(currentUser.uid).update({
      msg: [...prev, { msg1, chatid, f}],
    })
    setstate1(false);
  console.log("yes2")
  }

  let check = (id) => {
    console.log(frl);
    for (let i = 0; i < frl.length; i++) {
      if (frl[i].frid == id) {
        console.log("true");
        return true
      }
    }
    console.log(frl);
  }

  let acpt = async (id) => {
    let oldfr = list.filter((user) => user.userId == id);
    let oldfrt = oldfr[0].freind;
    console.log("lllllllllllllll", oldfrt);
    console.log(oldfr[0].freindslist);
    console.log(currentUser.uid);
    console.log(id);
    let b = oldfr[0].freindslist.filter((user) => user.frid != currentUser.uid);
    console.log(b);
    let ac = await database.users.doc(id).update({
      freind: [...oldfrt, currentUser.uid],
      freindslist: b,
    })
    await database.users.doc(currentUser.uid).update({
      freind: [...org, id],
    })
    console.log(acpl);
    let nacp = acpl.filter((user) => user.sfr != id);
    console.log(nacp);
    let k = await database.users.doc(currentUser.uid).update({
      acceptList: nacp,
    })
  }
  /*  
  let fn= (p,c)=>{
      console.log(p);
    let arr=[];
    for(let i=0;i<p.length;i++)
    {
      arr.push(<div class="container">    
        
          <p>{p[i].msg1}</p>
          <span class="time-right"></span>
  </div>
  )
    }
    return arr;
  }
*/
  let modal = (id)=>{
    setchatid(id);
    setstate('block');
  }
console.log(otherms);
console.log(state);
  return (
    <div className="main">
      {console.log(state)}
      <div  style ={{display:`${state}`}} className="chatboox">
        <section className="msger">
          <header className="msger-header">
            <div className="msger-header-title">
              <i className="fas fa-comment-alt" /> SimpleChat
            </div>
            <div className="msger-header-options">
              <span><i className="fas fa-cog" /></span>
            </div>
          </header>
          <main className="msger-chat">
            {otherms.map((ele) =>
              ele.id == 2 ?
                (
            <div className="msg left-msg">
              
              <div className="msg-img" style={{ backgroundImage: 'url(https://image.flaticon.com/icons/svg/327/327779.svg)' }} />
              <div className="msg-bubble">
                <div className="msg-info">
                  <div className="msg-info-name">BOT</div>
                  <div className="msg-info-time">12:45</div>
                </div> 
                <div className="msg-text">
            {ele.msg}
                </div>
              </div>
            </div>)
          :
            (<div className="msg right-msg">
              <div className="msg-img" style={{ backgroundImage: 'url(https://image.flaticon.com/icons/svg/145/145867.svg)' }} />
              <div className="msg-bubble">
                <div className="msg-info">
                  <div className="msg-info-name">Sajad</div>
                  <div className="msg-info-time">12:46</div>
                </div>
                <div className="msg-text">
                  {ele.msg}
                </div>
              </div>
            </div>))}
          </main>
          
          
          <input className="inputc" type="text" onChange={(e) => { setvalue(e.target.value) }} value={msg1} />
          <button className="sub" onClick={handle}> </button>
        </section>
      </div> 
      <div className="userlist">
        {userlist.map((user) =>
          <div className="users">
            <h5>{user.username}</h5>
            <img className="pimg" src={user.profileUrl}></img>
            <div className="frb">
              {check(user.userId) ? <button type="button" disabled={true} onClick={(e) => reaust(user.userId, e)} class="btn btn-primary btn-sm btn11">FREIND REQUEST</button> :
                <button type="button" disabled={false} onClick={() => reaust(user.userId)} class="btn btn-primary btn-sm btn11">FREIND REQUEST</button>}
              <button type="button" class="btn btn-primary btn-sm">VIEW</button>
            </div>
          </div>
        )
        }
        <div className="fra">
          {sfr.map((user) =>
            <div class="card" style={{ width: "10rem" }}>
              <img class="card-img-top" src={user.profileUrl} alt="Card image cap"></img>
              <div class="card-body">
                <h5 class="card-title">{user.username}</h5>
                <button onClick={() => {
                  acpt(user.userId)
                }} class="btn btn-primary">ACCEPT</button>
              </div>
            </div>
          )}
        </div>
        <div className="freind1">
          {freind.map((ele) =>
            <div class="card" style={{
              width: "10rem",
              height: "121px",
              margintop: "7px",
            }}>
              <img src={ele.profileUrl} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{ele.username}</h5>
                <button type="button" onClick ={() =>{modal(ele.userId)}} class="btn btn-success">Chat</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Profile;
