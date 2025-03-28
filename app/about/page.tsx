import { Posts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        about
      </h1>
      <p className="mb-4">
        {`Hi! I'm Yael Borger, and I am a software developer from New Jersey. My journey into the tech world began with a fascination for problem-solving and technology, leading me to explore various programming languages and frameworks`}
      </p>

      <p>{'Throughout my career, I have honed my skills in JavaScript, Python, and HTML/CSS, and I enjoy working across the full stack, from frontend development to backend systems. I take pride in crafting engaging user experiences that not only look great but also function smoothly and seamlessly.'}</p>

      <p>{"I have worked on projects ranging from simple applications to complex software solutions, each teaching me something new. I'm particularly interested in web development and UI/UX design."}</p>

      
    </section>
  )
}
