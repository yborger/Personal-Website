"use client"
import PhaseBoard from 'app/components/phaseboard'

const phases = [
  {
    number: 1,
    title: "Neural Network for Flowers",
    description: "As part of the final project for the Artificial Intelligence course taught at Swarthmore College, my lab partner and I created a Neural Network that can identify flowers through image recognition. I also presented it as part of my senior capstone",
    image: "neural_network/senior_poster.png",
    bg: "#7F77DD",
  },
  {
    number: 2,
    title: "Goal",
    description: "The goal was to create a neural network that could identify 5 different types of flowers by a photo. The chosen flowers were daisy, dandelion, rose, sunflower, and tulip.",
    bg: "#B065AD",
  },
  {
    number: 3,
    title: "Process",
    description: "",
    bg: "#1DC49E",
    slides: [
      {
        title: "Starting Out",
        description: "We sourced our data set from Kaggle, over 4300 images. Then, we randomly sorted 80% of the images into our training set and 20% into the testing set.",
        image: "/neural_network/starting_imgs.png"
      },
      {
        title: "Neural Network Structure",
        description: "There were no limitations set for this project, so we aimed for accuracy over everything.",
        image: "/neural_network/parameters.png",
      },
      {
        title: "Results",
        description: "We were able to achieve an accuracy of 0.99, and validation accuracy of 0.83. Essentially, the network was trained on a specific set, and for that set has a 99% accuracy. The validation accuracy is for the new, not yet seen data.",
        image: "/neural_network/results.png",
      },
    ],
  },
  {
    number: 4,
    title: "Takeaways",
    description: "",
    bg: "#2E9EC4",
    slides: [
      {
        title: "Understanding AI",
        description: "Considering the era we are in, I am so grateful to have had this background in artificial intelligence.",
        embed: "neural_network/write-up.pdf"
      },
      {
        title: "The Importance of the Write-up",
        description: "As my lab partner and I worked on this project, we would try out different orders in the network, but what we really had to remember was what each layer actually did. When you work on something long enough, the words kind of start blending together, and this was a really good way of making sure that we fully understood what we were doing at each step.",
      }
    ]
  },
]

export default function Page() {
  return (
    <section className="relative min-h-screen pt-10 px-4">
      <PhaseBoard cards={phases} />
    </section>
  )
}