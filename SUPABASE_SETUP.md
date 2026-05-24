# Supabase Setup Guide for Stiemfield Analytics

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login.
2. Click "New Project" and fill in:
   - **Project Name:** `stiemfield-analytics`
   - **Database Password:** Create a strong password
   - **Region:** Choose closest to your users (e.g., Europe, US East)
3. Wait for the project to initialize (5-10 minutes).

## Step 2: Get API Credentials

1. In your Supabase project, go to **Settings > API**.
2. Copy the following:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **Anon Public Key** (starts with `eyJ...`)
3. Add these to your `.env.local` file:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

## Step 3: Create Database Tables

1. In Supabase, go to the **SQL Editor** tab.
2. Click "New Query" and paste the following SQL:

```sql
-- Create visitors table
CREATE TABLE visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) UNIQUE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  first_visit TIMESTAMP DEFAULT NOW(),
  last_visit TIMESTAMP DEFAULT NOW(),
  visit_count INT DEFAULT 1,
  country VARCHAR(100),
  device_type VARCHAR(50),
  referrer TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create page_views table
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id UUID NOT NULL REFERENCES visitors(id) ON DELETE CASCADE,
  page_path VARCHAR(255) NOT NULL,
  page_title VARCHAR(255),
  time_on_page INT,
  scroll_depth INT,
  timestamp TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create service_interests table
CREATE TABLE service_interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id UUID NOT NULL REFERENCES visitors(id) ON DELETE CASCADE,
  service_name VARCHAR(100) NOT NULL,
  action_type VARCHAR(50) NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id UUID REFERENCES visitors(id) ON DELETE SET NULL,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  company VARCHAR(255),
  service_interest VARCHAR(100),
  message TEXT,
  lead_source VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new',
  timestamp TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create content_downloads table
CREATE TABLE content_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id UUID REFERENCES visitors(id) ON DELETE SET NULL,
  email VARCHAR(255) NOT NULL,
  content_id VARCHAR(100) NOT NULL,
  content_title VARCHAR(255),
  download_timestamp TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create premium_content table
CREATE TABLE premium_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content_type VARCHAR(50),
  file_url TEXT,
  price_usd DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create conversions table
CREATE TABLE conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id UUID REFERENCES visitors(id) ON DELETE SET NULL,
  conversion_type VARCHAR(100) NOT NULL,
  value_usd DECIMAL(10, 2),
  details JSONB,
  timestamp TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_visitors_session_id ON visitors(session_id);
CREATE INDEX idx_page_views_visitor_id ON page_views(visitor_id);
CREATE INDEX idx_service_interests_visitor_id ON service_interests(visitor_id);
CREATE INDEX idx_leads_visitor_id ON leads(visitor_id);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_conversions_visitor_id ON conversions(visitor_id);
```

3. Click "Run" to execute the SQL.

## Step 4: Enable Row Level Security (RLS)

1. Go to **Authentication > Policies** in Supabase.
2. For each table, enable RLS:
   - Click on the table name
   - Toggle "Enable RLS"
3. Create a policy to allow anonymous inserts:
   - Click "New Policy"
   - Select "For INSERT"
   - Set condition: `true` (allow all)
   - Click "Save"

Repeat this for all tables: `visitors`, `page_views`, `service_interests`, `leads`, `content_downloads`, `conversions`.

## Step 5: Deploy to Netlify

1. Go to your Netlify site settings.
2. Navigate to **Build & Deploy > Environment**.
3. Add the following environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Step 6: Test the Integration

1. Deploy your changes to Netlify.
2. Visit your website.
3. Go to Supabase and check the `visitors` and `page_views` tables to confirm data is being recorded.

## Monitoring & Optimization

### Weekly Tasks
- Check Analytics Dashboard: Review visitor trends, lead sources, and service interest.
- Qualify Leads: Review new leads in the `leads` table and follow up with qualified prospects.
- Analyze Conversion Funnel: Track which pages drive the most conversions.

### Monthly Tasks
- Generate Reports: Create a summary of key metrics (visitors, leads, conversions).
- Optimize Content: Update resources based on visitor behavior and feedback.
- A/B Test CTAs: Test different call-to-action copy and placement.

### Quarterly Tasks
- Review Revenue: Calculate revenue from Fieldscan bookings, affiliate commissions, and other channels.
- Expand Content: Create new premium resources based on visitor interests.
- Refine Pricing: Adjust service pricing based on market feedback and demand.

## Troubleshooting

### Issue: Analytics not recording

**Solution:**
1. Check browser console for errors.
2. Verify Supabase credentials in `.env.local`.
3. Ensure RLS policies allow inserts.
4. Check Supabase project status in the dashboard.

### Issue: Slow page loads

**Solution:**
1. Analytics tracking is already asynchronous.
2. Use Supabase's real-time features sparingly.
3. Cache analytics data on the client side.

### Issue: High bounce rate on resources page

**Solution:**
1. Simplify the email gate (consider making it optional initially).
2. Add preview images or descriptions of premium content.
3. Offer a free resource to build trust before asking for email.

## Support

For questions or issues:
- **Supabase Docs:** https://supabase.com/docs
- **React Docs:** https://react.dev
- **Netlify Docs:** https://docs.netlify.com
