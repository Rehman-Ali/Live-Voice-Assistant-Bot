export default function TextToSpeech({ text }) {
    const speak = () => {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US";
      window.speechSynthesis.speak(speech);
    };
  
    return <button className="bg-green-800 h-[50] px-[20px] rounded-[12px] mt-[30px]" onClick={speak}>Bot Speak</button>;
  }
  