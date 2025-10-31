"use client";
import { useEffect, useRef } from "react";

export default function ParticleNetwork() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationId;

    const options = {
      particleCount: 50,
      maxDistance: 140,
      velocity: 0.25,
      color: "rgba(10,80,80,0.8)",
      lineColor: "rgba(100,100,100,0.20)", // constant opacity
      radius: 1,  
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = createParticles();
    };

    class Particle {
      constructor(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * options.velocity;
        this.vy = (Math.random() - 0.5) * options.velocity;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // gentle repel from mouse
        if (mouse.current.x && mouse.current.y) {
          const dx = this.x - mouse.current.x;
          const dy = this.y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            this.x += dx * 0.015;
            this.y += dy * 0.015;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, options.radius, 0, Math.PI * 2);
        ctx.fillStyle = options.color;
        ctx.fill();
      }
    }

    const createParticles = () => {
      const arr = [];
      for (let i = 0; i < options.particleCount; i++) {
        arr.push(new Particle());
      }
      return arr;
    };

    const drawLines = () => {
      ctx.globalAlpha = 1; // ensure full opacity for lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < options.maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = options.lineColor;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      drawLines();
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.current.x = null;
      mouse.current.y = null;
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-50 -z-10">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
