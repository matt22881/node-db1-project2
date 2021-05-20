const db = require('./../../data/db-config')
const getAll = async () => {
  // DO YOUR MAGIC
  return db('accounts')
}

const getById = async id => {
  // DO YOUR MAGIC
  return db('accounts').where({ id }).first()
}

const create = async account => {
  // DO YOUR MAGIC
  const [id] = await db('accounts').insert(account)
  return db('accounts').where({ id }).first()
}

const updateById = async (id, { name, budget }) => {
  // DO YOUR MAGIC
  await db('accounts').where({ id }).update({ name, budget })
  return db('accounts').where({ id }).first()
}

const deleteById = async id => {
  // DO YOUR MAGIC
  const toBeDeleted = await getById(id);

  await db('accounts').where('id', id).delete();

  return toBeDeleted;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
