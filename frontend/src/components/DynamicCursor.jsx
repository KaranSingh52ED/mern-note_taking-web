import React, { useEffect, useRef } from "react";

const DynamicCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Original code adapted for React
    let ctx,
      f,
      e = 0,
      pos = {},
      lines = [],
      E = {
        debug: true,
        friction: 0.5,
        trails: 20,
        size: 50,
        dampening: 0.25,
        tension: 0.98,
      };

    function n(e) {
      this.init(e || {});
    }

    n.prototype = {
      init: function (e) {
        this.phase = e.phase || 0;
        this.offset = e.offset || 0;
        this.frequency = e.frequency || 0.001;
        this.amplitude = e.amplitude || 1;
      },
      update: function () {
        return (
          (this.phase += this.frequency),
          (e = this.offset + Math.sin(this.phase) * this.amplitude)
        );
      },
      value: function () {
        return e;
      },
    };

    function Line(e) {
      this.init(e || {});
    }

    Line.prototype = {
      init: function (e) {
        this.spring = e.spring + 0.1 * Math.random() - 0.02;
        this.friction = E.friction + 0.01 * Math.random() - 0.002;
        this.nodes = [];
        for (let t, n = 0; n < E.size; n++) {
          t = new Node();
          t.x = pos.x;
          t.y = pos.y;
          this.nodes.push(t);
        }
      },
      update: function () {
        let e = this.spring,
          t = this.nodes[0];
        t.vx += (pos.x - t.x) * e;
        t.vy += (pos.y - t.y) * e;
        for (let n, i = 0, a = this.nodes.length; i < a; i++) {
          t = this.nodes[i];
          if (i > 0) {
            n = this.nodes[i - 1];
            t.vx += (n.x - t.x) * e;
            t.vy += (n.y - t.y) * e;
            t.vx += n.vx * E.dampening;
            t.vy += n.vy * E.dampening;
          }
          t.vx *= this.friction;
          t.vy *= this.friction;
          t.x += t.vx;
          t.y += t.vy;
          e *= E.tension;
        }
      },
      draw: function () {
        let e,
          t,
          n = this.nodes[0].x,
          i = this.nodes[0].y;

        ctx.beginPath();
        ctx.moveTo(n, i);

        for (let a = 1, o = this.nodes.length - 2; a < o; a++) {
          e = this.nodes[a];
          t = this.nodes[a + 1];
          n = 0.5 * (e.x + t.x);
          i = 0.5 * (e.y + t.y);
          ctx.quadraticCurveTo(e.x, e.y, n, i);
        }

        e = this.nodes[this.nodes.length - 2];
        t = this.nodes[this.nodes.length - 1];
        ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
        ctx.stroke();
        ctx.closePath();
      },
    };

    function Node() {
      this.x = 0;
      this.y = 0;
      this.vy = 0;
      this.vx = 0;
    }

    const resizeCanvas = () => {
      if (!ctx.canvas) return;

      ctx.canvas.width = window.innerWidth - 20;
      ctx.canvas.height = window.innerHeight;
    };

    const renderCanvas = () => {
      ctx.running = true;

      f.update();

      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = "hsla(" + Math.round(f.update()) + ",50%,20%,0.8)";
      ctx.lineWidth = 3;

      lines.forEach((line) => {
        line.update();
        line.draw();
      });

      if (ctx.running) window.requestAnimationFrame(renderCanvas);
    };

    const onMousemoveHandler = (event) => {
      pos.x =
        event.touches && event.touches[0]
          ? event.touches[0].pageX
          : event.clientX;

      pos.y =
        event.touches && event.touches[0]
          ? event.touches[0].pageY
          : event.clientY;

      renderCanvas();
    };

    // Initialize Canvas
    const initializeCanvasEffect = () => {
      const canvasElement = canvasRef.current;

      if (!canvasElement) return;

      ctx = canvasElement.getContext("2d");

      f = new n({
        phase: Math.random() * Math.PI * 2,
        amplitude: 85,
        frequency: 0.0015,
        offset: Math.random() * Math.PI * 2,
      });

      lines.length === 0 &&
        Array.from({ length: E.trails }).forEach(() =>
          lines.push(new Line({ spring: Math.random() })),
        );

      resizeCanvas();

      document.addEventListener("mousemove", onMousemoveHandler);
    };

    initializeCanvasEffect();

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("mousemove", onMousemoveHandler);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export default DynamicCursor;
