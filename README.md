# AI Brand Bible & Identity Architect

A full-stack, AI-powered brand identity generator that instantly creates comprehensive, production-ready brand bibles.

Built with **React, Vite, TypeScript, Tailwind CSS, and Google Gemini**, this application generates strategic brand foundations, vector logo suites, WCAG-compliant color systems, typography pairings, real-world collateral previews, and a complete ASP.NET Core 9.0 Clean Architecture backend export.

---

## ✨ Features

### 🤖 AI-Powered Brand Strategy

Generate a complete strategic brand foundation from a few inputs such as company name, mission, industry, and aesthetic direction.

The system generates:

- Mission statements
- Brand values
- Strategic pillars
- Tone of voice guidelines
- Brand personality
- Visual personality matrices
- Brand positioning

### 🎨 Vector Logo & Marks Suite

Create and explore multiple logo directions with scalable SVG-based concepts.

Features include:

- 3-logo concept selector
- Scalable SVG logo generation
- Geometric logo structures
- Optical margin support
- Safe-zone grids
- Monogram generation
- App icon variations
- Submark stamps
- Social media badges
- Light background preview
- Dark background preview
- Monochrome preview
- Generate additional logo options

### 🌈 5-Color Brand System

Generate a complete five-color brand palette with accessibility analysis.

Features include:

- 5-color HEX palette
- 60-30-10 color distribution
- WCAG 2.1 contrast analysis
- AA contrast validation
- AAA contrast validation
- Color pairing matrix
- Website UX suitability recommendations
- CSS token export
- Tailwind token export
- JSON token export

### 🔤 Interactive Typography Sandbox

Experiment with professional typography pairings using Google Fonts.

Features include:

- Display font selection
- Body font selection
- Curated font pairings
- Live text preview
- Font-size controls
- Letter-spacing controls
- Typographic scale testing
- Typographic rhythm preview
- HTML `<link>` embed code
- CSS `@import` embed code

### 🖼️ Real-World Brand Collateral

Preview the generated identity across realistic brand applications.

Supported previews include:

- Business cards
- Website landing-page hero
- Mobile application interface
- Official stationery

The business-card preview also includes an interactive 3D flip experience.

### 📄 Brand Bible PDF Export

Export the completed brand identity as a fully formatted, print-ready PDF.

The generated Brand Bible can contain:

- Brand strategy
- Mission and values
- Strategic pillars
- Brand personality
- Tone of voice
- Logo concepts
- Logo usage
- Color palette
- WCAG accessibility matrix
- Typography system
- Brand applications
- Collateral previews

### ⚙️ ASP.NET Core 9 Clean Architecture Export

Generate a scaffolded **ASP.NET Core 9.0 Clean Architecture** backend solution based on the generated brand system.

---

# 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| TypeScript | Type-safe application development |
| Vite | Frontend build tooling |
| Tailwind CSS | Styling and responsive UI |
| Google Gemini | AI-powered brand generation |
| Google Fonts API | Typography |
| SVG | Vector logo generation |
| ASP.NET Core 9.0 | Backend architecture export |
| C# | Backend implementation |

---

# 🚀 Getting Started

## Prerequisites

Before running the project, make sure you have:

- Node.js 18 or higher
- npm or yarn
- Google Gemini API key

---

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Aditibharti0703/brand-identity-architect.git
````

### 2. Navigate to the Project

```bash
cd brand-identity-architect
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your Google Gemini API key.

### 5. Start the Development Server

```bash
npm run dev
```

The application will usually be available at:

```text
http://localhost:5173
```

### 6. Build for Production

```bash
npm run build
```

### 7. Preview the Production Build

```bash
npm run preview
```

---

# 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

For security, add the following to `.gitignore`:

```gitignore
.env
.env.local
.env.*.local
```

Never commit API keys or other sensitive credentials to GitHub.

---

# 📖 How to Use

## 1. Initialize Your Brand

Enter the basic information for your company:

* Company Name
* Mission Statement
* Industry
* Aesthetic Vibe

You can also use a sample case study to quickly test the application.

## 2. Generate Your Brand Bible

Click:

**Generate Complete Brand Bible**

The AI will use your inputs to generate the strategic and visual foundation of your brand.

## 3. Review Brand Strategy

Review the generated:

* Mission
* Brand values
* Strategic pillars
* Tone of voice
* Brand personality
* Visual personality

## 4. Explore Vector Logos

Open the **Vector Logos** tab.

You can:

1. Review the generated logo concepts.
2. Select your preferred geometric direction.
3. Preview the logo on different backgrounds.
4. Review adaptive logo variations.
5. Generate additional logo options.

Available background modes include:

* Paper / Light
* Ink / Dark
* Mono

## 5. Review the Color System

Open the **5-Color System** tab.

Review:

* Primary color
* Secondary colors
* Accent colors
* Neutral colors
* HEX values
* 60-30-10 distribution
* WCAG contrast results

The application also provides recommendations for using colors in website UX.

## 6. Test Typography

Open the **Typography** tab.

Experiment with:

* Display font
* Body font
* Font size
* Letter spacing
* Typography scale
* Sample content

You can also copy the generated Google Fonts embed code.

Example:

```html
<link
  href="https://fonts.googleapis.com/css2?family=YourFont&display=swap"
  rel="stylesheet"
