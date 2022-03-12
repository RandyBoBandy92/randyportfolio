I have been fascinated by divinatory systems for many years now. The system I am best acquainted with is the I-Ching (pronounced Yi-Jing); the book of changes.

While I was learning React, I thought I would try to create a SPA (single page application) based on that divination system. I've built an application similar to this in Python before, so I already had a vague idea of how I wanted to approach things.

The repo is available here: [GitHub - RandyBoBandy92/ReactIChing](https://github.com/RandyBoBandy92/ReactIChing)

If you want to try the application yourself, it is hosted here: [React I-Ching](https://randybobandy92.github.io/ReactIChing/)

Before I get into the review, here is a visual demo of what the application does

![](https://i.imgur.com/tbw31zx.gif)

I've never really done a post-mortem on one of my earlier projects before, and given that reading code is much harder than writing code, I thought this would be a useful exercise.

# File Structure overview

So, here's the file tree at root

```
├── public
│   └── images
└── src
└── DekorneText
└── hexagramJSONS
```

the images folder contains the images for each of the lines.

```
├── images
│   ├── nothing.png
│   ├── old_yang.png
│   ├── old_yin.png
│   ├── young_yang.png
│   └── young_yin.png
```

now for the src folder

```
.
├── App.js
├── DekorneText
│   ├── dekornetext.p
│   ├── hexagramJSONS
│   ├── hexagrams.p
│   ├── IChing.py
│   └── trigrams.p
├── iChingData.js
└── index.js
```

Interesting stuff is in the `/src/` folder, so let's go there next.

# Dekorne Text

The app contains text sourced from several translations of the I-Ching, compiled by [James Dekorne](http://www.jamesdekorne.com/GBCh/GBCh.htm)

I wrote a simple script in python to parse all 64 pages of his site, and extract the text.

What I ended up with is 64 JSON files containing the text

example:

```json
{

"title": "The Dynamic",

"other\_titles": "The Creative, The Symbol of Heaven, The Creative Principle, Force, The Key, Creativity, The Originating, Creative Power, Primal Power, Yang, The Life Force, Kundalini, God the Father",

"Judgment": {

"Legge": "The Dynamic represents what is great and originating, penetrating, advantageous, correct and firm.",

"Wilhelm/Baynes": "The Creative works sublime success, furthering through perseverance.",

"Blofeld": "The Creative Principle . Sublime Success! Persistence in a righteous course brings reward.",

"Liu": "The Creative brings great success, benefiting all through perseverance.",

"Ritsema/Karcher": "Force: Spring Growing Harvesting Trial. \[This hexagram describes your situation in terms of the primal spirit power that both creates and destroys. It emphasizes that dynamic, unwearied persisting, the action of Force, is the adequate way to handle it. To be in accord with the time, you are told to: persist!\]",

"Shaughnessy": "The Key: Primary reception; beneficial to determine.",

"Cleary (1)": "Heavencreates, develops, brings about fruition and consummation.",

"Cleary (2)": "The creative is successful; this is beneficial if correct.",

"Wu": "The Originator is primordial, pervasive, prosperous and persevering."

},
```

# The App itself

### IChingData.js

Can't say I used a lot of best practice when I built this thing. Nothing is compartmentalized, and I created a massive javascript object in `iChingData.js` which I import into `App.js` to track state.

File structure looks something like this.

![](https://i.imgur.com/iJGVcKv.png)

For a deep dive into the data structure here, as well as some (very) basic information on how the I-Ching works, I outline this in further detail in the [garden](https://publish.obsidian.md/randybobandy/iChingData.js)

### App.js

This file breaks out into 3 classes. Why classes and not functional components? This was early in my learning process, and I had not learned it yet. ¯\\\_(ツ)\_/¯

#### Line Component

Each line consists of a Yin or Yang symbol. Solid lines are yang, split lines are yin.

an "X" in the middle means a changing yin

an "O" in the middle means a changing yang

Because the I-Ching can yield a "transformed" result depending on the outcome, and because I didn't plan very well, each line ended up being two images. If there are no values that create a "transformed" result, then the second image stays hidden.

![](https://i.imgur.com/iK7b1Pv.gif)

On-click, a random number is generated which determines which image to display.

basically it does this
![](https://i.imgur.com/KE0fMVa.gif)

This is the render function for that component, you can read thru the comments to get an idea of what's going on.

```jsx

 render() {
    function getUpdatedDisplayProperty(hexagram) {
      // Function looks at the current hexagram number contained in State,
      // and compares it to the Transformed Hexagram.
      // If the numbers are the same, it will only show 1 line.
      // if they are not the same, the display css of the "transformed" line changes from "none" to "block" and is displayed.
      if (hexagram.number && hexagram.transformNumber) {
        // if they both are true, they equal something
        // console.log("both hexagrams are something")
        if (hexagram.number !== hexagram.transformNumber) {
          // but they arent the same number
          return "block";
        } else {
          return "none";
        }
      } else {
        return "none";
      }
    }
    let transformDisplayProperty = getUpdatedDisplayProperty(
      this.props.hexagram
    );
    this.primaryStyles = {
      // width: "200px",
      border: "2px solid black",
      margin: "2px 5px",
    };
    this.transformedStyles = {
      ...this.primaryStyles,
      display: transformDisplayProperty,
    };
    return (
      <div className={`line line-${this.props.line.lineNum}`}>
        <img
          className="primary-hexagram"
          ref={this.autoClick} // no idea what this is for anymore... Lol
          src={this.props.line.image} // state also tells the image what source to use
          style={this.primaryStyles}
          // this style value does not change, but I wanted it to be consistent..
          // Probably could have simplified things.
          onClick={() => this.props.handleLineClick(this.props.line.lineNum)}
          // function is passed down from App to Line
        />
        <img
          className="transformed-hexagram"
          src={this.props.line.transformImage} // same idea as the primary
          style={this.transformedStyles}
          // this value will change depending on state
        />
      </div>
    );
  }

```

#### App Component

The App component itself has a ton of functions buried in it which make me cringe so hard that I am not going to review them in detail here.

But in short, the app does the following:

- Each line contains state data about it's current value
- the App watches for state changes and once all 6 lines have a value, it resolves
  the corresponding hexagram number (of which there are 64 possibilities) and grabs the appropriate text to match (via IChingText)

I'll include the render function here, if you want more information I have a more detailed breakdown [here](https://publish.obsidian.md/randybobandy/App+Component)

```jsx
  render() {
    const lineComponents = this.state.lines.map((line) => (
	// so we map over the line data from state and convert it
	// into Line components
	// yes.. i did forget ID. shaaaame.
      <Line
        line={line}
        handleLineClick={this.handleLineClick}
        image={line.image}
        hexagram={this.state.hexagram}
      />
    ));
    return (
      <div style={this.styles} className="app">
        <div className="lines">{lineComponents}</div>
        <h5
          style={
            this.state.hexagram.number
              ? { display: "none" }
              : { display: "block" }
          }
        >
          Click on the lines to randomly generate yin/yang lines.
        </h5>
        <IChingText
          resetLines={this.resetLines}
          className="divination-text"
          divinationData={this.state}
          styles={this.state.textStyles}
          updateTextDisplayState={this.updateTextDisplayState}
        />
      </div>
    );
  }
}
```

#### IChingText Component

This element is responsible for displaying navigation buttons, and displaying the relevant text based on the users divination result.

Some inline css styles determine small changes like which buttons to render, and whether to show the text for the primary or transformed hexagram.

Contextual button rendering & Modifying title
![](https://i.imgur.com/hxnwV0c.gif)

The JSON data is extracted, and wrapped in appropriate HTML tags.

```jsx
return (
  <div>
    {renderHexTitle(hexType)}
    <h3>Other Titles: {hexText.other_titles}</h3>
    <h4>Judgment:</h4>
    {renderInnerText(hexText.Judgment)}
    <h4>Image:</h4>
    {renderInnerText(hexText.Image)}
    <h4>Commentary:</h4>
    {renderInnerText(hexText.Commentary)}
    <h4>Notes:</h4>
    <p>{hexText.Notes}</p>
    <h4>Changing Lines:</h4>
    <h5>Line 1:</h5>
    {renderInnerText(hexText.line_1)}
    <h5>Line 2:</h5>
    {renderInnerText(hexText.line_2)}
    <h5>Line 3:</h5>
    {renderInnerText(hexText.line_3)}
    <h5>Line 4:</h5>
    {renderInnerText(hexText.line_4)}
    <h5>Line 5:</h5>
    {renderInnerText(hexText.line_5)}
    <h5>Line 6:</h5>
    {renderInnerText(hexText.line_6)}
  </div>
);
```

renderInnerText simply loops over the array of strings, and wraps each one in `<p>` tags

So! What have we learned?

- I don't really know how to do a codebase review
- But at least I can still read what I wrote 6 months ago and I understand it, even if I am disgusted at my own logic skills.

Conclusion:
even if your code is **hot garbage** it can still do cool shit.

Being a little more serious, I think this was a really good challenge for me! Due to the various combinations of yin/yang and changing yin/yang lines, this app can display

# 4096

possible combinations! Coming up with functions to resolve those possibiltiies without writing endless
lines of code really forced me to think logically about the problem. I enjoyed the challenge. I may return to this project at some
later date. But if I do, I think I will rewrite it from scratch.

<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/2Ls4n_13QQI"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>

_when your code still gets the job done_
