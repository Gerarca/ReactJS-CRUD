import React, { Component } from 'react';
import swal from 'sweetalert';
import './EditUser.css';

export default class EditUser extends Component {

    state = { 
        id: this.props.id,
        name: this.props.name,
        email: this.props.email,
        phone: this.props.phone        
    }

    onSubmit = e => {    
        e.preventDefault();
        if(this.props.DataUsers.some(user => user.id !== this.state.id  && user.email === this.state.email )){            
            swal({
                title: "Mensaje",
                text: "El Correo " +this.state.email+ " se encuentra registrado por otro usuario, introduzca otro correo",
                icon: "warning",
                button: "Aceptar"
            });            
            this.textemail.focus();
        }else{
            this.props.SaveEdit(this.state.id, this.state.name, this.state.email, this.state.phone);
            swal({
                title: "Mensaje",
                text: "Datos Guardados",
                icon: "success",
                button: "Aceptar"
            });
            this.props.GoBack();   
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
                    <h2>Editar Datos de Usuario</h2>
                    <form 
                        onSubmit={this.onSubmit} 
                        className="form-addUser" 
                        > 
                        <input
                            name="name"
                            type="text" 
                            placeholder="Escriba un Nombre" 
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
                            value="Guardar"
                        />                         
                    </form>
                    <button className="btnGoBack" onClick={this.props.GoBack} > 
                        Ir Atras                
                    </button>                    
                </div>
            </div>
        )
    }
}
