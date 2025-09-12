import { useState } from 'react'
import { supabase } from './lib/supabase'
import PretestForm from './components/PretestForm'
import SuccessPage from './components/SuccessPage'

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [participantData, setParticipantData] = useState(null)
  const [error, setError] = useState(null)

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // First, get an unused participant record
      const { data: participants, error: fetchError } = await supabase
        .from('participants')
        .select('participant_number, participant_password')
        .eq('id_used', false)
        .limit(1)
        .single()

      if (fetchError) {
        console.error('Database fetch error:', fetchError)
        if (fetchError.code === 'PGRST116') {
          throw new Error('No available participant slots found. Please contact the administrator.')
        }
        throw new Error(`Database error: ${fetchError.message}`)
      }

      if (!participants) {
        throw new Error('No available participant slots found. Please contact the administrator.')
      }

      // Update the participant record to mark it as used
      const { error: updateError } = await supabase
        .from('participants')
        .update({ id_used: true })
        .eq('participant_number', participants.participant_number)

      if (updateError) {
        throw new Error('Failed to assign participant credentials. Please try again.')
      }

      // Store the form data (optional - if you want to save the pretest responses)
      const { error: insertError } = await supabase
        .from('pretest_responses')
        .insert({
          participant_number: participants.participant_number,
          how_was_day: formData.howWasDay,
          how_do_you_feel: formData.howDoYouFeel,
          additional_comments: formData.additionalComments,
          submitted_at: new Date().toISOString()
        })

      // Even if saving responses fails, we still show the credentials
      if (insertError) {
        console.warn('Failed to save pretest responses:', insertError)
      }

      // Set the participant data to show on success page
      setParticipantData({
        participant_number: participants.participant_number,
        password: participants.participant_password
      })

    } catch (err) {
      console.error('Error during form submission:', err)
      setError(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (participantData) {
    return <SuccessPage participantData={participantData} />
  }

  return (
    <div>
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md shadow-md max-w-md">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-sm">{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-3 text-red-700 hover:text-red-900"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      <PretestForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}

export default App
