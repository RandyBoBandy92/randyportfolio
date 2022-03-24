# Project Overview
Ubuntu inspired. Come for the monke, but stay for the active window management algorithm. Built in React, with React-Router, Markdown-To-JSX, and React-Syntax-Highlighter.
## Requirements
I already had begun cataloging my projects over on my [blog](https://blog.randygulak.com), which uses markdown files to create posts. I originally built that blog off a gatsby template, so while I had no idea how the markdown conversion was happening under the hood - I knew I wanted to replicate it here. That way, my blog posts would be reusable components on both my blog and portfolio.

Basic requirements were:
- Responsive & Mobile first
- Markdown based "posts"
- Simulate the feel of a linux GUI environment
- Minimum Pages
    - About
    - Contact
    - Projects
        - 4 school projects, 1 personal project
- Ability to embed code snippets with syntax highlighting

## Design

I went through several stages of wireframes & prototypes. 

### Wireframe

<video title="low fidelity wireframe" style="width: auto; height:auto;" autoplay loop muted>
<source src="wireframePortfolio.mp4" type="video/mp4">
</video>

### High Fidelity Prototype
<video title="high fidelity prototype" style="width: auto; height:auto;" autoplay loop muted>
<source src="prototypePortfolio.mp4" type="video/mp4">
</video>

### Content Plan & Site Map

A content plan was created breaking down the pages & components into their base elements.

Example: 
Projects Page
    - Top Bar
    - Projects will contain the following subpages:
        - Capstone Project
        - bdmi - React Movie Database
        - Ray Bike Supreme
        - I-Ching Divination React App
        - Portfolio
    - There will be an internal menu which handles navigation between projects
    - Each project subpage will follow the same schema:
        - Animated Image of the application (if there is movement to showcase)
        - Title
        - Link to view the live project
        - Github Repository Link
        - Requirements
        - Design Considerations
        - Code Overview
        - Summary

Site Map:
![Portfolio Sitemap](PortfolioSiteMap.svg)

## Development

Early in development I receieved some useful feedback from my instructor at BCIT that my idea of having multiple navigation menus, as well as trying to maintain the same UI at the mobile level as I intended at desktop breakpoints was not in line with UX best practices. 

So I went back to the drawing board, and decided I would make the mobile design look like an android smart phone, then switch to the linux aesthetic at larger breakpoints. 

The biggest challenge I encountered at the outset was coming up with a way to support the dual functionality my site required:

1. On mobile, each "app" needs to be openable one at a time.
2. On desktop, it needs to be able to open multiple apps simultaneously, with movable and independently closable windows.

I had to find a way to support both use cases without writing the site twice. My original plan used react router and url paths, but I quickly realized that would not support launching multiple apps at once. 

I found I could use the `useSearchParams` hook to create an array of open "apps" which solved my routing problem.

<video title="Experimenting with useSearchParams" style="width: auto; height:auto;" autoplay loop muted>
<source src="searchParamsExperiment.mp4" type="video/mp4">
</video>

With R&D out of the way, I got to work.

### App Control

All the data for the site lives in appsData.js, this seemed the most efficient approach given the overall small scope of the project. 

Each navigation point within the site has the following schema (with some exceptions):

```jsx
{
    id: "fetch",
    external: false, // whether it navigates to another site, or within the site
    title: "Fetch",
    icon: fetchIcon,
    liveLink: "https://fetch.bcitwebdeveloper.ca/", // if it is a project, it links to the live site
    gitHubLink: "",
    component: <Post appId="fetch" postName={"fetch"} />,
}
```

These objects get used to both render icons and links on the site, but also is how I associate the url search params to the corresponding component.

I use two pieces of state:
1. searchParams (to track the URLs) 
2. activeApps (array of components)

I wrote a launchApp method, which takes in the appData object and adds the id to the array of searchParams. 

```jsx
  const launchApp = (appData) => {
    // if the app is already active, focus it
    if (activeApps.find((app) => app.props.appData.id === appData.id)) {
      focusApp(appData.id);
    }

    // Update the URL to reflect the appId
    const filteredSearchParams = searchParams
      .getAll("app")
      .filter((app) => app !== appData.id);
    // By filtering out the appId, we can ensure that the app is not launched twice
    const newSearchParams = [...filteredSearchParams, appData.id];
    setSearchParams({ app: newSearchParams });
  };
```
Next I wrote a useEffect that runs every time searchParams is updated, which iterates over the array and if it finds a matching app component, adds it to activeApps array.

```jsx
  useEffect(() => {
    // ... abbreviated ...
    const allApps = [...projects, ...navigation, ...vsCodeBrowser];
    // now I do a for loop over the searchParams to see which apps are active
    const appsToShow = [];
    for (let index = 0; index < searchParams.getAll("app").length;
    index++) {
      const appId = searchParams.getAll("app")[index];
      const matchingApp = allApps.find((appData) => appData.id === appId);
      if (matchingApp) {
        appsToShow.push(
          <AppWindow
            launchApp={launchApp}
            closeApp={closeApp}
            focusApp={focusApp}
            appData={matchingApp}
            key={appId}
          >
            {matchingApp.component}
          </AppWindow>
        );
      }
    }
    setActiveApps(appsToShow);
  }, [searchParams]);
```

Each app renders as 1 main component, with 2 nested subcomponents:
- AppWindow - controls window movement
    - Post - renders markdown as html
    - AppMenu - contains additional project links

### AppWindow

In order to make this component functional for both mobile and desktop, I needed to write a useEffect that toggled whether or not the windows could be dragged depending on the size of the viewport. 


## Summary