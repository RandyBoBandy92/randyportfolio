
<video title="Code Pencil" style="width: 100%; height:auto;" autoplay loop muted>
<source src="codePencil.mp4" type="video/mp4">
</video>
# Project Overview

CodePencil was built from my experience with teaching at BCIT. I was always making workshop files building things from scratch, this allows me to quickly demonstrate and share code with my students.


## Features

- **JSON Export**: Converts spaghetti code into a single JSON file for easy restoration.
- **Save Your Work**: Downloads your masterpiece as HTML, CSS, and JS files. Also saves to local storage.
- **Upload Files**: For when copy-paste is just too much work.
- **Full-Screen Preview**: See your creation in all its glory, bugs and all.
- **Full-Screen Editor**: Like the small editor, but big.
- **Reset with Ease**: Destroy hours of work with just two clicks!
- **Share URL**: Show off your half-finished projects to the world with one simple link.
- **VIM Mode**: How to exit VIM: The ultimate developer escape room.
- **Templates**: Pre-made code snippets for when you're feeling particularly lazy.
- **Version Control**: Keep track of exactly when and where everything went wrong.

## Development

CodePencil was built in vanilla HTML, CSS, and JS. With the addition of CodeMirror for the code editor. Some key features I am most proud of are:

### Save/Download Functionality

In order to save the user's code and turn it into downloadable files. I create an escaped HTML template which links the CSS and JS files, then pull the editor content, and create blob urls for all 3 files. 

```js
document.getElementById("saveButton").addEventListener("click", function () {
  const escapedTemplate = `
            &lt;!DOCTYPE html&gt;
            &lt;html lang="en"&gt;
            &lt;head&gt;
              &lt;meta charset="UTF-8"&gt;
              &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
              &lt;title&gt;Your Page Title&lt;/title&gt;
              &lt;link rel="stylesheet" href="style.css"&gt;
            &lt;/head&gt;
            &lt;body&gt;
              ${htmlEditor.getValue()}
              &lt;script src="script.js"&gt;&lt;/script&gt;
            &lt;/body&gt;
            &lt;/html&gt;
          `;
  const htmlContent = escapedTemplate
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  saveFile("index.html", htmlContent, "text/html");
  saveFile("style.css", cssEditor.getValue(), "text/css");
  saveFile("script.js", jsEditor.getValue(), "application/javascript");
});

function saveFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
```

### Share URL

For the share url functionality, I am doing some hacky stuff but I think its cool. I use lz-string to compress the user's code, and store it in the url. I then pass this url into the tinyurl api to get a shortened url, and generate a toast notification with the link, and automatically copy it to the clipboard. My intention for this is to have an ability to rapidly share code snippets with my students in class. It is fast, they don't have to download anything, and can also immediately play with the code in the editors.

```js
function updateShareUrl() {
  const htmlContent = encodeContent(htmlEditor.getValue());
  const cssContent = encodeContent(cssEditor.getValue());
  const jsContent = encodeContent(jsEditor.getValue());

  const url = new URL(window.location.href);
  url.searchParams.set("html", htmlContent);
  url.searchParams.set("css", cssContent);
  url.searchParams.set("js", jsContent);

  const longUrl = url.toString();

  // Use TinyURL's API to shorten the URL
  fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`)
    .then((response) => {
      debugger;
      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }
      return response.text();
    })
    .then((shortUrl) => {
      const toast = document.createElement("div");
      toast.id = "toast";
      toast.textContent = `URL copied to clipboard! You can now share this link: ${shortUrl}`;
      toast.style.position = "fixed";
      toast.style.top = "10px";
      toast.style.left = "50%";
      toast.style.transform = "translateX(-50%)";
      toast.style.backgroundColor = "black";
      toast.style.color = "white";
      toast.style.padding = "10px";
      toast.style.borderRadius = "5px";
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.style.display = "none";
      }, 3000);

      navigator.clipboard.writeText(shortUrl);
    })
    .catch((error) => console.error("Error updating share URL:", error));
}
```

### Templates

My JSON import system allows me to take the small code snippets I've previously saved from my lectures, and turn them into templates. I finally have all my code in one place, and can easily share it with my students.

### VIM Mode

This is just a CodeMirror addon, but you can't have an editor without VIM...

## Summary

CodePencil will be a useful tool for me, and hopefully for my students too. I'm always making workshop files, and this will allow me to quickly share code with them. It also allows me to do everything in a single interface, so I don't have to switch between different apps while teaching.
