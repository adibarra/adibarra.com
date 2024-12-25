---
title: Blog | Creating the TAMU Grade Distribution Website
display: Creating the TAMU Grade Distribution Website
date: 2022-10-20T06:00:00Z
lang: en
duration: 20min
subtitle: A look at the process of creating the TAMU Grade Distribution Website.
upcoming: false
---

[[toc]]

## The Idea

When I first got to college, it was pretty overwhelming to have almost complete control over what courses and professors I could take. I had no idea what professors were good or bad, and I had no idea which courses were easy or hard. I had to rely on word of mouth from friends and upperclassmen to get a sense of what I should do.

This is when I first stumbled upon sites like [anex.us](https://anex.us) and [jippylong12.xyz](http://jippylong12.xyz/tamuFGD/). Those sites were a godsend for me, and I used them to help me decide what courses to take and what professors to take them with. However, I found that both of them had terrible UX and were missing many quality-of-life features. At the same time, other more modern sites like ~~[tamugradedistributions](https://tamugradedistributions.herokuapp.com/)~~ (update: dead project) had better UX but tended to be slow and feel clunky.

<figure>
  <img src="/assets/posts/tamugd-writeup/anex.png" alt="Screenshot of anex.us" rounded-lg dark:invert />
  <figcaption class="caption">Screenshot of anex.us<span hidden dark:inline>&nbsp;(inverted)</span></figcaption>
</figure>

So my solution? Make my own site that would be as fast and responsive as anex but with a better UX and more features.

## Overview

Creating the website was a pretty long process. It was my first genuine attempt at creating a full-stack web application and, incidentally, my first foray into writing code in JS.

From the beginning, I decided to make the website without using any frameworks. I wanted to get a better understanding of how the web works, and I felt that using a framework would abstract that and make it harder to learn. In addition, since it was my first time writing code in JS, I wanted to ensure I understood the language before I started using frameworks.

## The Backend

### Sourcing the Data

Before anything else, I had to determine where I could find the course data. After some investigation, I discovered it was possible to find it on the TAMU Registrar's website. Unfortunately, they only hosted data for the past six years, and I wanted to provide more historical data. After asking around, I found out that a few people still maintained an archive of the PDFs from 2014, which was precisely what I needed.

However, the data was not in a format that was easy to work with. The Registrar's Office published the reports as PDFs. PDfs are notorious for being difficult to work with programmatically. So before I could use the data, I would have to convert the data from the PDFs into a format I could manipulate.

<figure>
  <img src="/assets/posts/tamugd-writeup/data-extraction.png" alt="Finding a way to parse PDFs" rounded-lg dark:invert />
  <figcaption class="caption">Finding a way to parse PDFs</figcaption>
</figure>

### Parsing the Data

I decided to use Python to extract the data from the PDFs. I have a good amount of experience with the language, and I knew there was a library available (<GithubLink repo="py-pdf/pypdf" />) for extracting data from PDFs. However, I quickly discovered that the resultant PDF data were difficult to parse. The PDFs were not in a consistent format across the years. Some of the data, specifically the names of professors, was even missing for specific courses. All this translated to an unbelievable amount of manual work or many headaches trying to parse the data while dealing with all sorts of edge cases.

After many headaches, I managed to write a parser (<GithubLink repo="adibarra/tamugd-parser" />) that could take the extracted data and convert it into a format that I could use. The parser was not perfect and sometimes missed data, but after multiple revisions, I did manage to fix all of the bugs I found.

### Storing the Data

After getting all the data in a usable format, I had to figure out how I would store it. I decided that a database would be the most efficient way to store the data. In the end, I decided to use a relational database because I knew I would want to store the data in a way that would make it easy to query. I chose to use MySQL because I had already played around with it previously. It was easy to set up, and it was easy to use.

There were quite a few data points that I could extract and parse. Here is the table schema I settled on using to store the data:

```sql
CREATE TABLE grades (
  year SMALLINT(4),
  semester VARCHAR(6),
  college VARCHAR(7),
  departmentName VARCHAR(5),
  course VARCHAR(4),
  section VARCHAR(3),
  honors TINYINT(1),
  avgGPA FLOAT(4,3),
  professorName VARCHAR(30),
  numA SMALLINT(3),
  numB SMALLINT(3),
  numC SMALLINT(3),
  numD SMALLINT(3),
  numF SMALLINT(3),
  numI SMALLINT(3),
  numS SMALLINT(3),
  numU SMALLINT(3),
  numQ SMALLINT(3),
  numX SMALLINT(3)
);
```

<div class="caption">
  The grades table from the database
</div>

I also decided to have the parser dump data directly into the database. This meant that there was no need to store intermediate files, although it did mean that updating the data would require me to re-parse all of the PDFs.

### Creating the API

After getting the data into a usable format and storing it in a database, I had to figure out how to serve it to the frontend. I decided to use Express.js to serve the site, so I decided to have it also serve the API. One of my primary goals for the site was to make it as fast as possible, so I wanted to ensure that I wasn't serving unnecessary data to the frontend. I decided to have the frontend only request the data it needed, and I would have the backend only send the requested data.

The solution I came up with was allowing the frontend to specify which department and course it wanted to get data for. Then the backend would query the database and return the requested data. The resulting API is simple to use. Here is an example of a request to the API:

```js
const query = `search?d=${department}&c=${course}`

fetch(query).then((response) => {
  response.json().then((responseJSON) => {
    // Do something with the data
    console.log(responseJSON)
  }).catch(() => reject('Server error'))
}).catch(err => reject(err))
```

<div class="caption">
  Sample API query
</div>

The response is sent in JSON and looks something like this:

```json
[
  {
    "year": 2014,
    "semester": "FALL",
    "professorName": "RIGHETTI R",
    "section": "200",
    "honors": 1,
    "avgGPA": 3.5,
    "numA": 5,
    "numB": 5,
    "numC": 0,
    "numD": 0,
    "numF": 0,
    "numI": 0,
    "numS": 0,
    "numU": 0,
    "numQ": 0,
    "numX": 0
  },
  ...
]
```

<div class="caption">
  Sample response from the API
</div>

The response contains all of the data in a JSON array. Each element of the array represents a single section of the course. The data is grouped by course section because I wanted to make it easy to see how each section of a course compared to the rest. Each section contains the average GPA, the number of A's, B's, C's, D's, F's, I's, S's, U's, Q's, and X's for that section. This allows the client or frontend to utilize the raw data in any way it wants.

Once I had the backend set up, I had to figure out how to access the data. In other words, it was time to build a website.

## The Frontend

As previously mentioned, I decided to build the frontend without using frameworks such as React or Vue. I would be using vanilla JS and CSS to make the frontend.

### The Design Phase

The first thing I had to do was figure out what features I wanted to have on the website. This would help me figure out what the site should look like and how it would be designed.

Fortunately, I had a pretty good idea of what features I wanted since the beginning:

> 1.  A way to search for a course.
> 2.  A graph to show avg GPA for a course over time.
> 3.  A way to filter courses by honors status.
> 4.  A min, max, and avg GPA for a course.
> 5.  A breakdown of the grade letters earned for a course.
> 6.  A relative difficulty score for a course.
> 7.  A sortable/filterable table with the raw data for a course.
> 8.  Toggleable dark mode theme.

With this, I was able to start designing the site. I decided to segment the site into six main sections. Each of these would have a different purpose and would contain distinct features. Here is a rough outline of the sections:

> 1.  The header.
> 2.  The search bar pane.
> 3.  The main graph pane.
> 4.  The settings pane.
> 5.  The secondary graphs pane.
> 6.  The footer.

Compartmentalizing the site into these sections made it easier to design and implement.

<figure>
  <img src="/assets/posts/tamugd-writeup/layout.png" alt="Early sketch of layout" rounded-lg dark:invert />
  <figcaption class="caption">Early sketch of layout</figcaption>
</figure>

### The UI Creation Phase

#### The Header and Footer

After I had a rough idea of what the site should look like, I started implementing it. I started with the header and the footer.

The header was pretty simple. It just contained the title of the site, the logo, and a dark mode toggle button.

<figure>
  <img src="/assets/posts/tamugd-writeup/header.png" alt="The site header" rounded-lg />
  <figcaption class="caption">The site header</figcaption>
</figure>

The footer was a bit more complicated. Although it contained only a few elements, I had to figure out how to get it to stick to the bottom of the page. I ended up putting the entire site in a flexbox and setting the portion of the site which housed the main content to `flex-grow: 1`. Doing this allowed the footer to always be at the bottom of the page. Additionally, if the content was shorter than the viewport, it would be attached to the bottom of the viewport.

<figure>
  <img src="/assets/posts/tamugd-writeup/footer.png" alt="The site footer" rounded-lg />
  <figcaption class="caption">The site footer</figcaption>
</figure>

#### The Search Pane

Once I implemented the header and footer, I moved on to the search bar pane. This was the first pane that I implemented. The search bar pane contained inputs for the course's department and course number. It also had a search button that fired off an API request when pressed.

<figure>
  <img src="/assets/posts/tamugd-writeup/search-pane.png" alt="The search pane" rounded-lg />
  <figcaption class="caption">The search pane</figcaption>
</figure>

I made sure to make the search bar pane as simple as possible. I also wanted users to be able to autocomplete the department. So I used a library called <GithubLink repo="jjj/chosen" /> to make the department input a searchable dropdown. I also ensured that the buttons were tabbable and that the search was executed when the user pressed enter in the course number input.

#### The Main Chart Pane

The main chart pane was the most complicated pane to implement. It would contain a graph showing the average GPA for a course over time, and doing so would require a lot of number crunching on the data returned from the API. I decided to use <GithubLink repo="chartjs/Chart.js" /> to implement the graph. I had some difficulty getting the graph to look how I wanted it to, but after a few hours of tinkering, I got it to look how I wanted and made it responsive.

<figure>
  <img src="/assets/posts/tamugd-writeup/main-chart-pane.png" alt="The main chart pane with placeholder data" rounded-lg />
  <figcaption class="caption">The main chart pane with placeholder data</figcaption>
</figure>

However, I still had not implemented the logic to crunch the numbers needed for the graph, so I decided to leave that for later.

#### The Settings Pane

The settings pane was the next pane I implemented. It would contain the most moving parts of the site. It would have a way of filtering professors, semesters, honors status, a toggle for the raw data table, and finally, a year range selection slider.

I again used <GithubLink repo="jjj/chosen" /> to make the professor and semester inputs searchable dropdowns. I made them multi-selects so users could filter by multiple professors or semesters. The honors status filter was also implemented using chosen.

The last part of the settings pane was the year range selector. I wanted to be able to select a min and max year from the possible values. However, as far as I could tell, there was no built-in way to add a range slider in HTML. So, I found a library called <GithubLink repo="nitinhayaran/jRange" />, which allowed me to add a range slider to the site. I also made sure to make the slider responsive to look good on mobile devices.

<figure>
  <img src="/assets/posts/tamugd-writeup/settings-pane.png" alt="The settings pane" rounded-lg />
  <figcaption class="caption">The settings pane</figcaption>
</figure>

#### The Secondary Charts Pane

The second to last pane I implemented was the secondary charts pane. This pane would include three smaller charts showing different statistics for the course. The first secondary chart showed the course's min, max, and average GPA. The second showed the breakdown of the grade letters earned for the course, and the third, the relative difficulty score.

Once again, the plots for each of these charts were made using <GithubLink repo="chartjs/Chart.js" />. This pane also resizes itself to stack the charts vertically if the viewport is small. The secondary charts also depended on data from the API, so I had to wait until the number-crunching logic was implemented to fill the charts with the correct numbers.

<figure>
  <img src="/assets/posts/tamugd-writeup/secondary-charts-pane.png" alt="The secondary charts pane" rounded-lg />
  <figcaption class="caption">The secondary charts pane</figcaption>
</figure>

#### The Raw Data Table Pane

The final pane I implemented was the raw data table. This pane would contain a table with the raw data for the course, which would be sortable and filterable. I used <GithubLink repo="grid-js/gridjs" /> to implement the table. This table would draw data directly from what was returned via the API. I also made sure to make the table responsive to look good on mobile devices. The table was also hidden by default since it was so large and would only be shown if the user clicked the "Display Raw Data" button in the settings pane.

<figure>
  <img src="/assets/posts/tamugd-writeup/raw-data-table-pane.png" alt="The raw data table pane" rounded-lg />
  <figcaption class="caption">The raw data table pane</figcaption>
</figure>

### The Logic Phase

Finally, we are approaching the end of the project. As I mentioned earlier, the main and secondary graphs depend on data returned from the API. However, before that data is displayed, it needs to be analyzed and processed. Implementing this logic was the last remaining piece of the site before it was finished.

To generate the data required for the charts, I implemented multiple functions that would return the required pieces of data. These functions took in data from the API and calculated then returned other stats depending on the function called.

```js
// A few of the functions I implemented
getGPAChartDataset(callback)
getGPARangeChartDataset(callback)
getLetterChartDataset(callback)
getCourseDifficultyChartDataset(callback)
getCourseDataGridDataset()
```

For the main and secondary charts to function correctly, I first had to sort the data in ascending order of time so that the time axis of the graph would work properly. Once I had the data sorted, I calculated the average GPA for each given semester for each professor who taught the course. To account for the number of sections a professor taught, I used a weighted average formula to calculate the GPAs.

I also ensured that the main and secondary charts (and the raw data table) considered whatever filters the user had applied in the settings pane.

This phase of the project was easily the most time-consuming. I had to ensure that the data was being processed correctly and that the charts displayed the correct data. There was also a lot of trial and error involved in getting the charts to look how I wanted them to, even with different amounts of data.

## The Final Product

After implementing the logic, I could finally put the site together and see the final product. I was pleased with the way the site turned out. Due to adjusting the site layout based on screen size, the site also looked good on mobile devices. Here's a screenshot of the completed site.

<figure>
  <img src="/assets/posts/tamugd-writeup/final-product.png" alt="The final product" rounded-lg />
  <figcaption class="caption">The final product</figcaption>
</figure>

## Conclusion

This project was a lot of fun to work on. I learned a lot about web development and what goes on under the hood of a website. Overall, I am thrilled with how the site turned out and hope that it will be helpful to students at TAMU. The entire project took me a few weeks to complete from start to finish.

However, as with all projects, it is not entirely finished. There is certainly plenty of new features and improvements that I want to add to the site. I will be working on these in the future and will be sure to create a new post when I do.

If you want to check out the site, you can find it ~~[here](https://gd.adibarra.com)~~ (replaced by new version). If you have any feedback or suggestions for the site, feel free to reach out to me on the project's repo (<GithubLink repo="adibarra/tamugd-website" />) or by email at <EmailLink to="adibarra00@gmail.com" />.
