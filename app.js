const utils = require('./utils');

//import data
const initialData = require('./data.json');

//ensure valid data is provided
if (!initialData || !initialData.cities || !initialData.paths) {
  console.error("Invalid Data.");
  process.exit();
}

//build datamodel
const model = {};
//index cities
model.cities = {}
for (var i = 0; i < initialData.cities.length; ++i) {
  const currentCity = initialData.cities[i];
  model.cities[currentCity.id] = {
    paths: [],
    ...currentCity
  };
}
//index paths
model.paths = {};
for (var i = 0; i < initialData.paths.length; ++i) {
  const currentPath = initialData.paths[i];
  model.paths[currentPath.id] = {
    ...currentPath
  }
  const cityA = model.cities[currentPath.a];
  if (cityA && cityA.paths) {
    cityA.paths.push(currentPath)
  }
  const cityB = model.cities[currentPath.b];
  if (cityB && cityB.paths) {
    cityB.paths.push(currentPath)
  }
}

//find city by name or id
function lookupCity(id) {
  return typeof (id) === "string" ?
    utils.find(model.cities, c => c.name.toLowerCase() === id.toLowerCase()) :
    model.cities[id];
}

//create recursive loop
function loop(city, predicate, distance = 0) {
  //iterate through paths
  for (var i = 0; i < city.paths.length; ++i) {
    const path = city.paths[i];
    //lookup desination city
    const destinationId = (path.a) !== city.id ? path.a : path.b;
    const destination = model.cities[destinationId];
    if (!destination) continue;
    //recurse
    if (predicate(path, city, destination, distance + 1)) {
      loop(destination, predicate, distance + 1);
    }
  }
}

function getCitiesInRange(originId, maxSteps) {
  //find root city
  let origin = lookupCity(originId);
  if (!origin) return [];
  //
  const results = {};
  //run loop
  loop(origin, (path, from, to, distance) => {
    //end after max steps
    if (distance > maxSteps) return false;
    //ignore repeat cities
    if (results[to.id]) return false;
    //dont allow origin
    if (to === origin) return false;
    //add destination to results
    results[to.id] = to;
    //allow recursion
    return true;
  });
  //return list of cities
  return Object.values(results);
}

function isNavigable(originId, targetId) {
  //find cities
  let origin = lookupCity(originId);
  if (!origin) return false;
  let target = lookupCity(targetId);
  if (!target) return false;
  const isLoop = origin === target;
  //
  const checkedPaths = {};
  var result = false;
  //run loop
  loop(origin, (path, from, to, distance) => {
    //stop if result is found
    if (result)
      return false;
    //ignore repeat path
    if (checkedPaths[path.id])
      return false;
    checkedPaths[path.id] = true;
    //
    if (to === target) {
      result = true;
      return false;
    }
    //allow recursion
    return true;
  });
  //return city
  return result;
}

module.exports = {
  getCitiesInRange,
  isNavigable
}