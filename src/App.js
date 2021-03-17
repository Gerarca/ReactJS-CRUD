import React,{ Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import swal from 'sweetalert';
import logo from './logo.svg';
import './App.css';
import Data from './APIData/Data.json';
import View from './Post/users/view/view';
import FormAddUser from './Post/users/create/FormAddUser';
import EditUser from './Post/users/edit/EditUser';
import Search from './Post/users/search/Search';

class App extends Component {

  state = { 
    data: Data.users,
    showEditUser: false,
    id: '',
    name: '',
    email: '',
    phone: ''
  }

  AddUser = (username, useremail, userphone) =>{
    const newUser = {
      id: this.state.data.length + 1,
      name: username,
      email: useremail,
      phone: userphone,      
      state: false
    }
    this.setState({
      data: [...this.state.data, newUser]
    });    
  }

  deleteUser = (id) =>{     
    const newData = this.state.data.filter( user => user.id !== id );     
    this.setState({data: newData});
    swal({
      title: "Mensaje",
      text: "Usuario Eliminado",
      icon: "success",
      button: "Aceptar"
  });
   }  

  editUser = (id, name, email, phone) =>{
    this.setState({ showEditUser: true, id:id, name:name, email:email, phone:phone});
  }

  GoBack = () =>{
    this.setState({ showEditUser: false, id:'', name:'', email:'', phone:'' });    
  }

  SaveEdit = (id, name, email, phone) => {
    const newData = this.state.data.map( user => {
      if ( user.id === id ) {
        user.name = name;
        user.email = email;
        user.phone = phone;
      }
      return user;
    });
    this.setState({ data: newData });
  } 

  render(){    
    return (          
      <Router> 
      <div className="App"> 
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> MY App LimonByte </p>
      </header>        
        <ul>
          <li> <Link style={linkStyle} to="/">Usuarios</Link> </li>
          <li> <Link style={linkStyle} to="/add">Añadir</Link> </li>
          <li> <Link style={linkStyle} className="link" to="/search">Buscar </Link> </li>
        </ul>
        <hr />
        <Switch>
          <Route exact path="/">            
            { 
              this.state.showEditUser ?
              <EditUser 
                id={this.state.id} 
                name={this.state.name} 
                email={this.state.email} 
                phone={this.state.phone} 
                DataUsers = { this.state.data } 
                GoBack={this.GoBack} 
                SaveEdit={this.SaveEdit} 
              />
              :
                <div className="content">
                  <div className="data">
                    <div className="title-list"> <h2> Usuarios </h2> </div>
                    <div className="r-title"> 
                      <div className="r-t-user">  Nombre  </div>
                      <div className="r-t-email">  Email </div>                    
                      <div className="r-t-phone"> Telefono </div>
                      <div className="r-t-action" > Opcion </div>
                      <br/>
                    </div>  
                    <div className="r-data"> 
                      <View 
                        DataUsers = { this.state.data } 
                        deleteUser={this.deleteUser} 
                        editUser={this.editUser}
                      />
                    </div>                
                  </div>
                </div>            
              }  
          </Route>
          <Route path="/add">
            <div className=""> 
              <FormAddUser 
                AddUser = {this.AddUser} 
                DataUsers = { this.state.data } 
              />
            </div>
          </Route>
          <Route path="/search">
            <Search 
              showEditUser={this.state.showEditUser}  
              id={this.state.id}
              name={this.state.name}
              email={this.state.email}
              phone={this.state.phone}
              DataUsers={this.state.data} 
              deleteUser={this.deleteUser} 
              GoBack={this.GoBack}
              SaveEdit={this.SaveEdit}
            />
          </Route>
        </Switch>
      </div>
    </Router> 
  )}
}

const linkStyle =  {
  color: '#ffffff',
  textDecoration:'none',
  fontWeight: 'bold',

  Hover:{
    backgroungColor:'#093ea8'
  }
}

export default (App);
