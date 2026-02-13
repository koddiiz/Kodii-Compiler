# Kode_dic 🚀

A modern, responsive online code compiler supporting Python, JavaScript, and TypeScript with a sleek UI and real-time execution.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)

## ✨ Features

- **🐍 Multi-Language Support**: Python, JavaScript, and TypeScript
- **⚡ Real-time Execution**: Run code instantly in your browser
- **🎨 Beautiful UI**: Modern glassmorphism design with animated gradients
- **🌓 Dark/Light Mode**: Toggle between themes with smooth transitions
- **📱 Mobile Responsive**: Fully optimized for mobile with toggle interface
- **⏱️ Execution Timer**: See how long your code takes to run
- **🎯 Syntax Highlighting**: Custom vibrant themes for better code readability
- **📋 One-Click Copy**: Copy your code to clipboard easily
- **ℹ️ About Modal**: Learn about the creator and get in touch

## 🚀 Live Demo

[View Live Demo](https://your-vercel-url.vercel.app) <!-- Update this with your Vercel URL -->

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Code Editor**: Monaco Editor (VS Code's editor)
- **Python Runtime**: Pyodide (WebAssembly)
- **Styling**: CSS3 with Glassmorphism effects
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/kode_dic.git
cd kode_dic
```

2. **Navigate to project directory**
```bash
cd code-compiler
```

3. **Install dependencies**
```bash
npm install
```

4. **Run development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🏗️ Building for Production

```bash
npm run build
```

The production files will be in the `dist/` folder.

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/kode_dic.git
git push -u origin main
```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
   - Click Deploy

### Manual Deployment

Upload the contents of the `dist/` folder to any static hosting service (Netlify, GitHub Pages, etc.)

## 🎨 Custom Themes

Kode_dic includes two custom Monaco Editor themes:

### Dark Theme
- Keywords: Cyan (#00D9FF)
- Strings: Neon Green (#39FF14)
- Comments: Grayish Purple
- Numbers: Bright Orange
- Functions: Bright Gold

### Light Theme
- Keywords: Deep Purple (#7B2CBF)
- Strings: Deep Green (#2D6A4F)
- Comments: Soft Gray
- Numbers: Deep Orange

## 📱 Mobile Experience

On mobile devices (< 768px):
- Full-screen code editor by default
- Toggle between "Code" and "Output" tabs
- Auto-switches to output after running code
- Touch-optimized buttons (44px minimum)
- Smooth slide animations

## 🐛 Known Limitations

- Python execution requires initial load (Pyodide ~20MB)
- JavaScript/TypeScript uses `eval()` - avoid running untrusted code
- File system operations not supported
- Network requests blocked in Python

## 🔒 Security Note

This is a client-side code execution environment. For security:
- Never execute untrusted code
- JavaScript runs in the browser's context
- Python runs in a WebAssembly sandbox

## 👨‍💻 Creator

**Keval Saud**
- 🤖 AI Developer
- 🧠 Automation Developer
- 🎓 Postgraduate Student
- 🎥 Video Content Creator

📧 Contact: [kevalsaud1825@gmail.com](mailto:kevalsaud1825@gmail.com)

## 📝 License

This project is licensed under the MIT License - feel free to use, modify, and distribute!

## 🙏 Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - For the powerful code editor
- [Pyodide](https://pyodide.org/) - For running Python in the browser
- [Vite](https://vitejs.dev/) - For the blazing fast build tool
- [React](https://react.dev/) - For the UI framework
- [Lucide Icons](https://lucide.dev/) - For the beautiful icons

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/kode_dic/issues).

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

Made with ❤️ and lots of ☕ by Keval Saud

**Happy Coding! 🚀**