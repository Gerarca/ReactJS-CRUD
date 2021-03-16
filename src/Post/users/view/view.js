import React, { Component } from 'react';
import './view.css';

class view extends Component{

    render(){   
        return  this.props.DataUsers.map( user =>              
            <div className="r-d" key={user.id}>  
                <div className="r-d-user">  {user.name}  </div>
                <div className="r-d-email">  {user.email}  </div>                    
                <div className="r-d-phone"> {user.phone} </div>   
                <div className="r-d-action">                         
                    <button className="btnEdit" onClick={this.props.editUser.bind(this, user.id,user.name, user.email, user.phone )} > 
                        Editar                
                    </button> 
                    <button className="btnDelete" onClick={this.props.deleteUser.bind(this, user.id)} > 
                        Eliminar                
                    </button>                                                                    
                </div> 
                <br />            
            </div>    
        )}
}

export default view;