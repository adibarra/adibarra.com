---
title: Building the TAMU Grades Website
date: 2024-12-20T05:00:00Z
lang: en
duration: 20min
subtitle: A writeup on how I built the TAMU Grades website.
upcoming: true
---

[[toc]]

## Wait, Again?

Yup, that's right I re-wrote the original TAMU Grade Distribution website that I made in 2022 and posted about [here](/posts/tamugd-writeup). My goal with the original site was just to learn about webdev and as a result the code isn't great and it's UI/UX isn't much better.

<figure>
  <img src="/assets/posts/tamugd-writeup/final-product.png" alt="Screenshot of the original version" rounded-lg />
  <figcaption class="caption">Screenshot of the original version</figcaption>
</figure>

Recently, it's been getting a lot of usage. So I've decided to re-design it from the ground up with all the knowledge I've gained over the past year.

## Tech Stack

The original version, which I'll call `TAMUGD` from now on, was written in plain JS, HTML, and CSS. There was no framework, no build tools, or anything else. Due to my lack of experience at the time I didn't really know how to set any of that up or that it existed for that matter. It was just a bunch of files I would edit, manually minify, and upload to the server.

### Frontend

One of the biggest changes I made was to use a framework. I decided to go with Vue.js since I've been using it for a while now and I really like it. I also decided to use Vite as the build tool since it's super fast and easy to use. I'm also using <GithubLink repo="unocss/unocss" /> for it's fantastic superset of atomic CSS classes. I'm also using TypeScript throughout the entire project.

All-in-all, this should make the frontend much easier to work with and maintain since I can now use components and a proper set of build tools.

```ts twoslash
type Framework = 'Vue.js' | 'React' | 'Angular'
type BuildTool = 'Vite' | 'Webpack' | 'Rollup'

const frontend = {
  framework: 'Vue.js',
  buildTool: 'Vite'
}

const techStack = {
  frontend
}

```
