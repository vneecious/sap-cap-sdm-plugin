module.exports = {
  root: true,
  extends: 'eslint:recommended',
  env: {
    es2022: true,
    node: true,
    jest: true,
  },
  globals: {
    SELECT: true,
    INSERT: true,
    UPSERT: true,
    UPDATE: true,
    DELETE: true,
    CREATE: true,
    DROP: true,
    CDL: true,
    CQL: true,
    CXL: true,
    cds: true,
  },
  rules: {
    'no-console': 'off',
    'no-undef': 'off',
    'require-atomic-updates': 'off',
  },
};
