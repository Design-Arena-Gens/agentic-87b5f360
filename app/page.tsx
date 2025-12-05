'use client';

import { useState } from 'react';
import { Video, Image as ImageIcon, Music, Sparkles } from 'lucide-react';

type Tool = 'video' | 'image' | 'music' | 'prompt';

export default function Home() {
  const [activeTool, setActiveTool] = useState<Tool>('video');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const tools = [
    { id: 'video' as Tool, name: 'Video Generator', icon: Video, color: 'from-purple-500 to-pink-500' },
    { id: 'image' as Tool, name: 'Image Generator', icon: ImageIcon, color: 'from-blue-500 to-cyan-500' },
    { id: 'music' as Tool, name: 'Music Generator', icon: Music, color: 'from-green-500 to-emerald-500' },
    { id: 'prompt' as Tool, name: 'Prompt Generator', icon: Sparkles, color: 'from-orange-500 to-yellow-500' },
  ];

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setIsGenerating(true);
    setResult(null);

    // Simulate generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (activeTool === 'video') {
      setResult('🎬 Video generated: A stunning cinematic scene based on your description. Duration: 10s, Resolution: 1920x1080, Format: MP4');
    } else if (activeTool === 'image') {
      setResult('🖼️ Image generated: High-quality artistic render of your prompt. Resolution: 2048x2048, Style: Photorealistic, Format: PNG');
    } else if (activeTool === 'music') {
      setResult('🎵 Music track generated: Original composition matching your mood. Duration: 3:30, Genre: Electronic, BPM: 128, Format: MP3');
    } else if (activeTool === 'prompt') {
      setResult(`✨ Enhanced Prompt:\n\n"${input}, ultra detailed, professional quality, cinematic lighting, vibrant colors, masterpiece, trending on artstation, 8k resolution, highly detailed textures, atmospheric depth, dramatic composition"`);
    }

    setIsGenerating(false);
  };

  const activToolData = tools.find(t => t.id === activeTool);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            NEXTGEN STUDIO
          </h1>
          <p className="text-gray-400 mt-2">AI-Powered Creation Platform</p>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Tool Selection */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;

            return (
              <button
                key={tool.id}
                onClick={() => {
                  setActiveTool(tool.id);
                  setResult(null);
                  setInput('');
                }}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  isActive
                    ? `border-transparent bg-gradient-to-br ${tool.color} shadow-2xl shadow-purple-500/30 scale-105`
                    : 'border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:bg-gray-900'
                }`}
              >
                <Icon className={`w-8 h-8 mb-3 mx-auto ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <h3 className={`font-semibold ${isActive ? 'text-white' : 'text-gray-300'}`}>
                  {tool.name}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Generator Interface */}
        <div className="max-w-4xl mx-auto">
          <div className={`rounded-3xl border-2 border-transparent bg-gradient-to-br ${activToolData?.color} p-1 shadow-2xl`}>
            <div className="bg-gray-900 rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                {activToolData && <activToolData.icon className="w-8 h-8" />}
                {activToolData?.name}
              </h2>

              {/* Input Area */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  {activeTool === 'prompt' ? 'Enter your basic idea:' : 'Describe what you want to create:'}
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    activeTool === 'video'
                      ? 'e.g., A futuristic cityscape at sunset with flying cars'
                      : activeTool === 'image'
                      ? 'e.g., A serene mountain landscape with aurora borealis'
                      : activeTool === 'music'
                      ? 'e.g., Uplifting electronic track for a workout'
                      : 'e.g., A magical forest'
                  }
                  className="w-full h-32 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!input.trim() || isGenerating}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                  !input.trim() || isGenerating
                    ? 'bg-gray-700 cursor-not-allowed'
                    : `bg-gradient-to-r ${activToolData?.color} hover:shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02]`
                }`}
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating...
                  </span>
                ) : (
                  'Generate'
                )}
              </button>

              {/* Result Area */}
              {result && (
                <div className="mt-8 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
                  <h3 className="text-lg font-semibold mb-3 text-green-400">✓ Generation Complete</h3>
                  <p className="text-gray-300 whitespace-pre-wrap">{result}</p>

                  {activeTool !== 'prompt' && (
                    <div className="mt-6 flex gap-3">
                      <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors">
                        Download
                      </button>
                      <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors">
                        Share
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Features Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-400">Generate content in seconds with our optimized AI models</p>
            </div>
            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
              <div className="text-3xl mb-2">🎨</div>
              <h3 className="font-semibold mb-2">High Quality</h3>
              <p className="text-sm text-gray-400">Professional-grade output for all your creative needs</p>
            </div>
            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-semibold mb-2">Easy to Use</h3>
              <p className="text-sm text-gray-400">Simple interface, powerful results. No expertise required</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
