"use strict";

const printBtn = document.getElementById("print-button");

function addHeadersToPages() {
  // get the header and clone
  const headerClone = document.querySelector("header").cloneNode(true);
  headerClone.querySelector(".intro").remove();
  // get all the header slots
  const headerSlots = document.querySelectorAll(".header-slot");
  headerSlots.forEach((headerSlot) => {
    const innerHeaderClone = headerClone.cloneNode(true);
    headerSlot.appendChild(innerHeaderClone);
  });
}

function toggleButtons() {
  const allButtons = document.querySelectorAll(".button");
  allButtons.forEach((btn) => btn.classList.toggle("hide"));
}

window.addEventListener("beforeprint", (event) => {
  toggleButtons();
  addHeadersToPages();
});

// add an after print and delete redundant headers
window.addEventListener("afterprint", (event) => {
  const headers = document.querySelectorAll("header");
  headers.forEach((header, index) => {
    if (index !== 0) {
      header.remove();
    }
  });
  toggleButtons();
});

printBtn.addEventListener("click", (event) => {
  window.print();
});
