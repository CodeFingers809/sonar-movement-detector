/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

// TODO: piyush wala part yaad karna hai
// sensors mein phd
// code complete karna hai

function App() {
  const canvasRef = useRef(null);
  const balls = [];
  const ballRadius = 10;
  const [numBalls, setNumBalls] = useState(20);
  const [numObj, setNumObj] = useState(5);
  const [lineDisplay, setLineDisplay] = useState(false);

  useEffect(() => {
    //canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    //add balls
    for (let i = 0; i < numBalls; i++) {
      balls.push({
        x: Math.random() * (canvas.width - 2 * ballRadius) + ballRadius,
        y: Math.random() * (canvas.height - 2 * ballRadius) + ballRadius,
        angle: Math.random() * 2 * Math.PI,
        prevVal: 0,
        type: "person",
      });
    }
    for (let i = 0; i < numObj; i++) {
      balls.push({
        x: Math.random() * (canvas.width - 2 * ballRadius) + ballRadius,
        y: Math.random() * (canvas.height - 2 * ballRadius) + ballRadius,
        type: "object",
      });
    }
    for (let i = 0; i < balls.length; i++) {
      if (balls[i].type === "person") {
        balls[i].dx = 2 * Math.cos(balls[i].angle);
        balls[i].dy = 2 * Math.sin(balls[i].angle);
      }
    }

    function animate() {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Loop through the balls
      for (let i = 0; i < balls.length; i++) {
        if (balls[i].type === "object") {
          // Draw the ball
          ctx.beginPath();
          ctx.arc(balls[i].x, balls[i].y, ballRadius, 0, Math.PI * 2);
          ctx.fillStyle = "gray";
          ctx.fill();
          ctx.closePath();
        } else {
          // Update the ball position
          balls[i].x += balls[i].dx;
          balls[i].y += balls[i].dy;

          // Bounce the ball off the edges of the canvas
          if (
            balls[i].x + ballRadius > canvas.width ||
            balls[i].x - ballRadius < 0
          ) {
            balls[i].dx = -balls[i].dx;
          }
          if (
            balls[i].y + ballRadius > canvas.height ||
            balls[i].y - ballRadius < 0
          ) {
            balls[i].dy = -balls[i].dy;
          }

          // Draw the ball
          ctx.beginPath();
          ctx.arc(balls[i].x, balls[i].y, ballRadius, 0, Math.PI * 2);
          ctx.fillStyle = "blue";
          ctx.fill();
          ctx.closePath();
        }
        if (lineDisplay) {
          // draw lines sensor1
          ctx.beginPath();
          ctx.moveTo(50, canvas.height - 50);
          ctx.lineTo(balls[i].x, balls[i].y);
          ctx.strokeStyle = balls[i].type === "person" ? "lime" : "gray";
          ctx.stroke();
          // draw lines sensor2
          ctx.beginPath();
          ctx.moveTo(canvas.width - 50, canvas.height - 50);
          ctx.lineTo(balls[i].x, balls[i].y);
          ctx.stroke();
          // draw lines height
          if (balls[i].type === "person") {
            ctx.beginPath();
            ctx.moveTo(balls[i].x, canvas.height - 50);
            ctx.lineTo(balls[i].x, balls[i].y);
            ctx.strokeStyle = "brown";
            ctx.stroke();
          }
        }
      }

      if (lineDisplay) {
        // draw line joining sensor
        ctx.beginPath();
        ctx.moveTo(50, canvas.height - 50);
        ctx.lineTo(canvas.width - 50, canvas.height - 50);
        ctx.stroke();
      }
      // Draw circle in bottom left corner
      ctx.beginPath();
      ctx.arc(50, canvas.height - 50, 25, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();

      // Draw circle in bottom right corner
      ctx.beginPath();
      ctx.arc(canvas.width - 50, canvas.height - 50, 25, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();

      // Request the next frame of animation
      requestAnimationFrame(animate);
    }
    // Start the animation
    animate();
  }, [lineDisplay, numBalls, numObj]);
  return (
    <div className="App flex justify-center items-center flex-col h-screen w-screen p-4">
      <div className="controlBox mb-4 flex flex-row items-center justify-center space-x-4">
        <p className="text-xl">
          Density:&nbsp;
          <button
            className="p-4 bg-blue-600 rounded-xl text-white hover:bg-blue-800"
            onClick={() => setNumBalls((c) => (c > 0 ? --c : c))}
          >
            -
          </button>
          {numBalls}
          <button
            className="p-4 bg-blue-600 rounded-xl text-white hover:bg-blue-800"
            onClick={() => setNumBalls(numBalls + 1)}
          >
            +
          </button>
        </p>
        {/* display lines */}
        <button
          className="p-4 bg-blue-600 rounded-xl text-white hover:bg-blue-800"
          onClick={() => setLineDisplay(!lineDisplay)}
        >
          Show Lines
        </button>
      </div>

      <div className="canvasWrap w-full flex-1">
        <canvas
          className="walkBox shadow-[0_0_0_2px_black] rounded-xl"
          ref={canvasRef}
        ></canvas>
      </div>
      {/* <div className="sensorBox w-full flex justify-between">
        <div className="h-14 w-14 bg-red-600 rounded-full" id="sensor1"></div>
        <div className="h-14 w-14 bg-red-600 rounded-full" id="sensor2"></div>
      </div> */}
    </div>
  );
}

export default App;
