-- Sample Data for VinaJet Agent System Testing
-- Run this AFTER creating the schema and setting up authentication

-- 1. Insert sample user profiles (these will be linked to Supabase auth users)
-- Note: In production, these would be created automatically via triggers when users sign up

-- Sample regular user
INSERT INTO user_profiles (
  id,
  user_id, -- This should match actual Supabase auth user IDs
  email,
  full_name,
  first_name,
  last_name,
  avatar_url,
  phone,
  provider
) VALUES (
  uuid_generate_v4(),
  uuid_generate_v4(), -- Replace with actual auth user ID
  'user@example.com',
  'Nguyễn Văn An',
  'An',
  'Nguyễn Văn',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  '0901234567',
  'email'
);

-- 2. Insert sample agents with different tiers

-- Demo Elite Agent
INSERT INTO agents (
  id,
  user_id, -- This should match actual Supabase auth user ID
  email,
  full_name,
  first_name,
  last_name,
  avatar_url,
  phone,
  provider,
  current_tier,
  lifetime_tickets,
  current_quarter_tickets,
  commission_earned,
  current_quarter_commission,
  last_tier_update
) VALUES (
  uuid_generate_v4(),
  uuid_generate_v4(), -- Replace with actual auth user ID for agent@example.com
  'agent@example.com',
  'Trần Thị Loan',
  'Loan',
  'Trần Thị',
  'https://images.unsplash.com/photo-1494790108755-2616b612b606?w=100&h=100&fit=crop&crop=face',
  '0907654321',
  'email',
  'elite',
  22,
  12,
  850000,
  480000,
  NOW() - INTERVAL '30 days'
);

-- Sample Growth Agent
INSERT INTO agents (
  email,
  full_name,
  first_name,
  last_name,
  avatar_url,
  phone,
  provider,
  current_tier,
  lifetime_tickets,
  current_quarter_tickets,
  commission_earned,
  current_quarter_commission
) VALUES (
  'agent.growth@example.com',
  'Lê Văn Hưng',
  'Hưng',
  'Lê Văn',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  '0908765432',
  'email',
  'growth',
  5,
  3,
  75000,
  45000
);

-- Sample Prime Agent
INSERT INTO agents (
  email,
  full_name,
  first_name,
  last_name,
  avatar_url,
  phone,
  provider,
  current_tier,
  lifetime_tickets,
  current_quarter_tickets,
  commission_earned,
  current_quarter_commission
) VALUES (
  'agent.prime@example.com',
  'Phạm Thị Mai',
  'Mai',
  'Phạm Thị',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  '0909876543',
  'email',
  'prime',
  15,
  8,
  350000,
  200000
);

-- Sample Starter Agent (New)
INSERT INTO agents (
  email,
  full_name,
  first_name,
  last_name,
  phone,
  provider,
  current_tier,
  lifetime_tickets,
  current_quarter_tickets,
  commission_earned,
  current_quarter_commission
) VALUES (
  'agent.new@example.com',
  'Hoàng Minh Đức',
  'Đức',
  'Hoàng Minh',
  '0901112233',
  'email',
  'starter',
  1,
  1,
  10000,
  10000
);

-- 3. Insert agent tier history
INSERT INTO agent_tier_history (agent_id, tier, change_type)
SELECT id, 'starter', 'promotion' FROM agents WHERE email = 'agent@example.com';

INSERT INTO agent_tier_history (agent_id, tier, change_type)
SELECT id, 'growth', 'promotion' FROM agents WHERE email = 'agent@example.com';

INSERT INTO agent_tier_history (agent_id, tier, change_type)
SELECT id, 'prime', 'promotion' FROM agents WHERE email = 'agent@example.com';

INSERT INTO agent_tier_history (agent_id, tier, change_type)
SELECT id, 'elite', 'promotion' FROM agents WHERE email = 'agent@example.com';

-- 4. Insert sample bookings with various statuses

-- Completed booking with issued ticket (eligible for commission)
INSERT INTO bookings (
  tr_code,
  booking_key,
  status,
  payment_status,
  ticket_issued,
  ticket_issued_at,
  total_amount,
  currency,
  passenger_count,
  flights,
  passengers,
  contact,
  payment_expired_at,
  expired_date,
  referral_agent_id,
  referral_source
) VALUES (
  'VJ240101001',
  'BOOKING_KEY_001',
  'confirmed',
  'paid',
  true,
  NOW() - INTERVAL '5 days',
  2580000,
  'VND',
  2,
  '[{
    "id": "flight_1",
    "from": "SGN",
    "fromName": "Sân bay Tân Sơn Nhất",
    "to": "HAN",
    "toName": "Sân bay Nội Bài",
    "departDate": "2024-01-15T08:00:00Z",
    "returnDate": "2024-01-20T18:00:00Z",
    "flightNumber": "VJ123",
    "airline": "VJ",
    "airlineName": "VietJet Air",
    "class": "Economy",
    "duration": 125
  }]',
  '[{
    "id": "pax_1",
    "type": "adult",
    "firstName": "Nguyễn Văn An",
    "birthDate": "1990-05-15",
    "gender": "male"
  }, {
    "id": "pax_2",
    "type": "adult",
    "firstName": "Trần Thị Lan",
    "birthDate": "1992-08-20",
    "gender": "female"
  }]',
  '{
    "name": "Nguyễn Văn An",
    "email": "user@example.com",
    "phone": "0901234567"
  }',
  NOW() + INTERVAL '23 hours',
  NOW() + INTERVAL '30 days',
  (SELECT id FROM agents WHERE email = 'agent@example.com'),
  'contact_email'
);

