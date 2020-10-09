export default (object) => {
  if (object && Array.isArray(object)) {
    const arrayWithoutTypeNames = JSON.parse(JSON.stringify(object));
    arrayWithoutTypeNames.forEach((img) => {
      delete img.__typename;
      return img;
    });
    return arrayWithoutTypeNames;
  } else if (object && typeof object === 'object') {
    const objectWithoutTypename = JSON.parse(JSON.stringify(object));
    delete objectWithoutTypename.__typename;
    return objectWithoutTypename;
  } else {
    return null;
  }
};
