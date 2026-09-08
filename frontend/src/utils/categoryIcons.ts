const CATEGORY_EMOJI: Record<string, string> = {
  vegetable: "🥦",
  fruit: "🍎",
  dairy: "🧀",
  protein: "🍗",
  meat: "🍗",
  fish: "🐟",
  seafood: "🐟",
  grain: "🍞",
  bread: "🍞",
  spice: "🧂",
  herb: "🌿",
  egg: "🥚",
  legume: "🌱",
  condiment: "🍯",
  beverage: "🥤",
};

export function getCategoryEmoji(category: string): string {
  return CATEGORY_EMOJI[category.toLowerCase()] ?? "🍽️";
}
