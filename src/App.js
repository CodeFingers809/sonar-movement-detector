import { useEffect, useRef } from "react";

function App() {
  const canvasRef = useRef(null);
  const balls = [];
  const ballRadius = 10;
  const numBalls = 20;
  const numObj = 5;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // Set the canvas width and height to match the parent wrapper
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    // Create the balls with random positions
    for (let i = 0; i < numBalls; i++) {
      balls.push({
        x: Math.random() * (canvas.width - 2 * ballRadius) + ballRadius,
        y: Math.random() * (canvas.height - 2 * ballRadius) + ballRadius,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
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

    // Animate the balls
    function animate() {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Loop through the balls
      for (let i = 0; i < numBalls; i++) {
        if (balls[i].type === "object") {
          // Draw the ball
          ctx.beginPath();
          ctx.arc(balls[i].x, balls[i].y, ballRadius, 0, Math.PI * 2);
          ctx.fillStyle = "gray";
          ctx.fill();
          ctx.closePath();
          continue;
        }
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

      // Request the next frame of animation
      requestAnimationFrame(animate);
    }

    // Start the animation
    animate();
  }, []);
  return (
    <div className="App flex justify-center items-center flex-col h-screen w-screen p-4">
      <div className="controlBox">{/* Density: {density} */}</div>
      <div className="canvasWrap w-full flex-1">
        <canvas
          className="walkBox border-2 border-black rounded-xl"
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

