import { useState, useEffect, useRef } from 'react'

function Chatbot() {
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: 'Hello! I\'m your SecureShield claims assistant. I\'m here to help you file your insurance claim quickly and efficiently. Please describe what happened and the type of claim you\'d like to file.',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [stage, setStage] = useState('awaitingDetails')
  const [uploadProgress, setUploadProgress] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  const addMessage = (msg) => {
    setMessages(prev => [...prev, { ...msg, timestamp: new Date() }])
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const simulateTyping = (callback, delay = 1500) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      callback()
    }, delay)
  }

  const handleSend = () => {
    if (!input.trim()) return
    
    addMessage({ sender: 'user', text: input })
    const userInput = input.toLowerCase()
    setInput('')

    if (stage === 'awaitingDetails') {
      simulateTyping(() => {
        setStage('awaitingDocs')
        addMessage({ 
          sender: 'bot', 
          text: 'Thank you for providing those details. To process your claim efficiently, please upload any relevant documents such as photos, receipts, police reports, or other supporting evidence. You can upload multiple files if needed.'
        })
      })
    } else if (stage === 'awaitingDocs') {
      simulateTyping(() => {
        addMessage({ 
          sender: 'bot', 
          text: 'I understand you have additional information. Please feel free to upload any documents using the attachment button, or let me know if you need assistance with anything else regarding your claim.'
        })
      })
    } else if (stage === 'completed') {
      simulateTyping(() => {
        addMessage({ 
          sender: 'bot', 
          text: 'Your claim has been submitted successfully! Is there anything else I can help you with today? You can always start a new claim or ask questions about your existing coverage.'
        })
      })
    }
  }

  const handleFile = (e) => {
    const files = Array.from(e.target.files)
    // Clear the input so the same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = ''
    if (files.length === 0) return

    files.forEach(file => {
      addMessage({ sender: 'user', text: `📎 Uploaded: ${file.name}` })
    })

    setUploadProgress(0)
    
    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5
      setUploadProgress(Math.min(progress, 100))
      
      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setUploadProgress(null)
          simulateTyping(() => {
            addMessage({ 
              sender: 'bot', 
              text: `Perfect! I've received your ${files.length > 1 ? 'documents' : 'document'}. Your claim #SC-${Date.now().toString().slice(-6)} has been created and submitted to our claims department. You'll receive an email confirmation shortly with your claim number and next steps. Our team will review your claim within 1-2 business days.`
            })
            setStage('completed')
          }, 1000)
        }, 500)
      }
    }, 200)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Claims Assistant</h3>
            <p className="text-xs text-blue-100">Online • Ready to help</p>
          </div>
        </div>
        <button 
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-1 hover:bg-white/20 rounded transition-colors md:hidden"
        >
          <svg className={`w-4 h-4 transition-transform ${isMinimized ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z"/>
          </svg>
        </button>
      </div>

      {/* Messages Container */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 ${isMinimized ? 'hidden md:block' : ''}`}>
        {messages.map((message, idx) => (
          <div key={idx} className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-xs lg:max-w-sm px-4 py-3 rounded-2xl shadow-sm ${
              message.sender === 'bot' 
                ? 'bg-white text-gray-800 rounded-bl-md border border-gray-100' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-md'
            }`}>
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-2 ${
                message.sender === 'bot' ? 'text-gray-400' : 'text-blue-100'
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Progress */}
        {uploadProgress !== null && (
          <div className="mx-4">
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
                <span className="text-sm text-gray-600">Uploading documents...</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{Math.round(uploadProgress)}% complete</p>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`p-4 border-t border-gray-200 bg-white ${isMinimized ? 'hidden md:block' : ''}`}>
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <textarea
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              rows="1"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title="Attach files"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 6V17.5C16.5 19.43 14.93 21 13 21S9.5 19.43 9.5 17.5V5C9.5 3.62 10.62 2.5 12 2.5S14.5 3.62 14.5 5V15.5C14.5 16.05 14.05 16.5 13.5 16.5S12.5 16.05 12.5 15.5V6H11V15.5C11 16.88 12.12 18 13.5 18S16 16.88 16 15.5V5C16 2.79 14.21 1 12 1S8 2.79 8 5V17.5C8 20.26 10.24 22.5 13 22.5S18 20.26 18 17.5V6H16.5Z"/>
              </svg>
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
            </svg>
          </button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFile}
          multiple
          accept="image/*,.pdf,.doc,.docx"
          className="hidden"
        />
        
        <p className="text-xs text-gray-500 mt-2 text-center">
          Supported formats: Images, PDF, Word documents
        </p>
      </div>
    </div>
  )
}

export default Chatbot