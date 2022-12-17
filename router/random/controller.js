/* const randomRouter = require('express').Router()
 */
/* const {fork} = require('child_process')
const path = require('path') */


import express from 'express'
import {fork} from 'child_process'
import path from 'path'

const randomRouter = express.Router()



randomRouter.get('/api/randoms', getRandoms) // bloqueante
randomRouter.get('/api/randoms/no-bloqueante', getRandomsNoBloqueante) // no bloqueante


function getRandoms(req, res) {
  const cant = req.query.cant || 100000000
  const numbers = handleGetRandoms(cant)
  res.json({
    numbers
  })
}

function getRandomsNoBloqueante(req, res) {
  const cant = req.query.cant || 1000000
  const computo = fork(path.resolve(__dirname, 'handleGetRandoms.js'))
  computo.on('message', numbers => {
    if(numbers === 'listo') {
      computo.send(cant)
    } else {
      res.json({numbers})
    }
  })
}

// helpers

function handleGetRandoms(cant) {
  const numbers = {}
  for (let i = 0; i < cant; i++) {
    const tempNum = Math.floor(Math.random() * 999 + 1)
    numbers[tempNum] = numbers[tempNum] ? numbers[tempNum] + 1 : 1
  }
  return numbers
}

export default randomRouter