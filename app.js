const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended: true}))
//register routes
app.use('/api/auth', require('./routes/auth.routes'))

const PORT = procces.env.PORT || config.get('port') || 5000

async function start (){
    try{
        console.log(JSON.stringify(process.env))
        console.log("connecting to mongoDB...")
        console.log(config.get('mongoUri'))
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    }
    catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}
start()

