# Ask-Nova Website

A professional, responsive website for Ask-Nova, a cutting-edge AI Agentic framework designed for pharmaceutical and healthcare sales professionals by Nova AI Inc.

## 🏥 About Ask-Nova

Ask-Nova empowers healthcare sales representatives across multiple sectors including pharmaceutical representatives, medical liaisons, medical device representatives, OTC representatives, and animal health representatives with AI-powered intelligence, automated reporting, and comprehensive market insights.

## 🌟 Website Features

### Pages
- **Home Page (`index.html`)** - Hero section, value proposition, features overview, testimonials, and CTAs
- **Solutions Page (`solutions.html`)** - AI framework details, use cases, feature deep-dives, ROI calculator
- **Integrations Page (`integrations.html`)** - CRM systems, healthcare data sources, API capabilities, partnerships
- **Pricing Page (`pricing.html`)** - Tiered pricing, feature comparison, enterprise options, FAQ
- **About Page (`about.html`)** - Company overview, team profiles, mission/vision, contact information

### Design Features
- **Professional Healthcare Theme** - Clean, medical-focused color scheme with blues and greens
- **Fully Responsive** - Mobile-first design that works on all devices
- **Modern UI/UX** - Contemporary design patterns with smooth animations and transitions
- **Accessibility Compliant** - WCAG guidelines implementation
- **SEO Optimized** - Semantic HTML structure with proper meta tags

### Interactive Elements
- **Mobile Navigation** - Responsive hamburger menu for mobile devices
- **Smooth Scrolling** - Seamless navigation between sections
- **Form Validation** - Real-time validation for contact and demo request forms
- **ROI Calculator** - Interactive calculator for potential savings and benefits
- **Animated Statistics** - Counter animations for key metrics
- **FAQ Accordions** - Expandable FAQ sections
- **Hover Effects** - Interactive card and button animations

### Technical Features
- **Modern CSS** - CSS Grid, Flexbox, Custom Properties (CSS Variables)
- **Vanilla JavaScript** - No external dependencies for core functionality
- **Performance Optimized** - Lazy loading, prefetching, and optimized assets
- **Analytics Ready** - Event tracking and user behavior analytics
- **Form Handling** - Complete contact and demo request form functionality

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (for development: Python's http.server, Node.js http-server, or VS Code Live Server)

### Installation

1. **Clone or download the files**
   ```bash
   git clone <repository-url>
   cd ask-nova-website
   ```

2. **Serve the files locally**
   
   Using Python:
   ```bash
   python -m http.server 8000
   ```
   
   Using Node.js:
   ```bash
   npx http-server
   ```
   
   Using VS Code Live Server extension:
   - Right-click on `index.html`
   - Select "Open with Live Server"

3. **Open in browser**
   Navigate to `http://localhost:8000` (or the port specified by your server)

## 📁 File Structure

```
ask-nova-website/
├── index.html          # Home page
├── solutions.html      # Solutions and features page
├── integrations.html   # Integrations and partnerships page
├── pricing.html        # Pricing plans and calculator
├── about.html          # About company and team
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#1e3a8a` - Main brand color
- **Secondary Blue**: `#0ea5e9` - Accent and highlights
- **Accent Green**: `#059669` - Success states and CTAs
- **Neutral Colors**: Various grays for text and backgrounds
- **White**: `#ffffff` - Clean backgrounds and cards

### Typography
- **Primary Font**: Inter (body text, UI elements)
- **Secondary Font**: Poppins (headings, brand elements)
- **Font Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Components
- **Buttons**: Primary, secondary, and accent variations
- **Cards**: Feature cards, pricing cards, team member cards
- **Forms**: Contact forms with validation
- **Navigation**: Fixed header with mobile-responsive menu
- **Sections**: Consistent spacing and layout patterns

## 💻 Development

### CSS Architecture
- **CSS Custom Properties** - Consistent design tokens
- **Mobile-First Approach** - Responsive design from small to large screens
- **Modular Styles** - Organized by component and section
- **Performance Optimized** - Minimal CSS with efficient selectors

### JavaScript Features
- **ES6+ Syntax** - Modern JavaScript features
- **Event Delegation** - Efficient event handling
- **Intersection Observer** - Scroll-based animations
- **Form Validation** - Real-time field validation
- **Analytics Tracking** - User interaction tracking
- **Error Handling** - Graceful error management

### Browser Support
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## 🔧 Customization

### Updating Content
1. **Text Content** - Edit HTML files directly
2. **Images** - Replace placeholder content with actual images
3. **Colors** - Modify CSS custom properties in `styles.css`
4. **Fonts** - Update Google Fonts links and CSS font families

### Adding New Sections
1. Create HTML structure following existing patterns
2. Add corresponding CSS styles
3. Update navigation if needed
4. Add JavaScript functionality for interactivity

### Form Integration
Replace the form handling in `script.js` with your backend API:

```javascript
function handleFormSubmission(form) {
    const formData = new FormData(form);
    
    fetch('/api/contact', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        showNotification('Thank you! We will get back to you soon.', 'success');
    })
    .catch(error => {
        showNotification('Something went wrong. Please try again.', 'error');
    });
}
```

## 🚀 Deployment

### Static Hosting
Deploy to any static hosting service:
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3**: Enterprise-grade static hosting

### Production Checklist
- [ ] Update contact information and links
- [ ] Replace placeholder images with real assets
- [ ] Configure analytics (Google Analytics, etc.)
- [ ] Set up form handling backend
- [ ] Enable HTTPS
- [ ] Configure domain and DNS
- [ ] Test all functionality across devices
- [ ] Optimize images and assets
- [ ] Set up monitoring and error tracking

## 🧪 Testing

### Manual Testing
- Test all navigation links
- Verify form submissions
- Check responsive design on different screen sizes
- Test in multiple browsers
- Validate accessibility with screen readers

### Performance Testing
- Use Lighthouse for performance audits
- Test loading times
- Verify mobile performance
- Check Core Web Vitals

## 📈 Analytics & Tracking

The website includes built-in analytics tracking for:
- Page views
- User interactions (clicks, form submissions)
- Scroll depth
- Performance metrics

To integrate with your analytics service:
1. Add your tracking ID to the analytics configuration
2. Update the `trackEvent` function in `script.js`
3. Configure goal tracking for conversions

## 🔒 Security Considerations

- **Form Validation**: Client-side and server-side validation
- **HTTPS**: Ensure SSL/TLS encryption
- **Content Security Policy**: Implement CSP headers
- **Privacy Compliance**: GDPR/CCPA compliance for healthcare
- **Data Protection**: Secure handling of contact form data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This website is created for Nova Technology Inc. All rights reserved.

## 📞 Support

For questions or support regarding this website:
- Email: info@nova-tech.com
- Website: [ask-nova.ai](https://ask-nova.ai)

## 🏆 Credits

**Design & Development**: Professional healthcare-focused web design
**Framework**: Vanilla HTML5, CSS3, and JavaScript
**Icons**: Font Awesome
**Fonts**: Google Fonts (Inter, Poppins)
**Images**: Placeholder SVGs (replace with actual images)

---


**Nova AI Inc.** - Empowering healthcare sales professionals with AI-driven intelligence and automation. 
