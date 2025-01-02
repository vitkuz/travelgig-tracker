// components/WebSocketComponent.tsx
import React, { useState } from 'react';
import {useWebSocket} from "@/hooks/useWebSocket";

const WebSocketComponent: React.FC = () => {
    const [input, setInput] = useState('');
    const { messages, sendMessage } = useWebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
        setInput('');
    };

    return (
        <div>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            {/*<form onSubmit={handleSubmit}>*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        value={input}*/}
            {/*        onChange={(e) => setInput(e.target.value)}*/}
            {/*        placeholder="Type a message"*/}
            {/*    />*/}
            {/*    <button type="submit">Send</button>*/}
            {/*</form>*/}
        </div>
    );
};

export default WebSocketComponent;
