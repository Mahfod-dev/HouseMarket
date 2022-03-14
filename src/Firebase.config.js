// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyDvxerCBKma6Mx2B5efCKaD6oCP4G8MvZM',
	authDomain: 'house-marketplace-c0e14.firebaseapp.com',
	projectId: 'house-marketplace-c0e14',
	storageBucket: 'house-marketplace-c0e14.appspot.com',
	messagingSenderId: '801403311963',
	appId: '1:801403311963:web:cdb9101f133818bc4a2c7e',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore()
