"use client";

import React from "react";
import { useState } from "react";

const mockScoringCriteria = [
  { id: 1, category: "SEO", component: "Technical SEO", weight: 35, maxScore: 35, currentScore: 28, status: "Good", criticalFactors: "Site speed, mobile optimization, crawlability" },
  { id: 2, category: "SEO", component: "Content Quality", weight: 25, maxScore: 25, currentScore: 18, status: "Needs Improvement", criticalFactors: "Keyword density, content depth, uniqueness" },
  { id: 3, category: "SEO", component: "On-Page Optimization", weight: 25, maxScore: 25, currentScore: 22, status: "Good", criticalFactors: "Title tags, meta descriptions, header structure" },
  { id: 4, category: "SEO", component: "Link Profile", weight: 15, maxScore: 15, currentScore: 12, status: "Good", criticalFactors: "Domain authority, backlink quality, internal linking" },
  { id: 5, category: "AEO", component: "Voice Search Optimization", weight: 30, maxScore: 30, currentScore: 15, status: "Critical", criticalFactors: "Featured snippets, question targeting, conversational keywords" },
  { id: 6, category: "AEO", component: "AI Content Optimization", weight: 40, maxScore: 40, currentScore: 25, status: "Needs Improvement", criticalFactors: "Entity optimization, semantic search, content clusters" },
  { id: 7, category: "AEO", component: "Answer Engine Visibility", weight: 30, maxScore: 30, currentScore: 18, status: "Needs Improvement", criticalFactors: "Knowledge graph presence, structured data, direct answers" },
  { id: 8, category: "GEO", component: "Local Search Presence", weight: 40, maxScore: 40, currentScore: 32, status: "Good", criticalFactors: "Google My Business, local citations, location pages" }
];

export default function ScoringFrameworkPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [data] = useState(mockScoringCriteria);
  
  const filtered = data.filter(d => 
    d.component.toLowerCase().includes(search.toLowerCase()) &&
    (categoryFilter === "All" || d.category === categoryFilter)
  );
  
  const seoScore = Math.round(data.filter(d => d.category === "SEO").reduce((sum, d) => sum + d.currentScore, 0));
  const aeoScore = Math.round(data.filter(d => d.category === "AEO").reduce((sum, d) => sum + d.currentScore, 0));
  const geoScore = Math.round(data.filter(d => d.category === "GEO").reduce((sum, d) => sum + d.currentScore, 0));
  const avgScore = Math.round((seoScore + aeoScore + geoScore) / 3);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO Scoring Framework</h1>
          <p className="text-gray-500 mt-1">Core scoring methodology and criteria for evaluating SEO, AEO, and GEO performance on a 0-100 scale</p>
        </div>
        <div className="space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">+ Add Criteria</button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 font-medium">📊 Export Report</button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-1">Overall Score</p>
          <p className="text-3xl font-bold text-blue-600">📊 {avgScore}/100</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-1">SEO Score</p>
          <p className="text-3xl font-bold text-green-600">📈 {seoScore}/100</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-1">AEO Score</p>
          <p className="text-3xl font-bold text-yellow-600">🤖 {aeoScore}/100</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-1">GEO Score</p>
          <p className="text-3xl font-bold text-purple-600">🌍 {geoScore}/100</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex gap-4 mb-6">
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search scoring criteria..." 
            className="border border-gray-300 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <select 
            value={categoryFilter} 
            onChange={e => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Categories</option>
            <option value="SEO">SEO</option>
            <option value="AEO">AEO</option>
            <option value="GEO">GEO</option>
          </select>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 font-medium">🔄 Sort</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 font-semibold text-gray-900">Category</th>
                <th className="text-left p-4 font-semibold text-gray-900">Component</th>
                <th className="text-left p-4 font-semibold text-gray-900">Weight</th>
                <th className="text-left p-4 font-semibold text-gray-900">Score</th>
                <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                <th className="text-left p-4 font-semibold text-gray-900">Critical Factors</th>
                <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <span className={"px-3 py-1 rounded-full text-xs font-medium " + (item.category === "SEO" ? "bg-green-100 text-green-800" : item.category === "AEO" ? "bg-yellow-100 text-yellow-800" : "bg-purple-100 text-purple-800")}>
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-gray-900">{item.component}</td>
                  <td className="p-4 text-gray-600">{item.weight}%</td>
                  <td className="p-4">
                    <span className="font-semibold text-gray-900">{item.currentScore}/{item.maxScore}</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: `${(item.currentScore/item.maxScore)*100}%`}}></div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={"px-2 py-1 rounded-full text-xs font-medium " + (item.status === "Good" ? "bg-green-100 text-green-800" : item.status === "Critical" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800")}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600 max-w-xs truncate" title={item.criticalFactors}>{item.criticalFactors}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Edit</button>
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
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