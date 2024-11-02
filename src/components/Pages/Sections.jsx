import React from 'react';
import useAuth from '../../../App/useAuth';
import AdminSections from '../Faculty/Sections/Sections';

export default function Sections() {
  const { role } = useAuth();

  return role.toLowerCase() == 'faculty' ? <AdminSections /> : <>Not Authorized</>;
}
