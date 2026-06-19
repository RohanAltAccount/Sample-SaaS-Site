const btn = document.getElementById("btn") as HTMLButtonElement | null;

btn?.addEventListener("click", () => {
  alert("clicked");
});

const follower = document.querySelector(".cursor-follower") as HTMLDivElement | null;

if (follower) {
  let x = -100;
  let y = -100;
  let frame = 0;

  const moveFollower = () => {
    frame = 0;
    follower.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  document.addEventListener(
    "pointermove",
    (event) => {
      x = event.clientX;
      y = event.clientY;

      if (frame === 0) {
        frame = requestAnimationFrame(moveFollower);
      }
    },
    { passive: true },
  );
}
