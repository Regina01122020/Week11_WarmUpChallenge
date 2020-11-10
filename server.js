const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const app = express()
const port = 2020

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({extended: true})) 

const schema = require('./model/schema.js')

//database connection
mongoose.connect('mongodb+srv://regina:lJh3MVjYfGtkzJRn@cluster1.utlod.gcp.mongodb.net/PetsDB?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true},
function(error, database){
    if(error){
        throw error
    } else {
        console.log('Connection made to database successfully!')
    }
})

app.get('/', function(request, response){
    response.render('home')
})

app.post('/display', function(request, response){
    console.log('Post Route Hit!')
    console.log(request.body)

    petObject = {
        name: request.body.name,
        type_of_pet: request.body.type_of_pet,
        pet_colour: request.body.pet_colour,
        reason_for_pet_name: request.body.reason_for_pet_name
    }

    addPet = new schema(petObject)

    addPet.save()
        .then(function(pet){
            console.log('Pet Details saved!')
            console.log(pet)
            response.send(pet)
        })
        .catch(function(error){
            console.log(error)
        })
})

app.listen(port, ()=> {
    console.log(`Server Running at http://localhost:${port}`)
})

