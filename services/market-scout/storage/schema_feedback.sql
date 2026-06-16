-- Run this SQL in your Supabase SQL Editor to create the peer_feedback table

CREATE TABLE IF NOT EXISTS peer_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) NOT NULL,
    reviewer_email TEXT NOT NULL,
    reviewer_role TEXT, -- e.g., 'peer', 'mentor', 'professor'
    dimension_scores JSONB NOT NULL, -- { "IQ": 70, "EQ": 85, "SQ": 90, "AQ": 75, "SpQ": 80 }
    feedback_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for faster lookups by student
CREATE INDEX IF NOT EXISTS idx_peer_feedback_student_id ON peer_feedback (student_id);
