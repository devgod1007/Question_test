import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Home from "./pages/Home";
import QuestionPage from "./pages/QuestionPage";

//styles
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/question/:id" element={<QuestionPage/>} />
          <Route path="/question" element={<QuestionPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
