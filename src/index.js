import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import jwt_decode from 'jwt-decode'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

//Páginas
import CadFuncionario from './pages/cadastro/cadastroFuncionario/CadFuncionario';
import CadRecrutado from './pages/cadastro/cadastroRecrutado/CadRecrutado';
import CadEmpresa from './pages/cadastro/cadastroEmpresa/CadEmpresa'
import PagDocFunc from './pages/documentos/funcionario/PagDocFunc';
import DocRecrutado from './pages/documentos/recrutado/DocRecrutado' 
import LoginEmpresa from './pages/login/loginEmpresa/loginEmpresa';
import LoginRecrutado from './pages/login/loginRecrutado/loginRecrutado';
import Home from './pages/home/home'
import NaoEncontrada from './pages/naoencontrada/naoencontrada'

const token = localStorage.getItem('token-contratoseguro') 

// Sem cadastro
const RotaNaoCadastrado= ({component : Component, ...rest}) => (
  <Route
    {...rest}
    render = {
      props => 
      token !== null ?
      <Redirect to={{pathname:'/', state:{from : props.location}}}/>:
    <Component {...props}/>
    }
  />
);

//Somente para Recrutados
const RotaRecrutado = ({component : Component, ...rest}) => (
  <Route
    {...rest}
    render = { props => 
      token !== null && jwt_decode(token).role === 'recrutado' ?
        <Component {...props} /> :
        <Redirect to={{pathname : '/login', state :{from : props.location}}} /> 
    }
  />
);

//Somente para Funcionários
const RotaFuncionario = ({component : Component, ...rest}) => (
  <Route
    {...rest}
    render = { props => 
      token !== null && jwt_decode(token).role === 'funcionario' ?
        <Component {...props} /> :
        <Redirect to={{pathname : '/login', state :{from : props.location}}} /> 
    }
  />
);

//Somente para Empresa
const RotaEmpresa = ({component : Component, ...rest}) => (
  <Route
    {...rest}
    render = { props => 
      token !== null && jwt_decode(token).role === 'Empresa' ?
        <Component {...props} /> :
        <Redirect to={{pathname : '/login', state :{from : props.location}}} /> 
    }
  />
);

const routing = (
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <RotaNaoCadastrado path='/login' component ={LoginRecrutado}/>
      <RotaNaoCadastrado path='/loginemp' component ={LoginEmpresa}/>

      {/* <RotaRecrutado path='/recrutado/dashboard' component={DashboardRec} />  */}
      <RotaRecrutado path='/recrutado/documentos' component={DocRecrutado} />
      {/* <RotaRecrutado path='/recrutado/chat' component={Chat} /> */}
      {/* <RotaRecrutado path='/recrutado/perfilrec' component={PerfilRec} /> */}

      {/* <RotaFuncionario path='/funcionario/dashboard' component={DashboardFunc} />  */}
      <RotaFuncionario path='/funcionario/documentos' component={PagDocFunc} />
      {/* <RotaFuncionario path='/funcionario/chat' component={Chat} /> */}
      <RotaFuncionario path='/funcionario/Cadastrorec' component={CadRecrutado} />
      {/* <RotaFuncionario path='/funcionario/Perfil' component={PerfilFunc} /> */}
 
      {/* <RotaEmpresa path='/empresa/dashboard' component={DashboardEmp} /> */}
      <RotaEmpresa path='/empresa/cadastrofunc' component={CadFuncionario} />
      <RotaEmpresa path='/empresa/cadastroemp' component={CadEmpresa} />
      {/* <RotaEmpresa path='/empresa/perfil' component={PerfilEmp} /> */}
     
       <Route component ={NaoEncontrada}/>
    </Switch>
  </Router>
)


ReactDOM.render(
  routing,
  document.getElementById('root')
);

reportWebVitals();
