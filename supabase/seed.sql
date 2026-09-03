-- Ajaia Docs Demo Users Seed
-- Run this in the Supabase SQL editor to create the demo users.

-- 1. Create Alice
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, confirmation_token, email_change, email_change_token_new, recovery_token)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    '00000000-0000-0000-0000-000000000000',
    'alice@ajaia-demo.com',
    crypt('demo-password-123', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"Alice"}',
    now(),
    now(),
    'authenticated',
    '',
    '',
    '',
    ''
) ON CONFLICT (id) DO NOTHING;

-- 2. Create Bob
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, confirmation_token, email_change, email_change_token_new, recovery_token)
VALUES (
    '22222222-2222-2222-2222-222222222222',
    '00000000-0000-0000-0000-000000000000',
    'bob@ajaia-demo.com',
    crypt('demo-password-123', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"Bob"}',
    now(),
    now(),
    'authenticated',
    '',
    '',
    '',
    ''
) ON CONFLICT (id) DO NOTHING;
