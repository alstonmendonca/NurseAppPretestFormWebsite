-- Complete table recreation script for pretest_responses
-- This will drop and recreate the table with the correct structure

-- Drop the existing table (WARNING: This will delete all existing data)
DROP TABLE IF EXISTS pretest_responses;

-- Create the new table with auto-incrementing integer ID and all required columns
CREATE TABLE pretest_responses (
    -- Primary key with auto-increment
    id SERIAL PRIMARY KEY,
    
    -- Basic info
    participant_number INTEGER NOT NULL,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Eligibility & Consent (boolean fields)
    is_registered_nurse BOOLEAN NOT NULL,
    provides_consent BOOLEAN NOT NULL,
    understands_voluntary BOOLEAN NOT NULL,
    
    -- WHO-5 Well-Being Index (0-5 scale)
    who5_cheerful INTEGER NOT NULL CHECK (who5_cheerful >= 0 AND who5_cheerful <= 5),
    who5_calm INTEGER NOT NULL CHECK (who5_calm >= 0 AND who5_calm <= 5),
    who5_active INTEGER NOT NULL CHECK (who5_active >= 0 AND who5_active <= 5),
    who5_rested INTEGER NOT NULL CHECK (who5_rested >= 0 AND who5_rested <= 5),
    who5_interested INTEGER NOT NULL CHECK (who5_interested >= 0 AND who5_interested <= 5),
    
    -- PSS-4 Perceived Stress Scale (0-4 scale)
    pss4_unable_control INTEGER NOT NULL CHECK (pss4_unable_control >= 0 AND pss4_unable_control <= 4),
    pss4_confident_handle INTEGER NOT NULL CHECK (pss4_confident_handle >= 0 AND pss4_confident_handle <= 4),
    pss4_going_your_way INTEGER NOT NULL CHECK (pss4_going_your_way >= 0 AND pss4_going_your_way <= 4),
    pss4_difficulties_piling INTEGER NOT NULL CHECK (pss4_difficulties_piling >= 0 AND pss4_difficulties_piling <= 4),
    
    -- Brief COPE - Active Coping (1-4 scale)
    cope_concentrating_efforts INTEGER NOT NULL CHECK (cope_concentrating_efforts >= 1 AND cope_concentrating_efforts <= 4),
    cope_taking_action INTEGER NOT NULL CHECK (cope_taking_action >= 1 AND cope_taking_action <= 4),
    
    -- Brief COPE - Planning (1-4 scale)
    cope_strategy INTEGER NOT NULL CHECK (cope_strategy >= 1 AND cope_strategy <= 4),
    cope_thinking_steps INTEGER NOT NULL CHECK (cope_thinking_steps >= 1 AND cope_thinking_steps <= 4),
    
    -- Brief COPE - Positive Reframing (1-4 scale)
    cope_different_light INTEGER NOT NULL CHECK (cope_different_light >= 1 AND cope_different_light <= 4),
    cope_looking_good INTEGER NOT NULL CHECK (cope_looking_good >= 1 AND cope_looking_good <= 4),
    
    -- Brief COPE - Acceptance (1-4 scale)
    cope_accepting_reality INTEGER NOT NULL CHECK (cope_accepting_reality >= 1 AND cope_accepting_reality <= 4),
    cope_learning_live INTEGER NOT NULL CHECK (cope_learning_live >= 1 AND cope_learning_live <= 4),
    
    -- Brief COPE - Emotional Support (1-4 scale)
    cope_emotional_support INTEGER NOT NULL CHECK (cope_emotional_support >= 1 AND cope_emotional_support <= 4),
    cope_comfort_understanding INTEGER NOT NULL CHECK (cope_comfort_understanding >= 1 AND cope_comfort_understanding <= 4),
    
    -- Brief COPE - Self-Distraction (1-4 scale)
    cope_work_activities INTEGER NOT NULL CHECK (cope_work_activities >= 1 AND cope_work_activities <= 4),
    cope_movies_tv_reading INTEGER NOT NULL CHECK (cope_movies_tv_reading >= 1 AND cope_movies_tv_reading <= 4),
    
    -- Brief COPE - Self-Blame (1-4 scale)
    cope_criticizing_myself INTEGER NOT NULL CHECK (cope_criticizing_myself >= 1 AND cope_criticizing_myself <= 4),
    cope_blaming_myself INTEGER NOT NULL CHECK (cope_blaming_myself >= 1 AND cope_blaming_myself <= 4),
    
    -- Burnout Assessment (categorical)
    burnout_level VARCHAR(50) NOT NULL CHECK (burnout_level IN ('no_burnout', 'occasional_stress', 'burning_out', 'symptoms_persist', 'completely_burned')),
    
    -- Open text field
    additional_comments TEXT
);

-- Add column comments for documentation
COMMENT ON TABLE pretest_responses IS 'Pretest responses from healthcare professionals';
COMMENT ON COLUMN pretest_responses.id IS 'Auto-incrementing primary key (1, 2, 3, etc.)';
COMMENT ON COLUMN pretest_responses.participant_number IS 'Unique participant identifier';

COMMENT ON COLUMN pretest_responses.is_registered_nurse IS 'Eligibility: Registered nurse currently employed';
COMMENT ON COLUMN pretest_responses.provides_consent IS 'Eligibility: Provides informed consent to participate';
COMMENT ON COLUMN pretest_responses.understands_voluntary IS 'Eligibility: Understands participation is voluntary and anonymous';

COMMENT ON COLUMN pretest_responses.who5_cheerful IS 'WHO-5: I have felt cheerful and in good spirits (0-5)';
COMMENT ON COLUMN pretest_responses.who5_calm IS 'WHO-5: I have felt calm and relaxed (0-5)';
COMMENT ON COLUMN pretest_responses.who5_active IS 'WHO-5: I have felt active and vigorous (0-5)';
COMMENT ON COLUMN pretest_responses.who5_rested IS 'WHO-5: I woke up feeling fresh and rested (0-5)';
COMMENT ON COLUMN pretest_responses.who5_interested IS 'WHO-5: My daily life has been filled with things that interest me (0-5)';

COMMENT ON COLUMN pretest_responses.pss4_unable_control IS 'PSS-4: Unable to control important things in life (0-4)';
COMMENT ON COLUMN pretest_responses.pss4_confident_handle IS 'PSS-4: Felt confident about ability to handle problems - reverse scored (0-4)';
COMMENT ON COLUMN pretest_responses.pss4_going_your_way IS 'PSS-4: Felt things were going your way - reverse scored (0-4)';
COMMENT ON COLUMN pretest_responses.pss4_difficulties_piling IS 'PSS-4: Felt difficulties piling up too high (0-4)';

COMMENT ON COLUMN pretest_responses.burnout_level IS 'Single-item burnout assessment';
COMMENT ON COLUMN pretest_responses.additional_comments IS 'Open text: Current stressors or supports';

-- Create index on participant_number for faster lookups
CREATE INDEX idx_pretest_responses_participant_number ON pretest_responses(participant_number);

-- Enable Row Level Security (optional but recommended for Supabase)
ALTER TABLE pretest_responses ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow inserts (adjust as needed for your security requirements)
CREATE POLICY "Allow public inserts" ON pretest_responses
    FOR INSERT WITH CHECK (true);

-- Create a policy to allow reading your own data (optional)
CREATE POLICY "Allow reading own data" ON pretest_responses
    FOR SELECT USING (true);