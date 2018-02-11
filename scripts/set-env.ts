import { writeFile } from 'fs';
import { argv } from 'yargs';

const environment = argv.environment;
const clarksonUrl = argv.url;
const enableRegistrations = argv.enableRegistrations;

const isProd = environment === 'prod';

const targetPath = `./src/environments/environment.${environment}.ts`;
const envConfigFile = `export const environment = {
    production: ${isProd},
    apiBaseUrl: '${clarksonUrl}/api',
    enableRegistrations: ${enableRegistrations}
};
`;

writeFile(targetPath, envConfigFile, function(err) {

    if (err) {
        console.log(err);
    }

    console.log(`Output generated at ${targetPath}`);
});
