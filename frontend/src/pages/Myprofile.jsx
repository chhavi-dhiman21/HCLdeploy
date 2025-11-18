import React, { useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import PatientProfile from '../components/Patientprofile';
import DoctorProfile from '../components/Doctorprrofile.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const defaultPatientData = {
  name: 'Ava Martinez',
  email: 'ava.martinez@example.com',
  id: 'P-2049',
};

const defaultDoctorData = {
  name: 'Olivia Bennett',
  specialization: 'Cardiology',
  licenseNumber: 'LIC-90342',
  patientCount: 128,
  experience: 12,
  rating: 4.9,
};

const formatName = (value, fallback) => {
  if (!value) return fallback;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const Myprofile = () => {
  const { user } = useAuth();

  const profileUser = useMemo(() => {
    if (user) return user;
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to parse stored user for profile:', error);
      return null;
    }
  }, [user]);

  const role = (profileUser?.role || 'patient').toLowerCase();
  const displayName = formatName(profileUser?.username, 'Member');

  const patientData = {
    ...defaultPatientData,
    name: displayName,
    email: profileUser?.email || `${profileUser?.username || 'member'}@example.com`,
    id: profileUser?._id ? `P-${profileUser._id.slice(-4).toUpperCase()}` : defaultPatientData.id,
  };

  const doctorData = {
    ...defaultDoctorData,
    name: displayName.startsWith('Dr.') ? displayName : `Dr. ${displayName}`,
    licenseNumber: profileUser?._id ? `LIC-${profileUser._id.slice(-5).toUpperCase()}` : defaultDoctorData.licenseNumber,
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        {role === 'doctor' ? (
          <DoctorProfile data={doctorData} />
        ) : (
          <PatientProfile data={patientData} />
        )}
      </main>
    </div>
  );
};

export default Myprofile;