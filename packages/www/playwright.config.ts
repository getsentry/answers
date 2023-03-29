import { PlaywrightTestConfig } from '@playwright/test';
const config: PlaywrightTestConfig = {
    use: {
        headless: !!process.env.CI,
        baseURL: 'http://dev.getsentry.net:4000'
    },
    testDir: 'tests/acceptance',
    webServer: {
        command: 'yarn serve --port 4000',
        port: 4000,
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
    },
};
export default config;
