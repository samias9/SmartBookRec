import OpenAI from "openai";
const openai = new OpenAI({apiKey: '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',dangerouslyAllowBrowser:true});

export async function getRecommendationsS(synopsis) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful librarian that helps a client. He gives you a synopsis of a book and you must recommend him some books with the same synopsis.You need to give your answer in french. Also add in your anwser the key word you use to give him this recommendation. Start by saying the name of the book with the same synopsis, then give him the others recommendations." },
            {
                role: "user",
                content: synopsis,
            },
        ],
    });

    return completion.choices[0].message.content;
}