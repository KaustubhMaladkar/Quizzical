import "./Question.css";
import PropTypes from "prop-types";
import { useId, useState, useEffect } from "react";

export default function Question({ trivia, qNo, handleChange, submit, count }) {
    const id = useId();

    function decodeHTMLEntities(text) {
        const parser = new DOMParser();
        const DOM = parser.parseFromString(
            `<!doctype html><body>${text}`,
            "text/html"
        );
        return DOM.body.textContent;
    }

    function shuffleAnswers() {
        const answers = incorrectAnswers.concat(correctAnswer);
        let triviaNumber = answers.length;
        while (triviaNumber != 0) {
            let randomIndex = Math.floor(Math.random() * triviaNumber);
            triviaNumber--;
            [answers[triviaNumber], answers[randomIndex]] = [
                answers[randomIndex],
                answers[triviaNumber],
            ];
        }
        return answers;
    }

    const incorrectAnswers = trivia.incorrect_answers.map((answer) => ({
        answer,
        correct: false,
    }));
    const correctAnswer = {
        answer: trivia.correct_answer,
        correct: true,
    };

    const [allAnswers, setAllAnswers] = useState(shuffleAnswers());
    useEffect(() => setAllAnswers(shuffleAnswers()), [count]);

    const answerElements = allAnswers.map((item, index) => (
        <div
            className={item.correct ? "correct answer" : "answer"}
            key={index}
            data-correct={item.correct && true}
        >
            {submit ? (
                <input
                    type="radio"
                    name={`question${qNo}`}
                    id={item.answer + id}
                    disabled
                    value={decodeHTMLEntities(item.answer)}
                    onChange={(event) => handleChange(event.target)}
                />
            ) : (
                <input
                    type="radio"
                    name={`question${qNo}`}
                    id={item.answer + id}
                    value={decodeHTMLEntities(item.answer)}
                    onChange={(event) => handleChange(event.target)}
                />
            )}
            <label htmlFor={item.answer + id}>
                {decodeHTMLEntities(item.answer)}
            </label>
        </div>
    ));
    return (
        <fieldset>
            <legend>{decodeHTMLEntities(trivia.question)}</legend>
            <div className="answers">{answerElements}</div>
        </fieldset>
    );
}

Question.propTypes = {
    trivia: PropTypes.shape({
        question: PropTypes.string.isRequired,
        incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
        correct_answer: PropTypes.string.isRequired,
    }).isRequired,
    qNo: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    submit: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
};
