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
          let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (reg.test(fields["email"]) === false) {
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
          errors["phone"] = "Ingrese un Numero de Telefono ";
        }
        
        if(typeof fields["phone"] !== "undefined" ){
            let phonelenhth = fields["phone"].length;
            if( phonelenhth < 8 ){
                formIsValid = false;
                errors["phone"] = "Ingrese un numero de telefono correcto, tiene que ser de 8 digitos";
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
    
    StyleCompleted(error){
        return{            
            border: error? 'solid 2px red' : ''                      
        }
    }

      render(){
        return (
            <div className="content">
                <div className="content-form">                        	
                    <form name="contactform" className="formAddUser"  onSubmit= {this.contactSubmit.bind(this)}>
                    <h2>A??adir Usuario </h2>  
                        <div className="campo">
                            <input 
                                className="Campoinput"
                                style={this.StyleCompleted(this.state.errors["name"])}
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
                                style={this.StyleCompleted(this.state.errors["email"])}
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
                                style={this.StyleCompleted(this.state.errors["phone"])}
                                refs="phone" 
                                id="phone"
                                pattern="[0-9]{0,8}" 
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
                                value="A??adir"
                            />                            
                        </div>
                    </form>
                </div>
            </div>
        )
      }    
}
