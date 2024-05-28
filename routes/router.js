import express from "express";
import fs from "fs";
import path from "path";
const router = express.Router();
const __dirname = import.meta.dirname;

//Ruta raiz
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

//Ruta que recibe nombre y precio
router.get("/agregar", (req, res) => {
  const { nombre, precio } = req.query;
  const deporte = { nombre, precio };
  const postData = (deporte) => {
    let deportes = []; //aquí inserta los objetos al json

    try {
      const data = fs.readFileSync("Deportes.json", "utf8");
      const deporteData = JSON.parse(data);
      if (deporteData.deportes) {
        deportes = deporteData.deportes;
      }
      deportes.push(deporte);
      fs.writeFileSync("Deportes.json", JSON.stringify({ deportes }));
      console.log(`${deporte.nombre} agregado a la lista`);
    } catch (error) {
      console.log("No se pudo agregar a Deportes.json: " + error.message);
    }
    return postData;
  };
  res.send(`${deporte.nombre} agregado a la lista`);
  postData(deporte);
});

//Ruta que devuelve en formato json todos los deportes
router.get("/deportes", (req, res) => {
  res.sendFile(path.join(__dirname, "../Deportes.json"));
});

//Ruta que edite precio de deporte
router.get("/editar", (req, res) => {
  const { nombre,precio } = req.query;

  const putData = (nombre, nuevoPrecio) => {
    try {
      let deportes = [];
      const data = fs.readFileSync("Deportes.json", "utf8");
      const deporteData = JSON.parse(data);
      if (deporteData.deportes) {
        deportes = deporteData.deportes;
      }
      const editarDeporte= deportes.find(deporte => deporte.nombre === nombre);
      if (editarDeporte){
        editarDeporte.precio=nuevoPrecio;
        fs.writeFileSync("Deportes.json", JSON.stringify({ deportes }));
      }
      console.log(`El precio de ${nombre} ha sido editado`);
      res.send(`El precio de ${nombre} ha sido cambiado con éxito`);
    } catch (error) {
      console.log("No logramos realizar cambios en su solicitud: " + error.message);
    }
    return putData;
  };

  putData(nombre, precio);
});

//Ruta para eliminar
router.get("/eliminar", (req,res)=>{
  const { nombre} = req.query;

  const deleteData = (nombre) => {
    try {
      let deportes = [];
      const data = fs.readFileSync("Deportes.json", "utf8");
      const deporteData = JSON.parse(data);
      if (deporteData.deportes) {
        deportes = deporteData.deportes;
      };
     deportes= deportes.filter(deporte=> deporte.nombre !==nombre);
      fs.writeFileSync("Deportes.json", JSON.stringify({ deportes }));
      console.log(`${nombre} eliminado de la lista`);
      res.send(`${nombre} eliminado de la lista`);
    } catch (error) {
      console.log("No se pudo eliminar: " + error.message);
    }
    return deleteData;
  };
  deleteData(nombre);


})

export default router;