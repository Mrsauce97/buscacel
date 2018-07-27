const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Celular = require('./mongoosePhone')
const cors = require('cors');
const PORT = process.env.PORT || 3000


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> {
  res.send('Server on con cors')
})

// crear celulares
app.post('/api/create',(req,res)=>{
  const {marca,modelo,sistemaOperativo,imagen} = req.body
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
    let query = req.query.q
      if(query== 'android'){
      Celular.find({'sistemaOperativo':'Android'}).exec()
      .then(celular=> res.send(celular))
      .catch(err => res.send(err))
     } else if(query== 'ios'){
      Celular.find({'sistemaOperativo':['iOS','iOS 6','iOS 10']}).exec()
      .then(celular=> res.send(celular))
      .catch(err => res.send(err))
     } else if(query== 'samsung'){
      Celular.find({'marca':'SAMSUNG'}).exec()
      .then(celular=> res.send(celular))
      .catch(err => res.send(err))
     } else if(query== 'apple'){
      Celular.find({'marca':'Apple'}).exec()
      .then(celular=> res.send(celular))
      .catch(err => res.send(err))
     } else if(query== 'lg'){
      Celular.find({'marca':'LG'}).exec()
      .then(celular=> res.send(celular))
      .catch(err => res.send(err))
     } else if(query== 'huawei'){
      Celular.find({'marca':'HUAWEI'}).exec()
      .then(celular=> res.send(celular))
      .catch(err => res.send(err))
     } else {
      Celular.find().exec()
      .then(celular=> res.send(celular))
      .catch(err => res.send(err))
     }
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
