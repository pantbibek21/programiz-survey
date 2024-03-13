import styles from "./Header.module.scss";

const Header = () => {
	return (
		<header className={styles.header}>
			<h2>Programiz Challenge Survey</h2>
			<p>
				We are conducting a survey to determine if an AI-generated challenge is
				as good as our Pro challenge. Please select the challenge that sounds
				good to you and click next. You will have to select 45 challenge in
				total. In case of any confusion, please reach out to <b>Bibek</b> or{" "}
				<b>Manwi</b>. --
				<i>
					Use of <span style={{ backgroundColor: "greenyellow" }}>monitor</span>{" "}
					is strongly recommended.
				</i>
			</p>
		</header>
	);
};

export default Header;
