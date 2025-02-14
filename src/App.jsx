import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Password from "./pages/Password";
import PassPhrase from "./pages/PassPhrase";
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/password" element={<Password />} />
          <Route path="/passphrase" element={<PassPhrase />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
