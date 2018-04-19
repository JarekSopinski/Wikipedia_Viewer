## Wikipedia Viewer

Search Wikipedia's pages using data fetched from Wikipedia API. 

---

### About

This project was created during FreeCodeCamp front-end course. It's a [task from Intermediate Front End Development Projects section](https://www.freecodecamp.org/challenges/build-a-wikipedia-viewer).

Data are displayed in a responsive grid built with pure CSS - no Bootstrap or any other framework. User can load info about a certain amount of pages (title, description, thumbnail, article's extract) with an ability to get additional results later on, visit any of these pages or visit a random Wikipedia page.

Tools: jQuery, AJAX, CSS Reset (meyerweb.com).

---

### Issues

* There are too many missing thumbnails paths. Might switch to displaying "normal" images.
* Wikipedia API limits amount of extracts to 20, so if user will load more pages, there will be some missing extracts. This is quite a concern in a case users loads a huge amount of pages (40+). At this moment I see no easy way of resolving this issue - other then totally removing extracts (even worse) or limiting number of pages to 20 (also quite bad).

---

#### License

&copy; 2018 Jarosław Sopiński

This repository is licensed under the MIT license.
