if (navigator.share) {
    console.log("Support du presse papier")
    document.querySelectorAll('[data-share-url]').forEach(($clipboardEl) => {
        const $button = document.createElement('button');
        $button.innerHTML = 'Partager';
        $clipboardEl.parentNode.append($button);
        $button.addEventListener(
            'click',
            shareUrl.bind(this, $clipboardEl, $button)
        );
    });
} else {
    console.warn("Pas de support")
}

function shareUrl() {
    navigator
        .share({
            title: $shareEl.getAttribute('data-share-title'),
            text: $shareEl.getAttribute('data-share-text'),
            url: $shareEl.getAttribute('data-share-url'),
        })
}