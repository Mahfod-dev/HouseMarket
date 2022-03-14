import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth'
import { doc } from 'firebase/firestore'
import { db } from '../Firebase.config'

import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { serverTimestamp, setDoc } from 'firebase/firestore'

const SignUp = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	})
	const { email, password, name } = formData
	const navigate = useNavigate()

	const onChange = (e) => {
		const { name, value } = e.target

		setFormData((prevState) => {
			return { ...prevState, [name]: value }
		})
	}
	const showToogle = () => {
		setShowPassword((prevState) => !prevState)
	}
	const onSubmit = async (e) => {
		e.preventDefault()
		try {
			const auth = getAuth()

			const userCredentitals = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)

			const user = userCredentitals.user

			updateProfile(auth.currentUser, {
				displayName: name,
			})

			const formDataCopy = { ...formData }
			delete formData.password
			formDataCopy.timestamp = serverTimestamp()

			await setDoc(doc(db, 'users', user.uid), formDataCopy)

			navigate('/')
		} catch (error) {
			toast.error('Something went wrong with registration')
		}
	}

	return (
		<>
			<div className='pageContainer'>
				<header>
					<p className='pageHeader'>Welcome Back!</p>
				</header>

				<form onSubmit={onSubmit}>
					<input
						className='nameInput'
						type='text'
						name='name'
						placeholder='Name'
						value={name}
						onChange={onChange}
					/>
					<input
						className='emailInput'
						type='email'
						name='email'
						placeholder='Email'
						value={email}
						onChange={onChange}
					/>
					<div className='passwordInputDiv'>
						<input
							type={showPassword ? 'text' : 'password'}
							className='passwordInput'
							name='password'
							placeholder='Password'
							value={password}
							onChange={onChange}
						/>
						<img
							src={visibilityIcon}
							alt='show password'
							className='showPassword'
							onClick={showToogle}
						/>
					</div>
					<Link to='/forgot-password' className='forgotPasswordLink'>
						Forgot Password
					</Link>
					<div className='signUpBar'>
						<p className='signUpText'>Sign Up</p>
						<button className='signUpButton'>
							<ArrowRightIcon fill='#fff' width='34px' height='34px' />
						</button>
					</div>
				</form>
				{/* Google Auth */}

				<Link className='registerLink' to='/sign-in'>
					Sign In Instead
				</Link>
			</div>
		</>
	)
}

export default SignUp
