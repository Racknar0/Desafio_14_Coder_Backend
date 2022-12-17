import express from 'express'
import os from 'os'
import compression from 'compression'
import logger from '../../logger.js'

const systemRouter = express.Router()

systemRouter.get('/', getSystemInformation)
systemRouter.get('/gzip', compression(), getSystemInformation)

function getSystemInformation(req, res){
  logger.info('Entregando información del sistema correcto')
  const data = {
    'Argumentos de entrada': process.argv.slice(2),
    'Nombre de la plataforma (sistema operativo)': process.platform,
    'Versión de node.js': process.version,
    'Memoria total reservada (rss)': process.memoryUsage().rss,
    'Path de ejecución':  process.argv.slice(0),
    'Proccess id': process.pid,
    'Carpeta del proyecto': process.cwd(),
    'Número de procesadores': os.cpus().length,
    'Argumentos de entrada': process.argv.slice(2),
    'Nombre de la plataforma (sistema operativo)': process.platform,
    'Versión de node.js': process.version,
    'Memoria total reservada (rss)': process.memoryUsage().rss,
    'Path de ejecución':  process.argv.slice(0),
    'Proccess id': process.pid,
    'Carpeta del proyecto': process.cwd(),
    'Número de procesadores': os.cpus().length,
  }
  console.log(data)
  res.json(data)
}

export default systemRouter