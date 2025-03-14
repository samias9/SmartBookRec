import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

export async function getRecommendationsA(authors) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful librarian that helps a client. He gives you a list of authors and you must recommend him some books written by other authors that have similarity with the authors the client gives. For each recommendation, include a relevance score between 1 and 10 (1 = not very relevant, 10 = very relevant). You need to give your answer in french." },
            {
                role: "user",
                content: authors,
            },
        ],
    });

    return completion.choices[0].message.content;
}
