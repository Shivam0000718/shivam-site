# Shivam Mishra – Personal Portfolio

A dark, cinematic personal website for **Shivam Mishra**, an accessibility tester at HCLTech working on web and iOS accessibility, with a background in AI and machine learning.

**Live site:** https://your-site-link.vercel.app *(replace with your deployed link)*

## Features

- **Cinematic design:** glowing gradient background, rotating profile ring, smooth fade-in animations and a soft cursor spotlight
- **Projects slideshow:** profile-style cards that slide automatically, with previous, next and pause controls
- **Sections:** About, Experience, Projects, Skills, Services, Education and Contact
- **Paid phone access:** the phone number is never stored in the code; visitors request it by email
- **Accessibility built in:**
  - Skip-to-content link and visible keyboard focus
  - Text size (A−, A+) and high contrast controls
  - Pausable slideshow
  - Reduced-motion support (animations switch off for visitors who prefer it)
  - Semantic headings, landmarks and labels for screen readers
- **Responsive:** works on phones, tablets and desktops

## Tech stack

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- Plain CSS (no UI library)
- ESLint

## Getting started

You need [Node.js](https://nodejs.org/) (LTS version) installed.

```bash
# 1. Clone the repository
git clone https://github.com/Shivam0000718/shivam-site.git

# 2. Go into the folder
cd shivam-site

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open the link shown in the terminal (usually `http://localhost:5173`). The page refreshes by itself each time you save a file.

## Project structure

```
shivam-site/
├── public/
│   └── profile.jpg        # Profile photo
├── src/
│   ├── App.jsx            # Renders the Portfolio component
│   ├── Portfolio.jsx      # All page content and components
│   ├── Portfolio.css      # All styles
│   ├── index.css          # Intentionally empty
│   └── main.jsx           # App entry point
├── index.html
└── package.json
```

## Customizing the content

All personal details are in the lists at the top of `src/Portfolio.jsx`:

| What to change | Variable |
| --- | --- |
| Email address | `EMAIL` |
| LinkedIn, GitHub, Instagram | `LINKS` |
| Jobs and internship | `EXPERIENCE` |
| Project cards | `PROJECTS` |
| Skills | `SKILLS` |
| Services | `SERVICES` |

To change the profile photo, replace `public/profile.jpg` with a new square-ish image (under 500 KB works best).

## Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the site locally |
| `npm run build` | Creates the production files in the `dist` folder |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Checks the code with ESLint |

## Deployment

The site can be hosted for free on [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/):

1. Sign in with your GitHub account.
2. Import this repository.
3. Keep the detected Vite settings (build command `npm run build`, output folder `dist`).
4. Click **Deploy**.

Every push to the `main` branch updates the live site automatically.

## Contact

- Email: your-email@example.com
- LinkedIn: https://www.linkedin.com/in/your-profile
- GitHub: https://github.com/Shivam0000718

*(Replace the email and LinkedIn placeholders with your real details.)*

## License

© Shivam Mishra. All rights reserved.
