import { useEffect, useState, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useAuthStatus = () => {
	const [loggedIn, setLoggedIn] = useState(false)
	const [checkingStatus, setCheckingStatus] = useState(true)
	const isMounted = useRef(true)

	useEffect(() => {
		const auth = getAuth()
		const unSuscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setLoggedIn(true)
			}
			setCheckingStatus(false)
		})

		return unSuscribe()
	}, [])

	return { loggedIn, checkingStatus }
}
