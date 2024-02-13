/* eslint-disable react/prop-types */
import styles from "./Button.module.scss";

const Button = ({ text, handleNext }) => {
	return (
		<button className={styles.button} onClick={handleNext}>
			{text}
		</button>
	);
};

export default Button;