/>
```

## 7. Preview Brand Collateral

Open the **Collateral** tab to see how the identity works in real-world applications.

Preview the brand on:

* Business cards
* Websites
* Mobile apps
* Stationery

The business-card preview also supports an interactive 3D flip.

## 8. Export Your Brand Bible

Use the export controls to download the completed:

**Brand Bible PDF**

The PDF provides a consolidated presentation of the generated brand identity.

## 9. Export the .NET Architecture

Use the architecture export option to generate:

**ASP.NET Core 9.0 Clean Architecture**

The generated solution can serve as a starting point for implementing the brand system in a .NET application.

---

# 📁 Project Structure

```text
brand-identity-architect/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── types/
│   └── App.tsx
│
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

---

# 📤 Export Capabilities

## Brand Bible PDF

The application can export a complete brand bible containing the generated brand strategy and visual identity system.

## .NET 9 Clean Architecture

The application can generate a scaffolded ASP.NET Core 9.0 Clean Architecture backend based on the generated brand.

This allows the generated branding system to be extended into a structured .NET application.

---

# 🎯 Use Cases

This project can be useful for:

* Startups creating a new brand identity
* Entrepreneurs developing a visual identity
* Designers creating rapid brand concepts
* Marketing teams developing brand guidelines
* Agencies creating initial brand systems
* Developers building branded applications
* Portfolio projects demonstrating AI + frontend development

---

# 💡 Example Workflow

```text
Company Information
        ↓
AI Brand Strategy
        ↓
Brand Personality
        ↓
Logo Concepts
        ↓
Color System
        ↓
WCAG Accessibility
        ↓
Typography System
        ↓
Brand Collateral
        ↓
Brand Bible PDF
        ↓
.NET 9 Architecture Export
```

---

# 📊 Brand System Output

| Category      | Output                                  |
| ------------- | --------------------------------------- |
| Strategy      | Mission, values, positioning            |
| Personality   | Brand personality and visual traits     |
| Voice         | Tone of voice guidelines                |
| Logo          | Primary and secondary logo concepts     |
| Color         | Five-color palette                      |
| Accessibility | WCAG contrast analysis                  |
| Typography    | Display/body font pairing               |
| Collateral    | Business cards, web, mobile, stationery |
| Documentation | Brand Bible PDF                         |
| Architecture  | ASP.NET Core 9 Clean Architecture       |

---

# 🧩 Key Project Highlights

* AI-powered brand identity generation
* React + TypeScript frontend
* Vite development environment
* Tailwind CSS interface
* Google Gemini integration
* Algorithmic SVG logo generation
* WCAG 2.1 accessibility analysis
* Interactive typography playground
* Google Fonts integration
* Real-world brand mockups
* PDF brand-bible generation
* ASP.NET Core 9 architecture generation
* CSS design-token export
* Tailwind design-token export
* JSON design-token export

---

# 🔮 Future Improvements

Potential future enhancements include:

* User authentication
* Cloud project storage
* Brand project history
* Team collaboration
* Version control for brand identities
* Additional logo-generation algorithms
* More collateral templates
* Additional export formats
* Advanced brand guideline editing
* Brand asset management
* Automated brand consistency checking

---

# 📄 License

This project is licensed under the **MIT License**.

See the [`LICENSE`](LICENSE) file for more information.

---

# 👩‍💻 Author

**Aditi Bharti**

GitHub: [https://github.com/Aditibharti0703](https://github.com/Aditibharti0703)

---

# ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

