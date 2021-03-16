import React, { Component } from 'react';
import swal from 'sweetalert';
import './Search.css';
import EditUser from '../edit/EditUser';

export default class Search extends Component {

    state = {
        data: this.props.DataUsers,
        id : '',
        name: '',
        email: '',
        phone: '',
        found: false,
        edit: false
    }

onChange = e => {
    this.setState({
        email: e.target.value
    })
}

onSubmit = e => {   
    e.preventDefault();     
    const UserFound = this.props.DataUsers.filter( user => user.email === this.state.email );     
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
                    <div className="b-form">                   
                        <h2>Buscar Usuario</h2>
                        <form onSubmit={this.onSubmit} className="form-search"> 
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
                                className="btnEnviar" 
                                type="submit" 
                                value="Buscar"                        
                            /> 
                        </form>
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
