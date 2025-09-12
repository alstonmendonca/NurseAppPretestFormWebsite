# Healthcare Professional Pretest Form

An anonymous pretest form for healthcare professionals built with React, Vite, Tailwind CSS v4, and Supabase.

## Features

- 📝 Anonymous pretest form with healthcare-relevant questions
- 🔐 Automatic participant credential assignment from Supabase
- 🚀 Built with React + Vite for fast development and building
- 🎨 Styled with Tailwind CSS v4 (latest version with native CSS imports)
- ☁️ Ready for Vercel deployment
- 🔒 Secure credential handling with proper warnings

## Database Requirements

Your Supabase database should have the following table structure:

### Existing `participants` table
Your existing participants table should have these columns:
- `id` (UUID, Primary Key)
- `participant_number` (int4) 
- `participant_password` (text)
- `id_used` (boolean)
- `demographic_survey...` (boolean) 
- `created_at` (timestamptz)
- `last_active` (timestamptz)

### New `pretest_responses` table
Run the SQL from `pretest_responses_table.sql` to create this table:

```sql
CREATE TABLE pretest_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  participant_number INT4 REFERENCES participants(participant_number) ON DELETE CASCADE,
  how_was_day VARCHAR(50),
  how_do_you_feel VARCHAR(50),
  additional_comments TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://spytpzjvechwydrekrgj.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Local Development

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables in `.env`
4. Start the development server:
   ```bash
   npm run dev
   ```

## Building for Production

```bash
npm run build
```

## Deployment on Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
4. Deploy!

The `vercel.json` file is already configured for proper SPA routing.

## How It Works

1. User fills out the anonymous pretest form
2. On submission, the app queries Supabase for an unused participant record (`id_used = FALSE`)
3. The selected participant record is marked as used (`id_used = TRUE`)
4. Participant credentials are displayed to the user with security warnings
5. User is instructed to save the credentials securely for main assessment login

## Security Notes

- RLS is disabled on the participants table as mentioned in requirements
- Credentials are displayed only once and cannot be recovered
- Users are warned multiple times about credential security
- Clipboard copy functionality included for user convenience

## Troubleshooting

### "No available participant slots found" Error

If you're getting this error, check the following:

1. **Database Connection**: Ensure your Supabase URL and anon key are correct in the `.env` file
2. **Participants Table**: Make sure you have participants in your table with `id_used = false`
3. **RLS (Row Level Security)**: Ensure RLS is disabled on the participants table as mentioned in requirements
4. **Sample Data**: Run the SQL from `sample_participants.sql` to add test participants

### Adding Test Participants

Run this SQL in your Supabase SQL editor:

```sql
INSERT INTO participants (participant_number, participant_password, id_used) VALUES
(1001, 'Pass123!', false),
(1002, 'Pass456!', false),
(1003, 'Pass789!', false);
```

### Checking Available Participants

```sql
SELECT participant_number, participant_password, id_used 
FROM participants 
WHERE id_used = false 
## Technology Stack

- **Frontend**: React 19 + Vite 7
- **Styling**: Tailwind CSS v4 (with native CSS imports)
- **Database**: Supabase
- **Deployment**: Vercel
- **State Management**: React useState hooks

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# NurseAppPretestFormWebsite
