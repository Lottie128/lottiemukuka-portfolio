import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Lottie Mukuka</h1>
          <p className="hero-subtitle">Software Developer | Robotics Educator | AI Innovator</p>
          <p className="hero-description">
            With over 10 years of professional experience, I've trained more than 10,000 students and professionals 
            in robotics, AI, and cutting-edge technologies. From building humanoid service robots to developing 
            educational platforms, I bring innovation to life.
          </p>
          <div className="hero-buttons">
            <Link to="/portfolio">
              <button className="btn-primary">View Portfolio</button>
            </Link>
            <Link to="/courses">
              <button className="btn-secondary">Explore Courses</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        <section className="highlights">
          <div className="highlight-card card">
            <div className="highlight-icon">🤖</div>
            <h3>Robotics Innovation</h3>
            <p>Training students in building humanoid service robots, drones, and Go-Karts with recognition in the India Book of Records</p>
          </div>
          <div className="highlight-card card">
            <div className="highlight-icon">👨‍🏫</div>
            <h3>Educational Excellence</h3>
            <p>Running 20-24 workshops monthly with 200-300 attendees, training teachers and professionals</p>
          </div>
          <div className="highlight-card card">
            <div className="highlight-icon">💻</div>
            <h3>Tech Development</h3>
            <p>Building LMS platforms, e-commerce solutions, and AI-powered business management systems</p>
          </div>
        </section>

        <section className="about-section">
          <div className="card">
            <h2>About Me</h2>
            <p>
              I'm a passionate technologist and educator based in Zambia, specializing in full-stack development, 
              robotics, and AI integration. As the founder of ZeroAI Technologies, I create innovative solutions 
              that bridge the gap between technology and education.
            </p>
            <p>
              My expertise spans across building educational platforms like IQ Didactic LMS, developing production 
              tracking systems, and creating comprehensive robotics lab curricula. I'm IBM Partner Plus certified 
              and STEM.org certified, bringing world-class standards to every project.
            </p>
            <div className="skills">
              <span className="skill-tag">React</span>
              <span className="skill-tag">PHP</span>
              <span className="skill-tag">Python</span>
              <span className="skill-tag">Arduino</span>
              <span className="skill-tag">Robotics</span>
              <span className="skill-tag">AI/ML</span>
              <span className="skill-tag">IoT</span>
              <span className="skill-tag">Drone Tech</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
