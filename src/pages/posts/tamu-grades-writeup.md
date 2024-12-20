---
title: Blog | Building the TAMU Grades Website
display: Building the TAMU Grades Website
date: 2024-12-20T05:00:00Z
lang: en
duration: 20min
subtitle: A writeup on how I built the TAMU Grades website.
upcoming: false
---

[[toc]]

## Wait, Again?

Yup, that's right, I re-wrote the original TAMU Grade Distribution website that I made in 2022 and posted about [here](/posts/tamugd-writeup). My goal with the original site was just to learn about web dev, and as a result, the code isn't great, and its UI/UX isn't much better.

<figure>
  <img src="/assets/posts/tamugd-writeup/final-product.png" alt="Screenshot of the original version" rounded-lg dark:border-1 border--c-tertiary />
  <figcaption class="caption">Screenshot of the original version</figcaption>
</figure>

However, ever since I built it, it's been getting a lot of traffic. So, I've decided to re-design it from the ground up with all the knowledge I've gained over the past year or two.

## Goals

The main goals for this re-write are:

> 1. **Improve UI/UX**: I want to make the new version much more visually appealing, ergonomic, and easier to use.
> 2. **Improve Performance**: I want to improve performance by using modern web technologies.
> 3. **Improve Code Quality**: I want to use a framework and build tools to make the codebase more maintainable.
> 4. **Add New Features**: I want to add new features like a natural language search bar.
> 5. **Make it Mobile Friendly**: I want the new version to work well on all devices.

## Tech Stack

The original version, which I'll call `TAMUGD` from now on, was written in plain JS, HTML, and CSS. There was no framework, no build tools, or anything else due to my lack of experience at the time. I didn't know how to set any of that up or that it existed, for that matter. The project was just a bunch of files I would edit, manually minify, and then upload to the server.

Because of this, the codebase was a mess and hard to maintain. So, I decided to use a proper tech stack for the new version.

### Frontend

One of the biggest changes I made was to use a framework for the frontend. I decided to go with <GithubLink repo="vuejs/vue" /> since I've been using it for a while now and really like it. I also decided to use <GithubLink repo="vitejs/vite" /> as the build tool since it's super fast and easy to use. I'm also using <GithubLink repo="unocss/unocss" /> for its fantastic superset of atomic CSS classes. I'm also using TypeScript throughout the entire project.

All-in-all, this makes the frontend much easier to work with and maintain since I can now use components and a proper set of build tools. It makes the codebase much cleaner and easier to understand. It also makes it easier to add new features in the future.

### Backend

This time around I decided to use <GithubLink repo="fastify/fastify" /> as the backend framework. I chose Fastify because I'd heard good things about it and wanted to try it out. Additionally, instead of using MySQL for the database, I switched to using PostgreSQL since it's more powerful and more widely used commercially.

### Automation and Deployment

One major improvement I implemented was building automation. Now, whenever I push changes to the GitHub repository, GitHub Actions are triggered to handle the process. These actions check out the current code and build two Docker images: one for the backend and one for the frontend.

Once the images are built, my deployment server automatically pulls them and deploys the updated app. This setup allows me to update the entire application simply by pushing changes to the repository, eliminating the need for manual redeployment.

Additionally, using Docker images in both development and production environments ensures consistency. If the project runs in development, it will run the same in production, removing potential issues caused by differences between the two environments.
