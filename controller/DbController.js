/* const knex = require('knex'); */
import knex from 'knex';
import logger from '../logger.js';


async function createTable(options ,name, schema) {
    const knexInstance = knex(options); // Instancia de knex con la configuración de la base de datos

    const exist = await knexInstance.schema.hasTable(name); //! Verifica si existe la tabla
    if (exist) {
        logger.error(`La tabla ${name} ya existe`); 
        return; 
    }

    try {
        await knexInstance.schema.createTable(name, schema); //! Si no existe, crea la tabla
        logger.info(`Tabla ${name} creada`);
    } catch (error) {
        console.log(error.message);
        throw error; //! Lanza el error para que sea capturado por el catch del app.js
    } finally {
        knexInstance.destroy();
    }
}

/* funcion de selecData */
async function selectData(options, database) {
    const knexInstance = knex(options); // Instancia de knex con la configuración de la base de datos
    try {
        const data = await knexInstance.from(database).select('*');
        return data;
    } catch (error) {
        console.log(error.message);
        throw error;
    } finally {
        knexInstance.destroy();
    }
}


/* funcion de insertData */
async function insertData(options, database, data) {
    const knexInstance = knex(options); // Instancia de knex con la configuración de la base de datos
    try {
        await knexInstance(database).insert(data);
        logger.info(`Datos insertados en la tabla ${database}`);
    } catch (error) {
        console.log(error.message);
        throw error;
    } finally {
        knexInstance.destroy();
    }
}



/* module.exports = { createTable, selectData , insertData }; */
export { createTable, selectData , insertData };