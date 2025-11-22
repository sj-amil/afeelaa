export default function TestPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Test Page</h1>
        <p className="text-gray-600">This is a simple test page with no redirects.</p>
        <p className="text-gray-600 mt-4">Current URL should be /test</p>
      </div>
    </div>
  );
}