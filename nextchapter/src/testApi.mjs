import OpenAI from "openai";
const openai = new OpenAI({apiKey: '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'});

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: "Write a haiku about recursion in programming.",
        },
    ],
});

console.log(completion.choices[0].message);