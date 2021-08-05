
  document.getElementById("nav-toggle").addEventListener ("click", toggleNav);
  function toggleNav() {
          var nav = document.getElementById("nav-menu");
          var className = nav.getAttribute("class");
          if(className == "nav-end nav-menu") {
              nav.className = "nav-end nav-menu is-active";
          } else {
              nav.className = "nav-end nav-menu";
          }
  }
