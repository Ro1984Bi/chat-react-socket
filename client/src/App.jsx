import React, { useEffect, useState } from 'react'
import './App.css'
import io from 'socket.io-client'

const socket = io('http://localhost:4000')

function App() {

  const [messages, setMessages] = useState('')
  const [errands, setErrands] = useState([
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('messages', messages)
    const newMessage = {
      body: messages,
      from: 'Me'
    }
    setErrands([newMessage, ...errands])
    setMessages('')
  }

  useEffect(() => {

    const sendMessages = (messages) => {
      setErrands([messages, ...errands])
    }

    socket.on('messages', sendMessages)

    return () => {
      socket.off('messages', sendMessages)
    }
  }, [errands])
  return (
    <div className='h-screen bg-zinc-800 text-white flex items-center justify-center'>
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
        <h1 className='text-white font-bold'>Chat React</h1>
        <input type="text" onChange={(e) => setMessages(e.target.value)}
          value={messages} className="border-2 border-zinc-500 p-2 text-black w-full" />

        <ul className='h-80 overflow-y-auto'>
          {errands.map((errand, i) => (
            <li key={i} className={` my-2 p-2 table text-sm rounded-md ${messages.from === "Me" ? "bg-sky-700 ml-auto" : "bg-black"}`}>
              <p> {errand.from}:{errand.body}  </p>
            </li>
          ))}
        </ul>
      </form>

    </div>
  )
}

export default App