"use client";

import React from "react";
import { useState } from "react";

const mockData = [
  { id: 1, title: "Meta Title Optimization", category: "SEO", priority: "Critical", impact: "High", effort: "Low", status: "Open", assignee: "Sarah Chen", createdDate: "2024-03-15" },
  { id: 2, title: "Core Web Vitals Improvement", category: "SEO", priority: "High", impact: "High", effort: "High", status: "In Progress", assignee: "Mike Johnson", createdDate: "2024-03-14" },
  { id: 3, title: "Featured Snippet Optimization", category: "AEO", priority: "High", impact: "Medium", effort: "Medium", status: "Open", assignee: "Lisa Wang", createdDate: "2024-03-13" },
  { id: 4, title: "Google My Business Enhancement", category: "GEO", priority: "Medium", impact: "Medium", effort: "Low", status: "Completed", assignee: "David Miller", createdDate: "2024-03-12" },
  { id: 5, title: "Schema Markup Implementation", category: "SEO", priority: "Medium", impact: "High", effort: "Medium", status: "Open", assignee: "Emma Davis", createdDate: "2024-03-11" },
  { id: 6, title: "Voice Search Optimization", category: "AEO", priority: "Low", impact: "Low", effort: "High", status: "Open", assignee: "Tom Wilson", createdDate: "2024-03-10" },
  { id: 7, title: "Local Landing Page Creation", category: "GEO", priority: "High", impact: "High", effort: "High", status: "In Progress", assignee: "Anna Rodriguez", createdDate: "2024-03-09" },
  { id: 8, title: "Internal Linking Strategy", category: "SEO", priority: "Low", impact: "Medium", effort: "Medium", status: "Open", assignee: "James Brown", createdDate: "2024-03-08" }
];

export default function RecommendationsPage() {
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [data] = useState(mockData);
  
  const filtered = data.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) &&
    (filterPriority === "All" || item.priority === filterPriority)
  );
  
  const getPriorityColor = (priority) => {
    switch(priority) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Open": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO Recommendations Management</h1>
          <p className="text-gray-500 mt-1">Categorize, prioritize, and track improvement recommendations for Toyota.com</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border hover:bg-gray-50 shadow-sm">
            📤 Export Report
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm">
            ➕ Add Recommendation
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-1">Total Recommendations</p>
          <p className="text-3xl font-bold text-gray-900">📋 {data.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-1">Critical Priority</p>
          <p className="text-3xl font-bold text-red-600">🚨 {data.filter(d => d.priority === "Critical").length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-1">In Progress</p>
          <p className="text-3xl font-bold text-blue-600">⚡ {data.filter(d => d.status === "In Progress").length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-1">Completed</p>
          <p className="text-3xl font-bold text-green-600">✅ {data.filter(d => d.status === "Completed").length}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recommendations..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]"
          >
            <option value="All">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 border">
            🔄 Sort
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 font-semibold text-gray-900">Recommendation</th>
                <th className="text-left p-4 font-semibold text-gray-900">Category</th>
                <th className="text-left p-4 font-semibold text-gray-900">Priority</th>
                <th className="text-left p-4 font-semibold text-gray-900">Impact</th>
                <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                <th className="text-left p-4 font-semibold text-gray-900">Assignee</th>
                <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-500">Created {item.createdDate}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-gray-700">{item.impact}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-700">{item.assignee}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filtered.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No recommendations found matching your criteria.
          </div>
        )}
      </div>
    </main>
  );
}