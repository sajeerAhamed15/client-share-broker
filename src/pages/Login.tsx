import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { isUserLoggedIn, saveUser } from "../utils/UserUtils";

export function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
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
        history.push("/dashboard")
      })
      .catch((e) => console.log(e));
    event.preventDefault();
  };

  useEffect(() => {
    const isLoggedIn = isUserLoggedIn();
    if (isLoggedIn) {
      history.push("/dashboard")
    }
  }, [ history ])

  return (
    <form onSubmit={handleSubmit}>
      <h1>Existing Users</h1>

      <label>Username:</label>
      <input
        name="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <br/>
      <br/>
      <label>Password:</label>
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br/>
          <br/>
      <button>Login</button>
      <br/>
      <Link to="/sign-up">Click here to Create an account</Link>
    </form>
  );
}
