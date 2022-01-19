import React, { useEffect, useState } from 'react'
import "./App.css"
import ScrollToBottom from "react-scroll-to-bottom"

export default function Chat({socket, name, room}) {
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])
    const sendMessage = async()=>{
        if(currentMessage !==""){
            const messageData ={
                name,
                room,
                message:currentMessage,
                time: new Date(Date.now()).getHours() +":"+new Date(Date.now()).getMinutes()
            }
            await socket.emit("new_message",messageData)
            setMessageList((messageList)=>[...messageList,messageData])
            setCurrentMessage("")
        }
    }

    useEffect(()=>{
        socket.on('receive_message',(data)=>{
           
            setMessageList((messageList)=>[...messageList,data])
        })
    },[])

    return (
        <div className="chat-window">
            <div className="chat-header"><p>Chat</p></div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {
                        messageList.map((messageContent)=>{
                            return (
                                <div className="message" id ={name ===messageContent.name?"you" : "other"}>
                                    <div>
                                        <div className="message-content">
                                            <p>{messageContent.message}</p>
                                        </div>
                                        <div className="message-meta">
                                            <p id="time">{messageContent.time}</p>
                                            <p id="author">{messageContent.name}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input type="text" placeholder='message' value={currentMessage} onChange={(e)=>setCurrentMessage(e.target.value)} onKeyPress={(e)=>{
                    e.key==="Enter" && sendMessage()
                }} />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}
