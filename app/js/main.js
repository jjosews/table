const qualityItem = document.querySelectorAll('.exchange__quality-item');
qualityItem.forEach(function(element) {
  element.addEventListener('click', function() {
    element.classList.toggle('active');
  });
});

// ----------------------------------------------- //

const searchInput = document.querySelector('.exchange__search-input'),
      searchListItems = document.querySelector('.exchange__search-list');

searchInput.addEventListener('focus', function() {
  searchListItems.classList.add('visible');
});

document.addEventListener('click', function(e) {
  if (!searchListItems.contains(e.target) && !searchInput.contains(e.target)) {
    searchListItems.classList.remove('visible');
  }
});

searchListItems.addEventListener('click', function(e) {
  e.stopPropagation();
});


// ----------------------------------------------- //


document.querySelectorAll('.exchange__dropdown-toggle').forEach(dropDownFunc);
function dropDownFunc(dropDown) {
    if(dropDown.classList.contains('click-dropdown') === true){
        dropDown.addEventListener('click', function (e) {
            e.preventDefault();
            if (this.nextElementSibling.classList.contains('dropdown-active') === true) {
                this.nextElementSibling.classList.remove('dropdown-active');

            } else {
                closeDropdown();
                this.nextElementSibling.classList.add('dropdown-active');
            }
        });
    }
};
window.addEventListener('click', function (e) {
    if (e.target.closest('.exchange__filters-dropdown') === null) {
        closeDropdown();
    }
});

function closeDropdown() {
    document.querySelectorAll('.exchange__dropdown-menu').forEach(function (menu) {
        menu.classList.remove('dropdown-active');
    });
}

// ----------------------------------------------- //

function adjustTextarea(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = (textarea.scrollHeight) + "px";
}

var textareas = document.getElementsByTagName("textarea");
for (var i = 0; i < textareas.length; i++) {
  textareas[i].addEventListener("input", function() {
    adjustTextarea(this);
  }, false);
  adjustTextarea(textareas[i]);
}


// ----------------------------------------------- //


const searchBtn = document.querySelectorAll('.exchange__search-btn');
const takeSelects = document.querySelector('.exchange__take-selects');
const searchList = document.querySelector('.exchange__search-list');
const classes = ['red', 'blue', 'yellow'];
const deletedItems = [];

searchList.addEventListener('click', (e) => {
  const searchBtn = e.target.closest('.exchange__search-btn');
  if (searchBtn) {
    const selectedItem = searchBtn.closest('.exchange__search-item');
    const title = selectedItem.querySelector('.exchange__search-title').textContent;
    const type = selectedItem.querySelector('.exchange__search-type').textContent;
    const imgPath = selectedItem.querySelector('.exchange__search-img img').getAttribute('src');

    const newSelectedItem = document.createElement('div');
    newSelectedItem.classList.add('exchange__take-select');
    newSelectedItem.innerHTML = `
      <div class="exchange__take-img" style="background-image: url(${imgPath}); display: none;"></div>
      ${title} | ${type}
      <div class="exchange__take-title" style="display: none;">${title}</div>
      <div class="exchange__take-type" style="display: none;">${type}</div>
      <button class="exchange__take-close">
        <img src="images/take-close.svg" alt="">
      </button>
    `;
    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    newSelectedItem.classList.add(randomClass);

    takeSelects.appendChild(newSelectedItem);

    selectedItem.dataset.title = title;
    selectedItem.dataset.type = type;
    selectedItem.dataset.img = imgPath;
    selectedItem.remove();
  }
});

takeSelects.addEventListener('click', (e) => {
  if (e.target.closest('.exchange__take-close')) {
    const takeSelect = e.target.closest('.exchange__take-select');
    const title = takeSelect.querySelector('.exchange__take-title').textContent;
    const type = takeSelect.querySelector('.exchange__take-type').textContent;
    const imgPath = takeSelect.querySelector('.exchange__take-img').style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');

    const newSearchItem = document.createElement('div');
    newSearchItem.classList.add('exchange__search-item');
    newSearchItem.innerHTML = `
      <div class="exchange__search-box">
        <div class="exchange__search-img">
          <img src="${imgPath}" alt="">
        </div>
        <div class="exchange__search-info">
          <div class="exchange__search-title">${title}</div>
          <div class="exchange__search-type">${type}</div>
        </div>
      </div>
      <button class="exchange__search-btn">
        <img src="images/search-add.svg" alt="">
      </button>
    `;

    searchList.appendChild(newSearchItem);
    deletedItems.push(newSearchItem); // Сохраняем удаленный элемент в массив

    takeSelect.remove();
  }
});

