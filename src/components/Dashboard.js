import React from 'react'
import Logout from "./Logout.js";
import {Link,Redirect} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateForm from "./CreateForm.js";
import '../App.css';
import { confirmAlert } from 'react-confirm-alert'; 



export default class dashboard extends React.Component{
    constructor(props){
        super(props)
        const token=localStorage.getItem("token")
        //console.log(token)
        let loggin=true;
        if(token==null){
            loggin=false
        }
        this.state={
            arr:[],
            loggin
        }
    }
    componentDidMount = () => {

        axios
        .get('http://dev.api.staller.show/v1/horses',
        { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} })
        .then(res => {
        this.profile = res.data;
        console.log( res.data.data);
        this.setState({
            arr:res.data.data
        })
        })
        .catch(error => console.log(error)) 
    }


    delete =(e)=>{
    //console.log(e.target.id)
    confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to delete this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => alert('Click Yes')
          }
        ]
      });
        axios({
            method: 'DELETE',
            url: `http://dev.api.staller.show/v1/horses/${e.target.id}`,
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}}`}
            
        })
     
         .then((response) =>{
             console.log( "delele "+response.data)
             axios.get(`http://dev.api.staller.show/v1/horses`,
             { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} })
             .then(res => {
              console.log(res.data);
              
               this.setState({
                    arr:res.data.data
                    });
             })
         }) 
    }

    render(){

        if(this.state.loggin===false){
            return <Redirect to="/" />
        }

        return(
            <div>
               <div className="logoutbuttonstyle"> <Link to="/logout">Logout</Link></div>

                    <CreateForm/>

                        <div>
                        <div style={{width:"90%",marginLeft:"auto"}}>
                        <table className="table table-responsive table-striped table-sm">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">S.N</th>
                            <th scope="col">horse_name</th>
                            <th scope="col">horse_number</th>
                            <th scope="col">age_verified</th>
                            <th scope="col">dob</th>
                            <th scope="col">color</th>
                            <th scope="col">ushja_registered</th>
                            <th scope="col">ID</th>
                            <th scope="col">edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                            this.state.arr.map((value,index)=>{
                                return(
                                    <tr>
                                    <th scope="row"key={index}>{index}</th>
                                    <td>{value.horse_name}</td>
                                    <td>{value.horse_number}</td>
                                    <td>{value.age_verified}</td>
                                    <td>{value.dob}</td>
                                    <td>{value.color}</td>
                                    <td>{value.ushja_registered}</td>
                                    <td>{value.id}</td> 
                                    <td><Link to={`/edit${value.id}`} >Edit</Link></td>                       
                                    <td><button type="button" onClick = {this.delete} id={value.id}>Delete</button></td>     
                                    </tr>
                                )
                            })}             
                            </tbody>
                        </table>               
                    </div>
                </div>
            </div>
        )
    }

}