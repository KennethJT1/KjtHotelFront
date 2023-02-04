import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { HomeScreen } from "./screens/Homescreen";
import { BookingScreen } from "./screens/BookingScreen";
import { Register } from "./screens/Register";
import { Login } from "./screens/Login";
import { Profile } from "./screens/Profile";
import { Admin } from "./screens/Admin";
import { LandingPage } from "./screens/LandingPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" exact element={<HomeScreen />} />
          <Route
            path="/book/:roomid/:fromdate/:todate"
            exact
            element={<BookingScreen />}
          />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/admin" exact element={<Admin />} />
          <Route path="/" exact element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
