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
    const currentColour = isActive ? keyColour : `var(--${type}-key-background-colour)`;
    const currentTextColour = `var(--${type}-key-text-colour)`;
    const currentBorderColour = `var(--${type}-key-border-colour)`;

    // Style for the key
    const style = {
        backgroundColor: currentColour,
        color: currentTextColour,
        borderColor: currentBorderColour,
        left: type === "black" ? `${(position + 0.25) * 80}px` : "auto",
    };

    return (
        <button
            className={`Key ${type === "black" ? "black-key" : ""}`}
            style={style}
            onMouseDown={() => onMouseDown(note)}
            onMouseUp={onMouseUp}
            onMouseEnter={() => onMouseEnter(note)}
            onMouseLeave={onMouseLeave}
        >
            <p>{keyChar}</p>
            <p>{note}</p>
        </button>
    );
}

export default Key;