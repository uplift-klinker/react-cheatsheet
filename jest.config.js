module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [
        '<rootDir>/testing/setup-tests.ts'
    ],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
        }
    },
    collectCoverage: true,
    coverageDirectory: '.coverage',
    testPathIgnorePatterns: [
        "/node_modules/",
        "/acceptance-tests/"
    ]
}