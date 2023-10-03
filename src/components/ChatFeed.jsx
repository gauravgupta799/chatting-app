import React from 'react';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import MessageForm from './MessageForm';

function ChatFeed(props) {
    const {chats, activeChat, userName, messages} = props;
    const chat = chats && chats[activeChat];

    const renderReadReceipts= (message, isMyMessage)=>{
      chat.people.map((person, index)=>
        person.last_read === message.id && (
          <div key={`read_${index}`}
          className='read-receipt'
          style={{ 
            float: isMyMessage ? "right" :"left",
            backgroundImage: person.person.avatar && 
            `url(${person.person.avatar})`
          }}
          >

          </div>
        )
      )

    }

    const renderMessages =()=>{
      const keys = Object.keys(messages);

      return keys.map((key, index)=>{
        const message = messages[key];
        const lastMessageKey = index !== 0 ? keys[index - 1] : null
        const isMyMessage = userName === message.sender.userName;
        return (
          <div className="" key={`msg_${index}`} style={{width:"100%"}}>
            <div className="message-block">
              { isMyMessage ?            
                  <MyMessage message={message}/> 
                : <TheirMessage 
                    message={message} 
                    lastMessage ={message[lastMessageKey]}
                  /> 
              }
            </div>
            <div className="read-reciepts"
            style={{marginInline: isMyMessage ? "0px 18px" : "68px 0px"}}
            >
            {renderReadReceipts(message, isMyMessage)}
            </div>
          </div>
        )
      })
    }

  return (
    <div className='chat-feed'>
      <div className="chat title-container">
        <div className="chat-title">{chat?.title}</div>
        <div className="chat-subtitle"></div>
        {renderMessages()}
        <div className="" style={{height:"100px"}}/>
        <div className="message-form-container">
          <MessageForm {...props} chatId ={activeChat}/>
        </div>
      </div>
    </div>
  )
}

export default ChatFeed;
