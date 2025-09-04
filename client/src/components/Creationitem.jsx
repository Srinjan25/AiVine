import React, { useState } from "react";
import Markdown from "react-markdown";
import { ChevronDown, ChevronUp, Image as ImageIcon, FileText, Calendar, Sparkles, Eye } from 'lucide-react';

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const getTypeIcon = (type) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      case "text":
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "image":
        return {
          bg: "bg-gradient-to-r from-pink-500 to-rose-500",
          text: "text-pink-700",
          bgLight: "bg-pink-50",
          border: "border-pink-200"
        };
      case "text":
      default:
        return {
          bg: "bg-gradient-to-r from-blue-500 to-indigo-500",
          text: "text-blue-700",
          bgLight: "bg-blue-50",
          border: "border-blue-200"
        };
    }
  };

  const colors = getTypeColor(item.type);

  return (
    <div
      className={`group relative max-w-5xl rounded-2xl transition-all duration-500 ease-out overflow-hidden
        ${expanded 
          ? 'bg-gradient-to-br from-white via-gray-50/50 to-white shadow-2xl shadow-gray-200/50 scale-[1.02]' 
          : 'bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-1 border border-gray-200/50'
        }`}
    >
      {/* Decorative top border */}
      <div 
        className={`h-1 w-full ${colors.bg} opacity-${expanded ? '100' : '70'} group-hover:opacity-100 transition-opacity duration-300`}
      ></div>
      
      {/* Header Section */}
      <div 
        className="p-6 cursor-pointer" 
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            {/* Prompt Title */}
            <div className="flex items-start gap-3 mb-3">
              <div className={`p-2 rounded-lg ${colors.bg} shadow-md flex-shrink-0 mt-1`}>
                {getTypeIcon(item.type)}
                <span className="text-white text-xs font-medium ml-1 capitalize">
                  {item.type}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-gray-900 transition-colors duration-200">
                {item.prompt}
              </h2>
            </div>
            
            {/* Metadata */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(item.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                <span>AI Generated</span>
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className={`flex items-center gap-2 ${colors.bgLight} ${colors.border} ${colors.text} text-sm font-semibold px-4 py-2 rounded-full border`}>
              {getTypeIcon(item.type)}
              <span className="capitalize">{item.type}</span>
            </div>
            
            <button 
              className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200 hover:scale-105"
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="px-6 pb-6 animate-fadeIn">
          <div className="border-t border-gray-200/70 pt-6">
            {/* Preview Label */}
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Generated Content</span>
            </div>
            
            {item.type === "image" ? (
              /* Image Content */
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200/50">
                <div className="flex justify-center">
                  <div className="relative group/image">
                    <img
                      src={item.content}
                      alt="Generated content"
                      className="max-w-full h-auto max-h-96 object-contain rounded-xl shadow-lg border-4 border-white transition-transform duration-300 group-hover/image:scale-[1.02]"
                    />
                    {/* Image overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </div>
                </div>
              </div>
            ) : (
              /* Text Content */
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200/50 max-h-80 overflow-y-auto">
                <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                  <Markdown 
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-xl font-bold text-gray-800 mb-3" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-lg font-semibold text-gray-800 mb-2" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-base font-medium text-gray-800 mb-2" {...props} />,
                      p: ({node, ...props}) => <p className="mb-3 leading-relaxed" {...props} />,
                      ul: ({node, ...props}) => <ul className="mb-3 pl-4 space-y-1" {...props} />,
                      ol: ({node, ...props}) => <ol className="mb-3 pl-4 space-y-1" {...props} />,
                      li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                      blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-300 pl-4 italic text-gray-600 mb-3" {...props} />,
                      code: ({node, ...props}) => <code className="bg-gray-200 text-gray-800 px-1 py-0.5 rounded text-sm" {...props} />,
                    }}
                  >
                    {String(item.content || "")}
                  </Markdown>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default CreationItem;
