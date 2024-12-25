---
title: Blog | Using Cloudflare with your Website
display: Using Cloudflare with your Website
date: 2023-2-30T06:00:00Z
lang: en
duration: 10min
subtitle: A quick guide for using Cloudflare with your website.
upcoming: false
---

[[toc]]

## Introduction

In [my last webdev post](/posts/web-optimization), I talked about how a few ways you can optimize your website. One of the things I briefly mentioned was using a CDN. In this post, I'll be talking about how to use Cloudflare with your website.

## What is Cloudflare?

Cloudflare is a Content Delivery Network (CDN) that helps speed up your website. It also provides a few other services like DDoS protection, SSL, and more. But how does it do that? Well, Cloudflare has a network of servers around the world that cache your website's content.

<figure>
  <img src="/assets/posts/using-cloudflare/with-cloudflare.png" alt="Sketch of Cloudflare's CDN" rounded-lg dark:invert />
  <figcaption class="caption">Cloudflare caches your website's content on its servers around the world.</figcaption>
</figure>

Whenever a user visits your site, Cloudflare will serve the cached content from the server closest to the user. This results in faster response times. But the best part is that Cloudflare is free to use!

## Setting up Cloudflare

Setting up Cloudflare is pretty straightforward. Once you have [an account](https://dash.cloudflare.com/sign-up), you'll need to add your website to Cloudflare. You can do so by clicking the "Add a Site" button on the dashboard. Then, you'll need to enter your root domain `example.com` and click the "Add Site" button.

## Enabling Cloudflare

Now that you've added your site to Cloudflare, you are almost done. Next up, click on the "DNS" tab on the dashboard.

Cloudflare _should_ automatically import your DNS records. But you should double-check to make sure they are all correct.

Take note of the nameservers listed. You'll need to go to your registrar's website to point to the ones Cloudflare gave you.

That's it! You're done! Cloudflare should now be working with your website. Feel free to explore the other tabs on the dashboard. You can also check out the [Cloudflare docs](https://support.cloudflare.com/hc/en-us/articles/201720164-Step-2-Create-a-Cloudflare-account-and-add-a-website) for more information.

## Signing Off

In just a few short steps you've set up Cloudflare with your website and boosted your site's speed and reliability for free!

As always, if you have any feedback or suggestions, feel free to reach out to me by email at <EmailLink to="adibarra00@gmail.com" />.
