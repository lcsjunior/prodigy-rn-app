import arrayHelper from './array-helper';

const isBlank = (str) =>
  str === null || str === undefined || str.trim().length === 0;

const getInitials = (name, { maxInitials }) => {
  return name
    .split(/\s/)
    .map((part) => part.substring(0, 1).toUpperCase())
    .filter((v) => !!v)
    .slice(0, maxInitials)
    .join('')
    .toUpperCase();
};

const getUserInitiais = (...args) => {
  const name = arrayHelper.coalesce(args);
  return getInitials(name, {
    maxInitials: 2,
  });
};

const stringHelper = {
  isBlank,
  getInitials,
  getUserInitiais,
};

export default stringHelper;
