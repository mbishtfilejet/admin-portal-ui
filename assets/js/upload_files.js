Dropzone.autoDiscover = false;

function toggleScanState(element, showLoader = true) {
    element.find('.placeholderSection').toggleClass('d-none', !showLoader);
    element.find('.ai-summary-placeholder').toggleClass('d-none', !showLoader);
    element.find('.aiFormSection').toggleClass('d-none', showLoader);
    element.find('.ai-extracted-summary').toggleClass('d-none', showLoader);
}

//mimicking the backend when data availabe show iframe
function showIframeWithDelay(element, delay = 3000) {
    setTimeout(() => {
        element.find('.file-loader').fadeOut(100);
        element.find('iframe').removeClass('d-none').hide().fadeIn(1000);
    }, delay)
}

function runScanUI(element, collapse_container_id, no_ai_summary = false) {
    element.removeClass('d-none').hide().fadeIn(300);

    $(`#${collapse_container_id}`).collapse('show');

    element.find('iframe').addClass('d-none')
    element.find('.file-loader').show();
    toggleScanState(element, true)

    setTimeout(() => {
        toggleScanState(element, false)
        animateAIExtractionField(element)
    }, 4000)
}

function resetUI(dz, element) {
    dz.removeAllFiles(true);
    element.fadeOut(100);
    element.find('iframe').attr('src', '');
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

$(function () {
    /**
     * Dropzone - Service of Process(Upload Documents)
     */
    const sopMultiUploadCheckbox = $('#sop_multi_part')
    const sopUploadSection = $('#accordion_SOP')
    const sopDropzoneContainer = $('#myAwesomeDropzone1');
    const sopActionUrl = sopDropzoneContainer.attr('action')
    const sopPreviewSelector = sopDropzoneContainer.data('previewsContainer');
    const sopScannedSelector = sopDropzoneContainer.data('scannedContainer');
    const uploadpreviewSelector = sopDropzoneContainer.data('uploadPreviewTemplate')

    const sopPreviewWrapper = $(sopPreviewSelector).closest('.dropzone-preview-wrapper')
    const sopMulitPartSubmitBtn = sopPreviewWrapper.find('.preview-submit-btn')
    const sopScannedEl = $(sopScannedSelector);


    //Reset UI helper
    let opts = {
        url: sopActionUrl,
        previewsContainer: false,
        previewTemplate: $(uploadpreviewSelector).html(),
        maxFiles: 1,
        init: function () {
            const dz = this;
            this.on('addedfile', function (file) {
                if (!sopMultiUploadCheckbox.is(':checked')) {
                    if (dz.files.length > 1) {
                        dz.removeFile(dz.files[0]);
                    }
                    runScanUI(sopScannedEl, 'collapse_SOP_scan')
                }
                else {
                    if (dz.files.length > 1) {
                        sopScannedEl.fadeOut(100);
                    }
                    sopPreviewWrapper.removeClass('d-none');

                    let nameEl = file.previewElement.querySelector("[data-dz-name]");

                    if (nameEl) {
                        nameEl.setAttribute("title", file.name);
                    }
                }

                // emittting this just for mimicking backend, code not need
                this.emit('success', file, { alert: 'success', url: URL.createObjectURL(file) });

            }).on('uploadprogress', function (file, progress, bytesSent) {
                if (!sopMultiUploadCheckbox.is(':checked')) return;
                const pillprogressBar = $(file.previewElement).find(".dz-progress");
                if (progress == 100) {
                    pillprogressBar.fadeOut(1000);
                }
            }).on('success', function (file, response) {
                if (response.alert !== "success") return;

                sopScannedEl.find('iframe').attr('src', response.url);

                if (!sopMultiUploadCheckbox.is(':checked')) {
                    // adding loading timeout to just remove loader 
                    showIframeWithDelay(sopScannedEl)
                    sopUploadSection.fadeOut(100)
                }
            }).on('removedfile', function () {
                if (!sopMultiUploadCheckbox.is(':checked')) return;

                if (dz.files.length === 0) {
                    sopPreviewWrapper.addClass('d-none');
                    return;
                }

                const latestFile = dz.files[dz.files.length - 1];
                sopScannedEl.find('iframe').attr('src', URL.createObjectURL(latestFile));

            })

            sopScannedEl.on('click', '[data-bz-remove]', function () {
                resetUI(dz, sopScannedEl)
                sopUploadSection.fadeIn(100)
            });

            sopMulitPartSubmitBtn.on('click', function () {
                sopPreviewWrapper.addClass('d-none');
                runScanUI(sopScannedEl, 'collapse_SOP_scan')
                showIframeWithDelay(sopScannedEl)
                sopUploadSection.fadeOut(100)
            })

            $('#sop_redo_scan').on('click', function () {
                runScanUI(sopScannedEl, 'collapse_SOP_scan')
                showIframeWithDelay(sopScannedEl)
            })
        }

    }


    const sopDropZone = new Dropzone("#myAwesomeDropzone1", opts);

    sopMultiUploadCheckbox.on('change', function () {
        const dzInput = sopDropZone.hiddenFileInput;
        //multiple mode
        if ($(this).is(":checked")) {
            sopDropZone.options.maxFiles = null;
            sopDropZone.options.previewsContainer = sopPreviewSelector;
            sopDropZone.options.previewTemplate = $(uploadpreviewSelector).html();

            sopDropZone.previewsContainer = $(sopPreviewSelector).get(0)
            sopDropZone.maxFiles = null

            dzInput.setAttribute('multiple', 'multiple');
        }
        else {
            sopDropZone.options.maxFiles = 1;
            sopDropZone.options.previewsContainer = false;
            sopDropZone.maxFiles = 1
            dzInput.removeAttribute('multiple')
            sopPreviewWrapper.addClass('d-none');

        }

        resetUI(sopDropZone, sopScannedEl)
    })

    /**
     * Dropzone - General(Upload Documents)
     */
    const generalMultiUploadCheckbox = $('#general_multi_part')
    const generalUploadSection = $('#accordion_general')
    const generalDropzoneContainer = $('#myAwesomeDropzone2');
    const generalActionUrl = generalDropzoneContainer.attr('action')
    const generalPreviewSelector = generalDropzoneContainer.data('previewsContainer');
    const generalScannedSelector = generalDropzoneContainer.data('scannedContainer');
    const generaluploadpreviewSelector = generalDropzoneContainer.data('uploadPreviewTemplate')

    const generalPreviewWrapper = $(generalPreviewSelector).closest('.dropzone-preview-wrapper')
    const generalMulitPartSubmitBtn = generalPreviewWrapper.find('.preview-submit-btn')
    const generalScannedEl = $(generalScannedSelector);


    let generalopts = {
        url: generalActionUrl,
        previewsContainer: false,
        previewTemplate: $(generaluploadpreviewSelector).html(),
        maxFiles: 1,
        init: function () {
            const dz = this;
            this.on('addedfile', function (file) {
                if (!generalMultiUploadCheckbox.is(':checked')) {
                    if (dz.files.length > 1) {
                        dz.removeFile(dz.files[0]);
                    }
                    runScanUI(generalScannedEl, 'collapse_general_scan')
                }
                else {
                    if (dz.files.length > 1) {
                        generalScannedEl.fadeOut(100);
                    }
                    generalPreviewWrapper.removeClass('d-none');

                    let nameEl = file.previewElement.querySelector("[data-dz-name]");

                    if (nameEl) {
                        nameEl.setAttribute("title", file.name);
                    }
                }

                // emittting this just for mimicking backend, code not need
                this.emit('success', file, { alert: 'success', url: URL.createObjectURL(file) });

            }).on('uploadprogress', function (file, progress, bytesSent) {
                if (!generalMultiUploadCheckbox.is(':checked')) return;
                const pillprogressBar = $(file.previewElement).find(".dz-progress");
                if (progress == 100) {
                    pillprogressBar.fadeOut(1000);
                }
            }).on('success', function (file, response) {
                if (response.alert !== "success") return;

                generalScannedEl.find('iframe').attr('src', response.url);

                if (!generalMultiUploadCheckbox.is(':checked')) {
                    // adding loading timeout to just remove loader 
                    showIframeWithDelay(generalScannedEl)
                    generalUploadSection.fadeOut(100)
                }
            }).on('removedfile', function () {
                if (!generalMultiUploadCheckbox.is(':checked')) return;

                if (dz.files.length === 0) {
                    generalPreviewWrapper.addClass('d-none');
                    return;
                }

                const latestFile = dz.files[dz.files.length - 1];
                generalScannedEl.find('iframe').attr('src', URL.createObjectURL(latestFile));

            })

            generalScannedEl.on('click', '[data-bz-remove]', function () {
                resetUI(dz, generalScannedEl)
                generalUploadSection.fadeIn(100)
            });

            generalMulitPartSubmitBtn.on('click', function () {
                generalPreviewWrapper.addClass('d-none');
                runScanUI(generalScannedEl, 'collapse_general_scan')
                showIframeWithDelay(generalScannedEl)
                generalUploadSection.fadeOut(100)
            })

            $('#general_redo_scan').on('click', function () {
                runScanUI(generalScannedEl, 'collapse_general_scan')
                showIframeWithDelay(generalScannedEl)
            })
        }

    }


    const generalDropZone = new Dropzone("#myAwesomeDropzone2", generalopts);

    generalMultiUploadCheckbox.on('change', function () {
        const dzInput = generalDropZone.hiddenFileInput;
        //multiple mode
        if ($(this).is(":checked")) {
            generalDropZone.options.maxFiles = null;
            generalDropZone.options.previewsContainer = generalPreviewSelector;
            generalDropZone.options.previewTemplate = $(generaluploadpreviewSelector).html();

            generalDropZone.previewsContainer = $(generalPreviewSelector).get(0)
            generalDropZone.maxFiles = null

            dzInput.setAttribute('multiple', 'multiple');
        }
        else {
            generalDropZone.options.maxFiles = 1;
            generalDropZone.options.previewsContainer = false;
            generalDropZone.maxFiles = 1
            dzInput.removeAttribute('multiple')
            generalPreviewWrapper.addClass('d-none');

        }

        resetUI(generalDropZone, generalScannedEl)
    })

})

function animateAIExtractionField(element) {
    const aiBadgeFields = element.find(".aiFormSection .form-group .ai-badge");

    aiBadgeFields.each(function () {
        const aiBadge = $(this);
        animateBadge(aiBadge);
    })
}

function animateBadge(element) {

    let counter = 0

    let currentbadgeClass = null;

    const value = element.data('value');
    element.text('')

    if (value === 100) {
        rounded = 100;
    }

    let interval = setInterval(() => {

        counter += 10;
        let rounded = Math.floor(counter / 10) * 10;
        if (rounded >= value) {
            rounded = Math.floor(value / 10) * 10;
            clearInterval(interval);
            element.removeClass(currentbadgeClass);
            element.addClass(`bg-${rounded}`)
            element.text(`${value}%`);
            return;
        }
        if (currentbadgeClass) {
            element.removeClass(currentbadgeClass)
        }

        currentbadgeClass = "bg-" + rounded;
        element.addClass(currentbadgeClass);

        element.text(`${counter}%`)
    }, 100)
}