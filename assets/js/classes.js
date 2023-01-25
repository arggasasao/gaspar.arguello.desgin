export class App {
  constructor(name) {
    this.name = name;
    this.lang = this.getLang();
    this.data = {};
    this.page = "";
    this.url = new URL(window.location.href);
    this.online = false;
    this.container = document.getElementById("app");
  }
  init = async (pageNae) => {
    this.name = this.container.dataset.page;
    this.data = await this.loadJson("translate", this.lang);
    this[this.name]();
    // const el = document.getElementsByTagName("body");
    // el[0].className = "show";
  };
  home = async () => {
    console.log("init: Home:", this);
    this.loadCSS("/assets/css/menu.css");
    const data = this.data.home.menu;
    const template = document.querySelector("template").content;
    const fragment = document.createDocumentFragment();
    const wrap = document.createElement("div");
    wrap.classList.add("menu-home");
    wrap.append(fragment);

    for (var id in data) {
      console.log(id, data[id]);
      const item = data[id];
      template.querySelector("a").setAttribute("href", (this.online = false ? item.link : `${item.link}.html`));
      template.querySelector("span.up").textContent = item.label;
      template.querySelector("span.hover").textContent = item.hover;
      let clone = document.importNode(template, true);
      wrap.appendChild(clone);
    }
    this.container.appendChild(wrap);
  };
  about = () => {
    const data = this.data.about.content;
    const template = document.querySelector("template").content;
    const fragment = document.createDocumentFragment();
    const wrap = document.createElement("div");
    wrap.classList.add("max-width");
    wrap.append(fragment);
    template.querySelector("div.hero-text h2").innerText = data.big_text;
    template.querySelector("div.hero-image img").setAttribute("src", `/assets/img/${data.hero_image}`);
    template.querySelector("div.hero-column h4").innerText = data.title;
    template.querySelector("p.size-large").textContent = data.big_text;
    template.querySelector("div.link a").setAttribute("href", `/assets/${data.cv_link}`);
    template.querySelector("div.link a").textContent = data.cv_link_text;
    let clone = document.importNode(template, true);
    wrap.appendChild(clone);
    this.container.appendChild(wrap);
  };
  works = async () => {
    // console.log("Works: ", this);
    const ping = await fetch("/work").then((response) => {
      return response.status;
    });
    console.log("Ping:", ping);
    const works = await this.loadJson("works", this.lang);
    const template = document.querySelector("template").content;
    const fragment = document.createDocumentFragment();
    const wrap = document.createElement("div");
    wrap.classList.add("max-width");
    wrap.append(fragment);

    // works.forEach((work) => {
    for (const el in works) {
      const work = works[el];
      const link = ping !== 404 ? `/work/${el}` : "work.html";
      template.querySelector("a.work-link").setAttribute("href", link);
      template.querySelector("a.work-link").setAttribute("alt", work.sub_title);
      template.querySelector("a.work-link").setAttribute("slug", el);
      template.querySelector("h1").innerText = work.title;
      template.querySelector("p").innerText = work.sub_title;
      let clone = document.importNode(template, true);
      wrap.appendChild(clone);
      console.log("works list:", link);
      // });
    }
    this.container.appendChild(wrap);
    const button = document.querySelectorAll(".work-link");
    button.forEach((element) => {
      element.addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          e.stopPropagation();

          console.log(e.target);
          localStorage.setItem("work", e.target.getAttribute("slug"));
        },
        true
      );
    });
  };
  work = async () => {
    const target = localStorage.getItem("work");
    console.log("localStorage", target);
    // Pasar los works de Array to Objects
    this.works = await this.loadJson("works", this.lang);
    const work_name = target ? target : this.url.pathname.replace("/work/", "");
    const work = this.works[work_name];
    const blocks = work.blocks;

    // Header render
    const header = document.getElementById("work-header").content;
    const header_fraggment = document.createDocumentFragment();
    const header_wrap = document.createElement("div");
    header_wrap.classList.add("max-width");

    header.querySelector("h2").innerText = work.title;
    header.querySelector("h4").innerText = work.sub_title;
    header.querySelector("img").setAttribute("src", work.cover_image);
    header.querySelector("img").setAttribute("alt", work.cover_image);
    let clone = document.importNode(header, true);
    header_wrap.append(clone);

    // Blocks render
    const section = document.getElementById("work-block").content;
    const section_fraggment = document.createDocumentFragment();

    const section_wrap = document.createElement("div");
    section_wrap.classList.add("max-width");
    blocks.forEach((item) => {
      console.log("Work-Single:", blocks);
      section.querySelector("div").setAttribute("class", item.layout);
      section.querySelector("h2").innerText = item.title;
      section.querySelector("p").innerText = item.text;
      section.querySelector("img").setAttribute("src", item.image);
      let clone = document.importNode(section, true);
      section_wrap.append(clone);
    });
    section_wrap.append(section_fraggment);

    this.container.appendChild(header_wrap);
    this.container.appendChild(section_wrap);
  };
  // Import site data
  loadJson = async (file, lang) => {
    try {
      let url = "/assets/db/" + file + ".json";
      let dataResp = await fetch(url);
      let data = await dataResp.json();
      const response = lang ? await data[lang] : await data;
      // console.log("App:loadJson: data:", dataOut);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  // import CSSs
  loadCSS = async (path) => {
    async function loadFile(path) {
      let css = document.createElement("link");
      css.rel = "stylesheet";
      css.media = "all";
      css.href = path;
      document.getElementsByTagName("head")[0].appendChild(css);
    }
    await loadFile(path);
  };
  getLang = () => {
    let navLang = navigator.language.slice(0, 2);
    if (navLang !== "es" && navLang !== "pt") navLang = "en";
    return navLang;
  };
}
