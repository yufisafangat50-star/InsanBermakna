import Opening from './components/sections/Opening'
import Kenangan from './components/sections/Kenangan'
import Reflection from './components/sections/Reflection'
import PesanUntukmu from './components/sections/PesanUntukmu'
import Penutup from './components/sections/Penutup'
import AudioToggle from './components/shared/AudioToggle'
function App() {
  return (
    <main>
      <AudioToggle />
      <Opening />
      <Kenangan />
      <Reflection />
      <PesanUntukmu />
      <Penutup />
    </main>
  )
}
export default App
