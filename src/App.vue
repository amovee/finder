<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
    <header>
      <div class="logo">amuvee<span class="dot">.</span></div>
    </header>
  </div>
</template>

<style lang="scss">
html {
  --blue: #092c5d;
  --orange: #fa6d5a;
  --light-orange: #f7f4ee;
  --bright-orange: #fabd5a;
  --cyan: #009EB2;
  font-size: 32px;
  //<link rel="preconnect" href="https://fonts.gstatic.com">
  //<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap" rel="stylesheet">
  //<link rel="preconnect" href="https://fonts.gstatic.com">
  // <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
  @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap");
  font-family: "DM Sans", sans-serif;
  color: var(--blue);

  h1 {
    font-family: "Playfair Display", serif;
    text-align: center;
    width: 100%;
  }
  header {
    position: fixed;
    background: white;
    padding: 0.5rem;
    .logo {
      font-family: "Playfair Display", serif;
      display: inline;
      font-weight: bold;
      font-size: 2rem;
      color: var(--blue);
      .dot {
        color: var(--orange);
        display: inline;
      }
    }
  }
}
</style>
