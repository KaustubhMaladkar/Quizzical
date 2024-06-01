import StartPage from "./components/StartPage";
import Question from "./components/Question";
import Submit from "./components/Submit";
import Loader from "./components/Loader";

import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
    const initialFormData = {
        question0: { value: "", correct: false },
        question1: { value: "", correct: false },
        question2: { value: "", correct: false },
        question3: { value: "", correct: false },
        question4: { value: "", correct: false },
    };

    const [count, setCount] = useState(0);
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState(initialFormData);
    const [submit, setSubmit] = useState(false);

    const API = "https://opentdb.com/api.php?amount=5&type=multiple";

    function handleChange(event) {
        setFormData((prev) => ({
            ...prev,
            [event.name]: {
                ...formData[event.name],
                correct: [...event.parentElement.classList].includes("correct")
                    ? true
                    : false,
                value: [event.value],
            },
        }));
    }

    function playAgain(event) {
        setFormData(initialFormData);
        event.preventDefault();
        setLoading(true);
        setSubmit(false);
        setCount((prev) => prev + 1);
    }

    const [score, setScore] = useState(0);
    function handleSubmit(event) {
        event.preventDefault();
        setSubmit(true);
        setScore(
            Object.entries(formData).filter(
                ([key, value]) => value.correct === true
            ).length
        );
    }

    useEffect(() => {
        if (!count) return;
        async function fetchData() {
            try {
                const response = await fetch(API);
                if (!response.ok)
                    throw new Error("Network response was not ok");
                const result = await response.json();
                setData(result.results);
                setLoading(false);
            } catch (error) {
                setLoading(true);
            }
        }
        fetchData();
    }, [count]);

    const trivia =
        data &&
        data.map((item, index) => (
            <Question
                trivia={item}
                key={index}
                qNo={index}
                submit={submit}
                handleChange={handleChange}
            />
        ));

    return (
        <>
            {!count && (
                <StartPage handleClick={() => setCount((prev) => prev + 1)} />
            )}
            {loading && <Loader />}
            {count && !loading && (
                <div>
                    <form onSubmit={(event) => handleSubmit(event)}>
                        {trivia}
                        <Submit
                            score={score}
                            playAgain={playAgain}
                            submit={submit}
                            count={count}
                        />
                    </form>
                </div>
            )}
        </>
    );
}
