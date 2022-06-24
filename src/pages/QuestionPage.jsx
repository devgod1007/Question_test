import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';

//assets
import Delete from "../assets/delete.svg";

const QuestionPage = () => {
  const { id } = useParams();
  let questions = [];
  questions = JSON.parse(localStorage.getItem('questions'));
  const [questionID, setQuestionID] = useState(0);
  const [questionTitle, setQuestionTitle] = useState("");
  const [options, setOptions] = useState(['']);
  const [opError, setOptionError] = useState(false);

  const handleSubmit = async (e) => {
    if(questionTitle !== "") {
      questions[questionID] = {'title': '', 'options': []};
      questions[questionID].title = questionTitle;
      questions[questionID].options = [...options];
      localStorage.setItem('questions', JSON.stringify(questions));
    } else {
      e.preventDefault();
    }
  };

  const changedOption = function(index, value) {
    let newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    if(questions[questionID] != null) {
      questions[questionID].title = questionTitle;
    } else {
      questions[questionID] = {'title': questionTitle, 'options': options};
    }
  };

  const addOption = function() {
    if(options.length >= 6) {
      setOptionError(true);
      return;
    }
    let newOptions = [...options, ''];
    setOptions(newOptions);
  };

  const handleDelete = (id) => {
    let newOptions = [...options];
    newOptions.splice(id, 1);
    setOptions(newOptions);
    setOptionError(false);
  };
  
  useEffect(() => {
    if(id == null) {
      setQuestionID(questions.length);
    } else {
      setQuestionID(parseInt(id));
    }
    if(id != null) {
      setOptions(questions[parseInt(id)].options);
      setQuestionTitle(questions[parseInt(id)].title);
    } else {
      setOptions(['']);
      setQuestionTitle('');
    }
  }, []);

  return (
    <div className="questionPage">
      <Row className="fade-in-left">
        <Col>
          {!id && <h2 className="questionPageTitle">Add Question</h2>}
          {id && <h2 className="questionPageTitle">Edit Question</h2>}
        </Col>
      </Row>
      <Row className="fade-in-left">
        <Col>
          <Link className="cancelButton" to="/">
            Cancel
          </Link>
          <Link className="saveButton" to="/" onClick={handleSubmit}>
            Save
          </Link>
        </Col>
      </Row>
      <Row className="contentWrapper fade-in-right">
        <p className="questionPageDate">Question Title <span>*</span></p>
      </Row>
      <Row className="field fade-in-right">
        <input
          type="text"
          placeholder="Enter Question Title"
          value={questionTitle}
          onChange={(e) => {
              setQuestionTitle(e.target.value);
            }
          }
          maxLength="55"
        />
        <Row className="line"></Row>
      </Row>
      <Row className="contentWrapper fade-in-right">
        <Row className="title">
          <p className="titleError">Required (max 55 characters)</p>
        </Row>
      </Row>
      <Row className="contentWrapper fade-in-right">
        <p className="questionPageDate">Options</p>
      </Row>
      <Row className="fade-in-right">
        { 
          options.map((option, index) => (
            <Row key={index} className="optionWrapper">
              <Row className="field">
                <input
                  className="optionInput"
                  type="text"
                  value={option}
                  placeholder={"Option " + (index + 1)}
                  onChange={(e) => changedOption(index, e.target.value)}
                />
                <Row className="line"></Row>
                <img
                  src={Delete}
                  alt="delete question"
                  className="deleteOptionButton"
                  onClick={() => handleDelete(index)}
                />
              </Row>
            </Row>
          ))
        }
      </Row>
      <Row className="newOption fade-in-right">
        <Link to="" className="optionLink" onClick={addOption}>
          + Add New Option
        </Link>
        { opError && 
        (
          <Row>
            <p className="optionError">(max 6 options allowed)</p>
          </Row>
        )}
      </Row>
    </div>
  );
};

export default QuestionPage;
