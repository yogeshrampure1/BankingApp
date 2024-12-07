import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <button onClick={() => handleClick()}>Go to dashboard</button>
    </div>
  );
};

export default Login;
