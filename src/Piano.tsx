import React, { useState, useEffect } from "react";
import Key from "./Key";

function Piano() {
    // Piano notes and their corresponding key characters
    const notes = [
        { note: "C4", keyChar: "A", position: 0 },
        { note: "C4#", keyChar: "W", position: 0.5 },
        { note: "D4", keyChar: "S", position: 1 },
        { note: "D4#", keyChar: "E", position: 1.5 },
        { note: "E4", keyChar: "D", position: 2 },
        { note: "F4", keyChar: "F", position: 3 },
        { note: "F4#", keyChar: "T", position: 3.5 },
        { note: "G4", keyChar: "G", position: 4 },
        { note: "G4#", keyChar: "Y", position: 4.5 },
        { note: "A4", keyChar: "H", position: 5 },
        { note: "A4#", keyChar: "U", position: 5.5 },
        { note: "B4", keyChar: "J", position: 6 },
        { note: "C5", keyChar: "K", position: 7 },
    ];
    
    // Key colours for the piano keys
    const keyColours = ["#F5B9C3", "#F5D9C0", "#F1F0CF", "#D4E2C2", "#D1D9E9", "#D0BED3", "#FAD2DF"];
    
    // State to track mouse press
    const [isMousePressed, setIsMousePressed] = useState(false);
    // State to track active keys
    const [activeKeys, setActiveKeys] = useState<string[]>([]);

    // Event handlers for mouse and keyboard events
    const handleMouseDown = (note: string) => {
        setIsMousePressed(true);
        setActiveKeys(prevKeys => [...prevKeys, note]);
    };

    const handleMouseUp = (note: string) => {
        setIsMousePressed(false);
        setActiveKeys(prevKeys => prevKeys.filter(key => key !== note));
    };

    const handleMouseEnter = (note: string) => {
        if (isMousePressed) {
            setActiveKeys(prevKeys => [...prevKeys, note]);
        }
    };

    const handleMouseLeave = (note: string) => {
        if (isMousePressed) {
            setActiveKeys(prevKeys => prevKeys.filter(key => key !== note));
        }
    };

    const handleKeyEvent = (event: KeyboardEvent, callback: (note: string) => void) => {
        const keyObj = notes.find(note => note.keyChar.toUpperCase() === event.key.toUpperCase());
        if (keyObj) {
            callback(keyObj.note);
        }
    };

    // Event listeners for keyboard events
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => handleKeyEvent(event, handleMouseDown);
        const handleKeyUp = (event: KeyboardEvent) => handleKeyEvent(event, note => setActiveKeys(prevKeys => prevKeys.filter(key => key !== note)));

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [notes]);

    // Event listener for global mouse up event
    useEffect(() => {
        const handleGlobalMouseUp = () => {
            if (isMousePressed) {
                setIsMousePressed(false);
            }
        };

        document.addEventListener("mouseup", handleGlobalMouseUp);

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
                    isActive={activeKeys.includes(keyObj.note)}
                    onMouseDown={handleMouseDown}
                    onMouseUp={() => handleMouseUp(keyObj.note)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={() => handleMouseLeave(keyObj.note)}
                />
            ))}
        </div>
    );
}

export default Piano;