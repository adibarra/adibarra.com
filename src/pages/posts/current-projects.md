---
title: Blog | My Current Projects
display: My Current Projects
date: 2022-12-05T06:00:00Z
lang: en
duration: 5min
subtitle: A quick look at my current projects.
upcoming: false
---

[[toc]]

## What's New?

After [building my first website](/posts/tamugd-writeup), I decided to try making something completely different. In the end, I came up with a few ideas that I thought would be interesting to work on... and ended up working on all of them.

## A Quick Overview

Here's a quick rundown of my current projects:

- [deck.io](#deck-io): Web-based card game engine.
- [team.io](#team-io): Web-based 'teamwork' game.
- [macro-machine](#macro-machine): A simple macro recorder desktop app.
- [vertiled](#vertiled-fork): This one is a fork of a preexisting project. I'll explain a bit more about it later.

### deck.io

Unfortunately, I don't have any screenshots of this project yet since I've been mostly working on how the client and server will interact. But here's a quick mockup of what I'm going for.

<figure>
  <img src="/assets/posts/current-projects/deckio-mockup.png" alt="Mockup of deck.io" class="rounded-lg dark:invert" />
  <figcaption class="caption">Mockup of deck.io</figcaption>
</figure>

The idea behind this project is to make a web-based card game engine. One of the first games I made was an Uno clone in Java. I made it in 24 hours while I was in high school. After that, I added online multiplayer and didn't touch it again for years. Recently, I went back to revisit all of my old projects, and I realized that I could make a much better version of it while making it more accessible if it were web-based.

Then scope creep hit. I realized it could be massively improved if I designed it to be a more generic card game engine so it could support other games. I decided to design it so that new game modes and cards can be added by just dropping in a few new files. However, making it a more generic card game engine also comes with its own set of challenges.

### team.io

No screenshots for this one, either. I've been primarily working on getting the engine to render the game world and handle player input.

This is a game I've wanted to make since I first saw a game called [Pico Park on steam](https://store.steampowered.com/app/1509960/PICO_PARK/). It's a game where you have to work with other players to complete a series of tasks. I've wanted to make a web-based version for a while now. Though I'm pretty sure that public servers for it would be a nightmare due to the amount of trolling, that would happen. I'm planning on making it so you can only play with friends using a lobby code.

As of right now, I'm also planning on making it so that you can design your own levels and share them with other players. I'm not sure how I will implement this yet, but I'm thinking of making it so you can create a level using a visual editor and then export it as a JSON file. Then, you can share the JSON file with other players, and they can load it into their game as the lobby host.

### macro-machine

Occasionally, I'll find myself in need of a macro recorder. I've tried a few different ones, but I've never found one that I really liked. So, I decided to make my own.

I'm planning on using Python to make it. I also plan on making it so that you can drop in your own modules to add new actions and triggers. For example, I've found myself in situations where I could have benefited from using OpenCV to detect a specific area of the screen. But I've never seen a macro recorder that supports it (not that I've specifically looked for one before). That is the kind of module I'd like to be able to drop in.

### vertiled (fork)

My friends and I have recently gotten into ROM-hacking some old pokemon games. ROM-hacking is basically modifying the code of older games to add new features, change existing ones, or completely recreate it into something new. In our case, we are trying to design a new map for the game and implement it. We are trying to collaborate on it, but we don't have a good way to do so.

Our first solution was to use [Excalidraw](https://excalidraw.com/). Excalidraw is a web-based drawing app that lets you draw diagrams and share them with others. The crucial part is that it enables you to collaborate in real-time. However, it is not designed for making maps. It is designed to make diagrams. It supports simple shapes like rectangles, ellipses, lines, and images. However, it doesn't support tiles, layers, or tilesets. So, I looked around for a while and found a project called <GithubLink repo="tehwalris/vertiled" />.

Vertiled is a web-based map editor designed for making tile-based maps. It is written in TypeScript and uses React for the UI. Unfortunately, it hasn't seen a commit for two years, but it is open source, so I decided to fork it. I've been trying to add some features that would be useful for our specific use case and working with the tilesets we are using. Overall it's a pretty cool project, and I'm excited to see where it goes.

## Signing Off

So, that's what I've been working on lately. I'm hoping to have some screenshots of my projects soon.

As always, if you have any feedback or suggestions, feel free to reach out to me by email at <EmailLink />.
