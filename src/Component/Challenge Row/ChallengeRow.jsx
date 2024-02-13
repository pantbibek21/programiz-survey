/* eslint-disable react/prop-types */
import styles from "./ChallengeRow.module.scss";

const ChallengeRow = ({ children }) => {
	return <div className={styles.challengeRow}>{children}</div>;
};

export default ChallengeRow;
