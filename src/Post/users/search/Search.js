import React, { Component } from 'react';
import swal from 'sweetalert';
import './Search.css';
import EditUser from '../edit/EditUser';

export default class Search extends Component {

    state = {
        errors: {},
        data: this.props.DataUsers,
        id : '',
        name: '',
        searchEmail: '',
        email: '',
        phone: '',
        found: false,
        edit: false
    }

onChange = e => {
    this.setState({
        searchEmail: e.target.value
    })
}

handleValidation(){
    let errors = {};
    let formIsValid = true;

    //Email
    if(!this.state.searchEmail){
      formIsValid = false;
      errors["email"] = "Ingrese un Email valido";
    }

    if(typeof this.state.searchEmail !== "undefined"){
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.searchEmail) === false) {
            formIsValid = false;
            errors["email"] = "Ingrese un Email valido";
        }         
    }

    this.setState({errors: errors});
    return formIsValid;
  }   

onSubmit = e => {   
    e.preventDefault();     
    if( this.handleValidation() ){
        const UserFound = this.props.DataUsers.filter( user => user.email.toUpperCase()  === this.state.searchEmail.toUpperCase()  );     
        if(UserFound.length  === 1){ 
            this.setState({ 
                    id:UserFound[0].id, 
                    name:UserFound[0].name, 
                    email:UserFound[0].email,                      
                    phone:UserFound[0].phone,
                    found: true
                });                           
        }else{
            swal({
                title: "Mensaje",
                text: "El Correo " +this.state.email+ " no se encuentra registrado",
                icon: "error",
                button: "Aceptar"
            });
        }
    }
}

deleteuser = () => {
    this.props.deleteUser(this.state.id);
    this.setState({ 
        id: '', 
        name: '', 
        email: '', 
        phone: '', 
        found: false
    });    
}

edituser = () => {
    this.setState({ edit: true });      
}

GoBack = () =>{
    this.setState({ edit: false });    
}

componentDidMount() {
    this.getData();
    setInterval(this.getData, 1000);
  }

  getData = () => {
    if( this.state.found  ){
        const UserFound = this.props.DataUsers.filter( user => user.id === this.state.id );     
        if(UserFound.length  === 1){ 
            this.setState({ 
                    id:UserFound[0].id, 
                    name:UserFound[0].name, 
                    email:UserFound[0].email, 
                    phone:UserFound[0].phone, 
                    found: true
                });               
        }
    }
  }


    render() {   
        return (
            <div> 
                {
                    this.state.edit? null
                    :
                    <div className="content">
                        <div className="content-form">
                            <div className="formAddUser ">                   
                                <h2>Buscar Usuario</h2>
                                <form onSubmit={this.onSubmit} className="form-search"> 
                                    <div className="campo">
                                        <input 
                                            className="Campoinput" 
                                            name="searchEmail"
                                            type="email" 
                                            placeholder="Escriba un Email" 
                                            onChange={this.onChange} 
                                            value={this.state.searchEmail} 
                                            required 
                                            ref={ (input) => ( this.textemail = input )}
                                        />
                                        <span className="error">{this.state.errors["email"]}</span>                                                                
                                    </div>
                                    <div className="campo">
                                        <input 
                                            className="btnEnviar" 
                                            type="submit" 
                                            value="Buscar"                        
                                        />
                                    </div> 
                                </form>
                            </div>
                        </div>
                    </div>
                }               
                {
                    !this.state.found?
                    null
                    :this.state.edit ?                        
                        <EditUser 
                            id={this.state.id} 
                            name={this.state.name} 
                            email={this.state.email} 
                            phone={this.state.phone} 
                            DataUsers={this.props.DataUsers}
                            GoBack={this.GoBack} 
                            SaveEdit={this.props.SaveEdit} />
                        :                        
                        <div className="content">                        
                        <div className="data">
                            <div className="title-list"> <h2> Datos del Usuario </h2> </div>
                            <div className="r-title">
                              <div className="r-t-user">  Nombre  </div>
                              <div className="r-t-email">  Email </div>                    
                              <div className="r-t-phone"> Telefono </div>
                              <div className="r-t-action" > Opcion </div>
                              <br/>
                            </div>  
                            <div className="r-data-s"> 
                              <div className="r-d-user">  {this.state.name}  </div>
                              <div className="r-d-email">  {this.state.email} </div>                    
                              <div className="r-d-phone"> {this.state.phone} </div>
                              <div className="r-d-action" > 
                               <button className="btnEdit" onClick={this.edituser } > 
                                    Editar                
                                </button> 
                                <button className="btnDelete" onClick={this.deleteuser} > 
                                    Eliminar                
                                </button>                             
                              </div>
                              <br/>                             
                            </div>                
                          </div>
                        </div>             
                    } 
            </div>
        )
    }
}
