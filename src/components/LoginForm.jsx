import React, {useState, useRef} from 'react';
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
  const inputRef1 = useRef();
  const inputRef2 = useRef();

  const handleFocus = (inputRef) =>{
    inputRef.current.placeholder =""
  }
  const handleBlur = (inputRef, placeholderText) => {
    inputRef.current.placeholder = placeholderText;
  };

  // handleChange Function
  const handleChange = (e) => {
    const {name , value} = e.target;
    setUser((prevValue)=>({
      ...prevValue,
      [name]:value
    }));
  }
  // handleSubmit Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const authObject = {
      "Project-ID":projectID,
      "User-Name":username,
      "User-Secret":password
    }
    try {
      await axios.get(url, { headers:authObject });
      localStorage.setItem("user", JSON.stringify(user));
      window.location.reload();
      setError("");
    }catch (error) {
      setError("Oops!, incorrect credentials")
    }
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
                ref={inputRef1}
                onFocus={()=>handleFocus(inputRef1)}
                onBlur={() => handleBlur(inputRef1, 'Username')}
                required
            />
          </div>
          <div className="form-group">
            <input type="password" name="password"
                className='input-field'
                placeholder='Password'
                value={password}
                onChange={handleChange}
                ref={inputRef2}
                onFocus={()=>handleFocus(inputRef2)}
                onBlur={() => handleBlur(inputRef2, 'Password')}
                required
            />
          </div>
          <div className="btn-wrapper center">
            <button className="button">
              <span>Start Chatting</span>
            </button>
          </div>
        </form>
        <h1>{error}</h1>
      </div>
    </div>
  )
}

export default LoginForm;
