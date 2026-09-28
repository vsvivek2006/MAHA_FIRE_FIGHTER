const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const idx = trimmed.indexOf('=');
    if (idx > -1) {
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
      env[key] = val;
    }
  }
}

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data: { users }, error } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error("List users error:", error);
    return;
  }
  console.log("Found users:", users.map(u => ({ id: u.id, email: u.email, app_metadata: u.app_metadata })));

  // Ensure admin user has role: 'superadmin' or 'admin'
  for (const user of users) {
    if (!user.app_metadata?.role) {
      console.log(`Setting role superadmin for ${user.email}...`);
      await supabase.auth.admin.updateUserById(user.id, {
        app_metadata: { role: 'superadmin' }
      });
      console.log(`Updated ${user.email} to superadmin!`);
    }
  }

  // Also check if 'posts' table exists
  const { data: tables, error: tableErr } = await supabase.from('posts').select('id').limit(1);
  if (tableErr) {
    console.log("posts table check error:", tableErr.message, tableErr.code);
  } else {
    console.log("posts table exists! Found rows:", tables);
  }
}

check();
