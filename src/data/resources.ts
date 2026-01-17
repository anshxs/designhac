export interface Resource {
  id: string;
  title: string;
  description: string;
  category: "drawing" | "worksheets" | "crafts" | "storytelling";
  ageRange: string;
  difficulty: "easy" | "medium" | "challenging";
  thumbnail: string;
  tags: string[];
}

export const resources: Resource[] = [
  // Drawing & Coloring
  {
    id: "rainbow-unicorn",
    title: "Rainbow Unicorn Coloring Page",
    description: "A magical unicorn with flowing rainbow mane ready to be colored with your favorite colors!",
    category: "drawing",
    ageRange: "4-6",
    difficulty: "easy",
    thumbnail: "🦄",
    tags: ["coloring", "animals", "fantasy"],
  },
  {
    id: "step-by-step-butterfly",
    title: "How to Draw a Butterfly",
    description: "Learn to draw a beautiful butterfly in 6 simple steps. Perfect for beginners!",
    category: "drawing",
    ageRange: "5-8",
    difficulty: "easy",
    thumbnail: "🦋",
    tags: ["tutorial", "nature", "insects"],
  },
  {
    id: "ocean-scene",
    title: "Under the Sea Adventure",
    description: "A detailed ocean scene with fish, seahorses, and treasure to color.",
    category: "drawing",
    ageRange: "6-10",
    difficulty: "medium",
    thumbnail: "🐠",
    tags: ["coloring", "ocean", "detailed"],
  },
  {
    id: "dragon-drawing",
    title: "Friendly Dragon Drawing Guide",
    description: "Master drawing a cute dragon with this step-by-step guide. Includes scales and wings!",
    category: "drawing",
    ageRange: "7-12",
    difficulty: "challenging",
    thumbnail: "🐲",
    tags: ["tutorial", "fantasy", "advanced"],
  },

  // Worksheets
  {
    id: "nature-journal",
    title: "My Nature Observation Journal",
    description: "Document leaves, bugs, and weather with drawings and notes. Perfect for outdoor learning!",
    category: "worksheets",
    ageRange: "5-9",
    difficulty: "easy",
    thumbnail: "🍂",
    tags: ["science", "observation", "outdoor"],
  },
  {
    id: "story-dice",
    title: "Story Dice Adventure Prompts",
    description: "Roll the dice and create wild stories! Mix characters, places, and magical items.",
    category: "worksheets",
    ageRange: "6-10",
    difficulty: "easy",
    thumbnail: "🎲",
    tags: ["creative writing", "storytelling", "games"],
  },
  {
    id: "maze-kingdom",
    title: "Castle Maze Challenge",
    description: "Help the knight find the path through the castle. Three difficulty levels included!",
    category: "worksheets",
    ageRange: "5-8",
    difficulty: "medium",
    thumbnail: "🏰",
    tags: ["puzzle", "logic", "adventure"],
  },
  {
    id: "emotion-faces",
    title: "Feelings & Emotions Workbook",
    description: "Explore different emotions through drawing, matching, and reflection activities.",
    category: "worksheets",
    ageRange: "4-7",
    difficulty: "easy",
    thumbnail: "😊",
    tags: ["emotional learning", "self-awareness", "social"],
  },

  // Craft Activities
  {
    id: "paper-butterfly",
    title: "Paper Butterfly Mobile",
    description: "Create a beautiful hanging butterfly mobile with paper and string. Easy cutting required!",
    category: "crafts",
    ageRange: "5-9",
    difficulty: "medium",
    thumbnail: "🦋",
    tags: ["paper craft", "decoration", "nature"],
  },
  {
    id: "sock-puppet",
    title: "Silly Sock Puppet Friends",
    description: "Turn old socks into hilarious puppet characters! No sewing needed.",
    category: "crafts",
    ageRange: "4-8",
    difficulty: "easy",
    thumbnail: "🧦",
    tags: ["puppets", "recycling", "play"],
  },
  {
    id: "cardboard-castle",
    title: "Cardboard Box Castle",
    description: "Transform boxes into an epic castle with towers, drawbridge, and flags!",
    category: "crafts",
    ageRange: "6-12",
    difficulty: "challenging",
    thumbnail: "📦",
    tags: ["building", "recycling", "imagination"],
  },
  {
    id: "nature-crown",
    title: "Forest Crown Adventure",
    description: "Make a magical crown using paper and natural treasures found outdoors.",
    category: "crafts",
    ageRange: "4-7",
    difficulty: "easy",
    thumbnail: "👑",
    tags: ["nature", "wearable", "outdoor"],
  },

  // Storytelling
  {
    id: "picture-story-starter",
    title: "Magical Picture Story Starters",
    description: "10 enchanting images to spark imagination and inspire amazing stories!",
    category: "storytelling",
    ageRange: "5-10",
    difficulty: "easy",
    thumbnail: "📸",
    tags: ["visual prompts", "imagination", "writing"],
  },
  {
    id: "character-creator",
    title: "Hero Character Creator",
    description: "Design your own story hero! Choose traits, powers, and weaknesses.",
    category: "storytelling",
    ageRange: "6-12",
    difficulty: "medium",
    thumbnail: "🦸",
    tags: ["character design", "creative", "writing"],
  },
  {
    id: "story-cubes",
    title: "Story Cube Adventure",
    description: "Roll picture cubes to build unexpected adventures. Great for group storytelling!",
    category: "storytelling",
    ageRange: "5-9",
    difficulty: "easy",
    thumbnail: "🎯",
    tags: ["games", "group activity", "oral storytelling"],
  },
  {
    id: "emotion-stories",
    title: "Feelings Story Cards",
    description: "Explore emotions through storytelling. What happens when the bunny feels scared?",
    category: "storytelling",
    ageRange: "4-7",
    difficulty: "easy",
    thumbnail: "💭",
    tags: ["emotional learning", "social", "empathy"],
  },
];

export const categories = [
  {
    id: "drawing",
    name: "Drawing & Coloring",
    description: "Printable coloring pages, step-by-step drawing guides",
    icon: "🎨",
    color: "lavender" as const,
  },
  {
    id: "worksheets",
    name: "Worksheets",
    description: "Creative writing prompts, observation activities, puzzles",
    icon: "📝",
    color: "mint" as const,
  },
  {
    id: "crafts",
    name: "Craft Activities",
    description: "DIY projects with simple instructions",
    icon: "✂️",
    color: "peach" as const,
  },
  {
    id: "storytelling",
    name: "Storytelling",
    description: "Picture prompts, story starters, imagination exercises",
    icon: "📚",
    color: "sky" as const,
  },
];

export const getResourcesByCategory = (category: string) => 
  resources.filter((r) => r.category === category);

export const getResourceById = (id: string) => 
  resources.find((r) => r.id === id);

export const getRelatedResources = (resource: Resource, limit = 4) => 
  resources
    .filter((r) => r.id !== resource.id && (r.category === resource.category || r.tags.some(t => resource.tags.includes(t))))
    .slice(0, limit);
