export const storageService = {
  query,
  remove,
  post,
  get,
};

function query(entityType) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || [];
  return new Promise((resolve) => resolve(entities));
}

async function remove(entityId, entityType) {
  const entities = await query(entityType);
  const entityIdx = entities.findIndex((entity) => entityId === entity.id);
  entities.splice(entityIdx, 1);
  _save(entityType, entities);
}

async function post(entityType, newEntity) {
  const entity = { ...newEntity };
  const entities = await query(entityType);
  entities.push(entity);
  _save(entityType, entities);
  return newEntity;

  //   const entities = query(entityType);
}

async function get(entityType, entityId) {
  const entities = await query(entityType);
  return entities.find((entity) => entity.id === entityId);
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}
