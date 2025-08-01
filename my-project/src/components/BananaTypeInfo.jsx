import React from "react";

const bananaFacts = {
  Robusta:
    "🍌 Robusta: The OG pazham. Thick-skinned, serious vibes. Basically the bouncer of banana types — great for frying or intimidating other fruits.",
  Njalipoovan:
    "🍌 Njalipoovan: Small, cute, and smells like nostalgia. The pazham equivalent of that one overly energetic cousin at every family function.",
  Palayamkodan:
    "🍌 Palayamkodan: Tiny in size, explosive in sweetness. If pazhams had TikTok, this one would be viral for sure.",
  "Poovan Pazham":
    "🍌 Poovan: Smoothie royalty. Soft, yellow, and always ready to vibe with milk and mixies. Probably listens to lo-fi.",
  Ethapazham:
    "🍌 Ethapazham: The king of pazhams. Big, bold, and built like it lifts. Commonly mistaken for a vegetable. Not offended.",
};

export default function BananaTypeInfo({ type }) {
  return (
    <div className="mt-6 p-4 bg-yellow-100 rounded-lg shadow-lg text-left max-w-md border-l-4 border-yellow-500">
      <h3 className="font-bold text-lg text-yellow-800 mb-2">
        🍌 Banana Type Info:
      </h3>
      <p className="text-yellow-900 leading-relaxed">
        {bananaFacts[type] ||
          "🤷‍♀️ Unknown pazham... Maybe it's a new hybrid from outer space. NASA, is this you?"}
      </p>
    </div>
  );
}



