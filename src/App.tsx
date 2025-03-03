import './App.css'
import PianoComponent from './PianoComponent'

function App() {
    return(
        <div className='App flexbox'>
            <PianoComponent />
            <footer>
                ©{new Date().getFullYear()} Developed and coded by <a href='https://www.linkedin.com/in/andreea-maria-sandulache-312927207/' target='_blank'>Andreea "PuffyBean" Săndulache</a> from <a href='https://blackcatjoystickstudios.carrd.co/' target='_blank'>BlackCatJoystick Studios</a>.
            </footer>
        </div>
    )
}

export default App
