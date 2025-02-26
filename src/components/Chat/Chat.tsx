import { useState, useEffect } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import './Chat.css';

// Функция для создания нового WebSocket соединения
const createWebSocket = () => {

    const ws = new WebSocket('ws://localhost:8000/ws');  // Подключение к WebSocket
    ws.onopen = () => {
        console.log('WebSocket подключен');
    };

    ws.onerror = (error) => {
        console.error('Ошибка WebSocket:', error);
    };

    ws.onmessage = (event) => {
        console.log('Сообщение от сервера:', event.data);
        // Здесь вы можете обновить состояние или выполнить другие действия с полученными данными
    };

    ws.onclose = () => {
        console.log('WebSocket соединение закрыто');
    };


    return ws;
};

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        // Создаем WebSocket соединение при монтировании компонента
        const ws = createWebSocket();
        setSocket(ws);

        // Обработчик входящих сообщений
        ws.onmessage = (event) => {
            const data = event.data;
            setMessages((prev) => [...prev, data]);
        };

        // Очистка при размонтировании компонента
        return () => {
            if (ws) ws.close();
        };
    }, []);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = () => {
        if (inputMessage.trim() && socket && socket.readyState === WebSocket.OPEN) {
            socket.send(inputMessage);  // Отправляем сообщение через WebSocket
            setMessages((prev) => [...prev, inputMessage]);
            setInputMessage('');
        } else {
            console.error("WebSocket не открыт или закрыт, невозможно отправить сообщение");
        }
    };

    return (
        <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
            <div className={`chat-header ${isOpen ? 'open' : ''}`} onClick={toggleChat}>
                {isOpen ? 'Чат Консультаций' : <ChatIcon />}
            </div>

            {isOpen && (
                <div className="chat-body">
                    <div className="chat-messages">
                        {messages.length === 0 ? (
                            <div className="chat-container">
                                <div className="button-message" onClick={() => setMessages(prev => [...prev, "Привет"])}>
                                    <img src="src/assets/chat.svg" className="chat-start-message" />
                                    <p className='title-text'>Возникли вопросы?</p>
                                    <p className='text-description'>Спросите у консультанта или нажмите сверху</p>
                                </div>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div key={index} className="chat-message">
                                    {msg}
                                </div>
                            ))
                        )}
                    </div>

                    <div className="chat-input-container">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            className="chat-input"
                            placeholder="Введите сообщение"
                        />
                        <button onClick={sendMessage} className="chat-send-button">
                            <SendIcon />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;
