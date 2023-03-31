import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const VelocityChart = ({ dateData }) => {
  // Get the most recent 10 dates
  const recentDates = dateData.slice(-10).reverse();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={recentDates}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="velocity" fill="#8884d8" />
        <Bar dataKey="totalPointsCompleted" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VelocityChart;
