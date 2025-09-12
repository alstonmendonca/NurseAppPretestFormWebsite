-- SQL CREATE statement for pretest_responses table
-- This table stores the responses from the anonymous pretest form

CREATE TABLE pretest_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  participant_number INT4 REFERENCES participants(participant_number) ON DELETE CASCADE,
  how_was_day VARCHAR(50),
  how_do_you_feel VARCHAR(50),
  additional_comments TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optional: Create an index for better query performance
CREATE INDEX idx_pretest_responses_participant_number ON pretest_responses(participant_number);
CREATE INDEX idx_pretest_responses_submitted_at ON pretest_responses(submitted_at);

-- Optional: Add comments to document the table
COMMENT ON TABLE pretest_responses IS 'Stores anonymous pretest form responses from healthcare professionals';
COMMENT ON COLUMN pretest_responses.participant_number IS 'References the participant number who submitted the response';
COMMENT ON COLUMN pretest_responses.how_was_day IS 'Response to "How was your day?" question';
COMMENT ON COLUMN pretest_responses.how_do_you_feel IS 'Response to "How do you feel?" question';
COMMENT ON COLUMN pretest_responses.additional_comments IS 'Optional additional comments from the participant';
COMMENT ON COLUMN pretest_responses.submitted_at IS 'When the pretest form was submitted';