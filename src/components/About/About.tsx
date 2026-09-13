import { useEffect, useRef, useState } from 'react';
import waterBg from '../../assets/about/water.gif';
import pictureFrame from '../../assets/about/picture.png';
import hiUmi from '../../assets/about/hiumi.png';
import frog from '../../assets/about/frog.png';
import paper from '../../assets/about/paper.png';
import projectHeader from '../../assets/about/projectheader.png';
import magicWand from '../../assets/about/magicwand.png';
import './About.css';

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`about-section ${hasEntered ? 'has-entered' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursorVisible(true)}
      onMouseLeave={() => setCursorVisible(false)}
    >
      {cursorVisible && (
        <img
          src={magicWand}
          alt=""
          className="magic-cursor"
          style={{ left: cursorPos.x, top: cursorPos.y }}
        />
      )}

      <img src={waterBg} alt="" className="about-bg" />

      <div className="about-stage">
        <img
          src={pictureFrame}
          alt="Eunice Dominique Mojica"
          className="about-item about-frame"
          style={{ animationDelay: '0.1s' }}
        />

        <div className="about-item textbox textbox-intro" style={{ animationDelay: '0.3s' }}>
          <p>
            I'm a Full Stack Developer with a growing passion for
            Cybersecurity and Software Engineering. I enjoy turning ideas
            into functional, user-focused applications—from designing
            intuitive interfaces and developing frontend and backend
            features to integrating databases, authentication, and secure
            application components.
          </p>
        </div>

        <div className="about-item textbox textbox-skills" style={{ animationDelay: '0.5s' }}>
          <p>
            <strong>Programming Languages:</strong> HTML, CSS, Python,
            JavaScript, TypeScript, C#, Java, C++, PHP, SQL, and Ruby.
            <br />
            <strong>Frameworks &amp; Technologies:</strong> ASP.NET Core,
            REST API development, Blazor, React, Django, Laravel, and
            Node.js.
            <br />
            <strong>Databases:</strong> MySQL, PostgreSQL, MongoDB, SQLite,
            Firebase, and Microsoft SQL Server.
            <br />
            <strong>Development Tools &amp; Platforms:</strong> GitHub,
            Visual Studio, Visual Studio Code, Linux, Windows, Android
            Studio, Figma, Arduino, and Tinkercad.
          </p>
        </div>

        <a
          href="/Eunice_Dominique_Mojica_CV.pdf"
          download="Eunice_Dominique_Mojica_CV.pdf"
          className="about-item download-btn"
          style={{ animationDelay: '0.7s' }}
        >
          Download CV/Resume
        </a>

        <img
          src={hiUmi}
          alt="Hi I'm Umi!"
          className="about-item about-hiumi"
          style={{ animationDelay: '0.9s' }}
        />

        <img
          src={frog}
          alt=""
          className="about-item about-frog"
          style={{ animationDelay: '1.1s' }}
        />
      </div>

      {/* Paper wrap: the Projects header is positioned relative to the
          paper image's own box, not the water image above it, since
          they're different sizes. */}
      <div className="about-paper-wrap">
        <img src={paper} alt="" className="about-paper-connector" />
        <img
          src={projectHeader}
          alt="Projects"
          className="about-item about-project-header"
          style={{ animationDelay: '1.3s' }}
        />
      </div>
    </section>
  );
};

export default About;