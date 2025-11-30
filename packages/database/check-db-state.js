const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'prisma', 'dev.db');
const db = new Database(dbPath);

console.log('🔍 Checking database state...\n');
console.log('Database:', dbPath, '\n');

// Check all roles
console.log('═══════════════════════════════════════════════════════');
console.log('📋 ALL ROLES IN DATABASE:');
console.log('═══════════════════════════════════════════════════════');
const roles = db.prepare('SELECT * FROM Role').all();
roles.forEach(r => {
    console.log(`\nRole: ${r.name}`);
    console.log(`  ID: ${r.id}`);
    console.log(`  Description: ${r.description}`);
    console.log(`  Permissions: ${r.permissions}`);
});

// Check all admin users
console.log('\n\n═══════════════════════════════════════════════════════');
console.log('👥 ALL ADMIN USERS:');
console.log('═══════════════════════════════════════════════════════');
const admins = db.prepare(`
    SELECT au.id, au.email, au.name, au.roleId, au.isActive, r.name as role_name, r.permissions
    FROM AdminUser au 
    LEFT JOIN Role r ON au.roleId = r.id
`).all();

admins.forEach(a => {
    console.log(`\n📧 Email: ${a.email}`);
    console.log(`   Name: ${a.name}`);
    console.log(`   Role: ${a.role_name || 'NO ROLE'}`);
    console.log(`   RoleId: ${a.roleId || 'NONE'}`);
    console.log(`   Active: ${a.isActive ? 'YES' : 'NO'}`);
    console.log(`   Permissions: ${a.permissions || 'NONE'}`);
});

console.log('\n═══════════════════════════════════════════════════════\n');

db.close();
