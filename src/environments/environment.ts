// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    databaseURL: '<your-database-URL>',
    measurementId: '<your-measurement-id>',
    apiKey: 'AIzaSyDJTu3As6Ce5QjpL_jIk8P1zgltsYEKiWI',
    authDomain: 'cell-editor.firebaseapp.com',
    projectId: 'cell-editor',
    storageBucket: 'cell-editor.appspot.com',
    messagingSenderId: '741229528151',
    appId: '1:741229528151:web:8bf3c6ce8ccec8c8bf8f12',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
