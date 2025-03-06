import { useState, useEffect, useRef } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import './Chat.css';

const WS_URL = 'ws://localhost:8000/ws';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        socketRef.current = new WebSocket(WS_URL);

        socketRef.current.onopen = () => {
            console.log('WebSocket подключен');
        };

        socketRef.current.onerror = (error) => {
            console.error('Ошибка WebSocket:', error);
        };

        socketRef.current.onmessage = (event) => {
            console.log('Сообщение от сервера:', event.data);
            setMessages((prev) => [...prev, event.data]);
            setIsTyping(false);
        };

        socketRef.current.onclose = () => {
            console.log('WebSocket соединение закрыто');
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = () => {
        if (inputMessage.trim() && socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(inputMessage);
            setMessages((prev) => [...prev, `Вы: ${inputMessage}`]);
            setInputMessage('');
            setIsTyping(true);
        } else {
            console.error("WebSocket не подключен");
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
                                <div className="button-message" onClick={() => setMessages(prev => [...prev, "Привет! Какой курс вас интересует?"])}>
                                    <img src="src/assets/chat.svg" className="chat-start-message" />
                                    <p className='title-text'>Возникли вопросы?</p>
                                    <p className='text-description'>Спросите у консультанта</p>
                                </div>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div key={index} className={`chat-message ${msg.startsWith("Вы:") ? "chat-message-user" : "chat-message-server"}`}>
                                    {msg}
                                </div>
                            ))
                        )}

                        {isTyping && (
                            <div className="chat-message chat-message-server typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
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
