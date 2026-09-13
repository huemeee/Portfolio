import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import bg3 from '../../assets/contact/bg3.jpg';
import bathtub from '../../assets/contact/bathtub.png';
import curtain from '../../assets/contact/curtain.png';
import contactMe from '../../assets/contact/contactme.png';
import song1 from '../../assets/contact/1song.mp3';
import song2 from '../../assets/contact/2song.mp3';
import song3 from '../../assets/contact/3song.mp3';
import cover1 from '../../assets/contact/cover1.png';
import cover2 from '../../assets/contact/cover2.jpg';
import cover3 from '../../assets/contact/cover3.jpg';
import './Contact.css';

const tracks = [
  { src: song1, name: 'JoyRide', artist: 'Cortis', cover: cover1 },
  { src: song2, name: 'I Caught Myself', artist: 'Paramore', cover: cover2 },
  { src: song3, name: 'Luna', artist: 'Smashing Pumpkins', cover: cover3 },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle'
  );

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
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, trackIndex]);

  const playTrack = (index: number) => {
    if (index === trackIndex) {
      setIsPlaying((prev) => !prev);
    } else {
      setTrackIndex(index);
      setIsPlaying(true);
    }
  };

  const skip = (direction: 1 | -1) => {
    setTrackIndex((prev) => (prev + direction + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setFormStatus('sending');

    emailjs
      .sendForm(
        'service_uec6k4r',
        'template_e7hlcug',
        formRef.current,
        '0hKjShLJNo_XEU9q1'
      )
      .then(() => {
        setFormStatus('success');
        formRef.current?.reset();
      })
      .catch(() => {
        setFormStatus('error');
      });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`contact-section ${hasEntered ? 'has-entered' : ''}`}
    >
      <img src={bg3} alt="" className="contact-bg" />

      <div className="contact-stage">
        <img src={contactMe} alt="Contact me" className="contact-title" />

        <div className="contact-form-wrap">
          <a
            href="https://www.linkedin.com/in/eunice-dominique-mojica-766a1832b"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-btn"
          >
            <svg
              className="linkedin-icon"
              height="100"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 100 100"
              width="100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M92.86,0H7.12A7.17,7.17,0,0,0,0,7.21V92.79A7.17,7.17,0,0,0,7.12,100H92.86A7.19,7.19,0,0,0,100,92.79V7.21A7.19,7.19,0,0,0,92.86,0ZM30.22,85.71H15.4V38H30.25V85.71ZM22.81,31.47a8.59,8.59,0,1,1,8.6-8.59A8.6,8.6,0,0,1,22.81,31.47Zm63,54.24H71V62.5c0-5.54-.11-12.66-7.7-12.66s-8.91,6-8.91,12.26V85.71H39.53V38H53.75v6.52H54c2-3.75,6.83-7.7,14-7.7,15,0,17.79,9.89,17.79,22.74Z" />
            </svg>
            <span className="linkedin-name">Eunice Dominique Mojica</span>
            <div className="linkedin-tooltip">See my profile!</div>
          </a>

          <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
            <label>
              Name
              <input type="text" name="name" required />
            </label>
            <label>
              Email
              <input type="email" name="email" required />
            </label>
            <label>
              Message
              <textarea name="message" rows={4} required />
            </label>
            <button type="submit" className="contact-submit" disabled={formStatus === 'sending'}>
              {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {formStatus === 'success' && (
              <p className="form-status form-status-success">
                Message sent! I'll get back to you soon 💌
              </p>
            )}
            {formStatus === 'error' && (
              <p className="form-status form-status-error">
                Something went wrong — please try again.
              </p>
            )}
          </form>
        </div>

        <img src={bathtub} alt="" className="contact-bathtub" />

        <div className="music-player">
          <audio
            ref={audioRef}
            src={tracks[trackIndex].src}
            onEnded={() => skip(1)}
          />

          <div className="currentplaying">
            <svg
              height="40px"
              width="40px"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              className="spotify"
            >
              <circle cx="32" cy="32" r="30" fill="#1db954" />
              <path
                d="M46 41c-.4 0-.7-.1-1-.3-6-3.7-13.6-4.5-22.6-2.5-.8.2-1.6-.3-1.8-1.1-.2-.8.3-1.6 1.1-1.8 9.8-2.2 18.2-1.3 25 2.9.7.4.9 1.3.5 2-.3.5-.7.8-1.2.8zm3-6.7c-.5 0-.9-.2-1.2-.4-6.9-4.2-17.4-5.5-25.5-3-1 .3-2-.2-2.3-1.2-.3-1 .2-2 1.2-2.3 9.3-2.8 20.8-1.4 28.7 3.4.9.5 1.1 1.7.6 2.5-.3.6-.9 1-1.5 1zm3.4-7.9c-.6 0-1.1-.2-1.5-.5-8.3-5-22-5.4-29.9-3-1.2.4-2.4-.3-2.8-1.5-.4-1.2.3-2.4 1.5-2.8 9.1-2.8 24.2-2.3 33.6 3.3 1 .6 1.4 2 .7 3-.4.8-1.1 1.5-1.6 1.5z"
                fill="#fff"
              />
            </svg>
            <p className="heading">Currently Playing</p>
          </div>

          {tracks.map((track, index) => {
            const isCurrent = index === trackIndex;
            return (
              <div
                key={track.name}
                className="loader"
                role="button"
                tabIndex={0}
                onClick={() => playTrack(index)}
              >
                <div className="song">
                  <p className="name">{track.name}</p>
                  <p className="artist">{track.artist}</p>
                </div>
                <img src={track.cover} alt="" className="albumcover" />
                {isCurrent && isPlaying ? (
                  <div className="loading">
                    <div className="load" />
                    <div className="load" />
                    <div className="load" />
                    <div className="load" />
                  </div>
                ) : (
                  <div className="play" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="floating-bubbles" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className={`css-bubble css-bubble-${i + 1}`} />
        ))}
      </div>

      <div className="curtain curtain-left">
        <img src={curtain} alt="" />
      </div>
      <div className="curtain curtain-right">
        <img src={curtain} alt="" className="curtain-mirrored" />
      </div>
    </section>
  );
};

export default Contact;