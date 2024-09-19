const lintConfig = {
  '**/*.ts?(x)': () => ['pnpm lint:fix', 'pnpm lint:tsc'],
};

export default lintConfig;
