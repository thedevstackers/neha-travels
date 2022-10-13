import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header"
import Footer from "./layout/Footer"
import Home from "./pages/Home";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";
import GroupFare from "./pages/GroupFare";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="groupfare" element={<GroupFare />} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
