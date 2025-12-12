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

      // Randomly assign participant to Intervention or Control group
      const assignedGroup = Math.random() < 0.5 ? 'Intervention' : 'Control'

      // Update the participant record to mark it as used and assign group
      const { error: updateError } = await supabase
        .from('participants')
        .update({ 
          id_used: true,
          Group: assignedGroup
        })
        .eq('participant_number', participants.participant_number)

      if (updateError) {
        throw new Error('Failed to assign participant credentials. Please try again.')
      }

      // Store the form data with all the new pretest response fields
      const { error: insertError } = await supabase
        .from('pretest_responses')
        .insert({
          participant_number: participants.participant_number,
          // Eligibility & Consent
          is_registered_nurse: formData.isRegisteredNurse,
          provides_consent: formData.providesConsent,
          understands_voluntary: formData.understandsVoluntary,
          
          // WHO-5 Well-Being Index
          who5_cheerful: parseInt(formData.who5_cheerful),
          who5_calm: parseInt(formData.who5_calm),
          who5_active: parseInt(formData.who5_active),
          who5_rested: parseInt(formData.who5_rested),
          who5_interested: parseInt(formData.who5_interested),
          
          // PSS-4 Perceived Stress
          pss4_unable_control: parseInt(formData.pss4_unable_control),
          pss4_confident_handle: parseInt(formData.pss4_confident_handle),
          pss4_going_your_way: parseInt(formData.pss4_going_your_way),
          pss4_difficulties_piling: parseInt(formData.pss4_difficulties_piling),
          
          // Brief COPE - Active Coping
          cope_concentrating_efforts: parseInt(formData.cope_concentrating_efforts),
          cope_taking_action: parseInt(formData.cope_taking_action),
          
          // Brief COPE - Planning
          cope_strategy: parseInt(formData.cope_strategy),
          cope_thinking_steps: parseInt(formData.cope_thinking_steps),
          
          // Brief COPE - Positive Reframing
          cope_different_light: parseInt(formData.cope_different_light),
          cope_looking_good: parseInt(formData.cope_looking_good),
          
          // Brief COPE - Acceptance
          cope_accepting_reality: parseInt(formData.cope_accepting_reality),
          cope_learning_live: parseInt(formData.cope_learning_live),
          
          // Brief COPE - Emotional Support
          cope_emotional_support: parseInt(formData.cope_emotional_support),
          cope_comfort_understanding: parseInt(formData.cope_comfort_understanding),
          
          // Brief COPE - Self-Distraction
          cope_work_activities: parseInt(formData.cope_work_activities),
          cope_movies_tv_reading: parseInt(formData.cope_movies_tv_reading),
          
          // Brief COPE - Self-Blame
          cope_criticizing_myself: parseInt(formData.cope_criticizing_myself),
          cope_blaming_myself: parseInt(formData.cope_blaming_myself),
          
          // Burnout Assessment
          burnout_level: formData.burnout_level,
          
          // Additional Comments
          additional_comments: formData.additional_comments,
          
          submitted_at: new Date().toISOString()
        })

      // Even if saving responses fails, we still show the credentials
      if (insertError) {
        console.warn('Failed to save pretest responses:', insertError)
      }

      // Save demographic survey data to demographic_surveys table
      const { error: demographicError } = await supabase
        .from('demographic_surveys')
        .insert({
          participant_id: participants.participant_number,
          age_group: formData.ageGroup,
          gender: formData.gender,
          marital_status: formData.maritalStatus,
          educational_qualification: formData.educationalQualification,
          educational_other: formData.educationalQualification === 'Others' ? formData.educationalOther : null,
          designation: formData.designation,
          income_level: formData.incomeLevel,
          years_experience: formData.yearsExperience,
          working_unit: formData.workingUnit,
          working_unit_other: formData.workingUnit === 'Any other' ? formData.workingUnitOther : null,
          work_shift: formData.workShift,
          hours_per_day: formData.hoursPerDay,
          night_shifts_per_month: formData.nightShiftsPerMonth,
          night_shifts_other: formData.nightShiftsPerMonth === 'Others' ? formData.nightShiftsOther : null,
          place_of_residence: formData.placeOfResidence,
          residence_other: formData.placeOfResidence === 'Any other' ? formData.residenceOther : null,
        })

      if (demographicError) {
        console.warn('Failed to save demographic survey:', demographicError)
      }

      // Set the participant data to show on success page
      setParticipantData({
        participant_number: participants.participant_number,
        password: participants.participant_password,
        group: assignedGroup
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
