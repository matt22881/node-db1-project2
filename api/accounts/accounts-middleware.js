const Accounts = require('./accounts-model')
exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
//   req.body.name = req.body.name.trim() || req.body.name
//   let { name, budget } = req.body;
//   if (!name || !budget || name.length === 0) {
//     res.status(400).json({message: 'name and budget are required'})
//   } else {
//     if (typeof(name) === 'string' && typeof(budget) === 'number'){
//       name = name.trim()
//       if (name.length >=3 && name.length <=100){
//         req.body.name = name
//         if (isNaN(budget)){
//           res.status(400).json({ message: 'budget of account must be a number' })
//         } else if (budget < 0 || budget > 1000000){
//           res.status(400).json({ message: 'budget of account is too large or too small' })
//         } else next()
//       } else {
//         res.status(400).json({ message: 'name of account must be between 3 and 100' })
//       }
//     } else {res.status(400).json({message: 'name of account must be a string'})}
//   }

  let { name, budget } = req.body
  //? is budget number
  // console.log(`typeof(budget): ${typeof(budget)}`)
  if (typeof(budget) !== 'number'){
    res.status(400).json({ message: 'budget of account must be a number' })
  } else {    
//* Check name and budget defined
if (!name || !budget){
  res.status(400).json({message: 'name and budget are required'})
} else {
  //* Check Name
  //*Check Budget
  //? Is name String
  // console.log(`typeof(name): ${typeof(name)}`)
  if (typeof(name) !== 'string'){
    res.status(400).json({message: 'name of account must be a string'})
  } else {
    //*Trim
    name = name.trim()
    //? Is name Length Right
    if (name.length <3 || name.length > 100){
      res.status(400).json({ message: 'name of account must be between 3 and 100' })
    } else req.body.name = name
  }
//?is budget negative or too big
    if (budget < 0 || budget > 1000000){
      res.status(400).json({ message: 'budget of account is too large or too small' })
    }else {
      next()
    }
}}}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll()
  .then(accounts => {
    // console.log('accounts: ', accounts)
    const account = accounts.filter(account => account.name === req.body.name)
    if (account.length !== 0){
      res.status(400).json({message: 'that name is taken'})
      const foundname = accounts.filter(account => {
        account.name === req.body.name
      })
    } else next()
    })
    .catch(e => next(e)) 
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getById(req.params.id)
    .then(account => {
      if (account) {
        next();
      } else res.status(404).json({ message: "account not found" })
    })
    .catch(e => next(e))
}
