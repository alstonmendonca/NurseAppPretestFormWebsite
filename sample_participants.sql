-- Sample data for testing the pretest form
-- Make sure you have some participants with id_used = false

-- Insert some test participants (adjust as needed)
INSERT INTO participants (participant_number, participant_password, id_used) VALUES
(1001, 'Pass123!', false),
(1002, 'Pass456!', false),
(1003, 'Pass789!', false),
(1004, 'PassABC!', false),
(1005, 'PassXYZ!', false);

-- Check current participants
SELECT participant_number, participant_password, id_used, created_at 
FROM participants 
ORDER BY participant_number;