let btnscrap = document.getElementById('btnScrap');

btnscrap.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const port = chrome.tabs.connect(tab.id);
  port.postMessage({action: 'scraping'});
});