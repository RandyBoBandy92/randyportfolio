"use strict";

const printBtn = document.getElementById("print-button");

function calculatePageCount() {
  // Create an invisible print preview container
  const printContainer = document.createElement("div");
  printContainer.style.visibility = "hidden";
  printContainer.style.position = "absolute";
  printContainer.style.top = "0";
  printContainer.style.left = "0";
  printContainer.style.width = "100%";
  printContainer.style.height = "auto";

  // Clone content into the print container
  const contentClone = document.querySelector(".content").cloneNode(true);
  printContainer.appendChild(contentClone);
  document.body.appendChild(printContainer);

  // Calculate the total height of the content
  const totalHeight = printContainer.offsetHeight;

  // Define the height of a single page (e.g., 11 inches at 96 DPI)
  const pageHeight = 11 * 96;

  // Calculate the number of pages
  const pageCount = Math.ceil(totalHeight / pageHeight);

  // figure out what the offset height is where each page begins
  const pageBegins = [];

  for (let i = 0; i < pageCount; i++) {
    pageBegins.push(i * pageHeight);
  }

  // Remove the print container
  document.body.removeChild(printContainer);
  // find the closest element for each page begin
  const pageBeginElements = pageBegins.map((pageBegin) => {
    const closestElement = Array.from(document.querySelectorAll("*")).find(
      (element) => element.offsetTop >= pageBegin
    );
    // get the closest element before the current element
    let closestElementSiblingBefore = closestElement
      ? closestElement.previousElementSibling
      : null;
    return closestElementSiblingBefore;
  });

  return { pageCount, pageBeginElements };
}

function attachHeaders(pageBeginsElements) {
  pageBeginsElements.forEach((thing) => {
    if (!thing) return;
    // clone the header
    const header = document.querySelector("header").cloneNode(true);
    // attach the header above the element
    thing.parentNode.insertBefore(header, thing);
    // add a page break before the header
    header.style.pageBreakBefore = "always";
    // remove the intro section from the header
    header.querySelector(".intro").remove();
  });
}

function toggleButtons() {
  const allButtons = document.querySelectorAll(".button");
  allButtons.forEach((btn) => btn.classList.toggle("hide"));
}

window.addEventListener("beforeprint", (event) => {
  console.log(event);

  toggleButtons();

  const { pageCount, pageBeginElements } = calculatePageCount();
  attachHeaders(pageBeginElements);
  console.log("Total pages:", pageCount);
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
