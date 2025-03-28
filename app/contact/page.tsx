
export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        contact
      </h1>
      
      
      <div className="flex">
        <div className="w-1/3 p-4">
          <img src="/profile photo.jpg" alt="Professional photo" className="w-full h-auto " />
        </div>
        <div className="w-2/3 p-4">
          <p className="mb-4">{`I'd love to hear from you!`}</p>
          <p>{'Email: yaelnborger@gmail.com'}</p>
          <p>{'LinkedIn: '}<a href="https://linkedin.com/in/yael-borger" target="_blank" rel="noopener noreferrer">linkedin.com/in/yael-borger</a></p>
          <p>{'GitHub: '}<a href="https://github.com/yborger" target="_blank" rel="noopener noreferrer">github.com/yborger</a></p>        
        </div>
      </div>

  
  <p className="mt-4">{'Interested in my experience? '}</p>
  <a
  href="/Yael-Borger-Software-Dev-Resume.docx" // Assuming the file is in the public folder
  download="YaelBorger_Resume.docx" // This sets the download file name
  className="text-blue-500 hover:underline"
>
  {'Download my resume'}
</a>


    </section>
  )
}