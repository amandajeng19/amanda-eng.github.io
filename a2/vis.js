let stars = document.getElementsByClassName("star");
console.log(stars);

for (const star of stars) {
  console.log(star);
  star.addEventListener("click", () => {
    console.log("clicked", star.id);
    star.style.fill = "MidnightBlue";
  });
}
