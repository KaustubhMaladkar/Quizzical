import "./Submit.css";
import PropTypes from "prop-types";

export default function Submit({ submit, score, playAgain }) {
    return (
        <div className="submit-wrapper">
            {submit && (
                <p className="score">
                    You scored <span>{score}</span> correct answer
                    {score > 1 && "s"}!
                </p>
            )}
            <button
                className={submit ? "playAgain" : "submit"}
                onClick={submit ? (event) => playAgain(event) : null}
                type={submit ? "reset" : "submit"}
            >
                {submit ? "Play again!" : "Check answers!"}
            </button>
        </div>
    );
}

Submit.propTypes = {
    submit: PropTypes.bool.isRequired,
    score: PropTypes.number.isRequired,
    playAgain: PropTypes.func.isRequired,
};
