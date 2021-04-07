import React, { Component } from 'react'
import IntoBooth from './IntoBooth'
import Img1 from "./../../../images/booth-bg.jpg"

export default class MainSecond extends Component {
    state={
        mainsecond:[]
      };

    render() {
        return (
     <React.Fragment>

{this.props.text=== 'Not Found'?<div style={{background:`url("https://images.unsplash.com/photo-1548013758-2472668151e4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80")`, textAlign:"center"}} className="into-booth-container"> <IntoBooth/> </div>:<div style={{background:`url("${this.props.text}")`, textAlign:"center"}} className="into-booth-container"> <IntoBooth/> </div>} 


        </React.Fragment>
            
        )
    }
}
