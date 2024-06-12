'use client';
import Link from 'next/link';
import { createClient } from '@/libs/supabase/client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const DashboardHeader = () => {
  const [loggingUser, setLoggingUser]: any = useState(null);
  const supabase = createClient();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const getuser = await supabase.auth.getUser();
    if (getuser.data.user) {
      setLoggingUser(getuser.data.user);
    } else {
      setLoggingUser(null);
    }
  };

  return (
    <header className='p-4 pt-3 shadow-md bg-theme_light-bg-current flex justify-between text-sm text-theme_light-text-current'>
      <div className='flex gap-2 items-center'>
        <h1 className='font-bold'>
          <Link href='/dashboard' className='px-2 py-1 block focus:outline-none focus:ring-2 rounded-md ring-theme_light-current'>
            Activity Pub Dashboard
          </Link>
        </h1>
        <Link href='/' className='px-2 py-1 block focus:outline-none focus:ring-2 rounded-md ring-theme_light-current'>
          Back to Home
        </Link>
      </div>
      <div className='flex gap-2 items-center'>
        {loggingUser && (
          <div className='flex items-center justify-center gap-2 pr-4 border-r-2 border-theme_light-text-sub2'>
            <img className=' aspect-square flex-shrink-0 block w-6 h-6 rounded-full bg-theme_light-text-sub2' src={loggingUser.user_metadata.avatar_url} alt='' />
            {loggingUser.user_metadata.name}
          </div>
        )}

        {!loggingUser ? (
          <Link href='/dashboard/auth/login' className='px-2 py-1 block focus:outline-none focus:ring-2 rounded-md ring-theme_light-current'>
            Login
          </Link>
        ) : (
          <Link href='/dashboard/auth/logout' className='px-2 py-1 block focus:outline-none focus:ring-2 rounded-md ring-theme_light-current'>
            Logout
          </Link>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
