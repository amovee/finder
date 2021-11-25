<template>
  <div id="app" class="test">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <header>
      <div class="logo">amuvee<span class="dot">.</span></div>
    </header>
    <router-view />
  </div>
</template>

<style lang="scss">
html {
  --blue: #092c5d;
  --orange: #fa6d5a;
  --dark-orange: #ef523c;
  --light-orange: #f7f4ee;
  --bright-orange: #fabd5a;
  --cyan: #009eb2;
  font-size: 16px;
  @media (min-width: 600px) {
    font-size: 24px;
  }
  @media (min-width: 1000px) {
    font-size: 32px;
  }
  //<link rel="preconnect" href="https://fonts.gstatic.com">
  //<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap" rel="stylesheet">
  //<link rel="preconnect" href="https://fonts.gstatic.com">
  // <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
  @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap");
  font-family: "DM Sans", sans-serif;
  color: var(--blue);
  word-break: break-word;
  h1 {
    font-family: "Playfair Display", serif;
    text-align: center;
    width: 100%;
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.25rem;
    // font-size: 1.25rem;
    color: var(--orange);
    margin: 0 0 0.5rem 0;
    width: 100%;
    text-align: center;
  }

  button {
    background-color: var(--orange);
    font-size: 32px;
    color: white;
    border: none;
    padding: 4px 16px;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background-color: var(--dark-orange);
    }
  }
  #app {
    @media (min-width: 800px) {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100vw;
    }
    > header {
      // position: fixed;
      background: white;
      padding: 0.5rem;
      font-size: 3rem;
      width: 100%;
      box-sizing: border-box;
        text-align: center;
      @media (min-width: 800px) {
        text-align: left;
      }
      .logo {
        font-family: "Playfair Display", serif;
        display: inline;
        font-weight: bold;
        color: var(--blue);
        .dot {
          color: var(--orange);
          display: inline;
        }
      }
    }
  }
}
</style>
