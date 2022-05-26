import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginScreen from "./components/Auth/LoginScreen";
import CalendarScreen from "./components/Calendar/CalendarScreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CalendarScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
