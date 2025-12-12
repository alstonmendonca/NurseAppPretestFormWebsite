import { useState } from 'react'

const PretestForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    // Eligibility & Consent
    isRegisteredNurse: false,
    providesConsent: false,
    understandsVoluntary: false,
    
    // Demographics Survey
    ageGroup: '',
    gender: '',
    maritalStatus: '',
    educationalQualification: '',
    educationalOther: '',
    designation: '',
    incomeLevel: '',
    yearsExperience: '',
    workingUnit: '',
    workingUnitOther: '',
    workShift: '',
    hoursPerDay: '',
    nightShiftsPerMonth: '',
    nightShiftsOther: '',
    placeOfResidence: '',
    residenceOther: '',
    nonSharingPledge: false,
    
    // WHO-5 Well-Being Index (0-5 scale)
    who5_cheerful: '',
    who5_calm: '',
    who5_active: '',
    who5_rested: '',
    who5_interested: '',
    
    // PSS-4 Perceived Stress (0-4 scale)
    pss4_unable_control: '',
    pss4_confident_handle: '',
    pss4_going_your_way: '',
    pss4_difficulties_piling: '',
    
    // Brief COPE - Active Coping (1-4 scale)
    cope_concentrating_efforts: '',
    cope_taking_action: '',
    
    // Brief COPE - Planning (1-4 scale)
    cope_strategy: '',
    cope_thinking_steps: '',
    
    // Brief COPE - Positive Reframing (1-4 scale)
    cope_different_light: '',
    cope_looking_good: '',
    
    // Brief COPE - Acceptance (1-4 scale)
    cope_accepting_reality: '',
    cope_learning_live: '',
    
    // Brief COPE - Emotional Support (1-4 scale)
    cope_emotional_support: '',
    cope_comfort_understanding: '',
    
    // Brief COPE - Self-Distraction (1-4 scale)
    cope_work_activities: '',
    cope_movies_tv_reading: '',
    
    // Brief COPE - Self-Blame (1-4 scale)
    cope_criticizing_myself: '',
    cope_blaming_myself: '',
    
    // Burnout (single item)
    burnout_level: '',
    
    // Open text
    additional_comments: ''
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  // Mobile-friendly rating scale component
  const RatingScale = ({ name, label, min, max, minLabel, maxLabel, value, required = true }) => {
    const numOptions = max - min + 1;
    const gridCols = numOptions <= 4 ? 'grid-cols-4' : numOptions === 5 ? 'grid-cols-5' : 'grid-cols-6';
    
    return (
      <div className="space-y-3">
        <label className="block text-sm sm:text-base font-medium text-gray-700 leading-relaxed">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex justify-between text-xs text-gray-500 mb-3">
            <span>{minLabel}</span>
            <span>{maxLabel}</span>
          </div>
          <div className={`grid ${gridCols} gap-2`}>
            {Array.from({ length: numOptions }, (_, i) => min + i).map((val) => (
              <label key={val} className="flex flex-col items-center space-y-1 cursor-pointer">
                <input
                  type="radio"
                  name={name}
                  value={val}
                  checked={value === val.toString()}
                  onChange={handleInputChange}
                  required={required}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">{val}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-3 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Pretest
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Pre-test Assessment
            </p>
            <div className="mt-4 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
              • Estimated time: 10-15 minutes
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Eligibility & Consent */}
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Eligibility & Consent
              </h2>
            </div>
            
            <div className="space-y-3">
              {[
                { key: 'isRegisteredNurse', label: 'I am a registered nurse currently employed' },
                { key: 'providesConsent', label: 'I provide informed consent to participate' },
                { key: 'understandsVoluntary', label: 'I understand participation is voluntary and anonymous' }
              ].map((item) => (
                <label key={item.key} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    name={item.key}
                    checked={formData[item.key]}
                    onChange={handleInputChange}
                    required
                    className="mt-0.5 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Demographics Survey */}
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Demographic Information
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-6 bg-green-50 rounded-lg p-3">
              Please provide your demographic details for research purposes.
            </p>

            <div className="space-y-6">
              {/* Age Group */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                  Age group <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Less than 20 years', '20-30 years', '31-35 years', 'Above 35 years'].map((option) => (
                    <label key={option} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="ageGroup"
                        value={option}
                        checked={formData.ageGroup === option}
                        onChange={handleInputChange}
                        required
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-sm sm:text-base text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Male', 'Female'].map((option) => (
                    <label key={option} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={formData.gender === option}
                        onChange={handleInputChange}
                        required
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-sm sm:text-base text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Marital Status */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                  Marital status <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Unmarried/Single', 'Married', 'Widower/Separated/divorced'].map((option) => (
                    <label key={option} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="maritalStatus"
                        value={option}
                        checked={formData.maritalStatus === option}
                        onChange={handleInputChange}
                        required
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-sm sm:text-base text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Educational Qualification */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                  Educational qualification <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Certificate course', 'Diploma', 'Graduate', 'Post Graduate', 'Others'].map((option) => (
                    <label key={option} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="educationalQualification"
                        value={option}
                        checked={formData.educationalQualification === option}
                        onChange={handleInputChange}
                        required
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-sm sm:text-base text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                {formData.educationalQualification === 'Others' && (
                  <input
                    type="text"
                    name="educationalOther"
                    value={formData.educationalOther}
                    onChange={handleInputChange}
                    required
                    placeholder="Please specify"
                    className="mt-3 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                )}
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                  Designation <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Ward In-charge', 'Staff Nurse', 'Nurse in probation', 'ANS'].map((option) => (
                    <label key={option} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="designation"
                        value={option}
                        checked={formData.designation === option}
                        onChange={handleInputChange}
                        required
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-sm sm:text-base text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Income Level */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                  Income level <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Below Rs. 10,000', 'Rs.10,001-Rs.20,000', 'Rs.20,001-Rs.30,000', 'Above Rs.30,000'].map((option) => (
                    <label key={option} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="incomeLevel"
                        value={option}
                        checked={formData.incomeLevel === option}
                        onChange={handleInputChange}
                        required
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-sm sm:text-base text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Years of Experience */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                  Years of experience <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Less than 5 years', '5 – 10 years', '10 - 15 years', 'Above 15 years'].map((option) => (
                    <label key={option} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="yearsExperience"
                        value={option}
                        checked={formData.yearsExperience === option}
                        onChange={handleInputChange}
                        required
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-sm sm:text-base text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Working Unit */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                  Working Unit <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Medical ward', 'Surgical ward', 'Obstetrics & Gynecology', 'Pediatrics', 'Geriatric', 'Psychiatric', 'OT', 'Intensive care Units', 'Post-operative units', 'Any other'].map((option) => (
                    <label key={option} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="workingUnit"
                        value={option}
                        checked={formData.workingUnit === option}
                        onChange={handleInputChange}
                        required
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-sm sm:text-base text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                {formData.workingUnit === 'Any other' && (
                  <input
                    type="text"
                    name="workingUnitOther"
                    value={formData.workingUnitOther}
                    onChange={handleInputChange}
                    required
                    placeholder="Please specify"
                    className="mt-3 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                )}
              </div>

              {/* Work Shift */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                  Work shift <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Fixed/Morning', 'Rotating'].map((option) => (
                    <label key={option} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="workShift"
                        value={option}
                        checked={formData.workShift === option}
                        onChange={handleInputChange}
                        required
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-sm sm:text-base text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Hours Per Day */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                  Hours worked per day <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['8 hours', '> 8 hours'].map((option) => (
                    <label key={option} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="hoursPerDay"
                        value={option}
                        checked={formData.hoursPerDay === option}
                        onChange={handleInputChange}
                        required
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-sm sm:text-base text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Night Shifts Per Month */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                  No. of night shifts per month <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Weekly Once', '2 weeks once', 'Monthly Once', 'Others'].map((option) => (
                    <label key={option} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="nightShiftsPerMonth"
                        value={option}
                        checked={formData.nightShiftsPerMonth === option}
                        onChange={handleInputChange}
                        required
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-sm sm:text-base text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                {formData.nightShiftsPerMonth === 'Others' && (
                  <input
                    type="text"
                    name="nightShiftsOther"
                    value={formData.nightShiftsOther}
                    onChange={handleInputChange}
                    required
                    placeholder="Please specify"
                    className="mt-3 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                )}
              </div>

              {/* Place of Residence */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                  Place of Residence <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Hostel in the Hospital Campus', 'Hostel in Outside Hospital Campus', 'Home', 'PG Hostel', 'Any other'].map((option) => (
                    <label key={option} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="placeOfResidence"
                        value={option}
                        checked={formData.placeOfResidence === option}
                        onChange={handleInputChange}
                        required
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-sm sm:text-base text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                {formData.placeOfResidence === 'Any other' && (
                  <input
                    type="text"
                    name="residenceOther"
                    value={formData.residenceOther}
                    onChange={handleInputChange}
                    required
                    placeholder="Please specify"
                    className="mt-3 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                )}
              </div>

              {/* Non-Sharing Pledge */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="nonSharingPledge"
                    checked={formData.nonSharingPledge}
                    onChange={handleInputChange}
                    required
                    className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">Non-Sharing Pledge <span className="text-red-500">*</span></span>
                    <p className="text-sm text-gray-600 mt-1">
                      I agree that I will not share the mobile app access and login details (if assigned to Intervention group) with colleagues from other wards or study groups. I understand that sharing intervention details may affect the reliability of the study findings.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* WHO-5 Well-Being Index */}
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                WHO-5 Well-Being Index
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-6 bg-blue-50 rounded-lg p-3">
              Over the last two weeks, how much of the time...
            </p>
            
            <div className="space-y-6">
              <RatingScale
                name="who5_cheerful"
                label="I have felt cheerful and in good spirits"
                min={0}
                max={5}
                minLabel="At no time"
                maxLabel="All of the time"
                value={formData.who5_cheerful}
              />
              <RatingScale
                name="who5_calm"
                label="I have felt calm and relaxed"
                min={0}
                max={5}
                minLabel="At no time"
                maxLabel="All of the time"
                value={formData.who5_calm}
              />
              <RatingScale
                name="who5_active"
                label="I have felt active and vigorous"
                min={0}
                max={5}
                minLabel="At no time"
                maxLabel="All of the time"
                value={formData.who5_active}
              />
              <RatingScale
                name="who5_rested"
                label="I woke up feeling fresh and rested"
                min={0}
                max={5}
                minLabel="At no time"
                maxLabel="All of the time"
                value={formData.who5_rested}
              />
              <RatingScale
                name="who5_interested"
                label="My daily life has been filled with things that interest me"
                min={0}
                max={5}
                minLabel="At no time"
                maxLabel="All of the time"
                value={formData.who5_interested}
              />
            </div>
          </div>

          {/* PSS-4 Perceived Stress */}
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                PSS-4 (Perceived Stress, Past Month)
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-6 bg-orange-50 rounded-lg p-3">
              In the last month, how often have you felt or thought...
            </p>
            
            <div className="space-y-6">
              <RatingScale
                name="pss4_unable_control"
                label="Unable to control important things in life"
                min={0}
                max={4}
                minLabel="Never"
                maxLabel="Very often"
                value={formData.pss4_unable_control}
              />
              <RatingScale
                name="pss4_confident_handle"
                label="Confident about ability to handle problems"
                min={0}
                max={4}
                minLabel="Never"
                maxLabel="Very often"
                value={formData.pss4_confident_handle}
              />
              <RatingScale
                name="pss4_going_your_way"
                label="Things were going your way"
                min={0}
                max={4}
                minLabel="Never"
                maxLabel="Very often"
                value={formData.pss4_going_your_way}
              />
              <RatingScale
                name="pss4_difficulties_piling"
                label="Difficulties were piling up too high to overcome"
                min={0}
                max={4}
                minLabel="Never"
                maxLabel="Very often"
                value={formData.pss4_difficulties_piling}
              />
            </div>
          </div>

          {/* Brief COPE */}
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Brief COPE Assessment
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-6 bg-purple-50 rounded-lg p-3">
              These items deal with ways you've been coping with stress in your life recently.
            </p>
            
            {/* Active Coping */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4 text-base sm:text-lg border-l-4 border-blue-500 pl-3">
                Active Coping
              </h3>
              <div className="space-y-6">
                <RatingScale
                  name="cope_concentrating_efforts"
                  label="I've been concentrating my efforts on doing something about the situation I'm in"
                  min={1}
                  max={4}
                  minLabel="Not at all"
                  maxLabel="A lot"
                  value={formData.cope_concentrating_efforts}
                />
                <RatingScale
                  name="cope_taking_action"
                  label="I've been taking action to try to make the situation better"
                  min={1}
                  max={4}
                  minLabel="Not at all"
                  maxLabel="A lot"
                  value={formData.cope_taking_action}
                />
              </div>
            </div>

            {/* Planning */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4 text-base sm:text-lg border-l-4 border-green-500 pl-3">
                Planning
              </h3>
              <div className="space-y-6">
                <RatingScale
                  name="cope_strategy"
                  label="I've been trying to come up with a strategy about what to do"
                  min={1}
                  max={4}
                  minLabel="Not at all"
                  maxLabel="A lot"
                  value={formData.cope_strategy}
                />
                <RatingScale
                  name="cope_thinking_steps"
                  label="I've been thinking hard about what steps to take"
                  min={1}
                  max={4}
                  minLabel="Not at all"
                  maxLabel="A lot"
                  value={formData.cope_thinking_steps}
                />
              </div>
            </div>

            {/* Positive Reframing */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4 text-base sm:text-lg border-l-4 border-yellow-500 pl-3">
                Positive Reframing
              </h3>
              <div className="space-y-6">
                <RatingScale
                  name="cope_different_light"
                  label="I've been trying to see it in a different light, to make it seem more positive"
                  min={1}
                  max={4}
                  minLabel="Not at all"
                  maxLabel="A lot"
                  value={formData.cope_different_light}
                />
                <RatingScale
                  name="cope_looking_good"
                  label="I've been looking for something good in what is happening"
                  min={1}
                  max={4}
                  minLabel="Not at all"
                  maxLabel="A lot"
                  value={formData.cope_looking_good}
                />
              </div>
            </div>

            {/* Acceptance */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4 text-base sm:text-lg border-l-4 border-indigo-500 pl-3">
                Acceptance
              </h3>
              <div className="space-y-6">
                <RatingScale
                  name="cope_accepting_reality"
                  label="I've been accepting the reality of the fact that it has happened"
                  min={1}
                  max={4}
                  minLabel="Not at all"
                  maxLabel="A lot"
                  value={formData.cope_accepting_reality}
                />
                <RatingScale
                  name="cope_learning_live"
                  label="I've been learning to live with it"
                  min={1}
                  max={4}
                  minLabel="Not at all"
                  maxLabel="A lot"
                  value={formData.cope_learning_live}
                />
              </div>
            </div>

            {/* Emotional Support */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4 text-base sm:text-lg border-l-4 border-pink-500 pl-3">
                Use of Emotional Support
              </h3>
              <div className="space-y-6">
                <RatingScale
                  name="cope_emotional_support"
                  label="I've been getting emotional support from others"
                  min={1}
                  max={4}
                  minLabel="Not at all"
                  maxLabel="A lot"
                  value={formData.cope_emotional_support}
                />
                <RatingScale
                  name="cope_comfort_understanding"
                  label="I've been getting comfort and understanding from someone"
                  min={1}
                  max={4}
                  minLabel="Not at all"
                  maxLabel="A lot"
                  value={formData.cope_comfort_understanding}
                />
              </div>
            </div>

            {/* Self-Distraction */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4 text-base sm:text-lg border-l-4 border-teal-500 pl-3">
                Self-Distraction
              </h3>
              <div className="space-y-6">
                <RatingScale
                  name="cope_work_activities"
                  label="I've been turning to work or other activities to take my mind off things"
                  min={1}
                  max={4}
                  minLabel="Not at all"
                  maxLabel="A lot"
                  value={formData.cope_work_activities}
                />
                <RatingScale
                  name="cope_movies_tv_reading"
                  label="I've been doing something to think about it less, such as going to movies, watching TV, reading, daydreaming, sleeping, or shopping"
                  min={1}
                  max={4}
                  minLabel="Not at all"
                  maxLabel="A lot"
                  value={formData.cope_movies_tv_reading}
                />
              </div>
            </div>

            {/* Self-Blame */}
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-4 text-base sm:text-lg border-l-4 border-red-500 pl-3">
                Self-Blame
              </h3>
              <div className="space-y-6">
                <RatingScale
                  name="cope_criticizing_myself"
                  label="I've been criticizing myself"
                  min={1}
                  max={4}
                  minLabel="Not at all"
                  maxLabel="A lot"
                  value={formData.cope_criticizing_myself}
                />
                <RatingScale
                  name="cope_blaming_myself"
                  label="I've been blaming myself for things that happened"
                  min={1}
                  max={4}
                  minLabel="Not at all"
                  maxLabel="A lot"
                  value={formData.cope_blaming_myself}
                />
              </div>
            </div>
          </div>

          {/* Burnout Assessment */}
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Burnout Assessment
              </h2>
            </div>
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-4">
                How would you rate your level of burnout? <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {[
                  { value: 'no_burnout', label: 'I enjoy my work. I have no symptoms of burnout.' },
                  { value: 'occasional_stress', label: 'Occasionally under stress.' },
                  { value: 'burning_out', label: 'Definitely burning out.' },
                  { value: 'symptoms_persist', label: "Symptoms won't go away." },
                  { value: 'completely_burned', label: 'Completely burned out.' }
                ].map((option) => (
                  <label key={option.value} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                    <input
                      type="radio"
                      name="burnout_level"
                      value={option.value}
                      checked={formData.burnout_level === option.value}
                      onChange={handleInputChange}
                      required
                      className="mt-0.5 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Open Text */}
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Additional Comments
              </h2>
            </div>
            <div>
              <label htmlFor="additional_comments" className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                Anything about your current stressors or supports you'd like to share?
              </label>
              <textarea
                id="additional_comments"
                name="additional_comments"
                rows={5}
                value={formData.additional_comments}
                onChange={handleInputChange}
                placeholder="Optional: Share your thoughts about current stressors, supports, or anything else you'd like us to know..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
              />
              <p className="text-xs text-gray-500 mt-2">This field is optional and completely anonymous.</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing your responses...
                </span>
              ) : (
                <>
                  Submit Assessment
                  <span className="ml-2">→</span>
                </>
              )}
            </button>
          </div>

          <div className="text-center text-xs sm:text-sm text-gray-500 bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <span>Secure & Anonymous</span>
            </div>
            <p>This form is completely anonymous and your responses will be used for research purposes only.</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PretestForm