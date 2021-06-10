import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import Rodape from '../../components/rodape/rodape';
import Menu from '../../components/menu/menu'
import './redefinirsenha.css';
import Logo from '../../assets/img/logo2.png';
import Seta from '../../assets/img/seta.png';
import Seta2 from '../../assets/img/seta2.png';
import Foguete from '../../assets/img/fuguete.png'
import { useFormik } from 'formik';
import { useToasts } from 'react-toast-notifications';
import ContaServico from './ContaServico'
import esquecisenha from '../../assets/img/esquecisenha.png'


const RedefinirSenha = () => {

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: '',
      senha: '',
      cpf: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      ContaServico.logar(values)
        .then(resultado => {
            console.log(`Resultado ${resultado.data}`)
            setSubmitting(false);
            if(resultado.data.sucesso){
                //mensagem
                console.log("Logado")
                //salvar local storage
                localStorage.setItem('token-contratoseguro', resultado.data.data.token)
                //redirecionar tela admin
                history.push('/documentos');
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
        <div class="FundoInfo">
          <h1>Redefinir senha</h1>
          <img src={esquecisenha} className="foguete-logo" alt="foguete" />
        </div>
        <div Class="FundoForm">
          <div class="InputsForm">
            <div>
              
              <img class="setaEmpresa" src={Seta2} alt="seta" />
            </div>
            <div>
              <Form className='form-signin' onSubmit={formik.handleSubmit} >
                <img src={Logo} class="logo-a" alt="logo" />


                <Form.Group controlId="formBasicEmail">
                  <Form.Control style={{backgroundColor: 'white', width: '200px', marginLeft: '49px'}} type="email" placeholder="Senha" name="email" onChange={formik.handleChange} value={formik.values.email} required />
                </Form.Group>

                <Form.Group  controlId="formBasicPassword">
                 
                  <Form.Control style={{backgroundColor: 'white', width: '200px', marginLeft: '49px'}} type="password" placeholder="Nova senha" name="senha" onChange={formik.handleChange} value={formik.values.senha} required />
                </Form.Group>

                <Form.Group >
                
                  <Form.Control style={{backgroundColor: 'white', width: '200px', marginLeft: '49px'}} type="text" placeholder="Confimar Senha" name="cpf" onChange={formik.handleChange} value={formik.values.cpf} required />
                </Form.Group>


                <Button className="ButtonSignIn" variant="primary" type="submit" disabled={formik.isSubmitting}>
                  Confirmar
                    </Button>
                <br /><br />
              </Form>
            </div>
          </div>
        </div>
      </Container>
      <Rodape />
    </div>

  )
}



export default RedefinirSenha;