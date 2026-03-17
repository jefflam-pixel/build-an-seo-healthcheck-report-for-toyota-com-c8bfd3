"use client";

import React from "react";
import { useState } from "react";

const mockData = [
  { id: 1, page: "Homepage", seoScore: 78, aeoScore: 65, geoScore: 82, status: "In Progress", priority: "Critical", lastAudit: "2024-01-15", issues: 12 },
  { id: 2, page: "Vehicle Listings", seoScore: 85, aeoScore: 72, geoScore: 88, status: "Completed", priority: "High", lastAudit: "2024-01-14", issues: 8 },
  { id: 3, page: "Model Pages", seoScore: 92, aeoScore: 89, geoScore: 91, status: "Completed", priority: "Medium", lastAudit: "2024-01-13", issues: 3 },
  { id: 4, page: "Dealer Locator", seoScore: 68, aeoScore: 45, geoScore: 95, status: "Pending", priority: "Critical", lastAudit: "2024-01-12", issues: 18 },
  { id: 5, page: "Service Pages", seoScore: 75, aeoScore: 68, geoScore: 79, status: "In Progress", priority: "High", lastAudit: "2024-01-11", issues: 15 },
  { id: 6, page: "Blog Content", seoScore: 81, aeoScore: 76, geoScore: 72, status: "Completed", priority: "Medium", lastAudit: "2024-01-10", issues: 6 },
  { id: 7, page: "Contact Forms", seoScore: 59, aeoScore: 52, geoScore: 65, status: "Pending", priority: "Critical", lastAudit: "2024-01-09", issues: 22 },
  { id: 8, page: "Finance Tools", seoScore: 73, aeoScore: 71, geoScore: 77, status: "In Progress", priority: "High", lastAudit: "2024-01-08", issues: 11 }
];

export default function SEOAuditPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [data] = useState(mockData);
  
  const filtered = data.filter(d => 
    d.page.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "All" || d.status === filter)
  );
  
  const avgSEO = Math.round(data.reduce((acc, item) => acc + item.seoScore, 0) / data.length);
  const avgAEO = Math.round(data.reduce((acc, item) => acc + item.aeoScore, 0) / data.length);
  const avgGEO = Math.round(data.reduce((acc, item) => acc + item.geoScore, 0) / data.length);
  const criticalIssues = data.filter(item => item.priority === "Critical").length;
  
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO Audit Dashboard</h1>
          <p className="text-gray-500 mt-1">Toyota.com SEO healthcheck report - Timeline and audit completion tracking</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">📊 New Audit</button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 font-medium">📈 Export Report</button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Average SEO Score</p>
          <p className="text-3xl font-bold text-blue-600">📊 {avgSEO}/100</p>
          <p className="text-xs text-gray-400 mt-1">Target: 80+</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Average AEO Score</p>
          <p className="text-3xl font-bold text-purple-600">🎯 {avgAEO}/100</p>
          <p className="text-xs text-gray-400 mt-1">Target: 80+</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Average GEO Score</p>
          <p className="text-3xl font-bold text-green-600">🌍 {avgGEO}/100</p>
          <p className="text-xs text-gray-400 mt-1">Target: 80+</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Critical Issues</p>
          <p className="text-3xl font-bold text-red-600">⚠️ {criticalIssues}</p>
          <p className="text-xs text-gray-400 mt-1">Urgent timeline</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Page Audit Status</h2>
          <div className="flex space-x-4">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search pages..."
              className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-3 font-semibold text-gray-700">Page</th>
                <th className="text-left p-3 font-semibold text-gray-700">SEO Score</th>
                <th className="text-left p-3 font-semibold text-gray-700">AEO Score</th>
                <th className="text-left p-3 font-semibold text-gray-700">GEO Score</th>
                <th className="text-left p-3 font-semibold text-gray-700">Status</th>
                <th className="text-left p-3 font-semibold text-gray-700">Priority</th>
                <th className="text-left p-3 font-semibold text-gray-700">Issues</th>
                <th className="text-left p-3 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-medium text-gray-900">{item.page}</td>
                  <td className="p-3">
                    <span className={`font-semibold ${item.seoScore >= 80 ? 'text-green-600' : item.seoScore >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {item.seoScore}/100
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`font-semibold ${item.aeoScore >= 80 ? 'text-green-600' : item.aeoScore >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {item.aeoScore}/100
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`font-semibold ${item.geoScore >= 80 ? 'text-green-600' : item.geoScore >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {item.geoScore}/100
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "Completed" ? "bg-green-100 text-green-800" :
                      item.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.priority === "Critical" ? "bg-red-100 text-red-800" :
                      item.priority === "High" ? "bg-orange-100 text-orange-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600 font-medium">{item.issues}</td>
                  <td className="p-3 space-x-2">
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
          <div className="text-center py-8 text-gray-500">
            No pages found matching your criteria.
          </div>
        )}
      </div>
    </main>
  );
}