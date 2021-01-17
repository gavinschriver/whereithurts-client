# [WhereItHurts](https://whereithurts.herokuapp.com)

## All about it

WhereItHurts is designed to let anyone who suffers from chronic pains and injuries - specifically those brought on by sports or similar demanding physical activies -  keep a detailed record of "where it hurts", what treatments are working, and how much time they're spending on those treatments. 

## Features

* Log a "Healing" session with as many Treatments (added by you or other users) as you got done or plan to do. Keep track of the Hurts you're working on by tagging them in a Healing session, so you know exactly what ailments you're addresing. Record time either via a countdown timer (my preferred method - set it between 3 - 5 minutes for each Treatment), or manually enter/edit time if you need to record a session after the fact. Finally, add any Notes you want to remember about a Healing session. Everything about a Healing is totally optional and editable.

* Create a "Hurt" to keep track of your pains and add detailed Notes, a Pain Level, and a Bodypart. Then, track your progress by adding Updates for a particular Hurt and see if things have improved. Every Hurt has a History that you can easily reference to see what Healings and Updates have been associated with it over time.

* Add your own Treatments to the Treatment Library - add notes, helpful links and other data, and optionally set your Treatment to "public" so other users can find and try it. Browse treatments by bodypart, type of treatment (e.g. Mobility, Strength etc), popularity or general search term. Found something you think could work for you? Just tag it with one of your Hurts so you can easily look it up in a Healing session!

* Check out your Snapshot for a record of what you've been up to for the last week - see your total Healing Time, what Hurts you worked on with their current pain level, and the Treatments you got into.

* [Sign up here to try it out!](https://whereithurts.herokuapp.com)

## Technologies used

This application was built using the [React](https://github.com/) JavaScript library, and was bootstrapped with [create-react-app](https://github.com/facebook/create-react-app). Additional packages used for the production site are: 
* [react-router-dom](https://reactrouter.com/) - Used to implement client-side routing.
* [react-icons](https://react-icons.github.io/react-icons/) - Used to easily include icons for use throughout the site.

All styling was done with vanilla CSS.

The server uses Django REST Framework with a SQLite database. [Check out the server repo here](https://github.com/gavinschriver/whereithurts-server)

This project is also deeply indebted to the coding, approaches and other work of one [Jacob Ekert](https://github.com/skratz17) (including some of the verbiage of this very readme), a brilliant classmate of mine and wonderful soul who somehow tolerated my incesscant pestering for 6 months. Thanks for always being cool about me ripping you off-*AHEM*- applying your ideas.

# Planning Resources

Below are links to the ERD for this project, as well as the Figma mockups I made and used as a guideline for how the UI should be implemented.

* [ERD](https://dbdiagram.io/d/5fc4548c3a78976d7b7dd7b5)
* [Figma Wireframe](https://www.figma.com/file/IGYpsjtMStd3sSf5uK8NdD/ShowMeWhereItHurts?node-id=0%3A1)

# Author 
Gavin Schriver - [Github](https://github.com/gavinschriver), [LinkedIn](https://www.linkedin.com/in/gavinschriver/)
