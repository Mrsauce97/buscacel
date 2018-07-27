const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Celular = require('./mongoosePhone')
const PORT = process.env.PORT || 3000


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  res.send('Server on')
})

// crear celulares
app.post('/api/create',(req,res)=>{
  const {marca,modelo,sistemaOperativo} = req.body
  let nuevoCelular = Celular({
    marca,
    modelo,
    sistemaOperativo,
    imagen
  })

  nuevoCelular.save((error,celular)=>{
    res.status(201).send(celular)
  });

});

//Read
app.get('/api/celulares', (req,res)=>{
       Celular.find().exec()
           .then(celular=> res.send(celular))
           .catch(err => res.send(err))

   });

app.get('/api/celulares/:uid', (req,res)=>{
   let {uid} = req.params;
   Celular.findById(uid).exec()
       .then(celular => res.send(celular))
       .catch(err => res.send(err))
})

//Update
app.put('/api/:uid', (req, res) => {
  let {uid} = req.params
  Celular.findByIdAndUpdate(uid, {$set: req.body}, {new: true}).exec()
      .then(celular => res.send(celular))
      .catch(err => res.send(err))
})

//Delete
app.delete('/api/:uid', (req, res)=>{
  let {uid} = req.params
  Celular.findByIdAndRemove(uid).exec()
      .then(celular => res.status(204).send(articulo))
      .catch(err => res.send(err))
})

app.listen(PORT, () => {
  console.log('Running on port ' + PORT);
})
