/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Submit.module.scss";

const Submit = ({ submitHandler }) => {
	const [name, setName] = useState("");

	function formSubmitHandler(e) {
		submitHandler(e, name);
	}

	return (
		<div className={styles.submitWrapper}>
			<h2>Enter you name and Submit : &#41;</h2>

			<form onSubmit={formSubmitHandler}>
				<input
					type="text"
					autoComplete="off"
					autoCorrect="off"
					required
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input type="submit" />
			</form>
		</div>
	);
};

export default Submit;
