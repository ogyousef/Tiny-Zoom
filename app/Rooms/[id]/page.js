"use client"

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import VideoTest from '@/components/VideoTest';
import VideoImplemnt from '@/components/XXX';

const Room = () => {

  const pathname = usePathname().replace("/Rooms/","") ;

  
  const userId = 'user123';

  return (
    <div className='flex-between gap-3'>
      {/* <div> 
        <p>TEST</p>
      <>{pathname}</>
      </div> */}
     
     
      <VideoTest RoomIDx={pathname}/>

      
    </div>
  );
};

export default Room;

     {/* <VideoChat roomId={123} userId={userId} /> */}