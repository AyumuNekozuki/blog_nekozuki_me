"use client";
import { createClient } from '@/libs/supabase/client';

const Page = async () => {
  const supabase = createClient();
  await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `http://localhost:3000/dashboard/auth/callback`,
    },
  });
  return (
    <></>
  )
}
export default Page;