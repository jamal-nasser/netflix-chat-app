import React, { useEffect, useRef, useState } from 'react';
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import './Chat.css';

const { REACT_APP_BASE_URL } = process.env;

const Chat = () => {

  const [state, setState] = useState({ message: "", name: "" })
  const [chat, setChat] = useState([])

  const socketRef = useRef()

  useEffect(
    () => {
      socketRef.current = io.connect(REACT_APP_BASE_URL)
      socketRef.current.on("message", ({ name, message }) => {
        setChat([...chat, { name, message }])
      })
      return () => socketRef.current.disconnect()
    },
    [chat]
  )

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onMessageSubmit = (e) => {
    const { name, message } = state
    socketRef.current.emit("message", { name, message })
    e.preventDefault()
    setState({ message: "", name })
  }

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ))
  }
  return (
    <div className="card">
      <form className="chat-form" onSubmit={onMessageSubmit}>
        <h1>Netflix Messenger</h1>
        <div className="name-field">
          <TextField name="name" onChange={(e) => onTextChange(e)} value={state.name} label="Name" />
        </div>
        <div className="name-field">
          <TextField
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            label="Message"
          />
        </div>
        <button>Send Message</button>
      </form>
      <div className="render-chat">
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
    </div>
  )
}

export default Chat;
