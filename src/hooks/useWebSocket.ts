// hooks/useWebSocket.ts
import { useEffect, useRef, useState } from 'react';

export const useWebSocket = (url: string) => {
    const [messages, setMessages] = useState<string[]>([]);
    const webSocketRef = useRef<WebSocket | null>(null);

    // Connect WebSocket
    useEffect(() => {
        webSocketRef.current = new WebSocket(url);

        webSocketRef.current.onopen = () => console.log('Connected to WebSocket');
        webSocketRef.current.onclose = () => console.log('Disconnected from WebSocket');

        webSocketRef.current.onmessage = (event) => {
            const newMessage = event.data;
            setMessages((prev) => [...prev, newMessage]);
        };

        return () => webSocketRef.current?.close();
    }, [url]);

    // Send message
    const sendMessage = (message: string) => {
        console.log('sendMessage',message);
        webSocketRef.current?.send(JSON.stringify({ message }));
    };

    return { messages, sendMessage };
};
