import React, { Component } from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../QuizMarvel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuizOver from "../QuizOver";
import { FaChevronRight } from "react-icons/fa";


class Quiz extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      levelNames: ["debutant", "confirme", "expert"],
      quizLevel: 0,
      maxQuestions: 10,
      storedQuestions: [],
      question: null,
      options: [],
      idQuestion: 0,
      btnDisabled: true,
      userAnswer: null,
      score: 0,
      quizEnd: false,
      showWelcomeMsg: false,
    };
    this.state = this.initialState;
    this.storedDataRef = React.createRef();
  }

  loadQuestions = (quizz) => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedArrayQuiz;
      const newArray = fetchedArrayQuiz.map(({ answer, ...rest }) => rest);
      this.setState({ storedQuestions: newArray });
    } else {
      console.log("Pas assez de questions !!!");
    }
  };

  showToastMsg = (pseudo) => {
    if (!this.state.showWelcomeMsg) {
      this.setState({ showWelcomeMsg: true });
      toast(`Bienvenue ${pseudo}, bonne chance !!!`, {
        icon: "🦸‍♂️",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  };

  componentDidMount() {
    this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.storedQuestions !== prevState.storedQuestions &&
      this.state.storedQuestions.length
    ) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
      });
    }
    if (
      this.state.idQuestion !== prevState.idQuestion &&
      this.state.storedQuestions.length
    ) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
        userAnswer: null,
        btnDisabled: true,
      });
    }

    if (this.state.quizEnd !== prevState.quizEnd) {
      const gradePercent = this.getPercent(
        this.state.maxQuestions,
        this.state.score
      );
      this.gameOver(gradePercent);
    }

    if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
      this.showToastMsg(this.props.userData.pseudo);
    }
  }

  submitAnswer = (selectedOption) => {
    this.setState({
      userAnswer: selectedOption,
      btnDisabled: false,
    });
  };

  getPercent = (maxQuest, ourScore) => Math.round((ourScore / maxQuest) * 100);

  gameOver = (gradePercent) => {
    if (gradePercent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent: gradePercent,
      });
    } else {
      this.setState({
        percent: gradePercent,
      });
    }
  };

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      this.setState({
        quizEnd: true,
      });
    } else {
      this.setState((prevState) => ({
        idQuestion: prevState.idQuestion + 1,
      }));
    }
    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
    if (goodAnswer === this.state.userAnswer) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));
      toast.success("+1 Bien joué !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    } else {
      toast.error("Oups, mauvaise réponse...", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  };

  loadLevelQuestions = (param) => {
    this.setState({ ...this.initialState, quizLevel: param });
    this.loadQuestions(this.state.levelNames[param]);
  };

  render() {
    const responses =
      !this.state.isWin &&
      this.state.options.map((option, index) => {
        return (
          <p
            key={index}
            onClick={() => this.submitAnswer(option)}
            className={`answerOptions ${
              this.state.userAnswer === option ? "selected" : null
            }`}
          >
            <FaChevronRight/> {option}
          </p>
        );
      });

    return this.state.quizEnd ? (
      <>
        <ToastContainer />
        <QuizOver
          ref={this.storedDataRef}
          levelNames={this.state.levelNames}
          score={this.state.score}
          maxQuestions={this.state.maxQuestions}
          quizLevel={this.state.quizLevel}
          percent={this.state.percent}
          loadLevelQuestions={this.loadLevelQuestions}
        />
      </>
    ) : (
      <>
        <ToastContainer />
        <Levels
          levelNames={this.state.levelNames}
          quizLevel={this.state.quizLevel}
        />
        <ProgressBar
          questionNumb={this.state.idQuestion + 1}
          maxQuestion={this.state.maxQuestions}
        />
        <h2>{this.state.question}</h2>
        {responses}
        <button
          onClick={this.nextQuestion}
          disabled={this.state.btnDisabled}
          className="btnSubmit"
        >
          {this.state.idQuestion === this.state.maxQuestions - 1
            ? "Terminer"
            : "Suivant"}
        </button>
      </>
    );
  }
}

export default Quiz;
