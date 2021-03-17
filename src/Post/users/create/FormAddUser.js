import React, { Component } from 'react';
import swal from 'sweetalert';

export default class FormAddUser extends Component {

    constructor(props){
        super(props);
    
        this.state = {
          fields: {},
          errors: {}
        }
      }
    
      handleValidation(e){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
    
        //Name
        if(!fields["name"]){
          formIsValid = false;
          errors["name"] = "Ingrese un Nombre";
        }
    
        if(typeof fields["name"] !== "undefined"){
          if(!fields["name"].match(/^[a-zA-Z ]+$/)){
            formIsValid = false;
            errors["name"] = "El nombre debe contener solo letras";
          }      	
        }
    
        //Email
        if(!fields["email"]){
          formIsValid = false;
          errors["email"] = "Ingrese un Email";
        }
    
        if(typeof fields["email"] !== "undefined"){
          let lastAtPos = fields["email"].lastIndexOf('@');
          let lastDotPos = fields["email"].lastIndexOf('.');

          if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
            formIsValid = false;
            errors["email"] = "Ingrese un Email valido";
          }
          if(this.props.DataUsers.some(user => user.email.toUpperCase() === fields["email"].toUpperCase() )){            
            formIsValid = false;    
            errors["email"] = "El Email: "+fields["email"]+" se ecuentra registrado, Ingrese otro Email";
          }          
        }
    
        //Phone
        if(!fields["phone"]){  
          formIsValid = false;
          errors["phone"] = "Ingrese un Numero de Telefono";
        }
        
        if(typeof fields["phone"] !== "undefined" ){
            let phonelenhth = fields["phone"].length;
            if( phonelenhth < 11 ){
                formIsValid = false;
                errors["phone"] = "Ingrese un numero de telefono correcto, incluyendo en codigo de la linea, debe contener 11 digitos";
            }           
        }
    
        this.setState({errors: errors});
        return formIsValid;
      }     
    
      contactSubmit(e){
        e.preventDefault();      
        if(this.handleValidation()){
            let fields = this.state.fields;            
            this.props.AddUser(fields["name"], fields["email"], fields["phone"]); 
                swal({
                    title: "Mensaje",
                    text: "Usuario Registrado",
                    icon: "success",
                    button: "Aceptar"
                });     
                fields["name"] = '';
                fields["email"] = '';
                fields["phone"] = '';                                 
        }    
      }
    
      handleChange(field, e){    		
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
      }
    
      render(){
        return (
            <div className="content">
                <div className="content-form">                        	
                    <form name="contactform" className="formAddUser"  onSubmit= {this.contactSubmit.bind(this)}>
                    <h2>Añadir Usuario </h2>  
                        <div className="campo">
                            <input 
                                className="Campoinput"
                                refs="name" 
                                type="text" 
                                placeholder="Ingrese un Nombre"
                                autoFocus={true} 
                                onChange={this.handleChange.bind(this, "name")} 
                                value={this.state.fields["name"]}
                            />
                            <span className="error">{this.state.errors["name"]}</span>
                        </div>
                        <div className="campo">
                            <input 
                                className="Campoinput"
                                refs="email" 
                                type="text" 
                                placeholder="Ingrese un Email" 
                                onChange={this.handleChange.bind(this, "email")} 
                                value={this.state.fields["email"]}
                            />
                            <span className="error">{this.state.errors["email"]}</span>                            
                        </div>                      
                        <div className="campo">
                            <input 
                                className="Campoinput"
                                refs="phone" 
                                id="phone"
                                pattern="[0-9]{0,11}" 
                                placeholder="Ingrese un numero de Telefono" 
                                onChange={this.handleChange.bind(this, "phone")} 
                                value={this.state.fields["phone"]}
                                oonkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
                            />
                            <span className="error">{this.state.errors["phone"]}</span>                            
                        </div> 
                        <div className="campo">
                            <input
                                className="btnadd" 
                                type="submit" 
                                value="Añadir"
                            />                            
                        </div>
                    </form>
                </div>
            </div>
        )
      }    

/*
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
                            oonChange={this.onChange} 
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
    */
}
