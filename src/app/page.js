import VoiceAssistant from "./components/VoiceAssistant";


export default function Home() {
  return (
    <div className="flex items-center flex-col justify-center">
      <h1 className="font-bold text-[26px] mt-[50px]">🎤 Live AI Voice Assistant</h1>
      <VoiceAssistant />
    </div>
  );
}