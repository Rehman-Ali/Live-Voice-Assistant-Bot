export async function POST(req) {
  try {
    const { message, history = [] } = await req.json();

    if (!message) {
      return Response.json({ reply: "Please say something." });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          ...history,
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    // ✅ Check for errors in the OpenAI API response
    if (!data.choices || !data.choices.length) {
      console.error("OpenAI API Error:", data);
      return Response.json({ reply: "I couldn't process that. Try again!" });
    }

    const reply = data.choices[0].message.content;

    return Response.json({ reply });
  } catch (error) {
    console.error("Chat API Error:", error);
    return Response.json({ error: "Failed to fetch response" }, { status: 500 });
  }
}
