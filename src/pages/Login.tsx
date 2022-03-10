import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { isUserLoggedIn, saveUser } from "../utils/UserUtils";

export function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const history = useHistory();

  const handleSubmit = (event: any) => {
    const user = { name: username, password: password };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    fetch("http://localhost:9191/v1/user/login", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        saveUser(res);
        history.push("/dashboard");
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      });
    event.preventDefault();
  };

  useEffect(() => {
    const isLoggedIn = isUserLoggedIn();
    if (isLoggedIn) {
      history.push("/dashboard");
    }
  }, [history]);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: 200,
        backgroundSize: "contain",
        backgroundImage: `url('https://thumbs.dreamstime.com/b/abstract-financial-line-graph-bar-chart-stock-numbers-stock-market-gradient-gray-color-background-abstract-114226427.jpg')`,
      }}
    >
      <form onSubmit={handleSubmit}>
        <br />
        <h1>Existing Users</h1>
        <label>Username:</label>
        <input
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <br />
        <label>Password:</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        {error && (
          <p style={{ color: "red" }}>Authentication Error. Please try again</p>
        )}
        <button>Login</button>
        <br />
        <br />
        <Link to="/sign-up">Click here to Create an account</Link>
        <br />
        <br />
        <Link to="/admin">Click here to go to Admin portal</Link>
        <br />
        <br />
      </form>
    </div>
  );
}
