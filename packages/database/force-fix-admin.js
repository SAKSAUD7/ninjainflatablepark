const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(__dirname, 'prisma', 'dev.db');
const db = new Database(dbPath);

async function forceFixAdmin() {
    try {
        console.log('🔧 FORCE FIXING ADMIN PERMISSIONS...\n');

        // First, let's see what we have
        console.log('Current state:');
        const currentAdmin = db.prepare(`
            SELECT au.*, r.name as role_name, r.permissions 
            FROM AdminUser au 
            LEFT JOIN Role r ON au.roleId = r.id 
            WHERE au.email = 'admin@ninja.com'
        `).get();

        console.log('Admin user:', currentAdmin);

        // Get SUPER_ADMIN role
        let superAdminRole = db.prepare('SELECT * FROM Role WHERE name = ?').get('SUPER_ADMIN');

        if (!superAdminRole) {
            console.log('\n❌ SUPER_ADMIN role does not exist! Creating it...');
            const roleId = 'role_superadmin_' + Date.now();
            const now = new Date().toISOString();
            db.prepare(`
                INSERT INTO Role (id, name, description, permissions, createdAt, updatedAt)
                VALUES (?, ?, ?, ?, ?, ?)
            `).run(roleId, 'SUPER_ADMIN', 'Full system access', '["*:*"]', now, now);
            superAdminRole = { id: roleId };
            console.log('✅ Created SUPER_ADMIN role with ID:', roleId);
        } else {
            console.log('\n✅ SUPER_ADMIN role exists with ID:', superAdminRole.id);
            console.log('   Permissions:', superAdminRole.permissions);
        }

        // Update admin user - FORCE the roleId
        console.log('\n🔧 Updating admin@ninja.com roleId to:', superAdminRole.id);
        const result = db.prepare(`
            UPDATE AdminUser 
            SET roleId = ?, isActive = 1, updatedAt = ?
            WHERE email = 'admin@ninja.com'
        `).run(superAdminRole.id, new Date().toISOString());

        console.log('Update result:', result);

        // Verify the update
        const verifyAdmin = db.prepare(`
            SELECT au.email, au.name, au.roleId, au.isActive, r.name as role_name, r.permissions
            FROM AdminUser au 
            LEFT JOIN Role r ON au.roleId = r.id 
            WHERE au.email = 'admin@ninja.com'
        `).get();

        console.log('\n✅ VERIFICATION:');
        console.log('   Email:', verifyAdmin.email);
        console.log('   Name:', verifyAdmin.name);
        console.log('   RoleId:', verifyAdmin.roleId);
        console.log('   Role Name:', verifyAdmin.role_name);
        console.log('   Permissions:', verifyAdmin.permissions);
        console.log('   Active:', verifyAdmin.isActive);

        // Also create superadmin@ninja.com
        const superadminExists = db.prepare('SELECT * FROM AdminUser WHERE email = ?').get('superadmin@ninja.com');
        const password = 'SuperAdmin@123';
        const hashedPassword = bcrypt.hashSync(password, 10);
        const now = new Date().toISOString();

        if (!superadminExists) {
            const userId = 'user_superadmin_' + Date.now();
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

        console.log('\n═══════════════════════════════════════════════════════');
        console.log('🎉 ADMIN ACCESS FIXED!');
        console.log('═══════════════════════════════════════════════════════');
        console.log('\n📧 Email:    admin@ninja.com');
        console.log('🔑 Password: admin123');
        console.log('👤 Role:     SUPER_ADMIN');
        console.log('🔐 Permissions: ["*:*"]');
        console.log('\n--- OR ---\n');
        console.log('📧 Email:    superadmin@ninja.com');
        console.log('🔑 Password: SuperAdmin@123');
        console.log('👤 Role:     SUPER_ADMIN');
        console.log('🔐 Permissions: ["*:*"]');
        console.log('\n═══════════════════════════════════════════════════════');
        console.log('\n⚠️  IMPORTANT: You MUST logout completely and login again!');
        console.log('⚠️  Clear your browser cookies if the issue persists.\n');

    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    } finally {
        db.close();
    }
}

forceFixAdmin().catch(console.error);
