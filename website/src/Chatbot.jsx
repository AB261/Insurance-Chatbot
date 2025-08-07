import { useState, useEffect, useRef } from 'react'
import Tesseract from 'tesseract.js'
import mammoth from 'mammoth'

function Chatbot() {
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: 'Hello! I\'m your SecureShield claims assistant. I\'m here to help you file your insurance claim quickly and efficiently. Please describe what happened and the type of claim you\'d like to file.',
      timestamp: new Date()
    }
  ])

  const [requestPayload,setRequestPayload] = useState( {
  months_as_customer: 0,
  age: 0,
  policy_number: 0,
  policy_bind_date: '',
  policy_state: '',
  policy_csl: '',
  policy_deductable: 0,
  policy_annual_premium: 0.0,
  umbrella_limit: 0,
  insured_zip: '',
  insured_sex: '',
  insured_education_level: '',
  insured_occupation: '',
  insured_hobbies: '',
  insured_relationship: '',
  capital_gains: 0,
  capital_loss: 0,
  incident_date: '',
  incident_type: '',
  collision_type: '',
  incident_severity: '',
  authorities_contacted: '',
  incident_state: '',
  incident_city: '',
  incident_location: '',
  incident_hour_of_the_day: '',
  number_of_vehicles_involved: 0,
  property_damage: '',
  bodily_injuries: 0,
  witnesses: 0,
  police_report_available: '',
  total_claim_amount: 0.0,
  injury_claim: 0.0,
  property_claim: 0.0,
  vehicle_claim: 0.0,
  auto_make: '',
  auto_model: '',
  auto_year: ''
})
  const [input, setInput] = useState('')
  const [stage, setStage] = useState('awaitingDetails')
  const [uploadProgress, setUploadProgress] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const [fileType, setFileType] = useState('nonFraud')

  const addMessage = (msg) => {
    setMessages(prev => [...prev, { ...msg, timestamp: new Date() }])
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const simulateTyping = (callback, delay = 1000) => {
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

  const handleFile = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    for (const file of files) {
      addMessage({ sender: 'user', text: `📎 Uploaded: ${file.name}` })
      setUploadProgress(0)
      // console.log(file.name)
      if(file.name == 'JaneDoeClaim.pdf'){
        setFileType('nonFraud')
        setRequestPayload ({
          months_as_customer: 134,
          age: 29,
          policy_number: 687698,
          policy_bind_date: '08/09/11',
          policy_state: 'OH',
          policy_csl: '100/300',
          policy_deductable: 2000,
          policy_annual_premium: 1415.16,
          umbrella_limit: 5000000,
          insured_zip: '430632',
          insured_sex: 'Female',
          insured_education_level: 'PhD',
          insured_occupation: 'sales',
          insured_hobbies: 'board-games',
          insured_relationship: 'own-child',
          capital_gains: 35100,
          capital_loss: 0,
          incident_date: '22/02/18',
          incident_type: 'Multi-vehicle Collision',
          collision_type: 'Rear Collision',
          incident_severity: 'Minor damage',
          authorities_contacted: 'Police',
          incident_state: 'NY',
          incident_city: 'Columbus',
          incident_location: '7121 Francis Lane',
          incident_hour_of_the_day: '7',
          number_of_vehicles_involved: 3,
          property_damage: 'NO',
          bodily_injuries: 2,
          witnesses: 3,
          police_report_available: 'NO',
          total_claim_amount: 34650,
          injury_claim: 7700,
          property_claim: 3850,
          vehicle_claim: 23100,
          auto_make: 'Dodge',
          auto_model: 'RAM',
          auto_year: '2007'
        })
      }

      else if(file.name == 'JohnDoeClaim.pdf'){
        setFileType('fraud')
        setRequestPayload({
          months_as_customer: 328,
          age: 35,
          policy_number: 510398,
          policy_bind_date: '17/11/16',
          policy_state: 'OH',
          policy_csl: '250/500',
          policy_deductable: 1000,
          policy_annual_premium: 1523.16,
          umbrella_limit: 0,
          insured_zip: '466132',
          insured_sex: 'Male',
          insured_education_level: 'Masters',
          insured_occupation: 'tech-support',
          insured_hobbies: 'video-games',
          insured_relationship: 'unmarried',
          capital_gains: 10000,
          capital_loss: 0,
          incident_date: '26/11/18',
          incident_type: 'Single Vehicle Collision',
          collision_type: 'Rear Collision',
          incident_severity: 'Minor damage',
          authorities_contacted: 'Police',
          incident_state: 'SC',
          incident_city: 'Columbus',
          incident_location: '9935 4th Drive',
          incident_hour_of_the_day: '23',
          number_of_vehicles_involved: 1,
          property_damage: 'YES',
          bodily_injuries: 0,
          witnesses: 2,
          police_report_available: 'YES',
          total_claim_amount: 50000,
          injury_claim: 0.0,
          property_claim: 10000,
          vehicle_claim: 40000,
          auto_make: 'Ford',
          auto_model: 'F150',
          auto_year: '2010'
        })
      }
      console.log(requestPayload.age)
      const extension = file.name.split('.').pop().toLowerCase()
      const fileName = file.name;
      let extractedText = ''

      try {
        if (extension === 'pdf') {
          const imageURL = URL.createObjectURL(file)
          const { data: { text } } = await Tesseract.recognize(imageURL, 'eng', {
            logger: m => setUploadProgress(Math.min(m.progress * 100, 100))
          })
          console.log(data)
         } else if (extension === 'docx') {
          const buffer = await file.arrayBuffer()
          const result = await mammoth.extractRawText({ arrayBuffer: buffer })
          extractedText = result.value
        } else if (file.type.startsWith('image/')) {
          const imageURL = URL.createObjectURL(file)
          const { data: { text } } = await Tesseract.recognize(imageURL, 'eng', {
            logger: m => setUploadProgress(Math.min(m.progress * 100, 100))
          })
          extractedText = text
        } else {
          extractedText = '[Unsupported file type]'
        }
      } catch (error) {
        extractedText = '[Error extracting text]'
      }

      setUploadProgress(100)
      simulateTyping(() => {
        addMessage({
          sender: 'bot',
          // text: `I've extracted the following text from the uploaded file:\n\n"${extractedText.slice(0, 400)}..."`
          text: `Perfect! I've received your ${files.length > 1 ? 'documents' : 'document'}. Your claim #SC-${Date.now().toString().slice(-6)} has been created and submitted to our claims department.`
        })
        setStage('completed')
        setUploadProgress(null)
      }, 1500)
      addMessage({
        sender:'bot',
        text:checkFraud(requestPayload)
      })
      
    }
  }

  const checkFraud = (payload) => {
    try {
      const response =  fetch('http://localhost:8000/predict-fraud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const result =  response.json()
      return result.isFraud === 1
        ? "Thank you for submitting your claim. It has been flagged for additional review and forwarded to one of our agents. They will get back to you once the verification is complete."
        : "Great news! Your claim has been verified and registered successfully. Our team has initiated the final review process and will notify you shortly."
    } catch (error) {
      console.error('Error checking fraud:', error)
      return "We encountered a problem while verifying your claim. Please try again shortly or contact support."
    }
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