import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

const SignIn = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const { email, password } = formData
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

			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			)

			if (userCredential.user) {
				navigate('/')
			}
		} catch (error) {
			toast.error('Bad User Credentials')
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
						className='emailInput'
						type='email'
						name='email'
						placeholder='Email'
						id='email'
						value={email}
						onChange={onChange}
					/>
					<div className='passwordInputDiv'>
						<input
							type={showPassword ? 'text' : 'password'}
							className='passwordInput'
							name='password'
							placeholder='Password'
							id='password'
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
					<div className='signInBar'>
						<p className='signInText'>Sign In</p>
						<button className='signInButton'>
							<ArrowRightIcon fill='#fff' width='34px' height='34px' />
						</button>
					</div>
				</form>
				{/* Google Auth */}

				<Link className='registerLink' to='/sign-up'>
					Sign Up Instead
				</Link>
			</div>
		</>
	)
}

export default SignIn