const searchInputBox = document.querySelector('.exchange__search-input'); // получаем поисковой input
const searchItemsBox = document.querySelectorAll('.exchange__search-item'); // получаем все элементы, которые нужно скрыть

searchInputBox.addEventListener('input', () => { // вешаем обработчик события на ввод в поисковой input
  const searchValue = searchInputBox.value.toLowerCase().trim(); // получаем введенное значение, приводим к нижнему регистру и удаляем пробелы

  searchItemsBox.forEach((item) => { // перебираем все элементы, которые нужно скрыть
    const title = item.querySelector('.exchange__search-title').textContent.toLowerCase(); // получаем текст заголовка элемента, приводим к нижнему регистру
    const type = item.querySelector('.exchange__search-type').textContent.toLowerCase(); // получаем текст типа элемента, приводим к нижнему регистру

    if (title.includes(searchValue) || type.includes(searchValue)) { // если введенное значение совпадает с заголовком или типом элемента, то удаляем класс hidden
      item.classList.remove('hidden');
    } else { // иначе добавляем класс hidden
      item.classList.add('hidden');
    }
  });
});



// ------------------------------- //




const addButtonModal = document.querySelector('.select-modal__add');
const itemsModal = document.querySelectorAll('.modal-item');
const htmlInner = document.querySelector('.exchange__container');
const classesModal = ['red', 'blue', 'yellow'];

const priceList = document.createElement('div');
priceList.classList.add('exchange__give-list');

let selectedItems = [];

function removeItem(item) {
  selectedItems.splice(selectedItems.indexOf(item), 1);

  priceList.removeChild(item);

  const checkbox = itemsModal[item.dataset.index].querySelector('.exchange__skin-input');
  checkbox.checked = false;
  checkbox.disabled = false;

  if (selectedItems.length === 0) {
    document.querySelector('.exchange__give-selects').classList.remove('active');
  }
}

addButtonModal.addEventListener('click', function() {
  priceList.innerHTML = '';

  selectedItems = [];

  itemsModal.forEach(function(item, index) {
    const checkbox = item.querySelector('.exchange__skin-input');
    const price = item.getAttribute('data-modal-title');
    if (checkbox.checked) {
      const priceItem = document.createElement('div');
      priceItem.classList.add('exchange__give-select');
      priceItem.dataset.index = index;
      priceItem.innerHTML = `
        ${price}
        <button class="exchange__give-close">
          <img src="images/take-close.svg" alt="">
        </button>
      `;
      priceList.appendChild(priceItem);

      const randomClass = classesModal[Math.floor(Math.random() * classesModal.length)];
      priceItem.classList.add(randomClass);

      selectedItems.push(priceItem);
    } else {
      checkbox.disabled = false;
    }
  });

  htmlInner.appendChild(priceList);

  const closeButtonList = document.querySelectorAll('.exchange__give-close');
  closeButtonList.forEach(function(closeButton) {
    const item = closeButton.parentNode;
    closeButton.addEventListener('click', function(event) {
      event.stopPropagation();
      removeItem(item);
    });
  });

  if (selectedItems.length > 0) {
    document.querySelector('.exchange__give-selects').classList.add('active');
  }
});



// ------------------------------- //




const rangeSlider = document.querySelector('.range-slider');
const track = rangeSlider.querySelector('.range-slider__track');
const thumb = rangeSlider.querySelector('.range-slider__thumb');
const value = rangeSlider.querySelector('.range-slider__value');

const min = 0.01;
const max = 1.00;
const step = 0.01;

let valuePercent = 0;

thumb.addEventListener('mousedown', startDragging);
thumb.addEventListener('touchstart', startDragging);

function startDragging(e) {
  e.preventDefault();

  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDragging);
  document.addEventListener('touchmove', drag);
  document.addEventListener('touchend', stopDragging);
}

