import {ApplicationConfig, importProvidersFrom, InjectionToken} from '@angular/core';
import { provideRouter } from '@angular/router';
import {Firestore} from 'firebase/firestore';
import { routes } from './app.routes';
import {authInterceptor} from "./auth/auth.interceptor";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {AngularFireModule, FIREBASE_OPTIONS} from '@angular/fire/compat';
import {initializeApp} from "firebase/app";
import {connectAuthEmulator, getAuth, provideAuth} from "@angular/fire/auth";
import {connectFirestoreEmulator, getFirestore, initializeFirestore, provideFirestore} from "@angular/fire/firestore";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideFirebaseApp, initializeApp as initializeApp_alias} from "@angular/fire/app";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {environment} from "./environments/environment";
import firebase from 'firebase/compat/app';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';



AngularFireModule.initializeApp(environment.firebaseConfig)

const firebaseConfig = environment.firebaseConfig;



export const AUTH = new InjectionToken('Firebase auth', {
  providedIn: 'root',
  factory: () => {
    const auth = getAuth();
    if (environment.useEmulators) {
      connectAuthEmulator(auth, 'http://localhost:9099', {
        disableWarnings: true,
      });
    }
    return auth;
  },
});




export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(),{ provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
]), provideAnimationsAsync(),
    ]};
