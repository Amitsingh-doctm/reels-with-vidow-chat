import React from 'react'
import { Link } from 'react-router-dom';



export default function nav() {
    return (

        <div class="link">
            <Link    classname= "links" to="/"> SINGNUP</Link>
            <Link classname="links" to="/login"> LOGIN </Link>
            <Link classname="links"  to="/home">  HOME </Link>
        
            <Link classname="links" to="/profile">PROFILE</Link>
        </div>

    )
}
