import Chatbot from './Chatbot'

function App() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <main className="flex-1 p-8 bg-gray-100 flex items-center justify-center">
        <div className="max-w-xl text-center space-y-4">
          <h1 className="text-4xl font-bold">Acme Insurance</h1>
          <p className="text-lg">We protect what matters most.</p>
          <p className="text-gray-600">Start your claim with our helpful chatbot.</p>
        </div>
      </main>
      <aside className="w-full md:w-96 border-l h-screen fixed md:static bottom-0 right-0 bg-white shadow-lg">
        <Chatbot />
      </aside>
    </div>
  )
}

export default App
