import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//components
import QuestionList from "../components/QuestionList";

//assets
import Add from "../assets/add.svg";

const Home = () => {
  const [allQuestions, setAllQuestions] = useState(null);
  
  const refresh = () => {
    setAllQuestions(JSON.parse(localStorage.getItem('questions')));
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="Home">
      <h1>Questions</h1>
      <h2 className="subtitle">
        <Link to={`/question`} title="Add Question">
          <img src={Add} alt="addButton" className="addButtonImage" />
        </Link>
        Add new question
      </h2>
      <QuestionList questions={allQuestions} handler={refresh}/>
    </div>
  );
};

export default Home;
