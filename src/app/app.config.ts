import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  ScreenTrackingService,
  UserTrackingService,
  getAnalytics,
  provideAnalytics,
} from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'coinsaver-7c342',
          appId: '1:975051839716:web:9d79fe7f3d5ec36dc374f1',
          storageBucket: 'coinsaver-7c342.appspot.com',
          apiKey: 'AIzaSyACh5SvzxfHAjF_aH1haQ8e0zuAt7gjfDo',
          authDomain: 'coinsaver-7c342.firebaseapp.com',
          messagingSenderId: '975051839716',
          measurementId: 'G-FF0YFNLSN2',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideAnalytics(() => getAnalytics())),
    ScreenTrackingService,
    UserTrackingService,
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
