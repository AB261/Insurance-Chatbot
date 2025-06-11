import { useState, useEffect } from 'react'

function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Please enter your insurance claim details.' }
  ])
  const [input, setInput] = useState('')
  const [stage, setStage] = useState('awaitingDetails')
  const [uploadProgress, setUploadProgress] = useState(null)

  const addMessage = msg => setMessages(prev => [...prev, msg])

  const handleSend = () => {
    if (!input.trim()) return
    addMessage({ sender: 'user', text: input })
    if (stage === 'awaitingDetails') {
      setStage('awaitingDocs')
      addMessage({ sender: 'bot', text: 'Thanks. Please upload relevant claim documents.' })
    }
    setInput('')
  }

  const handleFile = e => {
    const file = e.target.files[0]
    if (!file) return
    addMessage({ sender: 'user', text: `Uploaded: ${file.name}` })
    setUploadProgress(0)
    // simulate upload
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setUploadProgress(null)
        addMessage({ sender: 'bot', text: 'Document received. We will review your claim and contact you soon.' })
        setStage('completed')
      }
    }, 200)
  }

  useEffect(() => {
    const container = document.getElementById('chat-messages')
    if (container) container.scrollTop = container.scrollHeight
  }, [messages])

  return (
    <div className="flex flex-col h-full">
      <div id="chat-messages" className="flex-1 overflow-y-auto p-2 space-y-2">
        {messages.map((m, idx) => (
          <div key={idx} className={m.sender === 'bot' ? 'text-left' : 'text-right'}>
            <span className={
              'inline-block px-3 py-2 rounded-lg ' +
              (m.sender === 'bot' ? 'bg-blue-600 text-white' : 'bg-gray-200')
            }>
              {m.text}
            </span>
          </div>
        ))}
        {uploadProgress !== null && (
          <div className="w-full bg-gray-200 rounded h-2">
            <div className="bg-blue-500 h-2 rounded" style={{ width: `${uploadProgress}%` }} />
          </div>
        )}
      </div>
      <div className="p-2 border-t flex gap-2">
        <input
          className="flex-1 border rounded p-2"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <input type="file" onChange={handleFile} className="border rounded" />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 rounded">
          Send
        </button>
      </div>
    </div>
  )
}

export default Chatbot
