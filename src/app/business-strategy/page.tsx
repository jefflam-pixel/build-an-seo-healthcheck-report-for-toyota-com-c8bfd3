"use client";

import React from "react";
import { useState } from "react";

const mockData = [
  { id: "BUS-001", requirement: "Score Toyota.com at least 80/100 for SEO, AEO, and GEO performance", priority: "P1", status: "Active", progress: 75, stakeholder: "SEO Team" },
  { id: "BUS-002", requirement: "Improve Toyota's online visibility and customer acquisition through better search performance", priority: "P1", status: "In Progress", progress: 60, stakeholder: "Marketing Team" },
  { id: "BUS-003", requirement: "Audit scope should focus only on main consumer pages of Toyota.com", priority: "P2", status: "Approved", progress: 90, stakeholder: "SEO Team" },
  { id: "BUS-004", requirement: "SEO team will be the primary stakeholder for reviewing and approving audit findings", priority: "P2", status: "Active", progress: 100, stakeholder: "SEO Team" },
  { id: "BUS-005", requirement: "No budget allocation provided - recommendations without resource constraints", priority: "P3", status: "Pending", progress: 25, stakeholder: "Finance Team" },
  { id: "BUS-006", requirement: "Success measured by capturing majority of target keywords and traffic opportunities", priority: "P1", status: "Active", progress: 45, stakeholder: "Analytics Team" }
];

export default function BusinessStrategyPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [data] = useState(mockData);
  
  const filtered = data.filter(item => {
    const matchesSearch = item.requirement.toLowerCase().includes(search.toLowerCase()) || item.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || item.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Business Strategy & Goals</h1>
          <p className="text-gray-500 mt-1">Toyota.com SEO Healthcheck - Strategic objectives and success metrics</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">+ Add Objective</button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 font-medium">📊 Export Report</button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Total Requirements</p>
          <p className="text-3xl font-bold text-gray-900">📋 {data.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Target SEO Score</p>
          <p className="text-3xl font-bold text-green-600">📈 80/100</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Active Objectives</p>
          <p className="text-3xl font-bold text-blue-600">✅ {data.filter(d => d.status === "Active").length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Avg Progress</p>
          <p className="text-3xl font-bold text-purple-600">📊 {Math.round(data.reduce((acc, item) => acc + item.progress, 0) / data.length)}%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Business Requirements</h2>
          <div className="flex space-x-4">
            <input 
              type="text"
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Search requirements..."
              className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select 
              value={filter} 
              onChange={e => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="in progress">In Progress</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 font-semibold text-gray-700">Requirement ID</th>
                <th className="text-left p-4 font-semibold text-gray-700">Description</th>
                <th className="text-left p-4 font-semibold text-gray-700">Priority</th>
                <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                <th className="text-left p-4 font-semibold text-gray-700">Progress</th>
                <th className="text-left p-4 font-semibold text-gray-700">Stakeholder</th>
                <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{item.id}</span>
                  </td>
                  <td className="p-4 max-w-md">
                    <p className="text-sm text-gray-900 leading-relaxed">{item.requirement}</p>
                  </td>
                  <td className="p-4">
                    <span className={"px-2 py-1 rounded-full text-xs font-medium " + 
                      (item.priority === "P1" ? "bg-red-100 text-red-800" : 
                       item.priority === "P2" ? "bg-yellow-100 text-yellow-800" : 
                       "bg-green-100 text-green-800")}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={"px-2 py-1 rounded-full text-xs font-medium " + 
                      (item.status === "Active" ? "bg-green-100 text-green-800" : 
                       item.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                       item.status === "Approved" ? "bg-purple-100 text-purple-800" :
                       "bg-yellow-100 text-yellow-800")}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className={"h-2 rounded-full " + 
                            (item.progress >= 80 ? "bg-green-500" : 
                             item.progress >= 60 ? "bg-yellow-500" : 
                             "bg-red-500")}
                          style={{width: `${item.progress}%`}}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{item.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{item.stakeholder}</td>
                  <td className="p-4 space-x-2">
                    <button className="text-blue-600 hover:underline text-sm font-medium">View</button>
                    <button className="text-gray-600 hover:underline text-sm font-medium">Edit</button>
                    <button className="text-red-600 hover:underline text-sm font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No requirements found matching your search criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}