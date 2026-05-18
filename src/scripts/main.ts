const btn = document.getElementById("btn") as HTMLButtonElement | null;

btn?.addEventListener("click", () => {
  alert("clicked");
});