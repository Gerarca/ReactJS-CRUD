import React, { Component } from 'react';
import swal from 'sweetalert';
import './FormAddUser.css';

export default class FormAddUser extends Component {

    state = { 
        data: this.props.DataUsers,
        name: '',
        email: '',
        phone: ''        
    }

    onSubmit = e => {        
        if(this.props.DataUsers.some(user => user.email === this.state.email)){            
            swal({
                title: "Mensaje",
                text: "El Correo " +this.state.email+ " se encuentra registrado por otro usuario, introduzca otro correo",
                icon: "warning",
                button: "Aceptar"
            });
            this.textemail.focus();
            e.preventDefault();
        } else{
            this.props.AddUser(this.state.name, this.state.email, this.state.phone); 
            swal({
                title: "Mensaje",
                text: "Usuario Registrado",
                icon: "success",
                button: "Aceptar"
            });            
            e.preventDefault(); 
        }              
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }    

    render() {
        return (
            <div className="b-form">
                <div> 
                    <h2>Añadir Usuario</h2>
                    <form 
                        onSubmit={this.onSubmit} 
                        className="form-addUser" 
                        > 
                        <input 
                            name="name"
                            type="text" 
                            placeholder="Escriba un nombre" 
                            onChange={this.onChange} 
                            value={this.state.name}  
                            required           
                            autoFocus={true}   
                            ref={ (input) => ( this.textname = input )}
                        />
                        
                        <input  
                            name="email"
                            type="email" 
                            placeholder="Escriba un Email" 
                            onChange={this.onChange} 
                            value={this.state.email} 
                            required 
                            ref={ (input) => ( this.textemail = input )}
                        />
                        
                        <input  
                            name="phone" 
                            type = "number"
                            placeholder="Escriba un Telefono" 
                            onChange={this.onChange} 
                            value={this.state.phone} 
                            required 
                            ref={ (input) => ( this.textPhone = input )}                                                           
                        />
                        
                        <input
                            className="btnEnviar" 
                            type="submit" 
                            value="Añadir"
                        /> 
                    </form>
                </div>
            </div>
        )
    }
}
