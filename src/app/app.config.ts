import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
} from '@angular/router';

import { environment } from '@/environments/environment';
import { provideHttpClient } from '@angular/common/http';
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
    provideRouter(
      routes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: environment.firebase.projectId,
          appId: environment.firebase.appId,
          storageBucket: environment.firebase.storageBucket,
          apiKey: environment.firebase.apiKey,
          authDomain: environment.firebase.authDomain,
          messagingSenderId: environment.firebase.messagingSenderId,
          measurementId: environment.firebase.measurementId,
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
