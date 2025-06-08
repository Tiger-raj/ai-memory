import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../icons/Logo";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { LinkIcon } from "../icons/LinkIcon";
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
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Digital Memory</span> Enhanced
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">Store, organize, and share your digital content effortlessly. From YouTube videos to important documents, keep everything in one intelligent workspace.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" text="Start Building Your Memory" onClick={() => navigate("/signup")} />
              <Button variant="secondary" size="lg" text="Watch Demo" onClick={() => setShowDemoModal(true)} />
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sample Cards */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
                  <div className="flex items-center mb-3">
                    <YoutubeIcon />
                    <span className="ml-2 font-medium">YouTube Video</span>
                  </div>
                  <div className="h-20 bg-red-200 rounded mb-3"></div>
                  <p className="text-sm text-gray-600">Learning React Hooks</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center mb-3">
                    <TwitterIcon />
                    <span className="ml-2 font-medium">Twitter Post</span>
                  </div>
                  <div className="h-20 bg-blue-200 rounded mb-3"></div>
                  <p className="text-sm text-gray-600">Tech Industry Insights</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center mb-3">
                    <DocumentIcon />
                    <span className="ml-2 font-medium">Document</span>
                  </div>
                  <div className="h-20 bg-green-200 rounded mb-3"></div>
                  <p className="text-sm text-gray-600">Project Notes</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features for Modern Memory</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to capture, organize, and share your digital content efficiently.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <YoutubeIcon />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Platform Support</h3>
              <p className="text-gray-600">Save content from YouTube, Twitter, LinkedIn, Instagram, Pinterest, and more with embedded previews.</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DocumentIcon />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Rich Content Management</h3>
              <p className="text-gray-600">Store documents, add descriptions, and organize everything with intelligent categorization.</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShareIcon />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Sharing</h3>
              <p className="text-gray-600">Share your entire memory collection with others through secure, shareable links.</p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <LinkIcon />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Organization</h3>
              <p className="text-gray-600">Filter and organize by content type, with sidebar navigation for quick access.</p>
            </div>

            {/* Feature 5 */}
            <div className="text-center p-6">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Private</h3>
              <p className="text-gray-600">Your data is secured with JWT authentication and you control what to share.</p>
            </div>

            {/* Feature 6 */}
            <div className="text-center p-6">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm2 2a1 1 0 000 2h.01a1 1 0 100-2H5zm3 0a1 1 0 000 2h3a1 1 0 100-2H8z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Responsive Design</h3>
              <p className="text-gray-600">Access your memory from any device with our fully responsive and mobile-friendly interface.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Enhance Your Memory?</h2>
          <p className="text-xl text-purple-100 mb-8">Join thousands of users who have already transformed how they manage digital content.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate("/signup")} className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg">
              Get Started for Free
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
                , for better digital organization.
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
