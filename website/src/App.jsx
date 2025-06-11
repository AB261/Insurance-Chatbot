import Chatbot from './Chatbot'

function App() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-8 py-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/10"></div>
          <div className="absolute inset-0 opacity-40">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, rgba(156, 146, 172, 0.1) 2px, transparent 2px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          
          <div className="relative max-w-4xl mx-auto text-center space-y-8">
            {/* Logo and Brand */}
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" opacity="0.3"/>
                </svg>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight">
                SecureShield Insurance
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-medium">
                Protecting Your Future, Today
              </p>
            </div>

            {/* Key Message */}
            <div className="max-w-2xl mx-auto space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                With over 25 years of trusted service, we provide comprehensive insurance solutions 
                tailored to your unique needs. From auto and home to life and business coverage, 
                we're here to protect what matters most.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 py-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">500K+</div>
                  <div className="text-sm text-gray-600 font-medium">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">98%</div>
                  <div className="text-sm text-gray-600 font-medium">Claim Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-gray-600 font-medium">Support Available</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-2">
              <p className="text-blue-600 font-semibold">Need to file a claim?</p>
              <p className="text-gray-600">
                Our AI-powered assistant is ready to help you get started instantly →
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Insurance Solutions</h2>
              <p className="text-xl text-gray-600">Comprehensive coverage for every aspect of your life</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Auto Insurance */}
              <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V4C15 2.9 14.1 2 13 2H11C9.9 2 9 2.9 9 4V5H6.5C5.84 5 5.28 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01ZM11 4H13V5H11V4ZM6.5 16C5.67 16 5 15.33 5 14.5S5.67 13 6.5 13 8 13.67 8 14.5 7.33 16 6.5 16ZM17.5 16C16.67 16 16 15.33 16 14.5S16.67 13 17.5 13 19 13.67 19 14.5 18.33 16 17.5 16ZM5.81 10L7.13 7H16.87L18.19 10H5.81Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Auto Insurance</h3>
                <p className="text-gray-600 text-sm">Comprehensive coverage for your vehicle with competitive rates and excellent service.</p>
              </div>

              {/* Home Insurance */}
              <div className="group bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Home Insurance</h3>
                <p className="text-gray-600 text-sm">Protect your home and belongings with our comprehensive homeowners coverage.</p>
              </div>

              {/* Life Insurance */}
              <div className="group bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Life Insurance</h3>
                <p className="text-gray-600 text-sm">Secure your family's financial future with our flexible life insurance plans.</p>
              </div>

              {/* Business Insurance */}
              <div className="group bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 7V3H2V21H22V7H12ZM6 19H4V17H6V19ZM6 15H4V13H6V15ZM6 11H4V9H6V11ZM6 7H4V5H6V7ZM10 19H8V17H10V19ZM10 15H8V13H10V15ZM10 11H8V9H10V11ZM10 7H8V5H10V7ZM20 19H12V17H14V15H12V13H14V11H12V9H20V19ZM18 11H16V13H18V11ZM18 15H16V17H18V15Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Insurance</h3>
                <p className="text-gray-600 text-sm">Comprehensive business protection including liability, property, and workers' compensation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Why Choose SecureShield?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Trusted Experience</h3>
                <p className="text-blue-100">25+ years protecting families and businesses across the nation.</p>
              </div>
              <div className="space-y-3">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Fast Claims</h3>
                <p className="text-blue-100">Quick and easy claims processing with our digital-first approach.</p>
              </div>
              <div className="space-y-3">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2.01 6.89 2.01 8L2 19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4ZM12 13C10.34 13 9 11.66 9 10H7C7 12.76 9.24 15 12 15S17 12.76 17 10H15C15 11.66 13.66 13 12 13Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Expert Support</h3>
                <p className="text-blue-100">Dedicated agents and 24/7 customer support when you need it most.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Fixed Chatbot */}
      <aside className="w-full md:w-96 h-screen fixed md:static bottom-0 right-0 bg-white shadow-2xl border-l border-gray-200 z-50">
        <Chatbot />
      </aside>
    </div>
  )
}

export default App