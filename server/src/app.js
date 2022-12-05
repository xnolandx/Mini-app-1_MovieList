const { response } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 8081;
const knex = require('knex')(require('../knexfile')['development'])

app.use(express.json())
app.use(cors())

// Root Directory
app.get('/', (req, res) => {
    res.send('Application up and running.')
})

// Get "movies" table 
app.get('/movies', async (req, res) => {
    let data = null;
    try {
        data = await knex(`movies`)
        .select('*')
     } catch (e) {
        console.log(e);
        res.status(400).send('There was an error processing your request.');
        }
      res.status(200).send(data)
})

//Add movie endpoint
app.post('/movies', async (req, res) => {
    const maxIdQuery = await knex('movies').max('id as maxId').first();
    let num = maxIdQuery.maxId + 1;
    try {
      let newMovie = {
        id: num, 
        title: req.body.title
      }
      await knex('movies').insert(newMovie);
      res.status(201).send(`"${newMovie.title}" successfully added to the database.`)
    } catch(e) {
        console.log(e);
        res.status(400).send('Post Failed')
    }
})

//Delete movie enpoint
app.delete('/movies', async (req, res) => {
    const id = parseInt(req.body.id);
    try{
      await knex('movies').where('id', id).del();
      res.status(202).send(`Item with id ${id} successfully deleted.`)
    } catch (e) {
      console.log(e);
      res.status(400).send('There was an error processing your request.');
    }
  })

// Exposing port 8081
app.listen(port, () => {
    console.log('Your Knex and Express application are running succesfully.')
})