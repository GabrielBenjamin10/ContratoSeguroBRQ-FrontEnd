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
      token !== null && jwt_decode(token).role === '1' ?
        <Component {...props} /> :
        <Redirect to={{pathname : '/', state :{from : props.location}}} /> 
    }
  />
);

//Somente para Funcionários
const RotaFuncionario = ({component : Component, ...rest}) => (
  <Route
    {...rest}
    render = { props => 
      token !== null && jwt_decode(token).role === '2' ?
        <Component {...props} /> :
        <Redirect to={{pathname : '/2/documentos', state :{from : props.location}}} /> 
    }
  />
);

//Somente para Empresa
const RotaEmpresa = ({component : Component, ...rest}) => (
  <Route
    {...rest}
    render = { props => 
      token !== null && jwt_decode(token).role === '3' ?
        <Component {...props} /> :
        <Redirect to={{pathname : '/3/cadastro', state :{from : props.location}}} /> 
    }
  />
);

const routing = (
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      {/* <RotaNaoCadastrado path='/loginrec' component ={LoginRecrutado}/> */}
      <RotaNaoCadastrado path='/login' component ={LoginRecrutado}/>
      <RotaNaoCadastrado path='/loginemp' component ={LoginEmpresa}/>

      {/* <RotaRecrutado path='/1/dashboard' component={DashboardRec} /> */}
      {/* <RotaRecrutado path='/documentos' component={DocRecrutado} /> */}
      {/* <RotaRecrutado path='/1/chat' component={Chat} /> */}
      {/* <RotaRecrutado path='/1/Perfil' component={PerfilRec} /> */}

      {/* <RotaFuncionario path='/2/dashboard' component={DashboardFunc} /> */}
      <RotaNaoCadastrado path='/documentos' component={PagDocFunc} />
      {/* <RotaFuncionario path='/2/chat' component={Chat} /> */}
      <RotaNaoCadastrado path='/Cadastrorec' component={CadRecrutado} />
      {/* <RotaFuncionario path='/2/Perfil' component={PerfilFunc} /> */}
 
      {/* <RotaEmpresa path='/3/dashboard' component={DashboardEmp} /> */}
      <RotaNaoCadastrado path='/cadastrofunc' component={CadFuncionario} />
      <RotaNaoCadastrado path='/cadastroemp' component={CadEmpresa} />
      {/* <RotaEmpresa path='/3/perfil' component={PerfilEmp} /> */}
     
      {/* <Route component ={NotFound}/> */}
    </Switch>
  </Router>
)


ReactDOM.render(
  routing,
  document.getElementById('root')
);

reportWebVitals();
