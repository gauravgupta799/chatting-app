import React, {useState} from 'react';
import "../styles/loginForm.css";
import axios from 'axios';

const projectID ="2c4f92e8-ebeb-4d78-b0ce-c7be37114868";
const url = "https://api.chatengine.io/chats";

function LoginForm() {
  const [user, setUser] = useState({
    username:"",
    password:"",
  });
  const [error, setError] = useState("");
  
  const {username , password} = user;

  // handleChange Function
  const handleChange = async (e) => {
    const {name , value} = e.target;
    setUser((prevValue)=>({
      ...prevValue,
      [name]:value
    }));

    const authObject = {
      "Project-ID":projectID,
      "User-Name":username,
      "User-Secret":password
    }
    try {
      await axios.get(url, {
        headers:authObject
      });
      localStorage.setItem("username", user);
      window.location.reload();
      setError("");
    }catch (error) {
      setError("Oops!, incorrect credentials")
    }
  }
  // handleSubmit Function
  const handleSubmit =(e) => {
    e.preventDefault();
  }
  return (
    <div className="loginForm-wrapper">
      <div className="form-container">
        <h1 className="title">Chat Application</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="username"
                className='input-field'
                placeholder='Username'
                value={username}
                onChange={handleChange}
                required
            />
          </div>
          <div className="form-group">
            <input type="password" name="password"
                className='input-field'
                placeholder='Password'
                value={password}
                onChange={handleChange}
                required
            />
          </div>
          <div className="form-group center">
            <button className="button">
              <span>StartCahtting</span>
            </button>
          </div>
        </form>
        <h1>{error}</h1>
      </div>
    </div>
  )
}

export default LoginForm;
