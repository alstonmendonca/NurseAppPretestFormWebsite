-- SQL Schema Update for Pretest Responses Table
-- Run these commands in your Supabase SQL editor to update the schema

-- First, drop the old columns that are no longer needed
ALTER TABLE pretest_responses 
DROP COLUMN IF EXISTS how_was_day,
DROP COLUMN IF EXISTS how_do_you_feel;

-- Rename the existing additional_comments column to match new naming
ALTER TABLE pretest_responses 
RENAME COLUMN additional_comments TO additional_comments_old;

-- Change ID column from UUID to auto-incrementing integer
-- First, drop the existing UUID id column
ALTER TABLE pretest_responses DROP COLUMN id;

-- Add new auto-incrementing integer ID column as primary key
ALTER TABLE pretest_responses 
ADD COLUMN id SERIAL PRIMARY KEY;

-- Add new columns for eligibility and consent
ALTER TABLE pretest_responses 
ADD COLUMN is_registered_nurse BOOLEAN,
ADD COLUMN provides_consent BOOLEAN,
ADD COLUMN understands_voluntary BOOLEAN;

-- Add WHO-5 Well-Being Index columns (0-5 scale)
ALTER TABLE pretest_responses 
ADD COLUMN who5_cheerful INTEGER CHECK (who5_cheerful >= 0 AND who5_cheerful <= 5),
ADD COLUMN who5_calm INTEGER CHECK (who5_calm >= 0 AND who5_calm <= 5),
ADD COLUMN who5_active INTEGER CHECK (who5_active >= 0 AND who5_active <= 5),
ADD COLUMN who5_rested INTEGER CHECK (who5_rested >= 0 AND who5_rested <= 5),
ADD COLUMN who5_interested INTEGER CHECK (who5_interested >= 0 AND who5_interested <= 5);

-- Add PSS-4 Perceived Stress Scale columns (0-4 scale)
ALTER TABLE pretest_responses 
ADD COLUMN pss4_unable_control INTEGER CHECK (pss4_unable_control >= 0 AND pss4_unable_control <= 4),
ADD COLUMN pss4_confident_handle INTEGER CHECK (pss4_confident_handle >= 0 AND pss4_confident_handle <= 4),
ADD COLUMN pss4_going_your_way INTEGER CHECK (pss4_going_your_way >= 0 AND pss4_going_your_way <= 4),
ADD COLUMN pss4_difficulties_piling INTEGER CHECK (pss4_difficulties_piling >= 0 AND pss4_difficulties_piling <= 4);

-- Add Brief COPE - Active Coping columns (1-4 scale)
ALTER TABLE pretest_responses 
ADD COLUMN cope_concentrating_efforts INTEGER CHECK (cope_concentrating_efforts >= 1 AND cope_concentrating_efforts <= 4),
ADD COLUMN cope_taking_action INTEGER CHECK (cope_taking_action >= 1 AND cope_taking_action <= 4);

-- Add Brief COPE - Planning columns (1-4 scale)
ALTER TABLE pretest_responses 
ADD COLUMN cope_strategy INTEGER CHECK (cope_strategy >= 1 AND cope_strategy <= 4),
ADD COLUMN cope_thinking_steps INTEGER CHECK (cope_thinking_steps >= 1 AND cope_thinking_steps <= 4);

-- Add Brief COPE - Positive Reframing columns (1-4 scale)
ALTER TABLE pretest_responses 
ADD COLUMN cope_different_light INTEGER CHECK (cope_different_light >= 1 AND cope_different_light <= 4),
ADD COLUMN cope_looking_good INTEGER CHECK (cope_looking_good >= 1 AND cope_looking_good <= 4);

-- Add Brief COPE - Acceptance columns (1-4 scale)
ALTER TABLE pretest_responses 
ADD COLUMN cope_accepting_reality INTEGER CHECK (cope_accepting_reality >= 1 AND cope_accepting_reality <= 4),
ADD COLUMN cope_learning_live INTEGER CHECK (cope_learning_live >= 1 AND cope_learning_live <= 4);

-- Add Brief COPE - Emotional Support columns (1-4 scale)
ALTER TABLE pretest_responses 
ADD COLUMN cope_emotional_support INTEGER CHECK (cope_emotional_support >= 1 AND cope_emotional_support <= 4),
ADD COLUMN cope_comfort_understanding INTEGER CHECK (cope_comfort_understanding >= 1 AND cope_comfort_understanding <= 4);

-- Add Brief COPE - Self-Distraction columns (1-4 scale)
ALTER TABLE pretest_responses 
ADD COLUMN cope_work_activities INTEGER CHECK (cope_work_activities >= 1 AND cope_work_activities <= 4),
ADD COLUMN cope_movies_tv_reading INTEGER CHECK (cope_movies_tv_reading >= 1 AND cope_movies_tv_reading <= 4);

-- Add Brief COPE - Self-Blame columns (1-4 scale)
ALTER TABLE pretest_responses 
ADD COLUMN cope_criticizing_myself INTEGER CHECK (cope_criticizing_myself >= 1 AND cope_criticizing_myself <= 4),
ADD COLUMN cope_blaming_myself INTEGER CHECK (cope_blaming_myself >= 1 AND cope_blaming_myself <= 4);

-- Add Burnout Assessment column
ALTER TABLE pretest_responses 
ADD COLUMN burnout_level VARCHAR(50) CHECK (burnout_level IN ('no_burnout', 'occasional_stress', 'burning_out', 'symptoms_persist', 'completely_burned'));

-- Add new additional comments column
ALTER TABLE pretest_responses 
ADD COLUMN additional_comments TEXT;

-- Optional: After confirming everything works, you can drop the old additional_comments column
-- ALTER TABLE pretest_responses DROP COLUMN additional_comments_old;

-- Add comments to columns for documentation
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