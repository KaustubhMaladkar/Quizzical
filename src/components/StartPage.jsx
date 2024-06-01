import "./StartPage.css";
import PropTypes from "prop-types";

export default function StartPage({ handleClick }) {
    return (
        <div className="wrapper">
            <div className="child">
                <h1>Quizzical</h1>
                <h2>Test your knowledge!</h2>
                <button onClick={handleClick}>Start Quiz</button>
            </div>
        </div>
    );
}

StartPage.propTypes = {
    handleClick: PropTypes.func.isRequired,
};
