const admin = require('firebase-admin');
const fs = require('fs');


const serviceAccount = require('./greenblossoms-df5d7-firebase-adminsdk-7u4vn-715193c822.json'); // Ruta clave firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Lee el JSON
const rawData = fs.readFileSync('./dbProjectYasson.json');
const data = JSON.parse(rawData);

const agregarDatos = async (coleccion, datos) => {
  for (const item of datos) {
    const docRef = db.collection(coleccion).doc(item.id);
    await docRef.set(item);
  }
};

// Agrega los datos y colecciones
const main = async () => {
  await agregarDatos('plantas', data.plantas);
  await agregarDatos('categorias', data.categorias);
  await agregarDatos('usuarios', data.usuarios);
  await agregarDatos('roles', data.roles);
  console.log("Datos agregados exitosamente");
};

main().catch(console.error);
