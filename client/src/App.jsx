import LeftSection from "./components/layout/LeftSection"
import RightSection from "./components/layout/RightSection"

function App() {
  return (
    <main className='w-full h-screen bg-zinc-950 p-5 flex gap-2 text-zinc-300'>
      <LeftSection/>
      <RightSection/>
    </main>
  )
}

export default App