const cadastrar = dados => {
    return fetch("https://localhost:44312/api/account/employee/signup", {
        method:'POST',
        body : JSON.stringify(dados),
        headers : {
            'content-type' : 'application/json'
        }
    })
}

export default {
    cadastrar
}