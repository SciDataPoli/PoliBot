// llamar o requerir el framework express
const Express = require('express');
// llamar la utlidad de mongodb
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const { conectarDB, getDB } = require('./db/db.js');

dotenv.config({path: './.env'});



// permite iniciar el servidor
const app = Express();
//funcionalidad de express en json
app.use(Express.json())

app.get("/", (req, res) => {
    console.log("aqui se hace un get");
    const baseDeDatos = getDB();
    baseDeDatos.collection('usuariosPrueba').find({}).limit(50).toArray((err, result) => {
        if (err) {
            res.status(500).send('Error al consultar los datos');
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

app.post("/nuevo", (req, res) => {
    // console.log(req);
    const dataCollection = req.body;
    console.log("llaves: ", Object.keys(dataCollection));
    try {
        if (
            Object.keys(dataCollection).includes('email') &&
            Object.keys(dataCollection).includes('user') &&
            Object.keys(dataCollection).includes('password')
        ) {
            const baseDeDatos = getDB();
            baseDeDatos.collection('usuariosPrueba').insertOne(dataCollection, (err, result) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    res.sendStatus(200);
                }
            });
        } else {
            res.sendStatus(500);
        }
    } catch {
        res.sendStatus(500);
    }
});

app.patch("/editar", (req,res) => {
    const edicion = req.body;
    console.log(edicion);
    const filtro = {_id: new ObjectId(edicion.id)};
    delete edicion.id;
    const operacion = {$set: edicion};
    const baseDeDatos = getDB();
    baseDeDatos.collection('usuariosPrueba').findOneAndUpdate(filtro, operacion, {upsert: true, returnOriginal: true}, (err, result)=>{
        if (err) {
            console.error('error al actualizar el dato: ', err);
            res.sendStatus(500); 
        } else {
            console.log('actualizado con exito');
            res.sendStatus(200);
        }
    })
});

app.delete("/delete", (req, res) =>{

    const filtro = {_id: new ObjectId(req.body.id)};
    const baseDeDatos = getDB();
    baseDeDatos.collection('usuariosPrueba').deleteOne(filtro, (err,result) =>{
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            console.log('eliminado con éxito');
            console.log(result);
            res.sendStatus(200);
        }
    });
});

// arrancar el servidor
const main = () => {
    // Conecta a la base de datos de mongodb
    return app.listen(process.env.PORT, () => {
        console.log("Servidor funcionando");
    });
};

conectarDB(main) 