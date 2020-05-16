import React, { useContext, useState } from 'react';
import { doChangeName } from '../firebase/FirebaseFunctions';
import '../App.css';

function ChangeName() {
	const submitForm = async (e) => {
		e.preventDefault();
		const {
			newName,
			currentPassword
		} = e.target.elements;

		try {
			await doChangeName(
				newName.value,
				currentPassword.value
			);
			alert('Name has been changed');
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
						New Name:
						<input
							className="form-control"
							name="newName"
							id="newName"
							type="text"
							placeholder="New Name"
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
				<button type="submit">Change Name</button>
			</form>
			<br />
		</div>
	);
}

export default ChangeName;
