import React, { useContext, useState } from 'react';
import { doChangeEmail } from '../firebase/FirebaseFunctions';
import '../App.css';

function ChangeEmail() {
	const submitForm = async (e) => {
		e.preventDefault();
		const {
			newEmail,
			currentPassword
		} = e.target.elements;

		try {
			await doChangeEmail(
				newEmail.value,
				currentPassword.value
			);
			alert('Email has been changed');
		} catch (error) {
			alert(error);
		}
	};
	return (
		<div>
			<h3>Change Name</h3>
			<form onSubmit={submitForm}>
				<div className="form-group">
					<label>
						New Email:
						<input
							className="form-control"
							name="newEmail"
							id="newEmail"
							type="email"
							placeholder="New Email"
							required
						/>
					</label>
				</div>
				<div className="form-group">
					<label>
						Current Password:
						<input
							className="form-control"
							name="currentPassword"
							id="currentPassword"
							type="password"
							placeholder="Current Password"
							required
						/>
					</label>
				</div>
				<button type="submit">Change Email</button>
			</form>
			<br />
		</div>
	);
}

export default ChangeEmail;
