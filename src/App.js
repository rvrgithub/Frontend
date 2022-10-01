import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Chat } from "./pages/Chat";
import { SetProfile } from "./Components/SetProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setProfile" element={<SetProfile />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
