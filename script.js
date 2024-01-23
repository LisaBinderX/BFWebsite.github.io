function toggleContent(tab) {
  var content = tab.nextElementSibling; 

  tab.classList.toggle('active');

  content.classList.toggle('active');
}

function handleAccordionKeyPress(event, tab) {
  if (event.keyCode === 13) {
      toggleContent(tab);
  }
}

var accordionTabs = document.querySelectorAll('.tab');
accordionTabs.forEach(function (tab) {
  tab.setAttribute('tabindex', '0');
  
  tab.addEventListener('keypress', function (event) {
      handleAccordionKeyPress(event, tab);
  });

  tab.addEventListener('click', function () {
      toggleContent(tab);
  });
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
      var focusedElement = document.activeElement;

      if (focusedElement.tagName === 'A' && focusedElement.hasAttribute('href')) {
          window.location.href = focusedElement.getAttribute('href');
      }
  }
});

function search() {
  performSearchAndScroll();
}


function performSearchAndScroll() {
    var searchTerm = document.getElementById('searchInput').value.toLowerCase();
    var searchResults = performSearch(searchTerm);

    if (searchResults.length === 0) {
        alert('No results found. Please try again.');
    } else {
        var firstResultElement = searchResults[0];
        if (firstResultElement) {
            firstResultElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

function performSearch(searchTerm) {
    var matchingElements = [];

    var textContentElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
    textContentElements.forEach(function (element) {
        var content = element.textContent.trim().toLowerCase();
        if (content.includes(searchTerm)) {
            matchingElements.push(element);
        }
    });

    return matchingElements;
}

document.getElementById('searchInput').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        performSearchAndScroll();
    }
});

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        if (document.activeElement.id === 'downloadLink') {
            document.getElementById('downloadLink').click();
        } else {
            handleEnterKeyPress();
        }
    }
}

function handleEnterKeyPress() {
    var focusedElement = document.activeElement;

    if (focusedElement.tagName === 'A' && focusedElement.hasAttribute('href')) {
        window.location.href = focusedElement.getAttribute('href');
    } else if (focusedElement.tagName === 'INPUT' && focusedElement.id === 'searchInput') {
        performSearchAndScroll();
    }
}

function addFocusListener() {
    document.addEventListener('keydown', handleKeyPress);
}

function removeFocusListener() {
    document.removeEventListener('keydown', handleKeyPress);
}

document.getElementById('downloadLink').addEventListener('focus', addFocusListener);
document.getElementById('searchInput').addEventListener('focus', addFocusListener);

document.getElementById('downloadLink').addEventListener('blur', removeFocusListener);
document.getElementById('searchInput').addEventListener('blur', removeFocusListener);