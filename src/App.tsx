import React, { useState, useEffect } from "react";
import './App.css'
import PianoComponent from './PianoComponent'

function App() {
    // State to track the theme
    const [theme, setTheme] = useState("light-mode");

    // Function to toggle the theme
    const toggleTheme = () => {
        setTheme(theme === "light-mode" ? "dark-mode" : "light-mode");
    };

    // Apply the theme to the body element
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return(
        <div className="App flexbox">
            <button onClick={toggleTheme}>
                Toggle {theme === "light-mode" ? "Dark" : "Light"} Mode
            </button>
            <PianoComponent />
            <footer>
                ©{new Date().getFullYear()} Developed by <a href='https://www.linkedin.com/in/andreea-maria-sandulache-312927207/' target='_blank'>Andreea "PuffyBean" Săndulache</a> from <a href='https://blackcatjoystickstudios.carrd.co/' target='_blank'>BlackCatJoystick Studios</a>.
            </footer>
        </div>
    )
}

export default App
