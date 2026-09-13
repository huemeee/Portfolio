import { useEffect, useRef, useState } from 'react';
import bg1 from '../../assets/landing/bg1.jpg';
import leftText from '../../assets/landing/left.png';
import rightText from '../../assets/landing/right.png';
import closedTin from '../../assets/landing/closed.png';
import openTin from '../../assets/landing/open.png';
import crayon from '../../assets/landing/crayon.png';
import fullname from '../../assets/landing/fullname.png';
import poyoyoi from '../../assets/landing/poyoyoi.png';
import slytherin from '../../assets/landing/slytherin.png';
import rhyme from '../../assets/landing/rhyme.png';
import clairo from '../../assets/landing/clairo.png';
import chopper from '../../assets/landing/chopper.png';
import snoopy from '../../assets/landing/snoopy.png';
import paramore from '../../assets/landing/paramore.png';
import lilypad from '../../assets/landing/lilypad.png';
import flower from '../../assets/landing/flower.png';
import pencil from '../../assets/landing/pencil.png';
import './Landing.css';

type BurstItem = {
  id: string;
  src: string;
  alt: string;
  tooltip: string;
  className: string;
  delay: number;
};

const burstItems: BurstItem[] = [
  { id: 'poyoyoi', src: poyoyoi, alt: 'Poyoyoi plush', tooltip: "I'm a coer", className: 'item-poyoyoi', delay: 80 },
  { id: 'slytherin', src: slytherin, alt: 'Slytherin badge', tooltip: 'My house is Slytherin', className: 'item-slytherin', delay: 160 },
  { id: 'rhyme', src: rhyme, alt: 'Electric guitar', tooltip: 'I play electric guitar', className: 'item-rhyme', delay: 240 },
  { id: 'clairo', src: clairo, alt: 'Clairo album', tooltip: 'I love Clairo', className: 'item-clairo', delay: 320 },
  { id: 'chopper', src: chopper, alt: 'Chopper', tooltip: 'I love Chopper', className: 'item-chopper', delay: 400 },
  { id: 'snoopy', src: snoopy, alt: 'Snoopy', tooltip: 'I am Snoopy', className: 'item-snoopy', delay: 480 },
  { id: 'paramore', src: paramore, alt: 'Paramore album', tooltip: 'I love Paramore', className: 'item-paramore', delay: 560 },
];

const Landing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Size the canvas to exactly match the section, and keep it in sync
  // if the window resizes.
  useEffect(() => {
    const resizeCanvas = () => {
      const section = sectionRef.current;
      const canvas = canvasRef.current;
      if (!section || !canvas) return;
      canvas.width = section.clientWidth;
      canvas.height = section.clientHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const getPoint = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isOpen) return;
    isDrawingRef.current = true;
    lastPointRef.current = getPoint(e);
    setHasDrawn(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    setCursorVisible(true);

    if (!isOpen || !isDrawingRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !lastPointRef.current) return;

    const point = getPoint(e);
    ctx.strokeStyle = '#3a3a3a';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    lastPointRef.current = point;
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  return (
    <section
      id="landing"
      ref={sectionRef}
      className="landing-section"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      {isOpen && cursorVisible && (
        <img
          src={pencil}
          alt=""
          className="pencil-cursor"
          style={{ left: cursorPos.x, top: cursorPos.y }}
        />
      )}

      {isOpen && cursorVisible && !hasDrawn && (
        <div
          className="draw-hint"
          style={{ left: cursorPos.x, top: cursorPos.y }}
        >
          You can draw now! Try it!
        </div>
      )}

      <canvas
        ref={canvasRef}
        className={`drawing-canvas ${isOpen ? 'active' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrawing}
        onMouseLeave={() => {
          stopDrawing();
          setCursorVisible(false);
        }}
      />
      <div className="tin-stage">
        {!isOpen && <img src={leftText} alt="Click this" className="hint hint-left" />}

        <div className="tin-wrapper">
          {!isOpen && (
            <button
              type="button"
              className="tin-button"
              onClick={() => setIsOpen(true)}
              aria-label="Open the surprise tin"
            >
              <img src={closedTin} alt="Closed tin box" className="tin closed" />
            </button>
          )}

          {isOpen && (
            <div className="tin-open-stage">
              <img src={openTin} alt="Opened tin box" className="tin open" />
              <img src={crayon} alt="" className="crayon-burst" />
              <img src={fullname} alt="Eunice Dominique Mojica" className="fullname-burst" />

              {burstItems.map((item) => (
                <div
                  key={item.id}
                  className={`burst-item ${item.className}`}
                  style={{ animationDelay: `${item.delay}ms` }}
                >
                  <img src={item.src} alt={item.alt} className="burst-img" />
                  <span className="burst-tooltip">{item.tooltip}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {!isOpen && <img src={rightText} alt="Click this" className="hint hint-right" />}
      </div>

      <div className="lily-connector">
        <img src={lilypad} alt="" className="lilypad lilypad-left" />
        <img src={flower} alt="" className="flower" />
        <img src={lilypad} alt="" className="lilypad lilypad-right" />
      </div>
    </section>
  );
};

export default Landing;