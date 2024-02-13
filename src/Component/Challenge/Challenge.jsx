/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styles from "./Challenge.module.scss";

const Challenge = ({ id, value, imgSrc, onSelectionChange, isSelected }) => {
	const handleChange = (event) => {
		onSelectionChange(id, event.target.checked, value);
	};

	return (
		<div className={styles.challenge}>
			<input
				type="radio"
				value={value}
				id={id}
				name="selectedChallenge"
				checked={isSelected}
				onChange={handleChange}
			/>
			<label htmlFor={id}>
				<div className={styles.challengeDescription}>
					<img src={imgSrc} alt="Challenge not found" />
				</div>
			</label>
		</div>
	);
};
export default Challenge;
