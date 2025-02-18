import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import ChatIcon from '@mui/icons-material/Chat';
import './Chat.css';

// Подключение к Socket.IO серверу
const socket: Socket = io('http://localhost:8000');

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        socket.on('response', (data: string) => {
            setMessages(prev => [...prev, data]);
        });
    }, []);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = () => {
        if (inputMessage.trim()) {
            socket.emit('message', inputMessage);
            setMessages(prev => [...prev, `Вы: ${inputMessage}`]);
            setInputMessage('');
        }
    };

    return (
        <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
            <div className="chat-header" onClick={toggleChat}>
                {isOpen ? 'Чат Консультаций' : <ChatIcon /> }
            </div>

            {isOpen && (
                <div className="chat-body">
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className="chat-message">
                                {msg}
                            </div>
                        ))}
                    </div>

                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        className="chat-input"
                        placeholder="Введите сообщение"
                    />
                    <button onClick={sendMessage} className="chat-send-button">
                        Отправить
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;
