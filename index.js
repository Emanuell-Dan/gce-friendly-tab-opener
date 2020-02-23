document.addEventListener('DOMContentLoaded', init);

let cacheKey = 'open-mul-url-cache';
let clearList = document.querySelector('.reset');
let urls = document.getElementsByTagName('input');
let addNewUrl = document.querySelector('.url__new');
let txtArea = document.getElementById('urls');

function init() {
  // read cached opts
  let cachedUrls = getCachedOpts();
  txtArea.value = cachedUrls.txt;

	clearList.addEventListener('click', clearCachedUrls);
  document.querySelector('.cta__open').addEventListener('click', openWebsites);

  // Cache URL on state change
	txtArea.addEventListener('change', (e) => recordOpts({ txt: e.target.value }));
	
	newURL();
}

// Add another URL
function newURL() {
	constructUrlMarkup();
}

function constructUrlMarkup() {
	const urlItem = document.createElement('li');
	urlItem.setAttribute('class', 'url__item');

	const urlLabel = document.createElement('label');
	urlLabel.setAttribute('for', 'fname');

	const urlInput = document.createElement('input');
	urlInput.setAttribute('type', 'text');
	urlInput.setAttribute('id', 'fname');
	urlInput.setAttribute('name', 'fname');

	const urlButton = document.createElement('button');
	urlButton.setAttribute('type', 'button');
	urlButton.setAttribute('button', 'url__button');

	const urlList = document.querySelector('.url__list');
	urlList.appendChild(urlItem);

	urlItem.appendChild(urlLabel);
	urlItem.appendChild(urlInput);
	urlItem.appendChild(urlButton);
}

// record options into localStorage
function recordOpts(newOpt) {
  let oldOpt = getCachedOpts();
  localStorage.setItem(
    cacheKey,
    JSON.stringify(Object.assign({}, oldOpt, newOpt))
  );
}

// URLs saved in localStorage
function getCachedOpts() {
	let cache = localStorage.getItem(cacheKey);
	
	return cache ? JSON.parse(cache) : { txt: '' };
}

// Clears cached URLs
function clearCachedUrls() {
	return txtArea.value = '';
}

// Opens websites
function openWebsites(e) {
	[...urls].map(el => chrome.tabs.create({ url: el.value, active: false }));
}
