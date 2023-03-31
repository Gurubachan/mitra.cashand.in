/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // uri: "http://127.0.0.1:8000/api/",
  // uri: "https://sandbox.evableindia.com/api/",
  uri: 'https://api.cashand.in/api/',
  aeps: 'https://aeps.evableindia.com/api/v1/',
  loan: 'https://loans.cashand.in/api/v1/',
};
