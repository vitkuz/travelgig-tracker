// utils/websocketService.ts

let socket: WebSocket | null = null;

export const connectWebSocket = (apiUrl: string): void => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        socket = new WebSocket(apiUrl);

        // Log connection events
        socket.onopen = () => {
            console.log('Connected to WebSocket');
        };

        socket.onclose = () => {
            console.log('Disconnected from WebSocket');
        };

        socket.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };
    }
};

export const sendMessage = (message: Record<string, unknown>): void => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    } else {
        console.warn('WebSocket is not open. Cannot send message.');
    }
};

export const subscribeToMessages = (callback: (data: any) => void): void => {
    if (socket) {
        socket.onmessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            callback(data);
        };
    }
};
