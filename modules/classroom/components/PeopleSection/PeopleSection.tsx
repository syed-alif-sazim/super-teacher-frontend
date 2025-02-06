import { FaUserPlus, FaUserMinus } from 'react-icons/fa';
import React, { useState } from 'react';
import AddStudentDialog from '../AddStudentDialog/AddStudentDialog';
import { useGetClassroomTeacherQuery, useGetEnrolledStudentsQuery } from '@/shared/redux/rtk-apis/classrooms/classrooms.api';
import RemoveStudentDialog from '../RemoveStudentDialog/RemoveStudentDialog';
import { TEnrolledStudent } from '@/shared/redux/rtk-apis/classrooms/classroom.types';

const PeopleSection = ({ classroomId }: { classroomId: string }) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)
  const [studentToRemove, setStudentToRemove] = useState<TEnrolledStudent | null>(null);

  const {data: enrolledStudents}= useGetEnrolledStudentsQuery(classroomId);
  const {data: classroom}= useGetClassroomTeacherQuery(classroomId);
  
  const handleAddClick = () => {
    setIsAddDialogOpen(true) 
  }
  const handleRemoveClick = (student:TEnrolledStudent) => {
    setStudentToRemove(student);
    setIsRemoveDialogOpen(true) 
  }
  return (
    <div>
      <div className="text-xl font-bold border-b border-gray-700 pb-2">
        Teacher
      </div>
      <div className="py-2 flex justify-between items-center">
        <span>{classroom?.teacher.user.firstName} {classroom?.teacher.user.lastName} (You)</span>
      </div>
      <div className="text-xl font-bold border-b border-gray-700 mt-4 pb-2 flex justify-between items-center">
        <span>Student</span>
        <FaUserPlus onClick={handleAddClick} className="text-teal-400 cursor-pointer" size={20} />
      </div>
      {enrolledStudents && enrolledStudents.length > 0 ? (
        enrolledStudents.map((student) => (
          <div key={student.id} className="py-2 flex justify-between items-center">
            <div>
              <p>{`${student.user.firstName} ${student.user.lastName}`}</p>
              <p className="text-gray-400 text-sm">{student.user.email}</p>
            </div>
            <FaUserMinus className="text-red-500 cursor-pointer" size={20} onClick={() => handleRemoveClick(student)}/>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No students enrolled yet.</p>
      )}
      <AddStudentDialog isDialogOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} classroomId={classroomId} />
      {studentToRemove && (
        <RemoveStudentDialog isDialogOpen={isRemoveDialogOpen} onClose={() => setIsRemoveDialogOpen(false)} student={studentToRemove} classroomId={Number(classroomId)} />
      )}
    </div>
  );
};

export default PeopleSection;


