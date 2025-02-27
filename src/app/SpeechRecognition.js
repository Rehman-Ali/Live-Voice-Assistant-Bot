
"use client"

import { useState } from "react";

export default function SpeechRecognition({ onResult }) {
  const [listening, setListening] = useState(false);
  const recognition = typeof window !== "undefined" && new (window.SpeechRecognition || window.webkitSpeechRecognition)();

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
    <div className="flex flex-row gap-5 mt-[30px]">
      <button className="bg-black h-[50] px-[20px] rounded-[12px]" onClick={startListening} disabled={listening}>
        Start Listening
      </button>
      <button onClick={stopListening} disabled={!listening} className="bg-red-500 h-[50] px-[20px] rounded-[12px]">
        Stop Listening
      </button>
    </div>
  );
}
