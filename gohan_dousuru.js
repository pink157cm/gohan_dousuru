document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.tile');
    const selectedItemsInput = document.getElementById('selected_items');
    const mainSelect = document.getElementById('main1');
    const sideSelect = document.getElementById('side1');
    const soupSelect = document.getElementById('soup1');
    const dateInput1 = document.getElementById('date1');
    const dateInput2 = document.getElementById('date2');
    const dateInput3 = document.getElementById('date3');

    const options = {
        main1: {
            'ピーマン': ["ピーマン肉詰め", "ファヒータ", "ガパオライス", "プルコギ"],
            'キャベツ': ["ロールキャベツ", "生姜焼き", "焼うどん", "焼きそば"],
            '玉ねぎ': ["親子丼", "生姜焼き", "ハヤシライス", "カレーライス", "プルコギ", "玉ねぎ焼き", "牛皿", "肉豆腐"],
            '人参': ["カレーライス", "焼うどん", "焼きそば", "きんぴらごぼう"],
            'セロリ': ["フェジョアーダ", "ミネストローネ"],
            'レタス': ["タコス", "レタスと韓国のりのサラダ"],
        },
        side1: {
            'ピーマン': ["ピーマン肉詰め", "ファヒータ", "ガパオライス", "プルコギ"],
            'キャベツ': ["ロールキャベツ", "生姜焼き", "焼うどん", "焼きそば"],
            '玉ねぎ': ["親子丼", "生姜焼き", "ハヤシライス", "カレーライス", "プルコギ", "玉ねぎ焼き", "牛皿", "肉豆腐"],
            '人参': ["カレーライス", "焼うどん", "焼きそば", "きんぴらごぼう"],
            'セロリ': ["フェジョアーダ", "ミネストローネ"],
            'レタス': ["タコス", "レタスと韓国のりのサラダ"],
        },
        soup1: {
            'ピーマン': ["ピーマン肉詰め", "ファヒータ", "ガパオライス", "プルコギ"],
            'キャベツ': ["ロールキャベツ", "生姜焼き", "焼うどん", "焼きそば"],
            '玉ねぎ': ["親子丼", "生姜焼き", "ハヤシライス", "カレーライス", "プルコギ", "玉ねぎ焼き", "牛皿", "肉豆腐"],
            '人参': ["カレーライス", "焼うどん", "焼きそば", "きんぴらごぼう"],
            'セロリ': ["フェジョアーダ", "ミネストローネ"],
            'レタス': ["タコス", "レタスと韓国のりのサラダ"],
        },
    };

    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            tile.classList.toggle('selected');
            updateSelectedItems();
        });
    });

    function updateSelectedItems() {
        const selectedValues = Array.from(tiles)
            .filter(tile => tile.classList.contains('selected'))
            .map(tile => tile.getAttribute('data-value'));

        selectedItemsInput.value = selectedValues.join(',');
        highlightOptions(selectedValues);
    }

    function highlightOptions(selectedValues) {
        selectedValues.forEach(value => {
            highlightSelectOptions(mainSelect, options.main1[value]);
            highlightSelectOptions(sideSelect, options.side1[value]);
            highlightSelectOptions(soupSelect, options.soup1[value]);
        });
    }

    function highlightSelectOptions(selectElement, itemsToHighlight) {
        Array.from(selectElement.options).forEach(option => {
            if (itemsToHighlight && itemsToHighlight.includes(option.value)) {
                option.style.backgroundColor = '#ffe9ec';
            }
        });
    }

function formatDate(date) {
    const options = { timeZone: 'Asia/Hong_Kong', year: 'numeric', month: '2-digit', day: '2-digit' };
    const formatter = new Intl.DateTimeFormat('en-CA', options);
    const parts = formatter.format(date).split('/');
    return `${parts[0]}-${parts[1]}-${parts[2]}`; // Return in YYYY-MM-DD format
}

    function setDefaultDates() {
        const today = new Date();
        document.getElementById('date1').value = formatDate(today);
        document.getElementById('date2').value = formatDate(new Date(today.getTime() + 24 * 60 * 60 * 1000)); 
        document.getElementById('date3').value = formatDate(new Date(today.getTime() + 48 * 60 * 60 * 1000)); 
    }
    
    setDefaultDates();
    
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    // Set min and max attributes for each date input
    const dateInputs = ['date1', 'date2', 'date3'];
    
    dateInputs.forEach(id => {
        document.getElementById(id).min = formatDate(today);
        document.getElementById(id).max = formatDate(nextWeek);
    });

    const selectElements = document.querySelectorAll('.dropdown');
    
    selectElements.forEach(selectElement => {
        selectElement.addEventListener('change', function() {
            const otherInput = this.nextElementSibling;
    
            if (this.value === 'その他') {
                otherInput.classList.remove('tw-hidden');
                otherInput.required = true;
            } else {
                otherInput.required = false;
                otherInput.value = '';
            }
        });
    });
});
