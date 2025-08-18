# Dr. Nick Svarnias Dental Practice Website

A modern, responsive website for Dr. Nicholas J. Svarnias, DDS, PC dental practice located in Chicago, IL.

## Features

- **Responsive Design**: Mobile-first approach that works on all devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Comprehensive Services**: Detailed information about all dental services
- **Team Section**: Professional profiles for Dr. Svarnias and staff
- **FAQ Section**: Common questions and answers for patients
- **Contact Form**: Easy appointment scheduling
- **Facebook Integration**: Social media presence
- **Accessibility**: WCAG compliant with proper focus states

## File Structure

```
drnicksvarnias/
├── index.html          # Main website file
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
├── images/             # Image assets directory
└── README.md           # This file
```

## How to Update the Website

### 1. Adding/Updating Photos

#### Team Photos
Place team member photos in the `images/` directory with these names:
- `dr-svarnias.jpg` - Dr. Nicholas J. Svarnias
- `gabriela-dace.jpg` - Gabriela Dace, RDH
- `martha-ramirez.jpg` - Martha Ramirez, RDH

#### Other Images
- `logo.png` - Practice logo (50x50px recommended)
- `hero-dental.jpg` - Hero section background image

#### Image Requirements
- **Format**: JPG, PNG, or WebP
- **Size**: Optimize for web (max 500KB per image)
- **Dimensions**: 
  - Team photos: 300x250px minimum
  - Hero image: 800x600px minimum
  - Logo: 50x50px

### 2. Updating Content

#### Services
Edit the services section in `index.html` around line 80-200. Each service is wrapped in a `.service-card` div.

#### Team Information
Update team member descriptions in `index.html` around line 250-300.

#### FAQ
Modify questions and answers in `index.html` around line 320-400.

#### Contact Information
Update contact details in `index.html` around line 420-480.

### 3. Facebook Link

The Facebook link is already integrated in multiple locations:
- Contact section (line 470)
- Footer social links (line 520)

**Current Facebook URL**: `https://www.facebook.com/drnicksvarnias`

To change the Facebook URL, update these locations in `index.html`.

### 4. Styling Updates

#### Colors
Main color scheme is defined in `styles.css`:
- Primary Blue: `#3498db`
- Dark Blue: `#2980b9`
- Dark Gray: `#2c3e50`
- Light Gray: `#f8f9fa`

#### Fonts
The website uses Inter font family from Google Fonts.

### 5. Adding New Sections

To add a new section:

1. **HTML**: Add the section in `index.html`
2. **CSS**: Add styles in `styles.css`
3. **JavaScript**: Add any interactive features in `script.js`

Example new section structure:
```html
<section id="new-section" class="new-section">
    <div class="container">
        <h2 class="section-title">New Section Title</h2>
        <div class="new-section-content">
            <!-- Content here -->
        </div>
    </div>
</section>
```

## Technical Details

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features
- Lazy loading for images
- Debounced scroll events
- CSS animations with hardware acceleration
- Optimized for mobile devices

### SEO Features
- Semantic HTML structure
- Meta descriptions
- Proper heading hierarchy
- Alt text for images

## Deployment

### Local Development
1. Open `index.html` in a web browser
2. All features work locally

### Web Hosting
1. Upload all files to your web hosting provider
2. Ensure the `images/` directory is uploaded
3. Test all functionality after upload

### Recommended Hosting
- Shared hosting with PHP support
- CDN for image optimization
- SSL certificate for security

## Maintenance

### Regular Updates
- Update team photos annually
- Review and update service descriptions
- Check Facebook link functionality
- Test contact form regularly

### Performance Monitoring
- Monitor page load times
- Check mobile responsiveness
- Validate HTML/CSS
- Test contact form submissions

## Support

For technical support or questions about updating the website:
1. Review this README file
2. Check the HTML comments for guidance
3. Test changes locally before uploading

## License

This website template is created for Dr. Nicholas J. Svarnias, DDS, PC.
All rights reserved.

---

**Last Updated**: August 2025
**Version**: 1.0
