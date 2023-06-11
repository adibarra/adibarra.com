---
title: Projects | Alec Ibarra
display: Projects
subtitle: A list of open source projects I'm proud of
description: A list of open source projects I'm proud of
plum: true
projects:
  Best Projects:
    - name: 'tamugd-website'
      link: 'https://github.com/adibarra/tamugd-website'
      desc: 'Compare and analyze grade distributions for courses taught at TAMU.'
      icon: 'i-carbon-chart-line-data'
    - name: 'tamugd-parser'
      link: 'https://github.com/adibarra/tamugd-parser'
      desc: 'Download, parse, and process grade distribution data from TAMU.'
      icon: 'i-carbon-data-base'
    - name: 'XO-MarketBot'
      link: 'https://github.com/adibarra/XO-MarketBot'
      desc: 'Automatically purchase, craft, and sell items at an optimal price in a game called Crossout.'
      icon: 'i-carbon-chart-candlestick'
    - name: 'Generic-DiscordBot'
      link: 'https://github.com/adibarra/Generic-DiscordBot'
      desc: '''Quick Start Bot'' to cut down on the time it take to write complex discord bots.'
      icon: 'i-fluent-bot-24-regular'

  Engines / Framework:
    - name: 'Game Engine V2'
      link: 'https://github.com/adibarra/GameEngineV2'
      desc: 'The second iteration of the game engine that powers most of my games.'
      icon: 'i-carbon-code'

  Games:
    - name: 'UNOnline'
      link: 'https://github.com/adibarra/UNOnline'
      desc: 'Play UNO with online multiplayer. Expands on my previous UNO game.'
      icon: 'i-mdi-cards-outline'
    - name: 'Ultimate Tic-Tac-Toe'
      link: 'https://github.com/adibarra/UltimateTicTacToe'
      desc: 'The most complicated game of Tic-Tac-Toe you''ve ever seen.'
      icon: 'i-carbon-apps'
    - name: 'TowerDefense (Remastered)'
      link: 'https://github.com/adibarra/TowerDefenseRemastered'
      desc: 'Defend your base against ever-increasing waves of enemies.'
      icon: 'i-carbon-bastion-host'
    - name: 'RPG'
      link: 'https://github.com/adibarra/RPG'
      desc: 'Playable proof of concept for making a game with my custom engine.'
      icon: 'i-akar-icons-double-sword'
    - name: 'Tank Battle'
      link: 'https://github.com/adibarra/TankBattle'
      desc: 'Control a tank and try to survive against AI controlled tanks.'
      icon: 'i-carbon-tank'
    - name: 'UNO'
      link: 'https://github.com/adibarra/UNO'
      desc: 'Play a fully functional game of UNO. Written in 24 hours.'
      icon: 'i-mdi-cards-outline'
    - name: 'Rainbow Snake Game'
      link: 'https://github.com/adibarra/RainbowSnakeGame'
      desc: 'A visually annoying version of the classic game ''Snake''.'
      icon: 'i-bi-dpad'
    - name: '[Unfinished] Prop Hunt'
      link: 'https://github.com/adibarra/PropHunt'
      desc: 'Hide as a prop and try to evade the hunters.'
      icon: 'i-tabler-mug'

  Other:
    - name: 'Check out my GitHub'
      link: 'https://github.com/adibarra'
      desc: 'for many other projects that didn''t quite make the cut.'
      icon: 'i-carbon-logo-github'
---

<ListProjects :projects="frontmatter.projects" />
