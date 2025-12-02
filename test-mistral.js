import 'dotenv/config';

const apiKey = process.env.VITE_MISTRAL_API_KEY;
const agentId = "ag_019ad951578375c287a8bdac5b552048"; // Romeo

if (!apiKey) {
    console.error("Error: VITE_MISTRAL_API_KEY not found in environment variables.");
    process.exit(1);
}

console.log("Testing Mistral API with Key:", apiKey.substring(0, 5) + "...");
console.log("Agent ID:", agentId);

async function testMistral() {
    try {
        const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: agentId,
                messages: [{ role: "user", content: "Hello Romeo" }],
                max_tokens: 100
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API Request Failed: ${response.status} ${response.statusText}`);
            console.error("Error Details:", errorText);
        } else {
            const data = await response.json();
            console.log("Success! Response:");
            console.log(JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("Network or execution error:", error);
    }
}

testMistral();
