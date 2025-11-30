const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

// Use the correct database path
const dbPath = path.join(__dirname, 'dev.db');

console.log('🔧 FINAL FIX FOR ADMIN ACCESS\n');
console.log('Database path:', dbPath);
console.log('Database exists:', fs.existsSync(dbPath));
console.log('');

if (!fs.existsSync(dbPath)) {
    console.log('❌ Database file not found!');
    console.log('Looking for database files...\n');
    const prismaPath = path.join(__dirname, 'prisma', 'dev.db');
    if (fs.existsSync(prismaPath)) {
        console.log('✅ Found database at:', prismaPath);
        console.log('Using this database instead.\n');
        dbPath = prismaPath;
    }
}

try {
    const db = new Database(dbPath);

    // Check current admin
    console.log('📋 Current admin@ninja.com state:');
    const currentAdmin = db.prepare(`
        SELECT au.id, au.email, au.name, au.roleId, au.isActive, r.name as role_name, r.permissions
        FROM AdminUser au 
        LEFT JOIN Role r ON au.roleId = r.id 
        WHERE au.email = 'admin@ninja.com'
    `).get();

    if (!currentAdmin) {
        console.log('❌ admin@ninja.com does not exist in database!');
        db.close();
        process.exit(1);
    }

    console.log('   Email:', currentAdmin.email);
    console.log('   RoleId:', currentAdmin.roleId);
    console.log('   Role Name:', currentAdmin.role_name);
    console.log('   Permissions:', currentAdmin.permissions);
    console.log('');

    // Get or create SUPER_ADMIN role
    let superAdminRole = db.prepare('SELECT * FROM Role WHERE name = ?').get('SUPER_ADMIN');

    if (!superAdminRole) {
        console.log('Creating SUPER_ADMIN role...');
        const roleId = 'clx' + Date.now();
        const now = new Date().toISOString();
        db.prepare(`
            INSERT INTO Role (id, name, description, permissions, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?)
        `).run(roleId, 'SUPER_ADMIN', 'Full system access', '["*:*"]', now, now);
        superAdminRole = db.prepare('SELECT * FROM Role WHERE name = ?').get('SUPER_ADMIN');
        console.log('✅ Created SUPER_ADMIN role');
    }

    console.log('\n🔧 Updating admin@ninja.com to SUPER_ADMIN...');
    console.log('   Target RoleId:', superAdminRole.id);

    const updateResult = db.prepare(`
        UPDATE AdminUser 
        SET roleId = ?, isActive = 1, updatedAt = ?
        WHERE email = 'admin@ninja.com'
    `).run(superAdminRole.id, new Date().toISOString());

    console.log('   Changes made:', updateResult.changes);

    if (updateResult.changes === 0) {
        console.log('⚠️  No changes made - trying alternative approach...');
        // Try with explicit ID
        db.prepare(`
            UPDATE AdminUser 
            SET roleId = ?, isActive = 1
            WHERE id = ?
        `).run(superAdminRole.id, currentAdmin.id);
    }

    // Verify
    const updatedAdmin = db.prepare(`
        SELECT au.email, au.roleId, r.name as role_name, r.permissions
        FROM AdminUser au 
        LEFT JOIN Role r ON au.roleId = r.id 
        WHERE au.email = 'admin@ninja.com'
    `).get();

    console.log('\n✅ FINAL STATE:');
    console.log('   Email:', updatedAdmin.email);
    console.log('   RoleId:', updatedAdmin.roleId);
    console.log('   Role:', updatedAdmin.role_name);
    console.log('   Permissions:', updatedAdmin.permissions);

    // Also handle superadmin@ninja.com
    const superadminExists = db.prepare('SELECT * FROM AdminUser WHERE email = ?').get('superadmin@ninja.com');
    const password = 'SuperAdmin@123';
    const hashedPassword = bcrypt.hashSync(password, 10);
    const now = new Date().toISOString();

    if (!superadminExists) {
        const userId = 'clx' + Date.now() + '_super';
        db.prepare(`
            INSERT INTO AdminUser (id, name, email, password, roleId, isActive, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).run(userId, 'Super Administrator', 'superadmin@ninja.com', hashedPassword, superAdminRole.id, 1, now, now);
        console.log('\n✅ Created superadmin@ninja.com');
    } else {
        db.prepare(`
            UPDATE AdminUser 
            SET password = ?, roleId = ?, isActive = 1, updatedAt = ?
            WHERE email = 'superadmin@ninja.com'
        `).run(hashedPassword, superAdminRole.id, now);
        console.log('\n✅ Updated superadmin@ninja.com');
    }

    db.close();

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('🎉 SUCCESS! Database updated.');
    console.log('═══════════════════════════════════════════════════════');
    console.log('\n📧 Email:    admin@ninja.com');
    console.log('🔑 Password: admin123');
    console.log('\n📧 Email:    superadmin@ninja.com');
    console.log('🔑 Password: SuperAdmin@123');
    console.log('\n⚠️  CRITICAL: You MUST do these steps:');
    console.log('   1. LOGOUT from admin panel');
    console.log('   2. CLEAR browser cookies OR use Incognito mode');
    console.log('   3. LOGIN again');
    console.log('\n   The old session cookie is caching the VIEWER role!');
    console.log('═══════════════════════════════════════════════════════\n');

} catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error);
    process.exit(1);
}
