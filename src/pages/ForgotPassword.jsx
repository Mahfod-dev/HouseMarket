import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'

const ForgotPassword = () => {
	const [email, setEmail] = useState('')

	const onChange = (e) => {}

	const onSubmit = (e) => {
		e.preventDefault()
	}

	return (
		<div className='pageContainer'>
			<header>
				<p className='pageHeader'>Forgot password</p>
			</header>

			<main>
				<form onSubmit={onSubmit}>
					<input
						type='email'
						className='emailInput'
						id='email'
						value={email}
						onChange={onChange}
					/>
				</form>
        <Link className='forgotPasswordLink' to='/sign-in'></Link>
			</main>
		</div>
	)
}

export default ForgotPassword
