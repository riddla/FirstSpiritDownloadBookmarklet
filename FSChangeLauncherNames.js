javascript:(function() {
// jquerify.js
// https://github.com/bgrins/devtools-snippets
// Add jQuery to any page that does not have it already.

(function() {

    if (!window.jQuery) {
        var dollarInUse = !!window.$;
        var s = document.createElement('script');
        s.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js');
        s.addEventListener('load', function() {
            console.log('jQuery loaded!');

            jQuery.noConflict();
            init();

        });

        document.body.appendChild(s);

    } else {
        init();
    }

}
)();

function init() {
    var licenseType = jQuery('.fs-license-type').text();
    var licenseUser = jQuery('.fs-license-user').text();

    changeSiteArchitectLink(licenseType, licenseUser);
    changeQuickStartLinks(licenseType, licenseUser);
}

function changeQuickStartLinks(licenseType, licenseUser) {
    jQuery('.quickstart .projectlinks_entry').each(function() {
        var $link = jQuery(this).find('a');
        var text = $link.text().clean().replace(/\s/g, "_")
        buildDownloadFileName($link, licenseType, licenseUser, text);
    });
}

function changeSiteArchitectLink(licenseType, licenseUser) {
    return buildDownloadFileName(jQuery('.button_sitearchitect'), licenseType, licenseUser);
}

function buildDownloadFileName($link, licenseType, licenseUser, additional) {
    var downloadFileName = `${licenseUser}-${licenseType}`;

    if (additional) {
        downloadFileName += `_${additional}`;
    }

    downloadFileName += '.jnlp'

    console.log('changed', $link.attr('href'), 'to', downloadFileName);

    $link.attr('download', downloadFileName);

    return downloadFileName;
}
}
