async function NumberCheck(req, res, next) {
    var id = req.body.id?.toString()
    var key = req.query.key?.toString()

    if(req.query['verificado']) {
        const verificado = req.query['verificado']?.toString()
        if(verificado === '1') {
            // return res.status(201).json({ p: 1 })

            next()
            return
        }
    }

    try {
        const data = await WhatsAppInstances[key]?.getUserStatus(id)
        if(data.status != '') {
            // return res.status(201).json({ p: 2 })

            next()
            return
        }
    } catch(e) {
        if( e.message == "Cannot read properties of undefined (reading 'toString')" ) {
            // return res.status(201).json({ p: 2.1 })

            next()
            return
        }
    }
    
    try {
        const photo = await WhatsAppInstances[key]?.DownloadProfile( id )
        if(photo.indexOf('https://') > -1) {
            // return res.status(201).json({ p: 3 })

            next()
            return
        }
    } catch(e) {
        if( e.message == 'not-authorized' ) {
            // return res.status(201).json({ p: 3.1 })

            next()
            return
        }
    }

    if (
        id.length == 13 &&
        id.substring(0, 2) == '55' &&
        id.substring(4, 5) == '9'
    ) {
        id = id.substring(0,4) + id.substring(5, id.length)
        req.body.id = id

        try {
            const data = await WhatsAppInstances[key]?.getUserStatus(id)
            if(data.status != '') {
                // return res.status(201).json({ p: 4 })
    
                next()
                return
            }
        } catch(e) {
            if( e.message == "Cannot read properties of undefined (reading 'toString')" ) {
                // return res.status(201).json({ p: 4.1 })

    
                next()
                return
            }
        }
        
        try {
            const photo = await WhatsAppInstances[key]?.DownloadProfile( id )
            if(photo.indexOf('https://') > -1) {
                // return res.status(201).json({ p: 5 })
    
                next()
                return
            }
        } catch(e) {
            if( e.message == 'not-authorized' ) {
                // return res.status(201).json({ p: 5.1 })
    
                next()
                return
            }
        }
        

        return res.status(400).json({ error: true, data: 'Este numero não é um WhatsApp valido, por favor verifique.'  })

    } else {
        return res.status(400).json({ error: true, data: 'Este numero não é um WhatsApp valido, por favor verifique.'  })
    }
}

module.exports = NumberCheck
