import React from 'react';
import {Link} from 'react-router-dom';


export default class Logout extends React.Component{
    constructor(props){
        super(props)
            this.state={}
        
    }
    render(){
        return(
            <div style={{textAlign:"center",marginTop:"20px"}} >
                <Link to="/dashboard" >Back to dashboard</Link>
            </div>
        )
    }
}