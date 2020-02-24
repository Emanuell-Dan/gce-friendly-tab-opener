document.addEventListener('DOMContentLoaded', init);

let cachedUrlsLocalStorageKey = 'cached-urls';
let urlsList = document.getElementsByTagName('input');

let textArea = document.getElementById('urls');

function init() {
	constructUrlMarkup();

  // Retrieve cached urls
  const retrieveCachedUrls = getCachedUrls();
	textArea.value = retrieveCachedUrls.list;
	
	document.querySelector('.url-new').addEventListener('click', newUrl);
	document.querySelector('.reset').addEventListener('click', clearCachedUrls);
  document.querySelector('.cta-open').addEventListener('click', openWebsites);
}

// Cache current url & construct new one
function newUrl() {
	recordUrl();

	constructUrlMarkup(2);
}

// Construct new url
function constructUrlMarkup(id = 1) {
	const urlItem = document.createElement('li');
	urlItem.setAttribute('class', 'url-item');

	const urlLabel = document.createElement('label');
	urlLabel.setAttribute('for', `url-${id}`);
	urlLabel.innerText = 'Paste your url:';

	const urlInput = document.createElement('input');
	urlInput.setAttribute('type', 'text');
	urlInput.setAttribute('id', `url-${id}`);
	urlInput.setAttribute('name', `url-${id}`);

	const urlButton = document.createElement('button');
	urlButton.setAttribute('type', 'button');
	urlButton.setAttribute('class', 'url-new');

	const urlList = document.querySelector('.url-list');
	urlList.appendChild(urlItem);

	urlItem.appendChild(urlLabel);
	urlItem.appendChild(urlInput);
	urlItem.appendChild(urlButton);
}

// Store urls in localStorage
function recordUrl() {
  localStorage.setItem(
    cachedUrlsLocalStorageKey,
    JSON.stringify(Object.assign({}, getCachedUrls(), { list: [...urls].map(url => url.value )}))
  );
}

// Retrieve urls saved in localStorage
function getCachedUrls() {
	let cache = localStorage.getItem(cachedUrlsLocalStorageKey);
	
	return cache ? JSON.parse(cache) : { list: '' };
}

// Clear cached URLs
function clearCachedUrls() {
	return textArea.value = '';
}

// Open websites
function openWebsites(e) {
	[...urlsList].map(url => chrome.tabs.create({ url: url.value, active: false }));
}
