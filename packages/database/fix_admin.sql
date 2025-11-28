INSERT INTO Role (id, name, description, permissions, createdAt, updatedAt) 
VALUES ('role_superadmin', 'SUPER_ADMIN', 'Full access to everything', '["*:*"]', datetime('now'), datetime('now'));

UPDATE AdminUser SET roleId = 'role_superadmin' WHERE email = 'admin@ninja.com';
