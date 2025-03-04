import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";

import Key from "./Key";

function PianoComponent() {
    // Piano notes and their corresponding key characters
    const notes = [
        { note: "C4", keyChar: "A", position: 0 },
        { note: "C#4", keyChar: "W", position: 0.5 },
        { note: "D4", keyChar: "S", position: 1 },
        { note: "D#4", keyChar: "E", position: 1.5 },
        { note: "E4", keyChar: "D", position: 2 },
        { note: "F4", keyChar: "F", position: 3 },
        { note: "F#4", keyChar: "T", position: 3.5 },
        { note: "G4", keyChar: "G", position: 4 },
        { note: "G#4", keyChar: "Y", position: 4.5 },
        { note: "A4", keyChar: "H", position: 5 },
        { note: "A#4", keyChar: "U", position: 5.5 },
        { note: "B4", keyChar: "J", position: 6 },
        { note: "C5", keyChar: "K", position: 7 },
    ];

    // Key colours for the piano keys
    const keyColours = ["#F5B9C3", "#F5D9C0", "#F1F0CF", "#D4E2C2", "#D1D9E9", "#D0BED3", "#FAD2DF"];
    
    // Synthesizer for playing notes
    const [synth, setSynth] = useState(new Tone.PolySynth().toDestination());
    // State to force rerender the keys
    const [forceRender, setForceRender] = useState(0);
    
    // State to track if the mouse is pressed
    const [isMousePressed, setIsMousePressed] = useState(false);
    // Track active keys
    const activeKeysRef = useRef<string[]>([]);

    // Function to convert a key character
    const charToKey = (char: string) : string => {
        return notes.filter(note => note.keyChar === char.toUpperCase())[0]?.note ?? ' ';
    }
    
    // Function to play a note
    const playNote = (note : string) => {
        synth.triggerAttack(note);
        activeKeysRef.current = [...activeKeysRef.current, note];
        console.log(activeKeysRef.current);
        setForceRender(prevForceRender => prevForceRender + 1);
    }
    // Function to stop a note
    const stopNote = (note : string) => {
        synth.triggerRelease(note);
        activeKeysRef.current = activeKeysRef.current.filter(key => key !== note);
        setForceRender(prevForceRender => prevForceRender + 1);
    }
    
    // Event handlers for mouse and keyboard events
    // Function to handle mouse down event
    const handleMouseDown = (note: string) => {
        setIsMousePressed(true);
        playNote(note);
    };

    // Function to handle mouse up event
    const handleMouseUp = (note: string) => {
        console.log("note up: ", note);
        setIsMousePressed(false);
        stopNote(note);
    };

    // Function to handle mouse enter event
    const handleMouseEnter = (note: string) => {
        if (isMousePressed) {
            console.log("Mouse enter" + note);
            playNote(note);
        }
    };

    // Function to handle mouse leave
    const handleMouseLeave = (note: string) => {
        if (isMousePressed) {
            stopNote(note);
        }
    };

    // Function to handle keyboard events
    const handleKeyEvent = (event: KeyboardEvent, callback: (note: string) => void) => {
        const keyObj = notes.find(note => note.keyChar.toUpperCase() === event.key.toUpperCase());
        if (keyObj) {
            callback(keyObj.note);
        }
    };

    // Event listener for keyboard events
    useEffect(() => {
        // Set the synth to a new PolySynth
        synth.set({
            detune: -1200
        });

        // Call onMouseDown when the key is pressed
        const handleKeyDown = (event: KeyboardEvent) => {
            if(activeKeysRef.current.includes(charToKey(event.key)))
                return;
            handleKeyEvent(event, handleMouseDown);
        }

        // Call onMouseUp when the key is released
        const handleKeyUp = (event: KeyboardEvent) => handleKeyEvent(event, handleMouseUp);

        // Add event listener for keydown and keyup
        window.addEventListener("keydown", handleKeyDown); 
        window.addEventListener("keyup", handleKeyUp);

        // Remove event listener when the component is unmounted
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }
    , []);

    

    // Event listener for global mouse up event
    useEffect(() => {
        const handleGlobalMouseUp = () => {
            if (isMousePressed) {
                setIsMousePressed(false);
            }
        };

        document.addEventListener("mouseup", handleGlobalMouseUp);

        // Remove event listener when the component is unmounted
        return () => {
            document.removeEventListener("mouseup", handleGlobalMouseUp);
        };
    }, [isMousePressed]);

    return (
        <div className="Piano flexbox">
            {notes.map((keyObj, index) => (
                <Key
                    key={index}
                    note={keyObj.note}
                    type={keyObj.note.includes("#") ? "black" : "white"}
                    keyChar={keyObj.keyChar}
                    keyColour={keyColours[index % keyColours.length]}
                    position={keyObj.position}
                    isActive={activeKeysRef.current.includes(keyObj.note)}
                    onMouseDown={handleMouseDown}
                    onMouseUp={() => handleMouseUp(keyObj.note)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={() => handleMouseLeave(keyObj.note)}
                />
            ))}
        </div>
    );
}

export default PianoComponent;