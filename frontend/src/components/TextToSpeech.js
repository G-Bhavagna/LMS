import React from 'react';

class TextToSpeech extends React.Component {
    speakText(text) {
        const speech = new SpeechSynthesisUtterance();
        speech.lang = 'en-US';
        speech.text = text;
        window.speechSynthesis.speak(speech);
    }

    render() {
        const words = this.props.text.split(' ');

        return (
            <div>
                {words.map((word, index) => (
                    <span
                        key={index}
                        onMouseEnter={() => this.speakText(word)}
                        style={{ cursor: 'pointer' }}
                    >
                        {word}{' '}
                    </span>
                ))}
            </div>
        );
    }
}

export default TextToSpeech;
