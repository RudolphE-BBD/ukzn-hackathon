// class CountryList extends HTMLElement {
//   constructor() {
//     super();
//     this.shadow = this.attachShadow({ mode: "open" });
//     this.setAttribute("loaded", false);
//   }

//   async getAllCountries() {
//     let url = 'https://restcountries.com/v3.1/all';

//     let restApiResponse = await fetch(url);
//     if(restApiResponse.ok){
//       let allCountries = await restApiResponse.json();
//       let regions = new Set(allCountries.map(country => country.region));
//       return { allCountries, regions };
//     } else {
//       throw new Error("The API Call failed")
//     }
//   }

//   connectedCallback() {
//     const linkElem = document.createElement("link");
//     linkElem.setAttribute("rel", "stylesheet");
//     linkElem.setAttribute("href", "country-list.css");
//     this.shadow.appendChild(linkElem);
//     let loadingDiv = document.createElement("div");
//     loadingDiv.id="loading";
//     loadingDiv.innerText="Loading countries";
//     this.shadow.appendChild(loadingDiv);

//     let countriesPromise = this.getAllCountries();
//     countriesPromise.then( ({allCountries, regions}) => {
//       let toolbar = document.createElement("div");
//       toolbar.id = "toolbar";
//       this.shadow.appendChild(toolbar);
//       this.populateToolbar(toolbar, allCountries, regions);

//       let content = document.createElement("div");
//       content.innerText = "Content";
//       this.shadow.appendChild(content);
//       this.setAttribute("loaded",true);
//       this.populateContent(content, allCountries);
//     }).catch( (error)=>{
//       console.log("It failed");
//       console.error(error);
//     });
//   }

//   disconnectedCallback() {
//     console.log("Disconnected country list");
//   }

//   attributeChangedCallback() {
//     console.log({thisShadow: this.shadow})
//     if(this.shadow){
//       let loadingDiv = this.shadow.getElementById("loading");
//       if (loadingDiv) {
//         if (this.getAttribute("loaded") === 'true') {
//           loadingDiv.setAttribute("hidden", true);
//         } else {
//           loadingDiv.setAttribute("hidden", false);
//         }
//       }
//     }
//   }

//   createButton(buttonText, clickCallbackFn) {
//     let theNewButton = document.createElement("button");
//     theNewButton.addEventListener("click", clickCallbackFn);
//     theNewButton.innerText = buttonText;
//     this.shadow.appendChild(theNewButton);
//     return theNewButton;
//   }

//   populateContent(container, allCountries){
//     let allCountryElements = allCountries.map(this.displayCountry);
//     container.replaceChildren(...allCountryElements);
//   }

//   populateToolbar(container, allCountries, regions) {
//     let sortButton = this.createButton("Sort", ()=>{
//       this.sortCountries(allCountries)
//     });

//     let regionSearch = this.createRegionSelector(regions);

//     let searchButton = this.createButton("Search by Region", () => {
//       this.filterCountries(this.regionSearch.value);
//     });

//     let clearSearchButton = this.createButton("Clear Search", this.clearFilter);
//     container.appendChild(sortButton);
//     container.appendChild(regionSearch);
//     container.appendChild(searchButton);
//     container.appendChild(clearSearchButton);
//   }

//   createRegionSelector(regions) {
//     let regionSearch = document.createElement("select");
//     let option = document.createElement("option");
//     option.value = "all";
//     option.textContent = "All";
//     regionSearch.appendChild(option);
//     regions.forEach(region => {
//       let option = document.createElement("option");
//       option.value = region;
//       option.textContent = region;
//       regionSearch.appendChild(option);
//     });

//     this.shadow.appendChild(regionSearch);
//     return regionSearch;
//   }

//   filterCountries(regionName) {
//     if (regionName === 'all') {
//       this.displayedCountries = this.allCountries;
//     } else {
//       this.displayedCountries = this.allCountries.filter((input) => {
//         return input.region.toLowerCase() === regionName.toLowerCase();
//       });
//     }
//     this.reloadInfo();
//   }

//   clearFilter() {
//     this.displayedCountries = this.allCountries;
//     this.reloadInfo();
//   }

//   sortCountries() {
//     this.displayedCountries = this.displayedCountries.sort((a, b) => {
//       return a.name.common.localeCompare(b.name.common);
//     });
//     this.reloadInfo();
//   }

//   reloadInfo() {
//   }

//   displayCountry(country) {
//     let countryInfo = document.createElement("country-info");
//     countryInfo.country = country;
//     return countryInfo;
//   }

//   static get observedAttributes() {
//     return ["loaded"];
//   }
// }

// customElements.define('country-list', CountryList);

// class CountryInfo extends HTMLElement {
//   constructor() {
//     super();
//   }

//   set country(country) {
//     this._country = country;
//   }

//   get country() {
//     return this._country;
//   }

//   connectedCallback() {
//     this.shadow = this.attachShadow({ mode: "open" });

//     this.nameHeading = document.createElement("h1");
//     this.shadow.appendChild(this.nameHeading);
//     this.setAttribute("name", this.country.name.common);

//     this.nameInput = document.createElement("input");
//     this.shadow.appendChild(this.nameInput);
//     this.nameInput.value = this.getAttribute("name");

//     this.saveName = document.createElement("button");
//     this.shadow.appendChild(this.saveName);
//     this.saveName.addEventListener("click", () => {
//       this.setAttribute("name", this.nameInput.value);
//     });
//     this.saveName.innerText = "Save";

//     const { region, subregion } = this.country;

//     const regionElement = document.createElement("p");
//     regionElement.innerText = region;
//     this.shadow.appendChild(regionElement);

//     const subregionElement = document.createElement("p");
//     subregionElement.innerText = subregion;
//     this.shadow.appendChild(subregionElement);
//   }

//   attributeChangedCallback() {
//     if (this.nameHeading) {
//       this.nameHeading.innerText = this.getAttribute("name");
//     }
//   }

//   static get observedAttributes() {
//     return ["name"];
//   }
// }

// customElements.define('country-info', CountryInfo);
