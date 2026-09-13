import cloudImg from '../../assets/nav/cloud.png';
import logoImg from '../../assets/nav/umilogo.png';
import starImg from '../../assets/nav/star.png';
import aboutImg from '../../assets/nav/about.png';
import projectsImg from '../../assets/nav/projects.png';
import contactsImg from '../../assets/nav/contacts.png';
import './Navbar.css';

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Navbar = () => {
  return (
    <nav className="site-nav">
      <div className="nav-cluster">
        <div className="nav-brand">
          <img src={cloudImg} alt="" className="nav-cloud glow-blue" />
          <img
            src={logoImg}
            alt="Umi logo"
            className="nav-logo glow-blue nav-logo-clickable"
            onClick={() => scrollToSection('landing')}
          />
        </div>

        <div className="nav-stars nav-stars-left" aria-hidden="true">
          <img src={starImg} alt="" className="star star-mid glow-yellow" />
          <img src={starImg} alt="" className="star star-small glow-yellow" />
        </div>

        <div className="nav-links">
          <img
            src={aboutImg}
            alt="About"
            className="nav-btn glow-white"
            onClick={() => scrollToSection('about')}
          />
          <img
            src={projectsImg}
            alt="Projects"
            className="nav-btn glow-white"
            onClick={() => scrollToSection('projects')}
          />
          <img
            src={contactsImg}
            alt="Contacts"
            className="nav-btn glow-white"
            onClick={() => scrollToSection('contact')}
          />
        </div>

        <div className="nav-stars nav-stars-right" aria-hidden="true">
          <img src={starImg} alt="" className="star star-small glow-yellow" />
          <img src={starImg} alt="" className="star star-mid glow-yellow" />
          <img src={starImg} alt="" className="star star-small glow-yellow" />
          <img src={starImg} alt="" className="star star-mid glow-yellow" />
          <img src={starImg} alt="" className="star star-small glow-yellow" />
          <img src={starImg} alt="" className="star star-mid glow-yellow" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;