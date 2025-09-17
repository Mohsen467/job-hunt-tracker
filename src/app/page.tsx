export default function HomePage() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Job Hunt Tracker
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Track your job applications, contacts, interviews, and follow-ups
          </p>
          <div className="space-x-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add New Contact
            </button>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              View All Contacts
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}