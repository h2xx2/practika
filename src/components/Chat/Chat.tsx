import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import './Chat.css';

// Подключение к Socket.IO серверу
const socket: Socket = io('http://localhost:8000');

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        const handleResponse = (data: string) => {
            setMessages(prev => [...prev, data]);
        };

        socket.on('response', handleResponse);

        return () => {
            socket.off('response', handleResponse); // Очистка подписки при размонтировании
        };
    }, []);


    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = () => {
        if (inputMessage.trim()) {
            socket.emit('message', inputMessage);
            setMessages(prev => [...prev, `${inputMessage}`]);
            setInputMessage('');
        }
    };
    const handleButtonClick = () => {
        setMessages(prev => [...prev, "Привет"]);
    };

    return (
        <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
            <div className={`chat-header ${isOpen ? 'open' : ''}`} onClick={toggleChat}>
                {isOpen ? 'Чат Консультаций' : <ChatIcon /> }
            </div>

            {isOpen && (
                <div className="chat-body">

                    <div className="chat-messages">
                        {messages.length === 0 ? (
                            <>
                                <div className="chat-container" >
                                    <div className="button-message" onClick={handleButtonClick}>
                                        <img src="src/assets/chat.svg" className="chat-start-message" />
                                        <p className='title-text'>Возникли вопросы?</p>
                                        <p className='text-description'>Cпросите у консультанта<br/>
                                        Или нажмите сверху</p>
                                    </div>
                                </div>
                            </>
                            )
                            :(
                                messages.map((msg, index) => (
                                <div key={index} className="chat-message">
                                    {msg}
                                </div>
                        )))}
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
