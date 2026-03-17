"use client";

import React from "react";
import { useState } from "react";

const mockData = [
  { id: 1, url: "toyota.com/", pageType: "Homepage", seoScore: 78, aeoScore: 65, geoScore: 82, status: "Active", keywords: 245, traffic: "1.2M", lastCrawl: "2024-01-15" },
  { id: 2, url: "toyota.com/cars", pageType: "Category", seoScore: 85, aeoScore: 71, geoScore: 79, status: "Active", keywords: 189, traffic: "890K", lastCrawl: "2024-01-15" },
  { id: 3, url: "toyota.com/camry", pageType: "Product", seoScore: 92, aeoScore: 88, geoScore: 91, status: "Active", keywords: 156, traffic: "654K", lastCrawl: "2024-01-15" },
  { id: 4, url: "toyota.com/prius", pageType: "Product", seoScore: 89, aeoScore: 84, geoScore: 87, status: "Active", keywords: 142, traffic: "532K", lastCrawl: "2024-01-15" },
  { id: 5, url: "toyota.com/dealers", pageType: "Location", seoScore: 63, aeoScore: 45, geoScore: 94, status: "Critical", keywords: 98, traffic: "342K", lastCrawl: "2024-01-15" },
  { id: 6, url: "toyota.com/financing", pageType: "Service", seoScore: 71, aeoScore: 58, geoScore: 69, status: "Pending", keywords: 87, traffic: "298K", lastCrawl: "2024-01-14" },
  { id: 7, url: "toyota.com/service", pageType: "Service", seoScore: 76, aeoScore: 62, geoScore: 74, status: "Active", keywords: 123, traffic: "445K", lastCrawl: "2024-01-15" },
  { id: 8, url: "toyota.com/about", pageType: "Corporate", seoScore: 68, aeoScore: 55, geoScore: 71, status: "Pending", keywords: 45, traffic: "156K", lastCrawl: "2024-01-14" }
];

export default function SEOAnalysisPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [data] = useState(mockData);
  
  const filtered = data.filter(d => {
    const matchesSearch = d.url.toLowerCase().includes(search.toLowerCase()) || d.pageType.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || d.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const avgSEOScore = Math.round(data.reduce((acc, item) => acc + item.seoScore, 0) / data.length);
  const avgAEOScore = Math.round(data.reduce((acc, item) => acc + item.aeoScore, 0) / data.length);
  const avgGEOScore = Math.round(data.reduce((acc, item) => acc + item.geoScore, 0) / data.length);
  const totalKeywords = data.reduce((acc, item) => acc + item.keywords, 0);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO Site Analysis Engine</h1>
          <p className="text-gray-500 mt-1">Toyota.com SEO health monitoring and performance analysis</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
            <span className="mr-2">🔍</span> Start Analysis
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <span className="mr-2">📊</span> Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Average SEO Score</p>
          <p className="text-3xl font-bold text-blue-600">📈 {avgSEOScore}/100</p>
          <p className="text-xs text-gray-400 mt-1">Target: 80+</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Average AEO Score</p>
          <p className="text-3xl font-bold text-purple-600">🤖 {avgAEOScore}/100</p>
          <p className="text-xs text-gray-400 mt-1">AI Optimization</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Average GEO Score</p>
          <p className="text-3xl font-bold text-green-600">🌍 {avgGEOScore}/100</p>
          <p className="text-xs text-gray-400 mt-1">Geographic SEO</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Total Keywords</p>
          <p className="text-3xl font-bold text-orange-600">🔑 {totalKeywords.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">Tracked terms</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Page Analysis Results</h2>
          <div className="flex space-x-4">
            <input 
              type="text"
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Search pages..." 
              className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
            <select 
              value={filter} 
              onChange={e => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="critical">Critical</option>
            </select>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center">
              ↕️ Sort
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 font-semibold text-gray-700">Page URL</th>
                <th className="text-left p-4 font-semibold text-gray-700">Type</th>
                <th className="text-left p-4 font-semibold text-gray-700">SEO Score</th>
                <th className="text-left p-4 font-semibold text-gray-700">AEO Score</th>
                <th className="text-left p-4 font-semibold text-gray-700">GEO Score</th>
                <th className="text-left p-4 font-semibold text-gray-700">Keywords</th>
                <th className="text-left p-4 font-semibold text-gray-700">Traffic</th>
                <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-gray-900 truncate max-w-xs">{item.url}</div>
                      <div className="text-xs text-gray-500">Last crawl: {item.lastCrawl}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {item.pageType}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <span className={`font-bold ${item.seoScore >= 80 ? 'text-green-600' : item.seoScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {item.seoScore}
                      </span>
                      <span className="text-gray-400 ml-1">/100</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <span className={`font-bold ${item.aeoScore >= 80 ? 'text-green-600' : item.aeoScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {item.aeoScore}
                      </span>
                      <span className="text-gray-400 ml-1">/100</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <span className={`font-bold ${item.geoScore >= 80 ? 'text-green-600' : item.geoScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {item.geoScore}
                      </span>
                      <span className="text-gray-400 ml-1">/100</span>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-gray-900">{item.keywords}</td>
                  <td className="p-4 font-medium text-gray-900">{item.traffic}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium hover:underline">
                        Analyze
                      </button>
                      <button className="text-green-600 hover:text-green-800 text-sm font-medium hover:underline">
                        Fix Issues
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filtered.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No pages found matching your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}