import './App.css';
import {ChatEngine} from "react-chat-engine";
import ChatFeed from "./components/ChatFeed";
import Loginform from "./components/LoginForm";

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  if(!user){
    return <Loginform/>
  }
  return (
    <div className="App">
    <ChatEngine
      height="100vh"
      projectID="2c4f92e8-ebeb-4d78-b0ce-c7be37114868"
      userName="admin"
      userSecret="admin#123"
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps}/>}
      onNewMessage={()=> new Audio("https://chat-engine-assets.s3.amazonaws.com/click.mp3")}
    />
  
    </div>
  );
}

export default App;
