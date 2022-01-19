import './App.css';
import io from "socket.io-client"
import {useState} from "react"
import Chat from './Chat';

const socket = io.connect("http://localhost:3001")

function App() {
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")
  const [show, setShow] = useState(false)

  const joinRoom = ()=>{
    if(name!=="" && room !==""){
      socket.emit("join_room", room)
      setShow(true)
    }
  }
  return (
    <div className="App">
      {!show ? (
      <div className="joinChatContainer">
      <h3>let's Chat...</h3>
      <input type="text" placeholder="name" onChange={(event)=>setName(event.target.value)}></input>
      <input type="text" placeholder="Room" onChange={(event)=>setRoom(event.target.value)}></input>
      <button type="button" onClick={joinRoom}>Join</button>
      </div>) :

      (<Chat socket={socket} name={name} room={room} />)}
    </div>
  );
}

export default App;
