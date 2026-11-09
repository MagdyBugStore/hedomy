import { getApp, getApps, initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";

export const googleEnabled = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

function app() {
  return getApps().length ? getApp() : initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });
}

/** Opens the Google popup and returns a Firebase ID token for the server to verify. */
export async function googleIdToken(): Promise<string> {
  const auth = getAuth(app());
  const cred = await signInWithPopup(auth, new GoogleAuthProvider());
  const token = await cred.user.getIdToken();
  await signOut(auth); // our own cookie is the session; keep no Firebase state in the browser
  return token;
}