function drag(e) {
  let percent;

  if (e.type === 'mousemove') {
    percent = getPercent(e.clientX);
  } else if (e.type === 'touchmove') {
    percent = getPercent(e.touches[0].clientX);
  }

  valuePercent = percent;
  updateSlider();
}

function stopDragging(e) {
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDragging);
  document.removeEventListener('touchmove', drag);
  document.removeEventListener('touchend', stopDragging);
}

function getPercent(clientX) {
  const { left, width } = rangeSlider.getBoundingClientRect();
  let percent = (clientX - left) / width * 100;

  if (percent < 0) {
    percent = 0;
  } else if (percent > 100) {
    percent = 100;
  }

  return percent;
}

function updateSlider() {
  const valueText = (min + (max - min) * (valuePercent / 100)).toFixed(2);
  const thumbWidth = thumb.offsetWidth;

  thumb.style.left = `calc(${valuePercent}% - ${thumbWidth / 2}px)`;
  value.style.left = `calc(${valuePercent}% - ${thumbWidth / 2}px)`;
  value.textContent = valueText;

  if (valuePercent > 50) {
    thumb.classList.add('thumb--above-halfway');
    thumb.classList.remove('thumb--below-halfway');
  } else {
    thumb.classList.add('thumb--below-halfway');
    thumb.classList.remove('thumb--above-halfway');
  }
}
updateSlider();













// ------------------------------------- //


class HystModal {
  constructor(props) {
    const defaultConfig = {
      backscroll: true,
      linkAttributeName: 'data-hystmodal',
      closeOnOverlay: true,
      closeOnEsc: true,
      closeOnButton: true,
      waitTransitions: false,
      catchFocus: true,
      fixedSelectors: '*[data-hystfixed]',
      beforeOpen: () => { },
      afterClose: () => { },
    };
    this.config = Object.assign(defaultConfig, props);
    if (this.config.linkAttributeName) {
      this.init();
    }
    this._closeAfterTransition = this._closeAfterTransition.bind(this);
  }

  init() {
    this.isOpened = false;
    this.openedWindow = false;
    this.starter = false;
    this._nextWindows = false;
    this._scrollPosition = 0;
    this._reopenTrigger = false;
    this._overlayChecker = false;
    this._isMoved = false;
    this._focusElements = [
      'a[href]',
      'area[href]',
      'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
      'select:not([disabled]):not([aria-hidden])',
      'textarea:not([disabled]):not([aria-hidden])',
      'button:not([disabled]):not([aria-hidden])',
      'iframe',
      'object',
      'embed',
      '[contenteditable]',
      '[tabindex]:not([tabindex^="-"])',
    ];
    this._modalBlock = false;

    const existingShadow = document.querySelector('.select-modal__shadow');
    if (existingShadow) {
      this.shadow = existingShadow;
    } else {
      this.shadow = document.createElement('div');
      this.shadow.classList.add('select-modal__shadow');
      document.body.appendChild(this.shadow);
    }
    this.eventsFeeler();
    this.eventsFeeler();

  }

  eventsFeeler() {
    document.addEventListener('click', (e) => {
      const clickedlink = e.target.closest(`[${this.config.linkAttributeName}]`);
      if (!this._isMoved && clickedlink) {
        e.preventDefault();
        this.starter = clickedlink;
        const targetSelector = this.starter.getAttribute(this.config.linkAttributeName);
        this._nextWindows = document.querySelector(targetSelector);
        this.open();
        return;
      }
      if (this.config.closeOnButton && e.target.closest('[data-hystclose]')) {
        this.close();
      }
      const exchangeAddBtn = document.querySelector('.select-modal__add');
      if (exchangeAddBtn) {
        exchangeAddBtn.addEventListener('click', () => {
          this.close();
        });
      }
    });

    if (this.config.closeOnOverlay) {
      document.addEventListener('mousedown', (e) => {
        if (!this._isMoved && (e.target instanceof Element) && !e.target.classList.contains('select-modal__wrap')) return;
        this._overlayChecker = true;
      });

      document.addEventListener('mouseup', (e) => {
        if (!this._isMoved && (e.target instanceof Element) && this._overlayChecker && e.target.classList.contains('select-modal__wrap')) {
          e.preventDefault();
          this._overlayChecker = !this._overlayChecker;
          this.close();
          return;
        }
        this._overlayChecker = false;
      });
    }

    window.addEventListener('keydown', (e) => {
      if (!this._isMoved && this.config.closeOnEsc && e.which === 27 && this.isOpened) {
        e.preventDefault();
        this.close();
        return;
      }
      if (!this._isMoved && this.config.catchFocus && e.which === 9 && this.isOpened) {
        this.focusCatcher(e);
      }
    });
  }

