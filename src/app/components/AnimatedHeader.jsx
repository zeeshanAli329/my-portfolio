"use client";
import { useEffect, useRef } from "react";
import { gsap, Circ } from "gsap";

const AnimatedBackground = ({ height = "100vh" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let width = window.innerWidth;
    let heightPx = window.innerHeight;
    let canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
    let points = [];
    let target = { x: width / 2, y: heightPx / 2 };
    let animateHeader = true;

    canvas.width = width;
    canvas.height = heightPx;

    // Create points
    for (let x = 0; x < width; x += width / 20) {
      for (let y = 0; y < heightPx; y += heightPx / 20) {
        const px = x + Math.random() * width / 20;
        const py = y + Math.random() * heightPx / 20;
        points.push({ x: px, originX: px, y: py, originY: py });
      }
    }

    // Find 5 closest points
    for (let i = 0; i < points.length; i++) {
      const closest = [];
      const p1 = points[i];
      for (let j = 0; j < points.length; j++) {
        const p2 = points[j];
        if (p1 === p2) continue;
        let placed = false;
        for (let k = 0; k < 5; k++) {
          if (!placed && (!closest[k] || getDistance(p1, p2) < getDistance(p1, closest[k]))) {
            closest[k] = p2;
            placed = true;
          }
        }
      }
      p1.closest = closest;
      p1.circle = new Circle(p1, 2 + Math.random() * 2, "rgba(255,255,255,0.3)");
    }

    function Circle(pos, rad, color) {
      this.pos = pos;
      this.radius = rad;
      this.color = color;
      this.active = 0;
      this.draw = function () {
        if (!this.active) return;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = `rgba(156,217,249,${this.active})`;
        ctx.fill();
      };
    }

    // Animate points
    function shiftPoint(p) {
      gsap.to(p, {
        duration: 1 + Math.random(),
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: Circ.easeInOut,
        onComplete: () => shiftPoint(p),
      });
    }

    for (let i in points) shiftPoint(points[i]);

    // Animation loop
    function animate() {
      if (animateHeader) {
        ctx.clearRect(0, 0, width, heightPx);
        for (let i in points) {
          const p = points[i];
          const dist = Math.abs(getDistance(target, p));
          if (dist < 4000) p.active = 0.3;
          else if (dist < 20000) p.active = 0.1;
          else if (dist < 40000) p.active = 0.02;
          else p.active = 0;

          drawLines(p);
          p.circle.active = p.active * 2;
          p.circle.draw();
        }
      }
      requestAnimationFrame(animate);
    }

    animate();

    // Helpers
    function drawLines(p) {
      if (!p.active) return;
      for (let i in p.closest) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[i].x, p.closest[i].y);
        ctx.strokeStyle = `rgba(156,217,249,${p.active})`;
        ctx.stroke();
      }
    }

    function getDistance(p1, p2) {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    const handleMouseMove = (e) => {
      target.x = e.pageX;
      target.y = e.pageY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="absolute inset-0 z-0"
      style={{ height, background: "", overflow: "hidden" }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default AnimatedBackground;
