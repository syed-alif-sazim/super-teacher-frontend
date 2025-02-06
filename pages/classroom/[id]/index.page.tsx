import ClassroomContainer from '@/modules/classroom/containers/ClassroomContainer/ClassroomContainer'
import React from 'react'
import { useRouter } from 'next/router';

const Classroom = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <ClassroomContainer classroomId={id as string}/>
  )
}

export default Classroom
