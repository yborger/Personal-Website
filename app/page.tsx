export default function Page() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage:'url(clouds.jpg)' }}>
      
      {/* Container of page content */}
      <div className="bg-white rounded-lg shadow-xl p-8 m-8 w-full h-screen">
        {/* Signature-ish Image at the Top */}
        <div className="flex justify-center mb-6">
          <img
            src="art sign.png"
            className="w-24 h-24 rounded-lg"
          />
        </div>
        
        {/* Clickable Pages */}
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }, (_, index) => (
            <a
              key={index}
              href={`#page-${index + 1}`}
              className="flex items-center justify-center h-24 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors duration-300"
            >
              Page {index + 1}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

