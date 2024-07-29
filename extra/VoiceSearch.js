// components/VoiceSearch.js
import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceSearch = ({ onSearch }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      onSearch(transcript);
    }
  }, [transcript, onSearch]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  const startListening = () => SpeechRecognition.startListening({ continuous: false });

  return (
    <div className='flex flex-col'>
      <button onClick={startListening} disabled={listening}>
        {listening ? 'Listening...' : 'Start Voice Search'}
      </button>
      <button onClick={resetTranscript} disabled={listening}>Reset</button>


      {transcript && <p>Search Query: {transcript}</p>}

    </div>
    
  );
};

export default VoiceSearch;
