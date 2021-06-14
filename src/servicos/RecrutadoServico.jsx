import http from '../utils/http-axios';
import axios from "axios";

const listar = dados => {
    return http.get('account/recruited/lister-recruited', JSON.stringify(dados), {
        headers : {
            'authorization' : `Bearer ${localStorage.getItem('token-contratoseguro')}`
        }
    });
}

const cadastrar = dados => {
    return http.post('account/recruited/signup-recruited', JSON.stringify(dados), {
        headers : {
            'authorization' : `Bearer ${localStorage.getItem('token-contratoseguro')}`
        }
    });
}

const remover = async id => {
    return await axios({
        method: 'DELETE',
        url: 'https://localhost:5001/v1/account/recruited/delete-recruited',
        data: {
            idRecrutado: id,
        },
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token-contratoseguro')}`
        }
    })
}

const buscarId = id => {
    return http.get('/account/recruited/profile-recruited/' + id)
}


export default {
    listar,
    cadastrar,
    remover,
    buscarId
}
