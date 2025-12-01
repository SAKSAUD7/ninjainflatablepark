const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'prisma', 'dev.db');
const db = new Database(dbPath);

try {
    console.log('🔧 Fixing role permissions...\n');

    // Update "Super Admin" role to have correct wildcard
    db.prepare('UPDATE Role SET permissions = ? WHERE name = ?')
        .run('["*:*"]', 'Super Admin');

    console.log('✅ Fixed "Super Admin" role permissions to ["*:*"]');

    // Show all roles
    console.log('\n📋 All roles after fix:');
    const roles = db.prepare('SELECT name, permissions FROM Role').all();
    roles.forEach(r => {
        console.log(`  - ${r.name}: ${r.permissions}`);
    });

    console.log('\n✅ All role permissions are now correct!');
    console.log('🔄 Please refresh the admin panel to see the changes.');

} catch (error) {
    console.error('❌ Error:', error);
    throw error;
} finally {
    db.close();
}
