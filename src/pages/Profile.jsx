import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { getAuth, updateProfile } from 'firebase/auth'
import { db } from '../Firebase.config'
import { updateDoc, doc } from 'firebase/firestore'

const Profile = () => {
	const auth = getAuth()

	const [changeDetails, setChangeDetails] = useState(false)
	const navigate = useNavigate()
	console.log(auth.currentUser)
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	})
	const { name, email } = formData

	const onLogout = () => {
		auth.signOut()
		navigate('/')
	}
	const onSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				await updateProfile(auth.currentUser, {
					displayName: name,
					email,
				})
			}

			const userRef = doc(db, 'users', auth.currentUser.uid)
			await updateDoc(userRef, { name, email })
			toast.success('Profile Updated')
		} catch (error) {
			toast.error('Could not update profile details')
		}
	}
	const onClickDetails = () => {
		changeDetails && onSubmit()
		setChangeDetails((prevState) => !prevState)
	}

	const changeClassDetails = !changeDetails
		? 'profileName'
		: 'profileNameActive'
	const changeClassDetailEmail = !changeDetails
		? 'profileEmail'
		: 'profileEmailActive'

	const onChange = (e) => {
		const { id, value } = e.target
		setFormData((prevState) => {
			return { ...prevState, [id]: value }
		})
	}

	return (
		<div className='profile'>
			<header className='profileHeader'>
				<p className='pageHeader'>My profile</p>
				<button type='button' className='logOut' onClick={onLogout}>
					Logout
				</button>
			</header>
			<main>
				<div className='profileDetailsHeader'>
					<p className='profileDetailsText'>Personal Details</p>
					<p className='changePersonalDetails' onClick={onClickDetails}>
						{changeDetails ? 'done' : 'change'}
					</p>
				</div>
				<div className='profileCard'>
					<form>
						<input
							type='text'
							id='name'
							className={changeClassDetails}
							disabled={!changeDetails}
							value={name}
							onChange={onChange}
						/>
						<input
							type='email'
							id='email'
							className={changeClassDetailEmail}
							disabled={!changeDetails}
							value={email}
							onChange={onChange}
						/>
					</form>
				</div>
			</main>
		</div>
	)
}

export default Profile
