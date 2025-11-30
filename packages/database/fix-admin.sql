-- Fix admin user role to SUPER_ADMIN

-- First, let's see current state
SELECT 
    au.email,
    au.name,
    r.name as role_name,
    r.permissions
FROM AdminUser au
LEFT JOIN Role r ON au.roleId = r.id
WHERE au.email = 'admin@ninja.com';

-- Update admin user to SUPER_ADMIN role
UPDATE AdminUser 
SET roleId = (SELECT id FROM Role WHERE name = 'SUPER_ADMIN')
WHERE email = 'admin@ninja.com';

-- Verify the update
SELECT 
    au.email,
    au.name,
    r.name as role_name,
    r.permissions
FROM AdminUser au
LEFT JOIN Role r ON au.roleId = r.id
WHERE au.email = 'admin@ninja.com';
