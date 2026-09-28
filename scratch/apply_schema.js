const https = require('https');

const SUPABASE_API_TOKEN = process.env.SUPABASE_ACCESS_TOKEN || ''; // set via env, never commit secrets
const PROJECT_REF = 'tvpnnitwigmttlomgdmf';

const sql = `
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  meta_description TEXT,
  cover_image_url TEXT,
  author TEXT NOT NULL DEFAULT 'Maha Firefighters Team',
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  source TEXT NOT NULL DEFAULT 'manual' CHECK (source IN ('manual', 'ai', 'ai-edited')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON public.posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON public.posts(published_at DESC);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published posts" ON public.posts;
CREATE POLICY "Public can view published posts"
  ON public.posts
  FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "Service role has full access" ON public.posts;
CREATE POLICY "Service role has full access"
  ON public.posts
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Admins have full access" ON public.posts;
CREATE POLICY "Admins have full access"
  ON public.posts
  FOR ALL
  TO authenticated
  USING (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') IN ('superadmin', 'admin', 'editor')
  )
  WITH CHECK (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') IN ('superadmin', 'admin', 'editor')
  );

-- Create blog-images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Access blog-images" ON storage.objects;
CREATE POLICY "Public Access blog-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

DROP POLICY IF EXISTS "Authenticated upload blog-images" ON storage.objects;
CREATE POLICY "Authenticated upload blog-images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog-images');

DROP POLICY IF EXISTS "Service role upload blog-images" ON storage.objects;
CREATE POLICY "Service role upload blog-images"
  ON storage.objects FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
`;

const postData = JSON.stringify({ query: sql });

const options = {
  hostname: 'api.supabase.com',
  port: 443,
  path: `/v1/projects/${PROJECT_REF}/database/query`,
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${SUPABASE_API_TOKEN}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (d) => { body += d; });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', body);
  });
});

req.on('error', (e) => {
  console.error('Error:', e);
});

req.write(postData);
req.end();
