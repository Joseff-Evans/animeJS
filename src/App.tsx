import { useEffect, useState } from 'react';
import './App.css'

import anime from 'animejs/lib/anime.es.js'

export type dirType = "normal" | "reverse" | undefined

const backgrounds = ["rgba(0,0,0,0)","#181818"]
const direction : dirType[] = ['normal','reverse']
const cardSize = 50

function App() {
  const [windowSize,setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })
  const [animateIndex,setAnimateIndex] = useState(0)

  const handleWindowSizeChange = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  };

  useEffect(() =>{
    window.addEventListener("resize",handleWindowSizeChange);
    return () => window.removeEventListener("resize", handleWindowSizeChange);
  },[])

  const columns = Math.floor(windowSize.width/cardSize);
  const rows = Math.floor(windowSize.height/cardSize);
  const array = Array.from({length: rows}, (_) => Array.from({length: columns}, (_,i) => i))

  const animateGrid = (index : number) => {

    anime({
      targets: ".gridItem",
      backgroundColor: backgrounds[animateIndex],
      delay: anime.stagger(60, {
        grid:[columns, rows],
        from: index,
        direction: direction[animateIndex]
      })
    })

    setAnimateIndex(prev => ( prev + 1 ) % 2 )

  }

  return (
    <>
    <div style={
      {
        display:'grid',
        gridTemplateColumns:'repeat(' + columns +', 1fr)',
        gridTemplateRows:'repeat(' + rows +', 1fr)'
      }
    } 
    className='grid'>
      {array.map((row,x) => row.map((_,y) => (
        <div
          className="gridItem" key={x + "," + y}
          onClick={() => animateGrid( (x*columns) + y)}
        >
        </div>
      )))}
    </div>
    <div className='iconBackground'>
      <svg className="svgBackground" width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.35 5.321a6.75 6.75 0 0 1 11.692 6.75l-.25.433a.75.75 0 0 1-1.025.275l-4.558-2.632-2.373 4.152c1.905.226 3.59 1.21 4.843 2.615a2.002 2.002 0 0 0-1.3.802C15.214 16.508 13.666 15.75 12 15.75c-1.666 0-3.214.758-4.38 1.966a2.002 2.002 0 0 0-1.299-.802c1.24-1.39 2.903-2.368 4.783-2.607l2.806-4.91-4.535-2.618A.75.75 0 0 1 9.1 5.754l.25-.433Zm1.43.537 1.966 1.135c.534-.82 1.074-1.493 1.743-2.102a11.15 11.15 0 0 1 1.826-1.326 5.253 5.253 0 0 0-5.535 2.293Zm5.81 3.354c.554-.997.82-1.79.916-2.555.077-.621.047-1.256-.064-2.01-.818.46-1.43.886-1.944 1.354-.533.485-.981 1.031-1.451 1.743l2.543 1.468Zm1.299.75 1.974 1.14a5.253 5.253 0 0 0-.857-6.02 7.98 7.98 0 0 1-.012 1.761c-.126 1.01-.476 1.992-1.105 3.12ZM6.714 18.66a.75.75 0 0 0-1.444.056c-.21.89-.607 1.364-1.041 1.634-.46.286-1.05.401-1.729.401a.75.75 0 0 0 0 1.5c.822 0 1.73-.135 2.521-.627a3.504 3.504 0 0 0 1.062-1.029c1.552 1.866 4.41 1.856 5.917-.029 1.534 1.919 4.466 1.895 5.997-.071.848 1.109 2.17 1.756 3.503 1.756a.75.75 0 0 0 0-1.5c-1.183 0-2.384-.797-2.784-2.084a.75.75 0 0 0-1.43-.008c-.784 2.44-3.81 2.4-4.575.105a.75.75 0 0 0-1.422 0c-.765 2.294-3.791 2.335-4.575-.105Z" fill="rgba(255,255,255,0.2)"/></svg>
    </div>
    </>
    )
}

export default App
