import io from 'socket.io-client';//Con esto nos conectamos al backend
import { useState, useEffect } from 'react';

const socket = io('/');

const App = () => {

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: 'Me'
    }

    setMessages([...messages, newMessage])
    socket.emit('message', message);
  }

  useEffect(() => {
    socket.on('message', reciveMessage);

    return () => {
      socket.off('message', reciveMessage);
    }
  }, []);

  const reciveMessage = (message) =>
    setMessages((state) => [...state, message]);

  return (
    <div className='h-screen bg-neutral-800 text-white flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='bg-neutral-900 p-10'>
        <h1 className='text-2xl font-bold my-2'>Chat - React </h1>
        <input type="text"
          placeholder='Write your message ...'
          onChange={(e) => setMessage(e.target.value)}
          className='text-black border-2 border-neutral-500 p-2 w-full' />
        <ul>
          {
            messages.map((message, index) => (
              <li key={index} className={
                `my-2 p-2 table rounded-md ${message.from == 'Me' ?
                  'bg-sky-700 ' : 'bg-black ml-auto'}`
              }
              >
                <span className={
                  `text-xs block ${message.from == 'Me' ? 
                    'text-slate-100' : 'text-slate-300'
                  }`
                }
                >
                  {message.from}
                </span> 
                <span className='text-md'>
                {message.body}
                </span>
              </li>
            ))
          }
        </ul>
      </form>

    </div>
  )
}

export default App