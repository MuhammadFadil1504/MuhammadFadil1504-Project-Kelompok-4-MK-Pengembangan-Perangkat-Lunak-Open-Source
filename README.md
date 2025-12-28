# Portfolio Website

A modern, responsive portfolio website built with HTML5, CSS3, and JavaScript. Perfect for showcasing your projects, skills, and experience as a web developer or designer.

## 🌟 Features

- **Responsive Design** - Works perfectly on all devices (mobile, tablet, desktop)
- **Modern UI/UX** - Clean and professional design with smooth animations
- **Fast Performance** - Optimized for speed and performance
- **SEO Friendly** - Properly structured with semantic HTML
- **Easy to Customize** - Well-organized code structure
- **Contact Form** - Functional contact form with validation
- **Project Showcase** - Display your work with style
- **Blog Section** - Share your thoughts and tutorials
- **Dark Mode Support** - Automatic dark mode based on system preference

## 📁 Project Structure

```
website-nim/
├── index.html              # Homepage
├── pages/                  # Additional pages
│   ├── about.html         # About page
│   ├── projects.html      # Projects showcase
│   ├── blog.html          # Blog page
│   └── contact.html       # Contact page
├── assets/                # Static assets
│   ├── css/              # Stylesheets
│   │   ├── variables.css  # CSS variables
│   │   ├── style.css      # Main styles
│   │   └── responsive.css # Responsive styles
│   ├── js/               # JavaScript files
│   │   ├── main.js        # Main JavaScript
│   │   ├── navigation.js  # Navigation functionality
│   │   └── form-validation.js # Form validation
│   └── images/           # Images
│       ├── profile/      # Profile images
│       ├── projects/     # Project screenshots
│       └── blog/         # Blog images
├── .gitignore            # Git ignore file
├── README.md             # Documentation
└── LICENSE               # License file
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A text editor (VS Code, Sublime Text, etc.)
- Basic knowledge of HTML, CSS, and JavaScript

### Installation

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd portfolio-website
   ```

3. **Open `index.html` in your browser**
   - Simply double-click the file, or
   - Use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (with http-server)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

4. **View in browser**
   - Open `http://localhost:8000` in your browser

## 🎨 Customization

### 1. Personal Information

Update your personal details in all HTML files:
- Change "Your Name" to your actual name
- Update email, phone, and social media links
- Modify the hero text and descriptions

### 2. Colors & Styling

Edit `assets/css/variables.css` to customize the color scheme:
```css
:root {
    --primary-color: #4a90e2;    /* Main color */
    --secondary-color: #f39c12;  /* Accent color */
    /* ... other variables */
}
```

### 3. Images

Add your images to the appropriate folders:
- Profile photo: `assets/images/profile/`
- Project screenshots: `assets/images/projects/`
- Blog images: `assets/images/blog/`

Update image paths in HTML files:
```html
<img src="assets/images/profile/your-photo.jpg" alt="Your Name">
```

### 4. Projects

Edit `pages/projects.html` to add/modify your projects:
- Update project titles and descriptions
- Add your project images
- Update demo and GitHub links

### 5. Blog Posts

Edit `pages/blog.html` to add/modify blog posts:
- Update article titles and content
- Add featured images
- Update publication dates

### 6. Contact Form

The contact form in `pages/contact.html` includes client-side validation. To make it functional:
- Set up a backend API endpoint
- Update the form action or JavaScript submission
- Or use a service like Formspree, Netlify Forms, or EmailJS

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript (ES6+)** - Interactive functionality
- **CSS Variables** - Easy theming
- **Responsive Design** - Mobile-first approach

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 🚢 Deployment

### GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select branch and folder
4. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify

1. Sign up at [Netlify](https://www.netlify.com)
2. Connect your Git repository
3. Deploy with one click

### Vercel

1. Sign up at [Vercel](https://vercel.com)
2. Import your project
3. Deploy automatically

## 📝 To-Do / Future Enhancements

- [ ] Add dark mode toggle button
- [ ] Implement blog search functionality
- [ ] Add project filtering by technology
- [ ] Create admin panel for content management
- [ ] Add multi-language support
- [ ] Integrate analytics (Google Analytics)
- [ ] Add animations library (AOS, GSAP)
- [ ] Create sitemap.xml
- [ ] Add RSS feed for blog
- [ ] Implement PWA features

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- Website: [yourwebsite.com](https://yourwebsite.com)
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [yourprofile](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Design inspiration from various portfolio websites
- Icons from emoji unicode characters
- Color palette inspiration from modern design trends
- Community feedback and suggestions

## 💡 Tips

- Regularly update your projects and blog
- Keep your skills section current
- Optimize images before uploading (use tools like TinyPNG)
- Test on multiple devices and browsers
- Use Google Lighthouse for performance auditing
- Keep code clean and well-commented

## 📞 Support

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Contact me via email
- Connect on social media

---

Made with ❤️ by Your Name

⭐ Star this repo if you find it helpful!