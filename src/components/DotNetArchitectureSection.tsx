import React, { useState } from 'react';
import { Code2, Folder, FileCode, Download, Copy, Check, Terminal, Layers, Box, CheckCircle, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { BrandBible } from '../types/brand';
import { generateDotNetSolutionFiles, downloadDotNetSolutionZip, DotNetFile } from '../utils/dotnetSolutionGenerator';

interface DotNetArchitectureSectionProps {
  brandBible: BrandBible;
}

export const DotNetArchitectureSection: React.FC<DotNetArchitectureSectionProps> = ({ brandBible }) => {
  const files = generateDotNetSolutionFiles(brandBible);
  const [selectedFile, setSelectedFile] = useState<DotNetFile>(files[1]); // BrandIdentity.cs
  const [copiedFile, setCopiedFile] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleCopyCode = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadDotNetSolutionZip(brandBible);
    } finally {
      setIsDownloading(false);
    }
  };

  const categoryColors: Record<string, string> = {
    Domain: 'text-[#C5A16F] bg-[#1A1A1A] border-[#C5A16F]',
    Application: 'text-[#E6E4D9] bg-[#1A1A1A] border-[#E6E4D9]/40',
    Infrastructure: 'text-[#4A5D4E] bg-[#1A1A1A] border-[#4A5D4E]',
    WebApi: 'text-[#C5A16F] bg-[#1A1A1A] border-[#C5A16F]',
    Solution: 'text-[#E6E4D9] bg-[#1A1A1A] border-white/20',
    Config: 'text-[#E6E4D9] bg-[#1A1A1A] border-white/20',
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Section Header */}
      <div className="border-b border-[#1A1A1A] pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60">
              Clean Architecture // ASP.NET Core 9.0
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif italic font-light text-[#1A1A1A] tracking-tight">
            Backend Architecture & Solution Matrix
          </h2>
          <p className="text-xs text-[#1A1A1A]/70 mt-1">
            Production-grade Onion/Clean Architecture ready for Visual Studio, Rider, and Docker deployment
          </p>
        </div>

        <button
          id="btn-download-full-dotnet-zip"
          onClick={handleDownload}
          disabled={isDownloading}
          className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-mono uppercase font-bold text-[#FDFCF5] bg-[#1A1A1A] hover:bg-[#333333] border border-[#1A1A1A] transition shadow-xs disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isDownloading ? 'Packaging Solution...' : 'Download .NET 9 Solution (.zip)'}</span>
        </button>
      </div>

      {/* Architecture Layers Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: '1. Domain Layer',
            project: 'BrandBible.Domain',
            badge: 'Pure Domain',
            items: ['BrandIdentity Aggregate', 'HexColor Value Object', 'WCAG Contrast Math', 'Archetype Enums'],
          },
          {
            title: '2. Application Layer',
            project: 'BrandBible.Application',
            badge: 'CQRS & Handlers',
            items: ['GenerateBrandIdentityCommand', 'MediatR Handlers', 'IGeminiAiService Interface', 'FluentValidation Rules'],
          },
          {
            title: '3. Infrastructure Layer',
            project: 'BrandBible.Infrastructure',
            badge: 'Adapters & AI',
            items: ['Gemini REST/gRPC Client', 'SvgLogoGeneratorService', 'PdfExportService', 'DependencyInjection.cs'],
          },
          {
            title: '4. Web API Layer',
            project: 'BrandBible.WebApi',
            badge: 'Endpoints & Host',
            items: ['BrandIdentityController.cs', 'ExportController.cs', 'OpenAPI / Swagger UI', 'Program.cs Minimal Setup'],
          },
        ].map(layer => (
          <div
            key={layer.title}
            className="p-5 border border-[#1A1A1A] bg-[#FDFCF5] shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif italic font-bold text-sm text-[#1A1A1A]">
                  {layer.title}
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 border border-[#1A1A1A] bg-[#E6E4D9] text-[#1A1A1A] uppercase font-bold">
                  {layer.badge}
                </span>
              </div>
              <div className="text-[11px] font-mono text-[#4A5D4E] mb-3">
                {layer.project}
              </div>
              <ul className="space-y-1.5 text-xs text-[#1A1A1A]/80 font-sans">
                {layer.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <CheckCircle className="w-3 h-3 text-[#4A5D4E] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Main Solution File Explorer & Code Inspector */}
      <div className="bg-[#1A1A1A] text-[#FDFCF5] border border-[#1A1A1A] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left Sidebar: Solution Tree */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/20 p-4 sm:p-5 flex flex-col bg-[#1A1A1A]">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/20">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-[#C5A16F]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#FDFCF5]">
                Solution Explorer
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#E6E4D9]/60">{files.length} Project Files</span>
          </div>

          <div className="space-y-1 overflow-y-auto max-h-[480px] pr-1 scrollbar-thin">
            {files.map(file => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full p-2.5 text-left text-xs font-mono flex items-center justify-between transition border ${
                    isSelected
                      ? 'bg-[#242424] text-[#FDFCF5] border-[#C5A16F]'
                      : 'text-[#E6E4D9]/70 hover:text-[#FDFCF5] hover:bg-[#242424] border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#C5A16F]' : 'text-[#E6E4D9]/40'}`} />
                    <span className="truncate">{file.name}</span>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.2 font-mono uppercase font-bold border ${categoryColors[file.category] || 'text-[#E6E4D9]'}`}>
                    {file.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Stage: Code Inspector & Syntax Viewer */}
        <div className="lg:col-span-8 flex flex-col bg-[#242424]">
          {/* File Header Bar */}
          <div className="p-4 sm:p-5 border-b border-white/20 flex flex-wrap items-center justify-between gap-3 bg-[#1A1A1A]">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-[#FDFCF5]">{selectedFile.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#242424] text-[#E6E4D9] border border-white/20">
                  {selectedFile.path}
                </span>
              </div>
              <p className="text-xs text-[#E6E4D9]/70 mt-1">
                {selectedFile.description}
              </p>
            </div>

            <button
              onClick={() => handleCopyCode(selectedFile.content)}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#242424] hover:bg-white/20 text-[#FDFCF5] text-[10px] font-mono uppercase font-bold border border-white/20 transition"
            >
              {copiedFile ? <Check className="w-3 h-3 text-[#4A5D4E]" /> : <Copy className="w-3 h-3" />}
              <span>Copy C# Code</span>
            </button>
          </div>

          {/* Code Viewer */}
          <div className="p-4 sm:p-6 overflow-x-auto flex-1 font-mono text-xs text-[#E6E4D9] leading-relaxed max-h-[500px] overflow-y-auto">
            <pre className="whitespace-pre">
              {selectedFile.content}
            </pre>
          </div>
        </div>
      </div>

      {/* Terminal & Quick Run Instructions */}
      <div className="bg-[#FDFCF5] border border-[#1A1A1A] p-6 sm:p-8 shadow-xs">
        <div className="border-b border-[#1A1A1A] pb-3 mb-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 block">CLI Execution</span>
          <h3 className="text-lg font-serif italic text-[#1A1A1A] tracking-tight flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#4A5D4E]" />
            <span>Quick Run & Execution Commands</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 bg-[#1A1A1A] text-[#E6E4D9] border border-[#1A1A1A]">
            <div className="text-[9px] uppercase font-bold text-[#C5A16F] mb-1 font-mono">
              1. Build Solution
            </div>
            <code className="text-[#FDFCF5]">dotnet build BrandBibleGenerator.sln</code>
          </div>

          <div className="p-4 bg-[#1A1A1A] text-[#E6E4D9] border border-[#1A1A1A]">
            <div className="text-[9px] uppercase font-bold text-[#C5A16F] mb-1 font-mono">
              2. Launch Web API Host
            </div>
            <code className="text-[#FDFCF5]">dotnet run --project src/BrandBible.WebApi</code>
          </div>

          <div className="p-4 bg-[#1A1A1A] text-[#E6E4D9] border border-[#1A1A1A]">
            <div className="text-[9px] uppercase font-bold text-[#C5A16F] mb-1 font-mono">
              3. Explore Swagger UI
            </div>
            <code className="text-[#FDFCF5]">https://localhost:5001/swagger</code>
          </div>
        </div>
      </div>
    </div>
  );
};
