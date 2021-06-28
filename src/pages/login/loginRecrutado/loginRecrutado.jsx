import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import Rodape from '../../../components/rodape/rodape';
import Menu from '../../../components/menu/menu'
import './LoginRecrutado.css';
import Foguete from '../../../assets/img/fuguete.png';
import Logo from '../../../assets/img/logo2.png';
import Seta from '../../../assets/img/seta.png';
import Seta2 from '../../../assets/img/seta2.png';
import { useFormik } from 'formik';
import ContaServicoRec from '../loginRecrutado/contaservico';



const LoginRecrutado = () => {

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: '',
      senha: '',
      cpf: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      ContaServicoRec.logar(values)
        .then(resultado => {
          console.log(`Resultado ${resultado.data}`)
          setSubmitting(false);
          if (resultado.data.sucesso) {
            //mensagem
            console.log("Logado")
            //salvar local storage
            localStorage.setItem('token-contratoseguro', resultado.data.data.token)
            //redirecionar tela admin
            history.push('/');
          } else {
            alert("Dados Inválidos")
          }
        })
        .catch(error => console.error(error));
    },
    
  });


return (

  <div class="body">
    <Menu />
    <Container>
      <div class="mediaLogin">
      <div class="FundoInfo">
        <h1>Seja muito bem vindo recrutado!</h1>
        <ul>
          <li><a><b>+ Praticidade!</b></a></li>
          <li><a><b>+ Rapidez</b></a></li>
          <li><a><b>Menos burocracia!</b></a></li>
        </ul>
        <img src={Foguete} className="foguete-logo" alt="foguete" />
      </div>
      <div Class="FundoForm">
        <div class="InputsForm">
         
          <div>
            <Form className='form-signin' onSubmit={formik.handleSubmit} >
          
              <img src={Logo} class="logo-a" alt="logo" />


              <Form.Group controlId="formBasicEmail">
                <Form.Control style={{ backgroundColor: 'white', width: '70%', marginLeft: '10%' }} type="email" placeholder="EMAIL" name="email" onChange={formik.handleChange} value={formik.values.email} required />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">

                <Form.Control style={{ backgroundColor: 'white', width: '70%', marginLeft: '10%' }} type="password" placeholder="SENHA" name="senha" onChange={formik.handleChange} value={formik.values.senha} required />
              </Form.Group>

              <Form.Group >

                <Form.Control style={{ backgroundColor: 'white', width: '70%', marginLeft: '10%' }} type="text" placeholder="CPF" name="cpf" onChange={formik.handleChange} value={formik.values.cpf} required />
              </Form.Group>

              <a class="LogarFuncionario" href="/loginfunc"style={{ fontSize:'0.8em'}}> <b> Logar como funcionário?<br/></b></a>
              <a class="LogarEmpresa" href="/loginemp"> <b > Logar como empresa?</b></a>
              <br/>

              <Button className="ButtonSignIn" variant="primary" type="submit" disabled={formik.isSubmitting}>
                Entrar
                    </Button>
              <br /><br />
              <a style={{ marginTop: '30px', fontSize: '10px',  }}>Esqueci a senha!</a>
            </Form>
          </div>
        </div>
      </div>
      </div>
    </Container>
    <Rodape/>
  </div>

)
}



export default LoginRecrutado;