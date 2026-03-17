"use client";

import React from "react";
import { useState } from "react";

const mockData = [
  { id: 1, page: "Homepage", seoScore: 78, aeoScore: 65, geoScore: 82, status: "Needs Improvement", criticalIssues: 3, highIssues: 7, lastAudit: "2024-01-15" },
  { id: 2, page: "Vehicle Listings", seoScore: 85, aeoScore: 72, geoScore: 79, status: "Good", criticalIssues: 1, highIssues: 4, lastAudit: "2024-01-14" },
  { id: 3, page: "Model Pages", seoScore: 92, aeoScore: 88, geoScore: 91, status: "Excellent", criticalIssues: 0, highIssues: 2, lastAudit: "2024-01-13" },
  { id: 4, page: "Service Pages", seoScore: 67, aeoScore: 59, geoScore: 74, status: "Critical", criticalIssues: 8, highIssues: 12, lastAudit: "2024-01-12" },
  { id: 5, page: "Dealer Locator", seoScore: 81, aeoScore: 76, geoScore: 95, status: "Good", criticalIssues: 2, highIssues: 5, lastAudit: "2024-01-11" },
  { id: 6, page: "News & Updates", seoScore: 74, aeoScore: 68, geoScore: 71, status: "Needs Improvement", criticalIssues: 4, highIssues: 9, lastAudit: "2024-01-10" }
];

const recommendations = {
  critical: [
    { id: 1, title: "Missing H1 tags on service pages", impact: "High SEO Impact", effort: "Low" },
    { id: 2, title: "Slow page load times on mobile", impact: "Critical UX Impact", effort: "High" },
    { id: 3, title: "Broken schema markup on vehicle pages", impact: "High AEO Impact", effort: "Medium" }
  ],
  high: [
    { id: 4, title: "Optimize meta descriptions for better CTR", impact: "Medium SEO Impact", effort: "Low" },
    { id: 5, title: "Add local business schema", impact: "High GEO Impact", effort: "Medium" },
    { id: 6, title: "Improve internal linking structure", impact: "Medium SEO Impact", effort: "High" }
  ]
};

export default function SEOHealthcheckPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [data] = useState(mockData);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [activeRecommendationTab, setActiveRecommendationTab] = useState("critical");
  
  const filtered = data.filter(d => {
    const matchesSearch = d.page.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || d.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });
  
  const avgSEO = Math.round(data.reduce((acc, item) => acc + item.seoScore, 0) / data.length);
  const avgAEO = Math.round(data.reduce((acc, item) => acc + item.aeoScore, 0) / data.length);
  const avgGEO = Math.round(data.reduce((acc, item) => acc + item.geoScore, 0) / data.length);
  const totalCritical = data.reduce((acc, item) => acc + item.criticalIssues, 0);
  
  const getStatusColor = (status) => {
    switch(status) {
      case "Excellent": return "bg-green-100 text-green-800";
      case "Good": return "bg-blue-100 text-blue-800";
      case "Needs Improvement": return "bg-yellow-100 text-yellow-800";
      case "Critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO Healthcheck Dashboard</h1>
          <p className="text-gray-500 mt-1">Toyota.com SEO, AEO & GEO performance analysis</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowRecommendations(!showRecommendations)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            📋 View Recommendations
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            📊 Export Report
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Average SEO Score</p>
          <p className="text-3xl font-bold text-blue-600">📈 {avgSEO}/100</p>
          <p className="text-xs text-gray-400 mt-1">Target: 80+</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Average AEO Score</p>
          <p className="text-3xl font-bold text-purple-600">🤖 {avgAEO}/100</p>
          <p className="text-xs text-gray-400 mt-1">Target: 80+</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Average GEO Score</p>
          <p className="text-3xl font-bold text-green-600">🌍 {avgGEO}/100</p>
          <p className="text-xs text-gray-400 mt-1">Target: 80+</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Critical Issues</p>
          <p className="text-3xl font-bold text-red-600">⚠️ {totalCritical}</p>
          <p className="text-xs text-gray-400 mt-1">Requires immediate attention</p>
        </div>
      </div>
      
      {showRecommendations && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Improvement Recommendations</h2>
            <button 
              onClick={() => setShowRecommendations(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="flex gap-4 mb-4">
            <button 
              onClick={() => setActiveRecommendationTab("critical")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeRecommendationTab === "critical" 
                  ? "bg-red-100 text-red-800" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Critical ({recommendations.critical.length})
            </button>
            <button 
              onClick={() => setActiveRecommendationTab("high")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeRecommendationTab === "high" 
                  ? "bg-orange-100 text-orange-800" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              High Priority ({recommendations.high.length})
            </button>
          </div>
          <div className="space-y-3">
            {recommendations[activeRecommendationTab].map(rec => (
              <div key={rec.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{rec.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{rec.impact}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    rec.effort === "Low" ? "bg-green-100 text-green-800" :
                    rec.effort === "Medium" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {rec.effort} Effort
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex gap-4 mb-6">
          <input 
            type="text"
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search pages..." 
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select 
            value={filter} 
            onChange={e => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="needs improvement">Needs Improvement</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-3 font-semibold text-gray-900">Page</th>
                <th className="text-left p-3 font-semibold text-gray-900">SEO Score</th>
                <th className="text-left p-3 font-semibold text-gray-900">AEO Score</th>
                <th className="text-left p-3 font-semibold text-gray-900">GEO Score</th>
                <th className="text-left p-3 font-semibold text-gray-900">Status</th>
                <th className="text-left p-3 font-semibold text-gray-900">Issues</th>
                <th className="text-left p-3 font-semibold text-gray-900">Last Audit</th>
                <th className="text-left p-3 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-medium text-gray-900">{item.page}</td>
                  <td className="p-3">
                    <span className={`font-semibold ${
                      item.seoScore >= 80 ? "text-green-600" :
                      item.seoScore >= 70 ? "text-yellow-600" :
                      "text-red-600"
                    }`}>
                      {item.seoScore}/100
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`font-semibold ${
                      item.aeoScore >= 80 ? "text-green-600" :
                      item.aeoScore >= 70 ? "text-yellow-600" :
                      "text-red-600"
                    }`}>
                      {item.aeoScore}/100
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`font-semibold ${
                      item.geoScore >= 80 ? "text-green-600" :
                      item.geoScore >= 70 ? "text-yellow-600" :
                      "text-red-600"
                    }`}>
                      {item.geoScore}/100
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                        {item.criticalIssues} Critical
                      </span>
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                        {item.highIssues} High
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-600">{item.lastAudit}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">
                        View Details
                      </button>
                      <button className="text-green-600 hover:text-green-800 text-sm font-medium hover:underline">
                        Re-audit
                      </button>
                      <button className="text-purple-600 hover:text-purple-800 text-sm font-medium hover:underline">
                        Export
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}