/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import CHALLENGES_URL from "./ChallengeUrl";
import Button from "./Component/Button/Button";
import ChallengeRow from "./Component/Challenge Row/ChallengeRow";
import Challenge from "./Component/Challenge/Challenge";
import Header from "./Component/Header/Header";
import Submit from "./Component/Submit/Submit";

function App() {
	const [index, setIndex] = useState(0);
	const [selectedChallenge, setSelectedChallenge] = useState(null); // Changed to track only one challenge
	const [challengeValues, setChallengeValues] = useState([]);
	const challenges = CHALLENGES_URL; // Assuming CHALLENGES_URL is defined
	const [isLoading, setIsLoading] = useState(false);

	const handleSelectionChange = (id, isSelected, value) => {
		if (isSelected) {
			setSelectedChallenge(value); // Store the value directly
		} else if (selectedChallenge === value) {
			setSelectedChallenge(null); // Deselect if the same challenge is clicked again
		}
	};

	const handleNext = () => {
		// Add selected challenge value to the challengeValues array if there is one selected
		if (selectedChallenge) {
			setChallengeValues([...challengeValues, selectedChallenge]);
		} else {
			alert("You have to select one challenge. You cannot SKIP🤨!!!!");
			return false;
		}
		setIndex(index + 1);
		setSelectedChallenge(null); // Reset selection
	};

	const submitHandler = (e, name) => {
		e.preventDefault();
		setIsLoading(true);
		sendDataToSheet(name);

		console.log("Congratulations, your data submitted!!");
		console.log("You submitted: " + challengeValues);
		// alert(`${name}, your data submitted succesfully😁!!!`);
		// setTimeout(() => {
		// 	window.location.reload();
		// }, 5000);
	};

	function sendDataToSheet(name) {
		console.log("This is the final json: ");
		// console.log(challengeValues);
		let json = {};
		let valuesArray = [];
		let aiPreference = 0;
		let count = 0;

		let key = "";
		let keyValue = "";

		challengeValues.forEach((value) => {
			[key, keyValue] = value.split("_");
			valuesArray.push(keyValue);
			json[key] = keyValue;
		});

		valuesArray.forEach((value) => {
			if (value == "AI Better") {
				count++;
			}
		});

		aiPreference = ((count / 25) * 100).toFixed(2);
		console.log(count);

		let data = {
			name: name,
			"AI Preference": `${aiPreference}%`,
			...json,
		};

		// json["name"] = name;
		// json["aiPreference"] = `${aiPreference}%`;

		let finalJSON = [data];

		console.log(finalJSON);
		fetch(
			"https://script.google.com/macros/s/AKfycbzIQJyDSubeUhXHj5sFORdWQJYtzERfiBG6-9AzGJK-kHiqurnSNvPd9fb4qm-w-iQ/exec",
			{
				mode: "no-cors",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(finalJSON),
			}
		)
			.then((response) => response.text())
			.then((data) => {
				alert(`${name}, your data submitted succesfully😁!!!`);
				setIsLoading(false);
			})
			.catch((error) => console.error("Error: ", error));
	}

	return (
		<>
			<Header />
			{index <= 24 && (
				<ChallengeRow>
					{challenges[index].challenge.map((challenge) => (
						<Challenge
							key={challenge.id}
							id={challenge.id}
							value={challenge.value}
							imgSrc={challenge.src}
							onSelectionChange={handleSelectionChange}
							isSelected={selectedChallenge === challenge.value}
						/>
					))}
				</ChallengeRow>
			)}

			{index <= 24 && <Button text="Next" handleNext={handleNext} />}

			{index == 25 && <Submit submitHandler={submitHandler} />}

			{isLoading && (
				<img
					src="https://i.stack.imgur.com/AuqJU.gif"
					alt="Progress Icon"
					id="progressIcon"
				/>
			)}
		</>
	);
}

export default App;
