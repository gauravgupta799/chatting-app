import React from 'react'

const TheirMessage = ({message, lastMessage}) => {
  const isFirstMessageByUser =  !lastMessage || lastMessage.sender.username !== message.sender.username;

  return (
    <div className='message-row'>
    { isFirstMessageByUser && (
      <div className="message-avatar"
        style={{ 
          backgroundImage: message.sender && `url(${message.sender.avatar})`}}
        >

      </div>
    )}
    {message.attachments && message.attachments.length > 0 ?
      (
        <img src={message.attachments[0].file} 
          alt="message-attachement" 
          className='message-image'
          style={{
            marginLeft:isFirstMessageByUser ? "4px" :"48px"
          }}
        />
      )
      : (
        <div className='message' 
          style={{
            float:'left',
            color:"#fff",
            backgroundColor:"#3B2A50",
            padding:"0.4em",
            borderRadius:"4px",
            marginRight:isFirstMessageByUser ? "4px" :"48px"
          }}
        >
          {message.text}
        </div>
      )
    }
      
    </div>
  )
}

export default TheirMessage
