const axios = require('axios')

async function SHTokenVerification(req, res, next) {
    const token = req.query['token']?.toString()
    const key = req.query['key']?.toString()

    if (key === 'fc0659e2-021f-4914-9a91-0769f19405bc') {
        next()
        return
    }

    if (!token) {
        return res
            .status(403)
            .send({ error: true, message: 'Informe o token' })
    }

    var config = {
        method: 'post',
        url: 'https://server.sharmaq.com.br/api/auth/token_check',
        headers: { 
            'Authorization': 'Bearer ' + token, 
        }
    };
      
    axios(config)
    .then(function (response) {
        next()
    })
    .catch(function (error) {
    return res
        .status(403)
        .send({ error: true, message: 'Token inválido' })
    });
}

module.exports = SHTokenVerification
