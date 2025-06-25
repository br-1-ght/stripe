import React from 'react';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Welcome, {user?.name || 'User'}!</h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h2 className="text-lg font-semibold text-slate-700">Your Account</h2>
            <p className="text-slate-600 mt-2">Email: {user?.email}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;