---
title: Blog | Optimizing a Website
display: Optimizing a Website
date: 2022-10-25T06:00:00Z
lang: en
duration: 10min
subtitle: A crash course into website optimization.
upcoming: false
---

[[toc]]

## Introduction

After the initial release of the TAMU Grade Distribution Website [in my previous post](/posts/tamugd-writeup), I decided that I wanted to optimize the website to make it faster. Don't get me wrong; the website was already plenty fast. However, I wanted to take a deep dive into the world of web optimization.

## Why Optimize?

Well, optimizing a website is important for many reasons. The most obvious is that it makes your website load faster or perform better. However, doing so often requires a lot of work and can be very time-consuming. So why bother?

The answer is simple. It's often worth the effort.

### A Case Study

<figure>
  <img src="/assets/posts/web-optimization/akamai.png" alt="Poor rendition of Akamai's logo" rounded-lg />
  <figcaption class="caption">Poor rendition of Akamai's logo</figcaption>
</figure>

Back in 2015, Akamai, a large CDN (content delivery network), was approached by Google. They wanted to conduct a [joint study](https://developer.akamai.com/blog/2016/07/20/machine-learning-predicts-bound-conversions) on the impact of website load times on user experience and behavior. The study was conducted on a massive scale and involved over a billion 'beacons' worth of data from Akamai's real-user monitoring tool.

Here are some of the key findings:

- DOM ready time was the number one indicator of bounce rate
- Full load time was the second greatest indicator of bounce rate

What this tells us is that optimizing for these two factors has a significant effect on whether users stay on the website. This is especially true for websites with many competitors.

<figure>
  <img src="/assets/posts/web-optimization/cloudflare.png" alt="Poor rendition of Cloudflare's logo" rounded-lg light:invert />
  <figcaption class="caption">Poor rendition of Cloudflare's logo</figcaption>
</figure>

In another [post written by Cloudflare](https://www.cloudflare.com/learning/performance/why-site-speed-matters/), they reference some other studies with interesting findings.

Here are some of the key points:

- One site found that a 100ms decrease in load time resulted in a 1.11% increase in session-based conversion
- A retailer saw a 12-13% increase in revenue after halving their load time
- Walmart found a 2% increase in conversions after a 1-second load time reduction

These findings are fascinating. However, they may not necessarily have the same effect on your site. After all, you (probably) aren't Walmart. However, it's still worth considering.

## Optimizing the Website

Now that we've established why optimizing a website is essential, let's look at a few of the most common optimization techniques.

### Minifying

Minifying is by far the most common optimization technique. It's also the easiest to implement.

Minifying is the process of removing compressing code. This can include removing whitespace and comments as well as truncating variable names. Some of the more advanced minifiers can even perform tree shaking.

The result is usually a **much** smaller file size, which translates to faster load times.

<figure>
  <img src="/assets/posts/web-optimization/minify.png" alt="JQuery 3.6.1 minified using UglifyJS 3" rounded-lg dark:invert />
  <figcaption class="caption">JQuery 3.6.1 minified using UglifyJS 3</figcaption>
</figure>

The best part is that you can do this automatically with a tool like <GithubLink repo="mishoo/UglifyJS" />. It's practically a one-click solution **and** it can be integrated into your build process.

### Bundling

Bundling is another common optimization technique. However, it can be a bit more complicated to implement, depending on your setup.

A website typically has to load many different files. These files usually include HTML, CSS, JavaScript, and images. However, each of these files has to be downloaded separately. This can cause a lot of overhead, especially for smaller files. Many files can only be executed after downloading others. So reducing the number of requests that need to be made is especially important for websites with many files.

<figure>
  <img src="/assets/posts/web-optimization/bundling.png" alt="Example of bundling" rounded-lg dark:invert />
  <figcaption class="caption">Example of bundling</figcaption>
</figure>

Bundling is the process of combining multiple files into a single file. This can be done for both CSS and JavaScript files. The result is typically one or two files with the same weight as the original files combined. However, combining the files means the browser only has to make one request instead of multiple.

The advent of HTTP/2 has somewhat fixed this problem, but it's still good practice to bundle your files for clients who have not yet upgraded.

### Lazy Loading

Lazy loading is beneficial for websites that have a lot of images.

Lazy loading is the process of only loading images when they are in the viewport. Enabling lazy loading allows your website to only load assets in view. This can reduce website load time and bandwidth if the user does not scroll to every image. Lazy loading can be implemented with either JS or plain HTML.

<figure>
  <img src="/assets/posts/web-optimization/lazy-loading.png" alt="Example of lazy loading" rounded-lg dark:invert />
  <figcaption class="caption">Example of lazy loading</figcaption>
</figure>

If you wish to do this with JS, it can be done by setting the `src` attribute of the image to a placeholder image. Then, when the image is in the viewport, the `src` attribute is set to the actual image.

If you wish to use plain HTML, you can use the `loading` attribute to defer the loading of images until they are in the viewport. This can be done by setting the `loading` attribute to `lazy`. This will cause the browser only to load the image when it enters the viewport.

It is recommended to use the `loading` attribute over JS for lazy loading. This is because the `loading` attribute is a native feature of the browser and is supported by all major browsers. However, JS is still a viable option for lazy loading. Additionally, you should supply a width and height for the image to prevent layout shifts.

### Caching (and CDNs)

Caching is an extremely powerful optimization technique. It excels at improving loading times and reducing bandwidth usage.

Caching is storing a copy of a file on the user's device. Caching allows the user to load the file from their device instead of the server. Since the file is already on the device, it can drastically reduce the time it takes to load a website.

Caching can be done in a few different ways. The most common of which is browser caching. Browser Caching can be enabled by setting the `Cache-Control` header to a value like `public, max-age=31536000`. This header will tell the browser to cache the file sent with this header for a year.

<figure>
  <img src="/assets/posts/web-optimization/caching.png" alt="Cache-Control header from a response" rounded-lg dark:invert />
  <figcaption class="caption">Cache-Control header from a response</figcaption>
</figure>

Another common way to cache files is to use a CDN. A CDN is a network of servers that are distributed around the world. This allows the user to load the file from a server closest to them. This can drastically reduce the time it takes to load a file. A side effect of this is that it can also reduce bandwidth usage for your origin server.

If your website gets a lot of traffic, it's worth considering using a CDN. One of the most popular is Cloudflare. They also provide many other features, including DDoS protection, SSL, and compression. It's free for most websites.

Just be sure to only static cache files such as images, CSS, and JavaScript. Don't cache HTML, PHP, and other server-side rendered files. Caching dynamic files can cause you to serve stale data to your users or, worse, data meant for other users.

### Compression

Compression should always be used. It is so ubiquitous that it is built into almost every web server.

In a nutshell, compression reduces filesize by building a dictionary of common characters. This allows the server to send a smaller file to the client. The client then uses the dictionary to reconstruct the original file. Compression can drastically reduce the size of a file, especially for text-based files.

<figure>
  <img src="/assets/posts/web-optimization/compression.png" alt="Example of compression" rounded-lg dark:invert />
  <figcaption class="caption">Example of compression</figcaption>
</figure>

Gzip is the most common compression algorithm. However, Brotli is a newer algorithm that can achieve better compression ratios. All major browsers support both.

Static files like JS and CSS should always be compressed.

## Conclusion

Optimizing a website is extremely important. It can drastically improve the loading time of a website. This can have a significant impact on user experience and even SEO.

Many different techniques can be used to optimize a website. In fact, we've barely scratched the surface. However, the most important thing is to make sure you are using the right tool for the job and that you are not over-engineering your solution. Sometimes, the simplest solution is best.

As always, if you have any feedback or suggestions, feel free to reach out to me by email at <EmailLink to="adibarra00@gmail.com" />.
