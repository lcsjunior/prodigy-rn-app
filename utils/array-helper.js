const coalesce = (values) => values.filter((i) => i)?.[0];

const arrayHelper = {
  coalesce,
};

export default arrayHelper;
