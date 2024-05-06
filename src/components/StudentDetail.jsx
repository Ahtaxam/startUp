import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetStudentProjectsQuery } from '../redux/slices/Students';

function StudentDetail() {
    const { id } = useParams();
    const {data, isLoading} = useGetStudentProjectsQuery(id);
  return (
    <div>StudentDetail</div>
  )
}

export default StudentDetail