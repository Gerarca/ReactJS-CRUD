import React, { Component } from 'react';
import './view.css';

class view extends Component{

    render(){   
        return  this.props.DataUsers.map( user =>              
            <div className="vr-d" key={user.id}>  
                <div className="vr-d-user">  {user.name}  </div>
                <div className="vr-d-email">  {user.email}  </div>                    
                <div className="vr-d-phone"> {user.phone} </div>   
                <div className="vr-d-action">                         
                    <button className="vbtnEdit" onClick={this.props.editUser.bind(this, user.id,user.name, user.email, user.phone )} > 
                        Editar                
                    </button> 
                    <button className="vbtnDelete" onClick={this.props.deleteUser.bind(this, user.id)} > 
                        Eliminar                
                    </button>                                                                    
                </div> 
                <br />            
            </div>    
        )}
}

export default view;