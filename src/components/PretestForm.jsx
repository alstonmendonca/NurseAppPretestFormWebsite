import { useState } from 'react'

const PretestForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    howWasDay: '',
    howDoYouFeel: '',
    additionalComments: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Healthcare Professional Pretest
          </h1>
          <p className="text-gray-600 mb-8">
            Please answer the following questions before proceeding to the main assessment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
            {/* Question 1 */}
            <div>
              <label htmlFor="howWasDay" className="block text-sm font-medium text-gray-700 mb-2">
                How was your day? *
              </label>
              <select
                id="howWasDay"
                name="howWasDay"
                value={formData.howWasDay}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Please select...</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="average">Average</option>
                <option value="challenging">Challenging</option>
                <option value="difficult">Difficult</option>
              </select>
            </div>

            {/* Question 2 */}
            <div>
              <label htmlFor="howDoYouFeel" className="block text-sm font-medium text-gray-700 mb-2">
                How do you feel right now? *
              </label>
              <select
                id="howDoYouFeel"
                name="howDoYouFeel"
                value={formData.howDoYouFeel}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Please select...</option>
                <option value="energetic">Energetic</option>
                <option value="focused">Focused</option>
                <option value="calm">Calm</option>
                <option value="neutral">Neutral</option>
                <option value="tired">Tired</option>
                <option value="stressed">Stressed</option>
                <option value="overwhelmed">Overwhelmed</option>
              </select>
            </div>

            {/* Question 3 */}
            <div>
              <label htmlFor="additionalComments" className="block text-sm font-medium text-gray-700 mb-2">
                Any additional comments or concerns?
              </label>
              <textarea
                id="additionalComments"
                name="additionalComments"
                rows={4}
                value={formData.additionalComments}
                onChange={handleInputChange}
                placeholder="Optional: Share any thoughts or concerns you have..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Submit Pretest'
                )}
              </button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>This form is anonymous and your responses will be used for research purposes only.</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PretestForm