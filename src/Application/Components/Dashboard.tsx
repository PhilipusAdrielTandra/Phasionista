import React from 'react';

interface DashboardProps {
  title: string;
  subtitle: string;
}

const Dashboard: React.FC<DashboardProps> = ({ title, subtitle }) => {
  return (
    <div className="Dashboard">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

export default Dashboard;