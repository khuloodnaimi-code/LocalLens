import React from 'react';
import TripsCrud from './TripsCrud';
import AddTrip from "./AddTrip";
import UpdateTrip from "./UpdateTrip";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <TripsCrud />
      
    </div>
  );
};

export default AdminDashboard;
