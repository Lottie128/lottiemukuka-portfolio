# Lottie Mukuka Portfolio

A professional portfolio website built with React and PHP, featuring timeline-based posts, courses, and admin dashboard.

## Features

- **Timeline Portfolio**: Beautiful timeline view of projects and achievements
- **Video Integration**: Embed videos from Google Drive/Photos without server storage
- **Admin Dashboard**: Complete CMS for managing posts and courses
- **Responsive Design**: Mobile-friendly and optimized for all devices
- **Animated Background**: Smooth gradient animation for visual appeal
- **Lightweight**: Minimal server load with JSON-based storage

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- Vite for build tooling
- CSS3 with animations

### Backend
- PHP 7.4+
- JSON file-based storage (perfect for shared hosting)
- RESTful API architecture
- Token-based authentication

## Installation

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/Lottie128/lottiemukuka-portfolio.git
cd lottiemukuka-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Start development server**
```bash
npm run dev
```

5. **Start PHP server** (in another terminal)
```bash
cd api
php -S localhost:8000
```

### Production Deployment (Shared Hosting)

1. **Build the React app**
```bash
npm run build
```

2. **Upload to your shared hosting**
   - Upload contents of `dist/` folder to your public_html or www directory
   - Upload the `api/` folder to the same directory
   - Upload `.htaccess` to the root

3. **Set permissions**
```bash
chmod 755 api/data
chmod 644 api/data/*.json
```

4. **Configure API URL**
   - Update `VITE_API_URL` in `.env` to match your domain
   - Rebuild the app

## Admin Access

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

**⚠️ IMPORTANT:** Change the default password immediately!

To change the admin password:
1. Delete `api/data/users.json`
2. Edit `api/config.php` and change the password in the default user array
3. Access the site to regenerate the users file

## Using Google Drive Videos

1. Upload your video to Google Drive
2. Right-click and select "Share"
3. Set to "Anyone with the link can view"
4. Copy the share link
5. In the admin dashboard, paste the full Google Drive link
6. The system will automatically extract the file ID and embed it

**Supported formats:**
- `https://drive.google.com/file/d/FILE_ID/view`
- `https://drive.google.com/uc?id=FILE_ID`
- `https://drive.google.com/open?id=FILE_ID`

## Project Structure

```
lottiemukuka-portfolio/
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/          # Page components
│   │   └── Admin/      # Admin dashboard pages
│   ├── utils/          # Utility functions and API calls
│   ├── App.jsx         # Main app component
│   └── main.jsx        # React entry point
├── api/
│   ├── auth.php        # Authentication endpoint
│   ├── posts.php       # Posts CRUD operations
│   ├── courses.php     # Courses CRUD operations
│   ├── config.php      # Configuration and helpers
│   ├── data/           # JSON data storage
│   └── .htaccess       # API routing rules
├── public/             # Static assets
└── dist/               # Production build (generated)
```

## API Endpoints

### Posts
- `GET /api/posts.php` - Get all posts
- `POST /api/posts.php` - Create new post (requires auth)
- `PUT /api/posts.php` - Update post (requires auth)
- `DELETE /api/posts.php` - Delete post (requires auth)

### Courses
- `GET /api/courses.php` - Get all courses
- `POST /api/courses.php` - Create new course (requires auth)
- `PUT /api/courses.php` - Update course (requires auth)
- `DELETE /api/courses.php` - Delete course (requires auth)

### Authentication
- `POST /api/auth.php` - Login and get token

## Customization

### Colors
Edit CSS variables in `src/App.css`:
```css
:root {
  --primary: #6366f1;
  --secondary: #8b5cf6;
  --accent: #ec4899;
}
```

### Gradient Animation
Adjust the background gradient in `src/App.css`:
```css
background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe);
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

MIT License - feel free to use this for your own portfolio!

## Support

For issues or questions, please open an issue on GitHub.

## Author

**Lottie Mukuka**
- Website: [lottiemukuka.com](https://lottiemukuka.com)
- GitHub: [@Lottie128](https://github.com/Lottie128)
