import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

export async function getRecommendationsS(synopsis) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful librarian that helps a client. He gives you a synopsis of a book and you must recommend him some books with the same synopsis.You need to give your answer in french. Also add in your anwser the key word you use to give him this recommendation. Start by saying the name of the book with the same synopsis, then give him the others recommendations. For each recommendation, include a relevance score between 1 and 10 (1 = not very relevant, 10 = very relevant)." },
            {
                role: "user",
                content: synopsis,
            },
        ],
    });

    return completion.choices[0].message.content;
}
