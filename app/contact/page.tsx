
export default function Page() {
  return (
    <section>
      <h1 className="ml-4 mb-8 text-2xl font-semibold tracking-tighter">
        contact
      </h1>
      
      <div className="flex flex-col md:flex-row mx-auto">
        <div className="w-full h-full md:w-full p-4 flex "> {/*md:w-1/3 but iframe is weird?*/}
          <div className="flex-row justify-items-center">
            <iframe 
              src="/resumes/Yael-Borger-Frontend-Resume.pdf" 
              className="w-full h-auto rounded-sm border:none">
            </iframe>
            <a
              href="/Yael-Borger-Frontend-Resume.docx" // Assuming the file is in the public folder
              download="YaelBorger_Resume.docx" // This sets the download file name
              className="text-blue-500 hover:underline ">{'Download my resume'}
            </a>
          </div>
        </div>
        <div className="w-full md:w-2/3 p-4">
          <p className="mb-4">{`I'd love to hear from you!`}</p>
          <p>{'Email: yaelnborger@gmail.com'}</p>
          <p>{'LinkedIn: '}<a href="https://linkedin.com/in/yael-borger" target="_blank" rel="noopener noreferrer">linkedin.com/in/yael-borger</a></p>
          <p>{'GitHub: '}<a href="https://github.com/yborger" target="_blank" rel="noopener noreferrer">github.com/yborger</a></p>        
        </div>
      </div>  

    </section>
  )
}