---
title: Simplifying Backbone.js view management with Vojvoda
description: Managing view instances and ensuring proper management can be challenging in Backbone.js. However, this library offers a solution to simplify the process and enhance your development experience.
createdAt: 2014-02-03
tags:
  - javascript
  - backbonejs
---

Managing views effectively in Backbone.js is a significant aspect that requires attention. While working with Backbone.js, it can be challenging to keep track of all view instances and properly manage them. The library itself does not handle this for you, making you responsible for tasks like memory management and event listeners. Failing to do so can lead to memory leaks, slowing down your application, or even experiencing "ghost views" that can cause UI issues.

In order to address this issue, I have developed a small library called [Vojvoda](https://github.com/aleksandargosevski/vojvoda) to assist my team in managing views more conveniently. Although it would be ideal for Backbone.js to provide this functionality by default, that is not currently the case. Vojvoda is an extension for views that does not impose any specific project structure or make decisions on your behalf. You can choose to use it selectively for certain views or for all views within your application. We have utilized a BaseView, which extends Vojvoda view, to incorporate additional features we require in every view. Vojvoda seamlessly integrates with both [require.js]() and [browserify]().

Allow me to provide a brief description of the API:

To create a view using Vojvoda, simply extend it as follows:

```js
var SomeView = Vojvoda.extend({
  // Your view logic here
});
```

For managing subviews, the library offers several methods:

Adding a subview:

```js
this.addSubView("gallery", GalleryView, {
  model: new Backbone.Model(images),
});
```

Removing a subview:

```js
this.destroySubView("gallery");
```

Removing all subviews:

```js
this.destroyAllSubViews();
```

I invite you to explore the [Vojvoda code on GitHub](https://github.com/aleksandargosevski/vojvoda/blob/master/index.js). It is a simple library, and examining the code will provide you with a clearer understanding of why such a tool can be beneficial. Feel free to reach out if you have any further questions or need additional assistance. Happy coding!
