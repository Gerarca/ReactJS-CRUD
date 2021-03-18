import React, { Component } from 'react';
import swal from 'sweetalert';
import './EditUser.css';

export default class EditUser extends Component {

    constructor(props){
        super(props);
    
        this.state = {
            id    : this.props.id,
            fields: { "name"  : this.props.name,
                      "email" : this.props.email,
                      "phone" : this.props.phone
            },
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
          if(this.props.DataUsers.some(user => user.id !== this.state.id  && user.email.toUpperCase() === fields["email"].toUpperCase() )){            
            if(this.props.DataUsers.some(user => user.email.toUpperCase() === fields["email"].toUpperCase() )){            
                formIsValid = false;    
                errors["email"] = "El Email: "+fields["email"]+" se ecuentra registrado, Ingrese otro Email";            
            }  
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
            this.props.SaveEdit(this.state.id, fields["name"], fields["email"], fields["phone"]);
                swal({
                      title: "Mensaje",
                      text: "Datos Guardados",
                      icon: "success",
                      button: "Aceptar"
                });
                this.props.GoBack(); 
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

    render() {
        return (
            <div className="content">
                <div className="content-form">                        	
                    <form name="contactform" className="formAddUser"  onSubmit= {this.contactSubmit.bind(this)}>
                    <h2>Editar Datos Usuario </h2>  
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
                                value="Guardar"
                            />                            
                        </div>
                    </form>
                    <button className="btnGoBack" onClick={this.props.GoBack} > 
                        Ir Atras                
                    </button>                    
                </div>
            </div>
        )
    }
} 
