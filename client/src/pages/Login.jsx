import { useState } from "react";
import axios from "axios";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/features/userSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [empUsername, setEmpUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.29.104:3000/login",
        {
          empUsername,
          password,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      dispatch(
        setUser({
          empUsername,
          menuItems: response.data.menuItems,
          refreshToken: response.data.refreshToken,
        })
      );
      setEmpUsername("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
      console.log("Error fetching data:", error);
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-600 flex justify-center items-center">
        <div className="w-96 bg-slate-500/20 border border-blue-300 p-6 rounded-lg">
          {/* <form action="post" onSubmit={handleLogin}> */}
          <div className="space-y-4">
            <input
              type="text"
              name="empUsername"
              id="empUsername"
              placeholder="Username"
              required
              className="w-full px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={empUsername}
              onChange={(e) => {
                setEmpUsername(e.target.value);
                setError("");
              }}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              required
              className="w-full px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                setError("");
                setPassword(e.target.value);
              }}
            />
            <span
              hidden={error === ""}
              className="text-red-500 flex justify-center"
            >
              {error}
            </span>
            <button
              onClick={handleLogin}
              type="submit"
              className="w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-700 transition duration-200"
            >
              Login
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </>
  );
}

export default Login;
