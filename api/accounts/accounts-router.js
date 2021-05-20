const router = require('express').Router()
const Accounts = require('./accounts-model')
const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll()
    .then(accounts => {
      res.json(accounts)
    })
    .catch(e => next(e))
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getById(req.params.id)
    .then(account => {
      res.json(account)
    })
    .catch(e => next(e))
})

router.post('/', checkAccountNameUnique, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.create(req.body)
    .then(resp => {
      res.status(201).json(resp)
    })
    .catch(e => next(e))
})


router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.updateById(req.params.id, req.body)
    .then(resp => {
      res.json(resp)
    })
    .catch(e => next(e))
})


router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.deleteById(req.params.id)
    .then(resp => {
      res.json(resp)
    })
    .catch(e => next(e))
})

router.use((err, req, res, next) => { 
  // DO YOUR MAGIC
  res.status(500).json({ message: err.message, stack: err.stack })
})
module.exports = router
