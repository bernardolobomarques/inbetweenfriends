
import type { Post } from '@/types';
import { getImagePath } from './images';

const authorBio = "Carolina Bianchi is an international law student in Barcelona, originally from Rio de Janeiro. Fluent in four languages, she has experience with UN-style debates and loves to share her reflections on life, friendships, and the world.";

const posts: Post[] = [
    {
    id: 1,
    slug: 'the-art-of-mindful-living',
    title: 'The Art of Mindful Living in a Hectic World',
    excerpt: 'Discover how to cultivate mindfulness and find peace amidst the chaos of daily life. Simple practices for a more present and fulfilling existence.',
    content: `<p>In a world that constantly demands our attention, finding moments of peace can feel like a luxury. However, mindfulness is not about escaping reality but about grounding ourselves within it. It's the simple practice of being aware of the present moment, without judgment. This can be as simple as paying attention to your breath for a few minutes each day, or savoring your morning coffee without the distraction of your phone.</p><h2>Starting Your Practice</h2><p>Start small. Dedicate five minutes each morning to a mindfulness exercise. You can use an app, or simply sit in silence. The goal isn't to clear your mind, but to observe your thoughts as they come and go, like clouds in the sky. Over time, this practice builds a foundation of inner calm that you can carry with you throughout your day. You'll find that you are more responsive and less reactive to the stresses that come your way.</p><h3>The Body Scan</h3><p>Another powerful technique is the body scan meditation. Lie down comfortably and bring your attention to each part of your body, from your toes to the top of your head. Notice any sensations – warmth, tingling, tension – without needing to change them. This practice not only relaxes the body but also strengthens the mind-body connection, fostering a deeper sense of self-awareness and well-being.</p><blockquote>"The best way to capture moments is to pay attention. This is how we cultivate mindfulness." - Jon Kabat-Zinn</blockquote>`,
    featuredImage: 'mesa-pintura',
    authorName: 'Carolina Bianchi',
    authorImage: 'https://placehold.co/100x100.png',
    authorBio: authorBio,
    publishDate: 'October 26, 2023',
    date: '2023-10-26T10:00:00Z',
    category: 'Mindfulness'
  },
  {
    id: 2,
    slug: 'nourishing-friendships',
    title: 'Nourishing Friendships: The Secret to a Happy Life',
    excerpt: 'Explore the importance of deep, meaningful connections and learn how to cultivate friendships that support and uplift you through all of life\'s seasons.',
    content: `<p>Human connection is at the core of our happiness. While we live in an increasingly digital world, the value of true friendship has never been more important. These are the relationships that see us through our darkest days and celebrate with us in our brightest moments. But like any garden, friendships need tending.</p><h2>The Art of Being Present</h2><p>Nourishing a friendship means being present. It means putting down your phone when you\'re together, listening with empathy, and making time for one another even when life gets busy. It\'s about the small gestures: a quick text to see how they are, remembering an important date, or simply offering a shoulder to lean on. Quality over quantity is key. A few deep, authentic connections are far more fulfilling than a wide network of acquaintances.</p><h3>Embracing Vulnerability</h3><p>Vulnerability is also a cornerstone of strong friendships. Sharing your true self, including your fears and insecurities, allows others to do the same. This creates a space of trust and mutual respect where both individuals can grow. Don\'t be afraid to initiate. Reach out to someone you admire and suggest a coffee. You never know where that simple act of courage might lead.</p>`,
    featuredImage: 'garota',
    authorName: 'Carolina Bianchi',
    authorImage: 'https://placehold.co/100x100.png',
    authorBio: authorBio,
    publishDate: 'October 22, 2023',
    date: '2023-10-22T10:00:00Z',
    category: 'Friendship'
  },
  {
    id: 3,
    slug: 'unleashing-your-creative-spirit',
    title: 'Unleashing Your Creative Spirit',
    excerpt: 'Everyone has a creative spark within them. This post guides you on a journey to rediscover your creative passions, overcome self-doubt, and make space for creativity.',
    content: `<p>Creativity is not just for artists and musicians; it is an innate human quality that we all possess. Whether it\'s through cooking, gardening, writing, or problem-solving, expressing our creativity is vital for a vibrant life. Often, however, the pressures of adulthood and the fear of not being "good enough" can stifle that spirit.</p><h2>Permission to Play</h2><p>To unleash your creativity, you must first give yourself permission to play. Forget about the outcome and focus on the process. Doodle without purpose, dance in your living room, or write a story just for yourself. Create a dedicated space and time for your creative pursuits, no matter how small. This signals to your brain that this activity is important.</p><h3>Quieting the Inner Critic</h3><p>Overcoming the inner critic is perhaps the biggest challenge. When you hear that voice of self-doubt, acknowledge it, and then gently set it aside. Remind yourself that the goal is not perfection, but expression. Collaborate with others, take a class, or visit a museum to find inspiration. The more you expose yourself to new ideas and experiences, the more you will fuel your own creative fire.</p>`,
    featuredImage: 'mapa',
    authorName: 'Carolina Bianchi',
    authorImage: 'https://placehold.co/100x100.png',
    authorBio: authorBio,
    publishDate: 'October 18, 2023',
    date: '2023-10-18T10:00:00Z',
    category: 'Creativity'
  },
    {
    id: 4,
    slug: 'the-joy-of-slow-travel',
    title: 'The Joy of Slow Travel: Connecting Deeper',
    excerpt: 'Move beyond the checklist and embrace a more meaningful way to see the world. Slow travel is about immersion, connection, and creating lasting memories.',
    content: `<p>In our fast-paced world, vacations can sometimes feel like a race to see as much as possible. Slow travel offers a refreshing alternative. It’s a mindset that encourages you to connect with a place on a deeper level, rather than just skimming the surface. Instead of hopping between cities every two days, you might spend a week or more in a single location, getting to know the local rhythm of life.</p><h2>The Beauty of Spontaneity</h2><p>This approach allows for spontaneous discoveries that are often the most memorable parts of a trip. You might stumble upon a hidden cafe, strike up a conversation with a local artisan, or find a favorite spot in a neighborhood park. By staying longer, you can support local businesses, learn a few phrases in the local language, and gain a more authentic understanding of the culture.</p><h3>Sustainable and Soulful</h3><p>Slow travel is also more sustainable, both for the environment and for your own well-being. It reduces your carbon footprint and eliminates the stress of constant packing and transit. You return home not exhausted, but genuinely refreshed and with a richer collection of stories and experiences. So next time you plan a trip, consider slowing down. The world has so much to offer when you take the time to truly see it.</p>`,
    featuredImage: 'placeholder-1',
    authorName: 'Carolina Bianchi',
    authorImage: 'https://placehold.co/100x100.png',
    authorBio: authorBio,
    publishDate: 'October 15, 2023',
    date: '2023-10-15T10:00:00Z',
    category: 'Travel'
  },
];


export async function getPosts(): Promise<Post[]> {
  // Sort posts by date in descending order (newest first)
  const sortedPosts = posts.map(post => ({
    ...post,
    featuredImage: getImagePath(post.featuredImage)
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return sortedPosts;
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const allPosts = await getPosts();
  return allPosts.find(post => post.slug === slug);
}
