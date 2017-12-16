// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiURL: 'http://localhost:3001',
  mapGoogle: 'https://www.google.com/maps/embed/v1/search?key=AIzaSyB2pWEO7SWqwRCMbE9sMJcSzN8jSLH_YjY&q='
  //apiURL: 'http://172.17.19.240:3001'
};
