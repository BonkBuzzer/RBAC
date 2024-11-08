import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import New from "./pages/New";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<New />} />
      </Routes>
    </>
  );
}

export default App;
