const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(__dirname, 'prisma', 'dev.db');
const db = new Database(dbPath);

async function setupSuperAdmin() {
    try {
        console.log('🔧 Setting up SUPER_ADMIN access...\n');
        console.log('Database:', dbPath, '\n');

        // Check current roles
        console.log('📋 Current roles:');
        const roles = db.prepare('SELECT * FROM Role').all();
        roles.forEach(r => {
            console.log(`  - ${r.name}: ${r.permissions}`);
        });

        // Ensure SUPER_ADMIN role exists
        let superAdminRole = db.prepare('SELECT * FROM Role WHERE name = ?').get('SUPER_ADMIN');

        if (!superAdminRole) {
            console.log('\n Creating SUPER_ADMIN role...');
            const insert = db.prepare(`
                INSERT INTO Role (id, name, description, permissions, createdAt, updatedAt)
                VALUES (?, ?, ?, ?, ?, ?)
            `);
            const roleId = 'role_' + Date.now();
            const now = new Date().toISOString();
            insert.run(roleId, 'SUPER_ADMIN', 'Full system access', '["*:*"]', now, now);
            superAdminRole = { id: roleId };
            console.log('✅ SUPER_ADMIN role created');
        } else {
            console.log('\n✅ SUPER_ADMIN role exists');
            // Update permissions to ensure it has full access
            db.prepare('UPDATE Role SET permissions = ? WHERE id = ?').run('["*:*"]', superAdminRole.id);
        }

        // Check current admin users
        console.log('\n📋 Current admin users:');
        const admins = db.prepare(`
            SELECT au.email, au.name, r.name as role_name 
            FROM AdminUser au 
            LEFT JOIN Role r ON au.roleId = r.id
        `).all();
        admins.forEach(a => {
            console.log(`  - ${a.email} (${a.name}) - Role: ${a.role_name || 'NONE'}`);
        });

        // Update admin@ninja.com to SUPER_ADMIN
        const existingAdmin = db.prepare('SELECT * FROM AdminUser WHERE email = ?').get('admin@ninja.com');
        if (existingAdmin) {
            db.prepare('UPDATE AdminUser SET roleId = ?, isActive = 1 WHERE email = ?')
                .run(superAdminRole.id, 'admin@ninja.com');
            console.log('\n✅ Updated admin@ninja.com to SUPER_ADMIN role');
        }

        // Create or update superadmin@ninja.com
        const superAdmin = db.prepare('SELECT * FROM AdminUser WHERE email = ?').get('superadmin@ninja.com');
        const password = 'SuperAdmin@123';
        const hashedPassword = bcrypt.hashSync(password, 10);
        const now = new Date().toISOString();

        if (superAdmin) {
            db.prepare('UPDATE AdminUser SET password = ?, roleId = ?, isActive = 1, updatedAt = ? WHERE email = ?')
                .run(hashedPassword, superAdminRole.id, now, 'superadmin@ninja.com');
            console.log('✅ Updated superadmin@ninja.com');
        } else {
            const userId = 'user_' + Date.now();
            db.prepare(`
                INSERT INTO AdminUser (id, name, email, password, roleId, isActive, createdAt, updatedAt)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `).run(userId, 'Super Administrator', 'superadmin@ninja.com', hashedPassword, superAdminRole.id, 1, now, now);
            console.log('✅ Created superadmin@ninja.com');
        }

        console.log('\n═══════════════════════════════════════════════════════');
        console.log('🎉 SUPER ADMIN ACCESS CREDENTIALS');
        console.log('═══════════════════════════════════════════════════════');
        console.log('\n✨ OPTION 1 (NEW ACCOUNT):');
        console.log('📧 Email:    superadmin@ninja.com');
        console.log('🔑 Password: SuperAdmin@123');
        console.log('\n✨ OPTION 2 (EXISTING ACCOUNT - NOW UPGRADED):');
        console.log('📧 Email:    admin@ninja.com');
        console.log('🔑 Password: admin123');
        console.log('\n═══════════════════════════════════════════════════════');
        console.log('\n✅ Both accounts now have FULL SUPER_ADMIN access!');
        console.log('✅ All sidebar navigation options will be visible.');
        console.log('\n🔄 Please LOGOUT and LOGIN again to see the changes!\n');

    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    } finally {
        db.close();
    }
}

setupSuperAdmin().catch(console.error);
