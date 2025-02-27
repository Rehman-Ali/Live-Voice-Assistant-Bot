"use client"
import { useState, useRef , useEffect} from "react";



const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([]); // Store chat history
  const recognitionRef = useRef(null);
  const[loader, setLoader] = useState(false);

  
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = async (event) => {
        const lastTranscript = event.results[event.results.length - 1][0].transcript;
        console.log("User:", lastTranscript);

        // Update chat history with user message
        setMessages((prev) => [...prev, { sender: "You", text: lastTranscript }]);

        // Send user speech to AI API
        const botResponse = await handleUserSpeech(lastTranscript);
        console.log("Bot:", botResponse);

        // Update chat history with bot response
        setMessages((prev) => [...prev, { sender: "Bot", text: botResponse }]);

        // Speak bot's response
        speakText(botResponse);
      };

      recognition.onend = () => {
        if (isListening) {
          recognition.start(); // Restart listening automatically
        }
      };

      recognitionRef.current = recognition;
    }

    recognitionRef.current.start();
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleUserSpeech = async (text) => {
    try {
        setLoader(true)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();
      setLoader(false)
      return data.reply || "I didn't understand that.";
    } catch (error) {
        setLoader(false)
      console.error("Error getting AI response:", error);
      return "Something went wrong.";
    }
  };

  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speechSynthesis.speak(speech);
  };

  return (
    <div className="mt-[10px] flex flex-col  items-center">
      <button className="bg-green-800 h-[50] px-[20px] w-[200px] rounded-[12px] mt-[30px]" onClick={startListening} disabled={isListening}>
     {loader ? "...Please Wait" : "Ask Qustion"}  
      </button>
     
      <div style={{ marginTop: "20px" }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>

    </div>
  );
};

export default VoiceAssistant;
