import React, { useRef, useEffect, useState } from 'react'
import { useFormik } from 'formik';
import Menu from "../../../components/menu/menu";
import Rodape from "../../../components/rodape/rodape"
import Funcionario from '../../../assets/img/avatar.jpg'
import jwt_decode from 'jwt-decode';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import FuncionarioServico from '../../../servicos/FuncionarioServico';
import RecrutadoServico from '../../../servicos/RecrutadoServico';
import "./PerfilRecrutado.css";
import { useToasts } from 'react-toast-notifications';
import * as Yup from 'yup';


const PerfilRecrutado = () => {
    const { addToast } = useToasts();
    const token = localStorage.getItem('token-contratoseguro')
    const nomeFuncionario = jwt_decode(token).family_name.Nome;
    const emailFuncionario = jwt_decode(token).email;
    const [image, setImage] = useState();
    const [preview, setPreview] = useState();
    const fileInputRef = useRef();
    const [recruited, setRecruited] = useState("");

    
    useEffect(() => {
        listarUser()
    }, []);

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);

            };
            reader.readAsDataURL(image);
        } else {
            setPreview(null);
        }
    }, [image]);


    const listarUser = () => {
        RecrutadoServico
            .buscarId(jwt_decode(token).jti[0])
            .then(response => {
                setRecruited(response.data.data)

            })
    }

    const alterar = (values) => {
        RecrutadoServico
            .alterarSenha(values)
            .then(resultado => {
                if (resultado.data.sucesso) {
                    addToast(resultado.data.mensagem, {
                        appearance: 'success',
                        autoDismiss: true,
                    })
                    formik.resetForm();
                } else {
                    addToast(resultado.data.mensagem, {
                        appearance: 'warning',
                        autoDismiss: true,
                    })
                }

                formik.setSubmitting(false);
            })
    }

    const formik = useFormik({
        initialValues: {
            idUsuario: jwt_decode(token).jti[1],
            senhaAtual: '',
            novaSenha: '',

        },
        onSubmit: values => {
            console.log(values);
            alterar(values);
        },
        validationSchema: Yup.object().shape({
            novaSenha: Yup.string()
                .min(6, 'A nova senha deve ter no mínimo 6 caracteres')
                .required('Campo nova senha obrigatório'),
            senhaAtual: Yup.string()
                .required('Campo senha atual obrigatório'),
        })

    })


    return (

        <div>
            <Menu />

            <div className="Barra_superior">
                <p className="Titulo_perfilfunc"> Meus Dados</p>
            </div>

            <div className="teste">
                <div className="Container_totality">
                    <div className="Container_perfil">

                    <img src={Funcionario}></img>
                        <div className="Barra_nome">
                            <h1>{jwt_decode(token).given_name}</h1>
                        </div>


                        <div className="mb-2">
                            <Form.Group >

                                <Form.Control
                                    className="Input_senha"
                                    type="password"
                                    placeholder="SENHA ATUAL"
                                    name="senhaAtual"
                                    onChange={formik.handleChange}
                                    value={formik.values.senhaAtual}
                                    required />
                                {formik.errors.senhaAtual && formik.touched.senhaAtual ? (<div className="error">{formik.errors.senhaAtual}</div>) : null}
                            </Form.Group>

                        </div>
                        <div className="mb-2">
                            <Form.Group>

                                <Form.Control
                                    className="Input_senha"
                                    type="password"
                                    placeholder="NOVA SENHA"
                                    name="novaSenha"
                                    onChange={formik.handleChange}
                                    value={formik.values.novaSenha}
                                    required />
                                {formik.errors.novaSenha && formik.touched.novaSenha ? (<div className="error">{formik.errors.novaSenha}</div>) : null}
                            </Form.Group>

                        </div>
                        <div >
                            <Button onClick={formik.handleSubmit} type="submit" value="Submit" variant="primary" size="lg">
                                Salvar
                            </Button>
                        </div>
                        
                    </div>

                    <div className="Container_totality2">
                        <div className="infoprofile">
                            <h3>Email</h3>
                            <a >{recruited.email}</a>
                        </div>

                        <div className="infoprofile">
                            <h3 >Telefone</h3>
                            <a >+55 11986628675</a>
                        </div>
                        <div className="infoprofile">
                            <h3 >CPF</h3>
                            <a >{recruited.cpf}</a>
                        </div>
                    </div>
                </div>
            </div>

            < Rodape />
        </div>
    )
}


export default PerfilRecrutado;

