# **App Name**: Amigas Blog

## Core Features:

- Dynamic Header: Displays a dynamic header that slides out of view when scrolling down and reappears when scrolling up.
- Post List: Displays a list of blog posts with a title, excerpt, and featured image.
- Post Display: Displays the full content of a single blog post.
- Grid Layout: Renders a grid layout of blog post previews, fetched from the Supabase API.
- API Revalidation: The page `/api/revalidate.js` must revalidate the cache of the landing page and the posts page after a new post is published using a secret token.
- Landing Page: Landing page that explains briefly the blog, who's the author etc.
- Call to Action Sections: Call to action sections where the last posts are displayed.

## Style Guidelines:

- Primary color: Deep purple (#5c4b58) for titles and links, conveying sophistication.
- Background color: Dark beige with brown undertones (#4d4545) to create a cozy atmosphere.
- Secondary background color: A slightly darker beige (#403939) can be used for elements needing more visual separation.
- Accent color: Dusty rose/desaturated lilac (#c2a2b1) used in horizontal bands to break up the page and highlight CTAs.
- Text color: Cream or off-white (#f5f1ed) for optimal readability against the dark background.
- Headline font: 'Playfair', a serif font with a touch of class, for titles.
- Body font: 'Inter', a sans-serif font for readability in long texts.
- Subtle fade-in effects on images and sections when they enter the viewport during scrolling.
- Links and buttons use subtle color transitions or scaling (1.05x) on hover to provide feedback.
- Apply a subtle paper or fabric texture to the main background to add depth.