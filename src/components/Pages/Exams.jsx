import React from 'react'
import useAuth from '../../../App/useAuth';
import AdminExams from '../Faculty/Exams/Exams';
import { useNavigate } from 'react-router-dom';

export default function Exams() {
    const {role} = useAuth();
    const navigateTo = useNavigate();
  return role.toLowerCase() == 'faculty' ? <AdminExams /> : navigateTo('/not-found');
}
