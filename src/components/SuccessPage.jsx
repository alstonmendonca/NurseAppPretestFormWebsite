import { useState } from 'react'

const SuccessPage = ({ participantData }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    const credentials = `Participant Number: ${participantData.participant_number}\nPassword: ${participantData.password}`
    navigator.clipboard.writeText(credentials).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pretest Submitted Successfully!
          </h1>
          <p className="text-gray-600">
            Your responses have been recorded. Here are your login credentials for the main assessment.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          {/* Credentials Display */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5C2.962 18.333 3.924 20 5.464 20z"></path>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Important Security Notice
                </h3>
                <p className="mt-1 text-sm text-yellow-700">
                  Please save these credentials securely. They cannot be recovered or changed once you leave this page.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Participant Number
              </label>
              <div className="flex items-center justify-between bg-white border border-gray-300 rounded-md px-3 py-2">
                <span className="font-mono text-lg font-semibold text-gray-900">
                  {participantData.participant_number}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="flex items-center justify-between bg-white border border-gray-300 rounded-md px-3 py-2">
                <span className="font-mono text-lg font-semibold text-gray-900">
                  {participantData.password}
                </span>
              </div>
            </div>

            <button
              onClick={copyToClipboard}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-md font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              {copied ? (
                <span className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Copied to Clipboard!
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                  Copy Credentials
                </span>
              )}
            </button>
          </div>

          {/* Instructions */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Next Steps</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li>Save these credentials in a secure location (write them down or screenshot this page)</li>
              <li>Navigate to the main assessment application</li>
              <li>Sign in using the participant number and password provided above</li>
              <li>Complete the main assessment when you're ready</li>
            </ol>
          </div>

          {/* Security Reminder */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Security Reminder
                </h3>
                <p className="mt-1 text-sm text-red-700">
                  These credentials are unique to you and cannot be recovered. Keep them secure and do not share them with others.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage