"use client"

import { useState } from "react";
import SpeechRecognition from "./SpeechRecognition";
import TextToSpeech from "./TextToSpeech";

export default function VoiceBot() {
  const [response, setResponse] = useState("");

  const handleSpeechResult = async (text) => {
    console.log("User said:", text);
    const reply = `You said: ${text}`; // Replace with AI response logic
    setResponse(reply);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center mt-[200px] bg-amber-300 rounded-[12px] p-[20px]">
        <h2 className="text-black font-bold text-[30px]">Voice Bot</h2>
         
        <SpeechRecognition onResult={handleSpeechResult} />
        {response && <TextToSpeech text={response} />}
        <p className="text-black font-semibold pt-[20px]">{response}</p>
      </div>
    </div>

  );
}
