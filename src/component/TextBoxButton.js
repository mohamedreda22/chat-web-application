import React, { useState } from 'react';
import '../App.css';

function TextBoxButton() {
    const [textBoxValue, setTextBoxValue] = useState('');
    const [formatOptions, setFormatOptions] = useState({
        isBold: false,
        isItalic: false,
        isUnderline: false,
        isStrikethrough: false,
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [filePreview, setFilePreview] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState('User 1');

    const handleTextBoxChange = (event) => {
        setTextBoxValue(event.target.value);
    };


    const handleFormatOptionClick = (option) => {
        setFormatOptions((prevOptions) => ({
            ...prevOptions,
            [option]: !prevOptions[option],
        }));
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFiles([file]);
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setFilePreview(fileURL);
        }
    };


    const handleUploadButtonClick = () => {
        if (selectedFiles.length > 0) {
            const formData = new FormData();
            formData.append('file', selectedFiles[0]);
            console.log('File uploaded:', selectedFiles[0]);
        }
    };


    const handleButtonClick = () => {
        const message = {
            text: textBoxValue,
            formatting: { ...formatOptions }, 
            files: selectedFiles,
            timestamp: new Date().getTime(),
            user: currentUser,
        };

        setChatMessages((prevMessages) => [...prevMessages, message]);
        resetInputs();
    };

    const resetInputs = () => {
        setTextBoxValue('');
        setSelectedFiles([]);
        setFilePreview('');
    };

    const getTextBoxStyles = () => {
        let styles = 'text-box';
        if (formatOptions.isBold) {
            styles += ' bold';
        }
        if (formatOptions.isItalic) {
            styles += ' italic';
        }
        if (formatOptions.isStrikethrough) {
            styles += ' strikethrough';
        }
        if (formatOptions.isUnderline) {
            styles += ' underline';
        }

        return styles;
    };

    const handleUserChange = (event) => {
        setCurrentUser(event.target.value);
    };

    return (
        <div className="App-header">
            <div className="text-box-wrapper">
                <div className="format-icons">

                    <button
                        className={`format-btn ${formatOptions.isBold ? 'active' : ''}`}
                        onClick={() => handleFormatOptionClick('isBold')}
                    >
                        <span>B</span>
                    </button>
                    <button
                        className={`format-btn ${formatOptions.isItalic ? 'active' : ''}`}
                        onClick={() => handleFormatOptionClick('isItalic')}
                    >
                        <span>I</span>
                    </button>
                    <button
                        className={`format-btn ${formatOptions.isStrikethrough ? 'active' : ''
                            }`}
                        onClick={() => handleFormatOptionClick('isStrikethrough')}
                    >
                        <span>S</span>
                    </button>
                    <button
                        className={`format-btn ${formatOptions.isUnderline ? 'active' : ''
                            }`}
                        onClick={() => handleFormatOptionClick('isUnderline')}
                    >
                        <span>U</span>
                    </button>

                    <label className="upload-btn">
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png, .pdf, .word, .doc"
                            onChange={handleFileInputChange}
                            style={{ display: 'none' }}
                        />
                        <span role="img" aria-label="Upload">
                            📎
                        </span>
                    </label>
                </div>
                <textarea
                
                    className={getTextBoxStyles()}
                    value={textBoxValue}
                    onChange={handleTextBoxChange}
                    placeholder="Chat comes here..."
                    rows="5"
                    cols="30"
                />
                {/* File preview */}
                {filePreview && (
                    <div className="file-preview">
                        {/* Display file preview */}
                    </div>
                )}
                <button className="submit-btn" onClick={handleButtonClick}>
                    Send
                </button>
            </div>
            <div className="chat-messages">
                {/* Render chat messages */}
                {chatMessages.map((message, index) => (
                    <div
    key={index}
    className={`message ${message.user === currentUser ? 'current-user' : 'other-user'}`}
>
    <div className="message-sender">{message.user}</div>
    <div
        className={`message-content message-text ${
            message.formatting.isBold ? 'bold' : ''
        } ${message.formatting.isItalic ? 'italic' : ''} ${
            message.formatting.isStrikethrough ? 'strikethrough' : ''
        } ${message.formatting.isUnderline ? 'underline' : ''}`}
    >
        {message.text}
    </div>
    {message.files && (
        <div className="message-files">
            {message.files.map((file, fileIndex) => (
                <div key={fileIndex} className="file-item">
                    {file.name}
                </div>
            ))}
        </div>
    )}
</div>

                ))}
            </div>
            <div className="user-selector">
                <label>
                    Current User:
                    <select value={currentUser} onChange={handleUserChange}>
                        <option value="User 1">User 1</option>
                        <option value="User 2">User 2</option>
                    </select>
                </label>
            </div>
        </div>
    );
}

export default TextBoxButton;
