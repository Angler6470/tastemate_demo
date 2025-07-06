import React, { useEffect, useState } from 'react';

function isReplit() {
  return typeof window !== 'undefined' && window.location.hostname.endsWith('repl.co');
}

export default function AdminDashboard() {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) return setError('Not authenticated');
      try {
        // Use test endpoint on Replit, real endpoint elsewhere
        const endpoint = isReplit() ? '/api/stats/test-stats' : '/api/stats';
        const res = await fetch(endpoint, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Unauthorized or server error');
        const data = await res.json();
        setStats(data.stats || data); // test endpoint returns { stats: [...] }
      } catch (err) {
        setError('Failed to fetch stats');
      }
    };
    fetchStats();
  }, []);

  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Admin Stats Dashboard</h2>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Type</th>
            <th className="text-left">Value</th>
            <th className="text-left">Time</th>
          </tr>
        </thead>
        <tbody>
          {stats.map(stat => (
            <tr key={stat._id}>
              <td>{stat.type}</td>
              <td>{stat.value}</td>
              <td>{new Date(stat.timestamp || stat.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
