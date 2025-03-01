import { useEffect } from "react";

interface Props {
    note: string;
    type: "black" | "white";
    keyChar: string;
    keyColour: string;
    isActive: boolean;
    position: number;
    onMouseDown: (note: string) => void;
    onMouseUp: () => void;
    onMouseEnter: (note: string) => void;
    onMouseLeave: () => void;
}

function Key({
    note,
    type,
    keyChar,
    keyColour,
    isActive,
    position,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    }: Props) {
        // Change the colour of the key when it is active
    const currentColour = isActive ? keyColour : type === "black" ? "black" : "white";

    // Style for the key
    const style = {
        backgroundColor: currentColour,
        left: type === "black" ? `${(position + 0.25) * 80}px` : "auto",
    };

    // Event listener for keyboard events
    const handleKeyEvent = (event: KeyboardEvent, callback: (note: string) => void) => {
        if (event.key.toUpperCase() === keyChar.toUpperCase()) {
            callback(note);
        }
    };

    // Event listeners for keyboard events
    useEffect(() => {
        // Call onMouseDown when the key is pressed
        const handleKeyDown = (event: KeyboardEvent) => handleKeyEvent(event, onMouseDown);
        // Call onMouseUp when the key is released
        const handleKeyUp = (event: KeyboardEvent) => handleKeyEvent(event, onMouseUp);

        // Add event listener for keydown and keyup
        window.addEventListener("keydown", handleKeyDown); 
        window.addEventListener("keyup", handleKeyUp);

        // Remove event listener when the component is unmounted
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [keyChar, note, onMouseDown, onMouseUp]);

    return (
        <button
            className={`Key ${type === "black" ? "black-key" : ""}`}
            style={style}
            onMouseDown={() => onMouseDown(note)}
            onMouseUp={onMouseUp}
            onMouseEnter={() => onMouseEnter(note)}
            onMouseLeave={onMouseLeave}
        >
        </button>
    );
}

export default Key;