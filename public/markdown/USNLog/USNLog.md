# USN Voyage Log Generator: Bringing Sea of Thieves Adventures to Life

As a proud member of the United States Navy (USN) guild in *Sea of Thieves*, I wanted to create a tool to commemorate our adventures on the high seas. Enter the **USN Voyage Log Generator**—a web app designed to capture the essence of every plunder, skirmish, and triumphant return with a personalized and visually immersive logbook.

## Inspiration and Goals

Our guild keeps detailed logs of voyages, chronicling the highs and lows of our nautical escapades. But formatting these logs consistently and creatively was a challenge. The goal of the **USN Voyage Log Generator** was simple:

1. Make it easy for members to create beautifully formatted logs.
2. Incorporate our guild’s lore, aesthetics, and a touch of nautical charm.
3. Provide options for exporting logs as PDFs or images, ready to share on Discord.

## Features

### 1. **Customizable Voyage Logs**
   - **Ship Logos**: Choose from our fleet’s iconic ships (*Audacious*, *Odin*, *Tyr*, and *Thor*) to personalize each log.
   - **Custom Fonts**: Select from playful and script fonts like *Satisfy* and *Indie Flower* for a whimsical pirate aesthetic.
   - **Log Components**: Include details such as:
     - **Log Title and Subtitle**: Perfect for naming voyages and adding ranks or themes.
     - **Notable Events**: Record everything from epic naval battles to discovering cursed treasures.
     - **Crew Manifest**: Honor the pirates who sailed by your side.
     - **Gold and Doubloons Earned**: Bragging rights, quantified.
     - **Signature**: Add the captain’s name (or pseudonym) for authenticity.

### 2. **Preview and Pagination**
   - Logs can span multiple pages, with a smart pagination algorithm that respects the layout’s aesthetics.
   - Preview your logs in a visually styled parchment background with draggable and interactive elements.

### 3. **Export Options**
   - **PDF Export**: Generate logs as high-quality PDFs, with separate files for each page.
   - **Image Export**: Create shareable PNG snapshots of your logs for quick uploads to Discord or social media.

### 4. **Discord Integration**
   - Automatically generate formatted messages summarizing your voyage for quick sharing in guild channels.

### 5. **Autosave Functionality**
   - Your progress is saved in the browser, so you can pick up where you left off without losing your masterpiece.

## Challenges and Solutions

### **1. Pagination Logic**
Breaking long text into pages while maintaining a consistent and visually appealing layout was a key challenge. To solve this:
- I calculated character limits and line heights to split text into appropriately sized chunks.
- Overly long lines and single-page overflows were handled by enforcing page breaks and continuing content on the next page.

### **2. Multi-Page Export**
Exporting pages as PDFs or images required the use of libraries like `html2pdf` and `html2canvas`. Generating files one page at a time ensured high resolution and format fidelity.

### **3. Responsive Design**
- On larger screens, logs mimic a parchment-like desktop experience.
- On mobile, the UI adapts to ensure ease of use without sacrificing functionality.

### **4. Seamless UX**
Guild feedback led me to add features like:
- Default templates for quick log creation.
- A settings modal for intuitive customization.
- A reset button to start fresh without hassle.

## Technical Stack

The app was built using **React** with a focus on maintainability and scalability. Key libraries include:
- **`html2pdf.js`** and **`html2canvas`**: For high-quality file exports.
- **Lucide React**: For clean and modern iconography.
- **Tailwind CSS**: To streamline responsive and aesthetic styling.

## Aesthetics and Thematic Design

The design is steeped in *Sea of Thieves* aesthetics:
- **Backgrounds**: Custom parchment textures for an old-world feel.
- **Ship Logos**: Transparent, faded logos that give each log a sense of identity.
- **Fonts**: Script and handwritten styles evoke the charm of pirate journals.

## Reflection and Next Steps

Developing the **USN Voyage Log Generator** was a labor of love, combining my passion for coding with the creativity of storytelling. It’s been immensely satisfying to see guildmates using the tool to share their adventures.

### Planned Enhancements
- **Multi-page PDFs**: Combine all pages into a single document for better portability.
- **Dark Mode**: To better match the *Sea of Thieves* nocturnal vibe.
- **Expanded Ship Options**: Add more ship logos as our fleet grows.

---

If you’re a fellow pirate or a coding enthusiast, feel free to check out the **USN Voyage Log Generator**. It’s a tool designed by a pirate, for pirates—because every tale of treasure deserves to be told. 🏴‍☠️