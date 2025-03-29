import { Posts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="ml-4 mb-8 text-2xl font-semibold tracking-tighter">
      about
      </h1>
      <div className="flex flex-col md:flex-row mx-auto">
        <div className="w-full md:w-1/3 p-4 flex justify-center">
            <img 
              src="/profile photo.jpg" 
              alt="Professional photo" 
              className="w-full max-w-3xs h-auto rounded-sm" />
          </div>
          <div className="w-full md:w-2/3 p-4">
            <p>
              {`Hi! I'm Yael Borger, and I am a software developer from New Jersey. My journey into the tech world began with a fascination for problem-solving and technology, leading me to explore various programming languages and frameworks`}
            </p>
            
        </div>
      </div>
      <div className='pl-4'>
      <p>
        {'Throughout my career, I have honed my skills in JavaScript, Python, and HTML/CSS, and I enjoy working across the full stack, from frontend development to backend systems. I take pride in crafting engaging user experiences that not only look great but also function smoothly and seamlessly.'}
      </p>
      <p>
        {"I have worked on projects ranging from simple applications to complex software solutions, each teaching me something new. I'm particularly interested in web development and UI/UX design."}
      </p>
      </div>
    </section>
  )
}
