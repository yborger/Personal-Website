export default function Page() {
  return(
    <div>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold underline">wowo fast it it works, Next.js!</h1>
        <div className="flex flex-col">
          <div className="p-3 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">1</div>
          <div>1</div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded=xl">
          <slot/>
          </button>
          <div>1</div>
        </div>
      
      
      
      
      
      </div>
    </div>
  )
}