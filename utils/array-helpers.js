const coalesce = (values) => values.filter((i) => i)?.[0];

const wrap = (value) => (Array.isArray(value) ? value : [value]);

export { coalesce, wrap };
