"use client";
import { useEffect, useRef } from "react";

const FluidBackground = ({ color = "#00FFFF", background = "#000" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let mouse = { x: 0, y: 0, px: 0, py: 0, moving: false };
    let width = window.innerWidth;
    let height = window.innerHeight;
    const resolution = 15;
    const penSize = 40;
    const cols = Math.floor(width / resolution);
    const rows = Math.floor(height / resolution);
    const vecCells = [];
    const particles = [];
    const particleCount = 4000;

    canvas.width = width;
    canvas.height = height;

    class Cell {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.xv = 0;
        this.yv = 0;
        this.pressure = 0;
      }
    }

    class Particle {
      constructor(x, y) {
        this.x = this.px = x;
        this.y = this.py = y;
        this.xv = this.yv = 0;
      }
    }

    // Initialize grid
    for (let col = 0; col < cols; col++) {
      vecCells[col] = [];
      for (let row = 0; row < rows; row++) {
        vecCells[col][row] = new Cell(col * resolution, row * resolution);
      }
    }

    // Link neighbors
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const cell = vecCells[col][row];
        const up = vecCells[col][(row - 1 + rows) % rows];
        const down = vecCells[col][(row + 1) % rows];
        const left = vecCells[(col - 1 + cols) % cols][row];
        const right = vecCells[(col + 1) % cols][row];
        const upLeft = vecCells[(col - 1 + cols) % cols][(row - 1 + rows) % rows];
        const upRight = vecCells[(col + 1) % cols][(row - 1 + rows) % rows];
        const downLeft = vecCells[(col - 1 + cols) % cols][(row + 1) % rows];
        const downRight = vecCells[(col + 1) % cols][(row + 1) % rows];

        Object.assign(cell, { up, down, left, right, upLeft, upRight, downLeft, downRight });
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(Math.random() * width, Math.random() * height));
    }

    const changeVelocity = (cell, mx, my, vx, vy) => {
      const dx = cell.x - mx;
      const dy = cell.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < penSize) {
        const power = penSize / Math.max(dist, 4);
        cell.xv += vx * power;
        cell.yv += vy * power;
      }
    };

    const updatePressure = (cell) => {
      const px = (cell.upLeft.xv * 0.5 + cell.left.xv + cell.downLeft.xv * 0.5 - cell.upRight.xv * 0.5 - cell.right.xv - cell.downRight.xv * 0.5);
      const py = (cell.upLeft.yv * 0.5 + cell.up.yv + cell.upRight.yv * 0.5 - cell.downLeft.yv * 0.5 - cell.down.yv - cell.downRight.yv * 0.5);
      cell.pressure = (px + py) * 0.25;
    };

    const updateVelocity = (cell) => {
      cell.xv += (cell.upLeft.pressure * 0.5 + cell.left.pressure + cell.downLeft.pressure * 0.5 - cell.upRight.pressure * 0.5 - cell.right.pressure - cell.downRight.pressure * 0.5) * 0.25;
      cell.yv += (cell.upLeft.pressure * 0.5 + cell.up.pressure + cell.upRight.pressure * 0.5 - cell.downLeft.pressure * 0.5 - cell.down.pressure - cell.downRight.pressure * 0.5) * 0.25;
      cell.xv *= 0.99;
      cell.yv *= 0.99;
    };

    const updateParticles = () => {
      ctx.strokeStyle = color;
      for (let p of particles) {
        const col = Math.floor(p.x / resolution);
        const row = Math.floor(p.y / resolution);
        const cell = vecCells[col] && vecCells[col][row];
        if (cell) {
          p.xv += cell.xv * 0.05;
          p.yv += cell.yv * 0.05;
          p.x += p.xv;
          p.y += p.yv;

          ctx.beginPath();
          ctx.moveTo(p.px, p.py);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();

          p.px = p.x;
          p.py = p.y;
          p.xv *= 0.5;
          p.yv *= 0.5;
        } else {
          p.x = p.px = Math.random() * width;
          p.y = p.py = Math.random() * height;
        }
      }
    };

    const draw = () => {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      // draw faint static dots (always visible)
      ctx.fillStyle = "rgba(0, 255, 255, 0.05)";
      for (let i = 0; i < 2000; i++) {
        const x = (i * 37) % width;
        const y = (i * 71) % height;
        ctx.fillRect(x, y, 1, 1);
      }

      if (mouse.moving) {
        const vx = mouse.x - mouse.px;
        const vy = mouse.y - mouse.py;
        for (let col of vecCells) for (let cell of col) changeVelocity(cell, mouse.x, mouse.y, vx, vy);
        mouse.moving = false;
      }

      for (let col of vecCells) for (let cell of col) updatePressure(cell);
      updateParticles();
      for (let col of vecCells) for (let cell of col) updateVelocity(cell);

      mouse.px = mouse.x;
      mouse.py = mouse.y;
      requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.moving = true;
    };

    window.addEventListener("mousemove", handleMouseMove);
    draw();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [color, background]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background }}
    />
  );
};

export default FluidBackground;
