import React, { useRef, useEffect, useState } from 'react'

import Menu from "../../../components/menu/menu";
import Rodape from "../../../components/rodape/rodape"
import Funcionario from '../../../assets/img/avatar.jpg'
import jwt_decode from 'jwt-decode';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import FuncionarioServico from '../../../servicos/FuncionarioServico';
import RecrutadoServico from '../../../servicos/RecrutadoServico';
import "./PerfilRecrutado.css";


const PerfilRecrutado = () => {

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

    useEffect(()=> {
        if(image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);

            };
            reader.readAsDataURL(image);
        }else{
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

      
    return (
        
        <div>
            <Menu />

            <div className="Barra_superior">
                <p className="Titulo_perfilfunc"> Meus Dados</p>
            </div>

            <div className="teste">
                <div className="Container_totality">
                    <div className="Container_perfil">
                        
                       <form>
                       {preview ? (
                            <img
                                src={preview}
                                style={{ objectFit: "cover" }}
                                onClick={() => {
                                setImage(null);
                                }}
                            />
                            ) : (
                            <button
                                onClick={(event) => {
                                event.preventDefault();
                                fileInputRef.current.click();
                                }}
                            >
                              
                            </button>
                            )}

                            <input
                                    type="file"
                                    style={{ display: "none" }}
                                    ref={fileInputRef}
                                    accept="image/*"
                                    onChange={(event) => {
                                        const file = event.target.files[0];
                                        if (file && file.type.substr(0, 5) === "image") {
                                        setImage(file);
                                        } else {
                                        setImage(null);
                                        }
                                    }}
                                    />
                       </form>
                        <div className="Barra_nome">
                            <h1>{jwt_decode(token).family_name[0]}</h1>
                        </div>

                       


                        <div className="mb-2">
                            <Form.Group controlId="formBasicPasswordProfile">

                                <Form.Control className="Input_senha" type="password" placeholder="ALTERAR SENHA" name="senha" />
                            </Form.Group>

                        </div>
                        <div className="mb-2">
                            <Form.Group controlId="formBasicPasswordProfile">

                                <Form.Control className="Input_senha" type="password" placeholder="CONFIRMAR SENHA" name="senha" />
                            </Form.Group>

                        </div>
                        <div >
                            <Button variant="primary" size="lg">
                                Salvar
                            </Button>{' '}
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

