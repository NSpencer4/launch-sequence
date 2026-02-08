// @ts-check
const config = {
  // Source patterns for package.json files
  source: ['package.json', 'packages/*/package.json'],

  // Version groups to ensure alignment
  versionGroups: [
    {
      label: 'Ignore peer dependencies (intentionally flexible)',
      dependencyTypes: ['peer'],
      isIgnored: true,
    },
    {
      label: 'Use workspace protocol for internal packages',
      dependencies: ['@metra-labs/*'],
      dependencyTypes: ['prod', 'dev'],
      pinVersion: 'workspace:*',
    },
    {
      label: 'AWS SDK packages should be aligned',
      dependencies: ['@aws-sdk/*'],
      policy: 'sameRange',
    },
    {
      label: 'TypeScript and related tools',
      dependencies: ['typescript', 'typescript-eslint', '@typescript-eslint/*'],
      policy: 'sameRange',
    },
    {
      label: 'ESLint ecosystem',
      dependencies: ['eslint', 'eslint-*', '@eslint/*'],
      policy: 'sameRange',
    },
  ],

  // Semver groups for consistent versioning
  semverGroups: [
    {
      label: 'Use caret ranges by default',
      range: '^',
      dependencies: ['**'],
      packages: ['**'],
    },
  ],

  // Sort package.json fields
  sortFirst: [
    'name',
    'version',
    'description',
    'type',
    'license',
    'repository',
    'publishConfig',
    'main',
    'types',
    'files',
    'exports',
    'scripts',
    'dependencies',
    'devDependencies',
    'peerDependencies',
  ],
}

export default config
