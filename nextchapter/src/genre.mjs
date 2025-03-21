import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

export async function getRecommendationsG(genres) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful librarian that helps a client. He gives you a list of genre and you must recommend him some books with the same genre.Try to find books that have all the genre the client is looking for. For each recommendation, include a relevance score between 1 and 10 (1 = not very relevant, 10 = very relevant). You need to give your answer in french." },
            {
                role: "user",
                content: genres,
            },
        ],
    });

    return completion.choices[0].message.content;
}