-- Pending booking (not yet issued)
INSERT INTO bookings (
  tr_code,
  booking_key,
  status,
  payment_status,
  ticket_issued,
  total_amount,
  currency,
  passenger_count,
  flights,
  passengers,
  contact,
  payment_expired_at,
  expired_date,
  referral_agent_id,
  referral_source
) VALUES (
  'VJ240101002',
  'BOOKING_KEY_002',
  'confirmed',
  'paid',
  false,
  1890000,
  'VND',
  1,
  '[{
    "id": "flight_2",
    "from": "HAN",
    "fromName": "Sân bay Nội Bài",
    "to": "DAD",
    "toName": "Sân bay Đà Nẵng",
    "departDate": "2024-02-10T14:30:00Z",
    "flightNumber": "VJ456",
    "airline": "VJ",
    "airlineName": "VietJet Air",
    "class": "Economy",
    "duration": 95
  }]',
  '[{
    "id": "pax_3",
    "type": "adult",
    "firstName": "Lê Thị Hoa",
    "birthDate": "1995-03-12",
    "gender": "female"
  }]',
  '{
    "name": "Lê Thị Hoa",
    "email": "agent.growth@example.com",
    "phone": "0902345678"
  }',
  NOW() + INTERVAL '20 hours',
  NOW() + INTERVAL '25 days',
  (SELECT id FROM agents WHERE email = 'agent.growth@example.com'),
  'contact_email'
);

-- Expired booking (for testing expired payment)
INSERT INTO bookings (
  tr_code,
  booking_key,
  status,
  payment_status,
  ticket_issued,
  total_amount,
  currency,
  passenger_count,
  flights,
  passengers,
  contact,
  payment_expired_at,
  expired_date,
  referral_agent_id,
  referral_source
) VALUES (
  'VJ240101003',
  'BOOKING_KEY_003',
  'pending',
  'pending',
  false,
  3200000,
  'VND',
  3,
  '[{
    "id": "flight_3",
    "from": "SGN",
    "fromName": "Sân bay Tân Sơn Nhất",
    "to": "PQC",
    "toName": "Sân bay Phú Quốc",
    "departDate": "2024-03-01T09:15:00Z",
    "flightNumber": "VJ789",
    "airline": "VJ",
    "airlineName": "VietJet Air",
    "class": "Economy",
    "duration": 60
  }]',
  '[{
    "id": "pax_4",
    "type": "adult",
    "firstName": "Võ Minh Tuấn",
    "birthDate": "1988-07-25",
    "gender": "male"
  }, {
    "id": "pax_5",
    "type": "adult",
    "firstName": "Ngô Thị Linh",
    "birthDate": "1990-11-08",
    "gender": "female"
  }, {
    "id": "pax_6",
    "type": "child",
    "firstName": "Võ Minh An",
    "birthDate": "2018-05-10",
    "gender": "male"
  }]',
  '{
    "name": "Võ Minh Tuấn",
    "email": "customer@example.com",
    "phone": "0903456789"
  }',
  NOW() - INTERVAL '2 hours',
  NOW() + INTERVAL '20 days',
  (SELECT id FROM agents WHERE email = 'agent.prime@example.com'),
  'login'
);

-- Recent successful booking
INSERT INTO bookings (
  tr_code,
  booking_key,
  status,
  payment_status,
  ticket_issued,
  ticket_issued_at,
  total_amount,
  currency,
  passenger_count,
  flights,
  passengers,
  contact,
  payment_expired_at,
  expired_date,
  referral_agent_id,
  referral_source
) VALUES (
  'VJ240101004',
  'BOOKING_KEY_004',
  'confirmed',
  'paid',
  true,
  NOW() - INTERVAL '1 day',
  1450000,
  'VND',
  1,
  '[{
    "id": "flight_4",
    "from": "HAN",
    "fromName": "Sân bay Nội Bài",
    "to": "SGN",
    "toName": "Sân bay Tân Sơn Nhất",
    "departDate": "2024-02-05T16:45:00Z",
    "flightNumber": "VJ101",
    "airline": "VJ",
    "airlineName": "VietJet Air",
    "class": "SkyBoss",
    "duration": 125
  }]',
  '[{
    "id": "pax_7",
    "type": "adult",
    "firstName": "Đặng Văn Hải",
    "birthDate": "1985-12-15",
    "gender": "male"
  }]',
  '{
    "name": "Đặng Văn Hải",
    "email": "agent.new@example.com",
    "phone": "0904567890"
  }',
  NOW() - INTERVAL '1 day',
  NOW() + INTERVAL '15 days',
  (SELECT id FROM agents WHERE email = 'agent.new@example.com'),
  'contact_email'
);

