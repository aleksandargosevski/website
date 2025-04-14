---
title: Creating a fixed and fluid column layout
description: When it comes to designing a "one column fixed and one column fluid" layout, implementing a solution that is clean, robust, and doesn't rely on hacky techniques can be a challenge...
createdAt: 2014-05-02
tags:
  - css
---

When it comes to designing a "one column fixed and one column fluid" layout, implementing a solution that is clean, robust, and doesn't rely on hacky techniques can be a challenge. We faced this issue in our office and explored various approaches. Fortunately, our [colleague](https://github.com/vladimirsiljkovic) devised an excellent solution that I'm excited to share with you.

## Solution

To achieve this layout, we can use the following HTML structure:

```html
<main>
  <aside>This is the fixed sidebar.</aside>

  <section>This is fluid main section.</section>
</main>
```

And the CSS:

```css
main:after {
  content: "";
  display: table;
  clear: both;
}

aside {
  float: left;
  max-width: 200px;
}

section {
  overflow: hidden;
}
```

## Compatibility and Flexibility

This solution gracefully supports IE6+ browsers, ensuring wider compatibility. Although it's important to note that one drawback arises when using a different overflow behavior in the fluid section. However, with no reliance on magic numbers or fixed values, this solution remains effective. Do keep in mind that until flexbox is widely supported by all major browsers, this method presents the best approach.

Feel free to check out the live demo on [CodePen](http://codepen.io/aleksandargosevski/pen/zDGvh).
