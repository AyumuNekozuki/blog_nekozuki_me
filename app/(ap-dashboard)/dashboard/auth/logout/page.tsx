"use client";
import { createClient } from '@/libs/supabase/client';
import { useRouter } from 'next/navigation';

const Page = async () => {
  const supabase = createClient();
  const router = useRouter();

  await supabase.auth.signOut();
  router.push('/');

  return (
    <></>
  )
}
export default Page;