-- 5. Function to refresh agent statistics
CREATE OR REPLACE FUNCTION refresh_agent_statistics()
RETURNS void AS $$
DECLARE
  agent_record RECORD;
  lifetime_count INTEGER;
  quarter_count INTEGER;
  lifetime_commission DECIMAL(12,2);
  quarter_commission DECIMAL(12,2);
  quarter_start TIMESTAMP;
  quarter_end TIMESTAMP;
BEGIN
  -- Calculate current quarter dates
  quarter_start := DATE_TRUNC('quarter', CURRENT_DATE);
  quarter_end := quarter_start + INTERVAL '3 months' - INTERVAL '1 day';

  -- Update statistics for each agent
  FOR agent_record IN SELECT id FROM agents LOOP

    -- Count lifetime eligible tickets
    SELECT COALESCE(SUM(
      CASE WHEN b.ticket_issued AND b.status NOT IN ('cancelled', 'refunded')
           AND EXISTS(
             SELECT 1 FROM jsonb_array_elements(b.flights) AS flight
             WHERE (flight->>'departDate')::timestamp + interval '1 day' <= NOW()
           )
      THEN b.passenger_count
      ELSE 0 END
    ), 0) INTO lifetime_count
    FROM bookings b
    WHERE b.referral_agent_id = agent_record.id;

    -- Count current quarter eligible tickets
    SELECT COALESCE(SUM(
      CASE WHEN b.ticket_issued AND b.status NOT IN ('cancelled', 'refunded')
           AND EXISTS(
             SELECT 1 FROM jsonb_array_elements(b.flights) AS flight
             WHERE (flight->>'departDate')::timestamp + interval '1 day' <= NOW()
           )
           AND b.created_at >= quarter_start
      THEN b.passenger_count
      ELSE 0 END
    ), 0) INTO quarter_count
    FROM bookings b
    WHERE b.referral_agent_id = agent_record.id;

    -- Calculate commissions from agent_tickets
    SELECT COALESCE(SUM(commission_amount), 0) INTO lifetime_commission
    FROM agent_tickets
    WHERE agent_id = agent_record.id AND is_commission_eligible = true;

    SELECT COALESCE(SUM(commission_amount), 0) INTO quarter_commission
    FROM agent_tickets
    WHERE agent_id = agent_record.id
      AND is_commission_eligible = true
      AND created_at >= quarter_start;

    -- Update agent statistics
    UPDATE agents SET
      lifetime_tickets = lifetime_count,
      current_quarter_tickets = quarter_count,
      commission_earned = lifetime_commission,
      current_quarter_commission = quarter_commission,
      updated_at = NOW()
    WHERE id = agent_record.id;

  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Run the statistics refresh
SELECT refresh_agent_statistics();

-- 6. Create a scheduled function to check for tier promotions
CREATE OR REPLACE FUNCTION check_tier_promotions()
RETURNS void AS $$
DECLARE
  agent_record RECORD;
  new_tier TEXT;
BEGIN
  FOR agent_record IN
    SELECT id, current_tier, lifetime_tickets, email, full_name
    FROM agents
    WHERE is_active = true
  LOOP

    -- Determine new tier based on lifetime tickets
    new_tier := CASE
      WHEN agent_record.lifetime_tickets >= 100 THEN 'legend'
      WHEN agent_record.lifetime_tickets >= 20 THEN 'elite'
      WHEN agent_record.lifetime_tickets >= 10 THEN 'prime'
      WHEN agent_record.lifetime_tickets >= 3 THEN 'growth'
      ELSE 'starter'
    END;

    -- Update tier if promotion is needed
    IF new_tier != agent_record.current_tier THEN

      -- Update agent tier
      UPDATE agents SET
        current_tier = new_tier,
        last_tier_update = NOW(),
        updated_at = NOW()
      WHERE id = agent_record.id;

      -- Log tier change
      INSERT INTO agent_tier_history (agent_id, tier, change_type)
      VALUES (agent_record.id, new_tier, 'promotion');

      -- Log the promotion
      RAISE NOTICE 'Agent % (%) promoted from % to %',
        agent_record.full_name,
        agent_record.email,
        agent_record.current_tier,
        new_tier;

    END IF;

  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Run tier promotion check
SELECT check_tier_promotions();

-- 7. Display summary of sample data
SELECT
  'AGENTS SUMMARY' as type,
  current_tier,
  COUNT(*) as count,
  AVG(lifetime_tickets) as avg_lifetime_tickets,
  AVG(commission_earned) as avg_commission
FROM agents
GROUP BY current_tier
ORDER BY
  CASE current_tier
    WHEN 'starter' THEN 1
    WHEN 'growth' THEN 2
    WHEN 'prime' THEN 3
    WHEN 'elite' THEN 4
    WHEN 'legend' THEN 5
  END;

SELECT
  'BOOKINGS SUMMARY' as type,
  status,
  ticket_issued,
  COUNT(*) as count,
  SUM(total_amount) as total_value,
  SUM(passenger_count) as total_passengers
FROM bookings
GROUP BY status, ticket_issued
ORDER BY status, ticket_issued;
