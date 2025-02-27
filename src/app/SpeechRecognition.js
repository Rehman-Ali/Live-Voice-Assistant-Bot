"use client"
import { useState } from "react";

export default function SpeechRecognition({ onResult }) {
  const [listening, setListening] = useState(false);
  const recognition =
    typeof window !== "undefined" &&
    new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  if (recognition) {
    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };
  }

  const startListening = () => {
    setListening(true);
    recognition?.start();
  };

  const stopListening = () => {
    setListening(false);
    recognition?.stop();
  };

  return (
    <div>
      <button className="bg-green-800 h-[50] px-[20px] rounded-[12px] mt-[30px]" onClick={startListening} disabled={listening}>🎤 Start Talking</button>
      <button className="bg-green-800 h-[50] px-[20px] rounded-[12px] mt-[30px]" onClick={stopListening} disabled={!listening}>⏹ Stop</button>
    </div>
  );
}
