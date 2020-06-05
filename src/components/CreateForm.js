import React, { Component } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';





export default class CreateForm extends Component {
    constructor(props) {
        super(props);

  
        this.state = {
            horse_name: '',
            horse_number: '',
            age_verified:null,
            dob:new Date(),
            color:'',
            ushja_registered:'',
            colorarr: ["red","blue","yellow","white"],
            checked: true          
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeName=(e)=> {
      this.setState({
        horse_name: e.target.value
      });
    }

    onChangeNumber=(e)=> {
      this.setState({
        horse_number: e.target.value
      })  
    }
    
    onChangeDOB = dob => {
      this.setState({ dob })
    }

    handleRadio=(event)=> {
        const age_verified = event.currentTarget.value === 'true' ? true: false;
       // console.log('handle', age_verified);
        this.setState({ age_verified });
      }
      onColorChange=(e)=>{
        this.setState({
          color:e.target.value
        })

      }
  
  
    onSubmit(e) {
      e.preventDefault();
      console.log(this.state.dob)
      const datecurr=this.state.dob.getMonth()+1

      const data={horse_name:this.state.horse_name,horse_number:this.state.horse_number,
        age_verified:this.state.age_verified,dob:null,color:this.state.color,checked:this.state.checked}
       // dob:this.state.dob.getFullYear()+"-"+datecurr +"-"+this.state.dob.getDate()
        console.log(data);
 
        axios({
          method: "post",
          url: `http://dev.api.staller.show/v1/horses`,
          data: data,
          headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}}`} 
        })
          .then(response => {
              console.log(response)
              alert("successfully submitted")
          })
          .catch(err => alert(err));   

          this.setState({
            horse_name: '',
            horse_number: '',
            age_verified:''
          })
    }
   
    render() {
     // console.log(this.state.color)
     // console.log(this.state.checked)
    //  console.log(this.state.dob,
    //     this.state.dob.getDate(),
    // this.state.dob.getMonth(),
    // this.state.date.getTime(),
    //console.log(this.state.dob.getMonth()+1)
    //const datecurr=this.state.dob.getMonth()+1
    //console.log(this.state.dob.getFullYear()+"-"+datecurr +"-"+this.state.dob.getDate())
    // this.state.dob.getUTCDay())
     const { age_verified } = this.state;
     //console.log(this.state.age_verified)

     let colorlist = this.state.colorarr.length > 0
	  	&& this.state.colorarr.map((item, i) => {
      return (
        <option value={item}>{item}</option>
      )
      }, this);
  

        return (
            <div className="formstyle">
                 <h2 style={{textAlign:"center",marginTop:"10px",marginBottom:"30px"}}>Pls Enter Horse Details !!!</h2>
                   <form onSubmit={this.onSubmit} style={{width:"60%",margin:"3%"}}>
                    <div className="form-group">
                        <label>Enter horse_name:  </label>
                        <input type="text" className="form-control"  value={this.state.horse_name} onChange={this.onChangeName} />
                    </div>
                    <div className="form-group">
                        <label>Enter horse_number:  </label>
                        <input type="number" className="form-control"  value={this.state.horse_number} onChange={this.onChangeNumber} />
                    </div>

                    <div className="form-group form-check-inline">
                    <label style={{marginRight:"50px"}}>Age_verification  </label>
                    <label>
                    <input 
                    style={{marginRight:"50px"}}
                      type="radio" 
                      name="age_verified" 
                      value="true"
                      checked={age_verified === true}
                      onChange={this.handleRadio} />
                      Yes
                     </label>
     
     
                    <label>
                    <input 
                        type="radio" 
                        name="isPublished" 
                        value="false"
                        checked={age_verified === false}
                        onChange={this.handleRadio} />
                      No
                    </label>
                    
                    </div>
                    <div className="form-group">
                        <label>Select DOB:(Value stored as null because of unable make y-m-d)</label>
                    <Calendar
                    onChange={this.onChangeDOB}
                    value={this.state.dob}
                        /> 
                        </div>

                        <div className="form-group form-check-inline">
                        <label>Select Color:</label>
                          <select onChange={this.onColorChange} className="dropdownstyle">
                            {colorlist}
                          </select>
                        </div>

                        <div className="form-group form-check-inline">
                          <label>ushja_registered</label>
                        <input type="checkbox" onChange={this.handleCheck} className="dropdownstyle" defaultChecked={this.state.checked}/>
                        </div>
                    <div className="form-group">
                        <input type="submit"  className="btn btn-primary"/>
                    </div>
                </form>
               
            </div>
        )
    }
  }