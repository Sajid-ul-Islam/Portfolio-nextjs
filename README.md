# Sajid Islam - Portfolio Website

🚀 **Modern Portfolio Website** built with Next.js, TypeScript, and Tailwind CSS

[![Next.js](https://img.shields.io/badge/Next.js-14.2.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## ✨ Features

### 🎨 **Modern Design**
- **Glassmorphism UI** with backdrop blur effects
- **Gradient backgrounds** and smooth animations
- **Responsive design** optimized for all devices
- **Dark theme** with elegant color schemes

### 🚀 **Enhanced Components**
- **Interactive Skills Section** with animated progress bars
- **Enhanced Projects Showcase** with filtering and technology badges
- **Contact Form** with validation and submission handling
- **Smooth Scrolling** navigation with scroll-to-top functionality
- **Theme Toggle** for light/dark mode switching

### ⚡ **Performance Optimizations**
- **Next.js Image Optimization** for faster loading
- **CSS Variables** for consistent theming
- **Smooth Animations** with CSS transitions
- **SEO Optimized** with proper meta tags and Open Graph

### 📱 **User Experience**
- **Mobile-first Design** with touch-friendly interactions
- **Keyboard Navigation** support
- **Loading States** and micro-interactions
- **Accessibility Features** with ARIA labels

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Icons**: React Icons
- **Font**: Inter (Google Fonts)
- **Deployment**: Vercel/GitHub Pages

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/saajiidi/example-app-nextjs.git
   cd example-app-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # React components
│   │   ├── About.tsx       # About section
│   │   ├── NavBar.tsx      # Navigation component
│   │   ├── SkillsEnhanced.tsx    # Enhanced skills with progress bars
│   │   ├── ProjectsEnhanced.tsx  # Enhanced projects showcase
│   │   ├── ContactForm.tsx       # Contact form component
│   │   ├── ScrollToTop.tsx       # Scroll to top button
│   │   ├── ThemeToggle.tsx       # Theme switcher
│   │   └── LoadingSpinner.tsx    # Loading component
│   ├── globals.css         # Global styles and CSS variables
│   ├── styles.css          # Component-specific styles
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main page component
├── public/
│   └── img/                # Images and assets
└── ...
```

## 🎨 Customization

### **Colors & Theming**
Edit CSS variables in `src/app/globals.css`:
```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #1e40af;
  --accent-color: #f59e0b;
  --background-dark: #0f172a;
  --background-darker: #020617;
}
```

### **Content Updates**
- **Personal Info**: Update `src/app/components/About.tsx`
- **Experience**: Modify `src/app/components/Experience.tsx`
- **Projects**: Edit `src/app/components/ProjectsEnhanced.tsx`
- **Skills**: Update `src/app/components/SkillsEnhanced.tsx`

### **SEO & Metadata**
Update metadata in `src/app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: "Your Name - Portfolio",
  description: "Your description here",
  // ... other metadata
};
```

## 🚀 Deployment

### **Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically on every push

### **GitHub Pages**
1. Update `next.config.mjs` for static export
2. Run build and export:
   ```bash
   npm run build
   npm run export
   ```
3. Deploy the `out` folder to GitHub Pages

### **Other Platforms**
- **Netlify**: Connect GitHub repo for automatic deployment
- **Railway**: Deploy with one-click from GitHub
- **Heroku**: Use buildpack for Next.js deployment

## 📈 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Bundle Size**: Optimized with code splitting
- **Image Optimization**: Next.js Image component usage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Vercel** for seamless deployment
- **React Icons** for the beautiful icon library

## 📞 Contact

**Sajid Islam**
- 📧 Email: sajid.islam.chowdhury@gmail.com
- 💼 LinkedIn: [sajidislamchowdhury](https://www.linkedin.com/in/sajidislamchowdhury/)
- 🐱 GitHub: [saajiidi](https://github.com/saajiidi)
- 🌐 Portfolio: [Live Demo](https://sajid-islam-portfolio.vercel.app/)

---

⭐ **Star this repository if you found it helpful!**
