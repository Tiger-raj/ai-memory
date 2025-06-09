import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../icons/Logo";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
// import { LinkIcon } from "../icons/LinkIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Button } from "../components/Button";
import { DemoModal } from "../components/DemoModal";

export function LandingPage() {
  const navigate = useNavigate();
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-purple-600">
                <Logo />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Ai-Memory</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="secondary" size="md" text="Sign In" onClick={() => navigate("/signin")} />
              <Button variant="primary" size="md" text="Get Started" onClick={() => navigate("/signup")} />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">AI-Powered Memory</span> Assistant
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Store your digital content and <strong>query it with AI</strong>. Ask questions about your saved memories and get intelligent answers powered by vector embeddings and advanced AI models.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" text="Start Your AI Memory" onClick={() => navigate("/signup")} />
              <Button variant="secondary" size="lg" text="Watch Demo" onClick={() => setShowDemoModal(true)} />
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-5xl mx-auto border border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side - Saved Content */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Your Saved Memories</h3>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
                      <div className="flex items-center mb-2">
                        <YoutubeIcon />
                        <span className="ml-2 font-medium text-sm">YouTube Video</span>
                      </div>
                      <p className="text-sm text-gray-600">React Hooks Tutorial</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center mb-2">
                        <DocumentIcon />
                        <span className="ml-2 font-medium text-sm">Document</span>
                      </div>
                      <p className="text-sm text-gray-600">MongoDB Best Practices</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center mb-2">
                        <TwitterIcon />
                        <span className="ml-2 font-medium text-sm">Twitter Thread</span>
                      </div>
                      <p className="text-sm text-gray-600">Vector Databases Explained</p>
                    </div>
                  </div>
                </div>

                {/* Right Side - AI Query Interface */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Query Your Memory</h3>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200 min-h-[280px] flex flex-col justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-sm text-gray-700 font-medium">💭 "How do I use React hooks with MongoDB?"</p>
                      </div>
                      <div className="bg-purple-600 rounded-lg p-3 text-white">
                        <div className="flex items-start space-x-2">
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs flex-shrink-0">🤖</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">Based on your saved content, here's how to combine React hooks with MongoDB...</p>
                            <div className="mt-2 text-xs opacity-80">📚 Referenced: React Hooks Tutorial, MongoDB Best Practices</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <div className="inline-flex items-center space-x-1 text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>AI-Powered by Vector Embeddings</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">AI-Enhanced Memory Management</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Advanced features powered by AI and vector technology to make your digital memory truly intelligent.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 - AI Query (Primary Feature) */}
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Querying</h3>
              <p className="text-gray-600">Ask questions about your saved content and get intelligent answers. Powered by vector embeddings and Pinecone database for semantic search.</p>
              <div className="mt-3 inline-block bg-purple-600 text-white text-xs px-2 py-1 rounded-full">🌟 Flagship Feature</div>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Vector Storage</h3>
              <p className="text-gray-600">Your content is automatically converted to vector embeddings and stored in Pinecone for lightning-fast semantic retrieval.</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <YoutubeIcon />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Platform Support</h3>
              <p className="text-gray-600">Save content from YouTube, Twitter, documents, and more. All content becomes queryable through our AI system.</p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DocumentIcon />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Intelligent Context</h3>
              <p className="text-gray-600">AI provides answers with context from your most relevant saved memories, showing exactly which content was referenced.</p>
            </div>

            {/* Feature 5 */}
            <div className="text-center p-6">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShareIcon />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Sharing</h3>
              <p className="text-gray-600">Share your memory collections and even share AI-generated insights with others through secure links.</p>
            </div>

            {/* Feature 6 */}
            <div className="text-center p-6">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Private</h3>
              <p className="text-gray-600">Your data and AI queries are secured with JWT authentication. Your memory remains private and under your control.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Experience AI-Powered Memory?</h2>
          <p className="text-xl text-purple-100 mb-8">Join the future of digital memory management. Save content, query with AI, and never lose valuable information again.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate("/signup")} className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Start Your AI Memory
            </button>
            <button onClick={() => navigate("/signin")} className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="text-purple-400">
                <Logo />
              </div>
              <span className="ml-2 text-xl font-bold">Ai-Memory</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>
                &copy; 2025 Ai-Memory. Built with passion by{" "}
                <a href="https://github.com/Tiger-raj" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors underline">
                  Priyanshu Bajpai
                </a>
                , for intelligent digital organization.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      <DemoModal open={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </div>
  );
}
