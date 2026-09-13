import { useState } from 'react';
import bg2 from '../../assets/projects/bg2.jpg';
import camera from '../../assets/projects/camera.png';
import cap from '../../assets/projects/cap.png';
import earphones from '../../assets/projects/earphones.png';
import lipgloss from '../../assets/projects/lipgloss.png';
import roll1 from '../../assets/projects/roll1.png';
import roll2 from '../../assets/projects/roll2.png';
import plate from '../../assets/projects/plate.png';
import coffee from '../../assets/projects/coffee.png';
import cake from '../../assets/projects/cake.png';
import fork from '../../assets/projects/fork.png';
import './Projects.css';

type ProjectId = 'plateLeft' | 'plateRight' | 'coffee' | 'cake';

type ProjectInfo = {
  title: string;
  role: string;
  description: string;
};

const projectData: Record<ProjectId, ProjectInfo> = {
  plateLeft: {
    title: 'Generation of Notices — Internal Employee Web Application',
    role: 'Role: Full-Stack Developer | Technologies: ASP.NET Core, Microsoft SQL Server',
    description:
      'Developed an internal web application under UAT to streamline the generation of employee notices and reduce the manual preparation of client documents. Implemented automated client information retrieval using Plan IDs and predefined document templates, allowing employees to generate either individual notices or multiple notices in batches. Integrated batch document generation with ZIP file packaging for efficient distribution and connected the application to Microsoft SQL Server for data retrieval.',
  },
  plateRight: {
    title: 'Ka-GabAI — The Development of Intelligent Push Cart for Shoppers',
    role: 'Role: Frontend Developer & Technical Documentation | Technologies: AI, IoT, Android Studio, Arduino, OpenCV(YOLO), Flask, Firebase, Gemini API',
    description:
      "Developed the frontend and user experience of Ka-GabAI, an intelligent push cart designed to improve the grocery shopping experience through AI Nutri Guidance, In-Store Navigation, and Budget Tracker features. Worked on the system's user interface and interactive experience while documenting its technical processes, features, and development. The system integrates hardware components to support sensing, processing, and interactive functions within the smart cart.",
  },
  coffee: {
    title: 'Employee Login & Authentication System',
    role: 'Role: Full-Stack Developer | Technologies: ASP.NET Core, Microsoft SQL Server',
    description:
      'Developed an employee authentication system using ASP.NET Core and Microsoft SQL Server to securely validate employee credentials. Implemented an account lockout mechanism that restricts access after three consecutive failed login attempts, providing an additional layer of protection against unauthorized access.',
  },
  cake: {
    title: 'PhilPlans Pay Website Redesign',
    role: 'Role: UI/UX & Frontend Developer | Technologies: Figma, Blazor, Visual Studio',
    description:
      'Redesigned and enhanced the PhilPlans Pay website to improve its overall user interface and user experience. Created and refined interface designs using Figma and implemented the redesigned UI using the Blazor framework in Visual Studio, focusing on usability, visual consistency, and a more modern web experience.',
  },
};

const Projects = () => {
  const [activeProject, setActiveProject] = useState<ProjectId | null>(null);
  const activeInfo = activeProject ? projectData[activeProject] : null;
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    setCursorVisible(true);
  };

  return (
    <section
      id="projects"
      className="projects-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setCursorVisible(false)}
    >
      {cursorVisible && (
        <img
          src={fork}
          alt=""
          className="fork-cursor"
          style={{ left: cursorPos.x, top: cursorPos.y }}
        />
      )}

      <img src={bg2} alt="" className="projects-bg" />

      <div className="projects-stage">
        <img src={cap} alt="" className="proj-item proj-cap" />
        <img src={camera} alt="" className="proj-item proj-camera" />
        <img src={earphones} alt="" className="proj-item proj-earphones" />
        <img src={lipgloss} alt="" className="proj-item proj-lipgloss" />

        <div className="proj-item proj-rolls">
          <div className="roll-wrap roll-wrap-1">
            <img src={roll1} alt="" className="roll roll-1" />
            <img src={roll1} alt="Film roll 1 preview" className="roll-preview-single" />
          </div>
          <div className="roll-wrap roll-wrap-2">
            <img src={roll2} alt="" className="roll roll-2" />
            <img src={roll2} alt="Film roll 2 preview" className="roll-preview-single" />
          </div>
        </div>

        <button
          type="button"
          className="proj-item proj-plate proj-plate-left"
          onClick={() => setActiveProject('plateLeft')}
        >
          <img src={plate} alt="" className="plate-img plate-img-left" />
          <span className="click-me">click me</span>
        </button>

        <button
          type="button"
          className="proj-item proj-plate proj-plate-right"
          onClick={() => setActiveProject('plateRight')}
        >
          <img src={plate} alt="" className="plate-img plate-img-right" />
          <span className="click-me">click me</span>
        </button>

        <button
          type="button"
          className="proj-item proj-coffee"
          onClick={() => setActiveProject('coffee')}
        >
          <img src={coffee} alt="" className="coffee-img" />
          <span className="click-me">click me</span>
        </button>

        <button
          type="button"
          className="proj-item proj-cake"
          onClick={() => setActiveProject('cake')}
        >
          <img src={cake} alt="" className="cake-img" />
          <span className="click-me">click me</span>
        </button>
      </div>

      {activeInfo && (
        <div className="project-modal-overlay" onClick={() => setActiveProject(null)}>
          <div className="project-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="project-modal-close"
              onClick={() => setActiveProject(null)}
              aria-label="Close"
            >
              ×
            </button>
            <h3>{activeInfo.title}</h3>
            <p className="project-modal-role">{activeInfo.role}</p>
            <p className="project-modal-description">{activeInfo.description}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;