  open(selector) {
    if (selector) {
      if (typeof (selector) === 'string') {
        this._nextWindows = document.querySelector(selector);
      } else {
        this._nextWindows = selector;
      }
    }
    if (!this._nextWindows) {
      console.log('Warning: hystModal selector is not found');
      return;
    }
    if (this.isOpened) {
      this._reopenTrigger = true;
      this.close();
      return;
    }
    this.openedWindow = this._nextWindows;
    this._modalBlock = this.openedWindow.querySelector('.select-modal__window');
    this.config.beforeOpen(this);
    this._bodyScrollControl();
    this.shadow.classList.add('select-modal__shadow--show');
    this.openedWindow.classList.add('select-modal--active');
    this.openedWindow.setAttribute('aria-hidden', 'false');
    if (this.config.catchFocus) this.focusControl();
    this.isOpened = true;
  }

  close() {
    if (!this.isOpened) {
      return;
    }
    if (this.config.waitTransitions) {
      this.openedWindow.classList.add('select-modal--moved');
      this._isMoved = true;
      this.openedWindow.addEventListener('transitionend', this._closeAfterTransition);
      this.openedWindow.classList.remove('select-modal--active');
    } else {
      this.openedWindow.classList.remove('select-modal--active');
      this._closeAfterTransition();
    }
  }

  _closeAfterTransition() {
    this.openedWindow.classList.remove('select-modal--moved');
    this.openedWindow.removeEventListener('transitionend', this._closeAfterTransition);
    this._isMoved = false;
    this.shadow.classList.remove('select-modal__shadow--show');
    this.openedWindow.setAttribute('aria-hidden', 'true');

    if (this.config.catchFocus) this.focusControl();
    this._bodyScrollControl();
    this.isOpened = false;
    this.openedWindow.scrollTop = 0;
    this.config.afterClose(this);

    if (this._reopenTrigger) {
      this._reopenTrigger = false;
      this.open();
    }
  }

  focusControl() {
    const nodes = this.openedWindow.querySelectorAll(this._focusElements);
    if (this.isOpened && this.starter) {
      this.starter.focus();
    } else if (nodes.length) nodes[0].focus();
  }

  focusCatcher(e) {
    const nodes = this.openedWindow.querySelectorAll(this._focusElements);
    const nodesArray = Array.prototype.slice.call(nodes);
    if (!this.openedWindow.contains(document.activeElement)) {
      nodesArray[0].focus();
      e.preventDefault();
    } else {
      const focusedItemIndex = nodesArray.indexOf(document.activeElement);
      if (e.shiftKey && focusedItemIndex === 0) {
        nodesArray[nodesArray.length - 1].focus();
        e.preventDefault();
      }
      if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
        nodesArray[0].focus();
        e.preventDefault();
      }
    }
  }

  _bodyScrollControl() {
    if (!this.config.backscroll) return;

    // collect fixed selectors to array
    const fixedSelectorsElems = document.querySelectorAll(this.config.fixedSelectors);
    const fixedSelectors = Array.prototype.slice.call(fixedSelectorsElems);

    const body = document.body;
    if (this.isOpened === true) {
      body.classList.remove('select-modal__opened');
      body.style.marginRight = '';
      fixedSelectors.forEach((el) => {
        el.style.marginRight = '';
      });
      window.scrollTo(0, this._scrollPosition);
      body.style.top = '';
      return;
    }
    this._scrollPosition = window.pageYOffset;
    const marginSize = window.innerWidth - body.clientWidth;
    body.style.top = `${-this._scrollPosition}px`;

    if (marginSize) {
      body.style.marginRight = `${marginSize}px`;
      fixedSelectors.forEach((el) => {
        el.style.marginRight = `${parseInt(getComputedStyle(el).marginRight, 10) + marginSize}px`;
      });
    }
    body.classList.add('select-modal__opened');
  }
}


const myModal = new HystModal({
  linkAttributeName: "data-hystmodal",
});