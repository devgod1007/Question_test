import { Link } from "react-router-dom";

//assets
import Delete from "../assets/delete.svg";

const QuestionList = ({ questions, handler }) => {
  const handleDelete = (id) => {
    let list = questions;
    list.splice(id, 1);
    localStorage.setItem('questions', JSON.stringify(list));
    handler();
  };

  return (
    <div className="QuestionList">
      {questions &&
        questions.map((question, index) => (
          <div key={index} className="toDoItem">
            <Link to={`/question/${index}`}>
              <h2>{question.title}</h2>
            </Link>
            <img
              src={Delete}
              alt="delete question"
              className="deleteQuestionButton"
              onClick={() => handleDelete(index)}
            />
          </div>
        ))}
    </div>
  );
};

export default QuestionList;
