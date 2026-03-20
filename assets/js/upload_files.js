Dropzone.autoDiscover = false;

function runScanUI(element, collapse_container_id) {
    element.removeClass('d-none').hide().fadeIn(300);

    $(`#${collapse_container_id}`).collapse('show');
    element.find('.placeholderSection').removeClass('d-none');
    element.find('.aiFormSection').addClass('d-none');
    element.find('.ai-summary-placeholder').removeClass('d-none');
    element.find('.ai-extracted-summary').addClass('d-none');
    element.find('iframe').addClass('d-none')
    element.find('.file-loader').show();

    setTimeout(() => {
        element.find('.placeholderSection').addClass('d-none');
        element.find('.ai-summary-placeholder').addClass('d-none');
        element.find('.aiFormSection').removeClass('d-none').hide().fadeIn(500);
        animateAIExtractionField(element);
        element.find('.ai-extracted-summary').removeClass('d-none').hide().fadeIn(500);
    }, 4000)
}

$(function () {
    /**
     * Dropzone - Service of Process(Upload Documents)
     */
    const sopMultiUploadCheckbox = $('#sop_multi_part')
    const sopDropzoneContainer = $('#myAwesomeDropzone1');
    const sopActionUrl = sopDropzoneContainer.attr('action')
    const sopPreviewSelector = sopDropzoneContainer.data('previewsContainer');
    const sopScannedSelector = sopDropzoneContainer.data('scannedContainer');
    const uploadpreviewSelector = sopDropzoneContainer.data('uploadPreviewTemplate')
    const sopPreviewWrapper = $(sopPreviewSelector).closest('.dropzone-preview-wrapper')
    const sopMulitPartSubmitBtn = sopPreviewWrapper.find('.preview-submit-btn')
    const sopScannedEl = $(sopScannedSelector);

    let opts = {
        url: sopActionUrl,
        previewsContainer: false,
        previewTemplate: $(uploadpreviewSelector).html(),
        maxFiles: 1,
        init: function () {
            const dz = this;
            this.on('addedfile', function (file) {
                //added below code just for mimicking backend, code not need
                if (dz.files.length > 1 && !sopMultiUploadCheckbox.is(':checked')) {
                    dz.removeFile(dz.files[0]);
                }

                if (dz.files.length > 1 && sopMultiUploadCheckbox.is(':checked')) {
                    sopScannedEl.fadeOut(100);
                }

                if (!sopMultiUploadCheckbox.is(':checked')) {
                    runScanUI(sopScannedEl, 'collapse_SOP_scan')
                } else {

                    sopPreviewWrapper.removeClass('d-none');

                    let nameEl = file.previewElement.querySelector("[data-dz-name]");

                    if (nameEl) {
                        nameEl.setAttribute("title", file.name);
                    }
                }

                // emittting this just for mimicking backend, code not need
                this.emit('success', file, { alert: 'success', url: URL.createObjectURL(file) });

            }).on('uploadprogress', function (file, progress, bytesSent) {
                if (sopMultiUploadCheckbox.is(':checked')) {
                    const pillFileUploadProgressBar = $(file.previewElement).find(".dz-progress");
                    if (progress == 100) {
                        pillFileUploadProgressBar.fadeOut(1000);
                    };
                }
            }).on('success', function (file, response) {
                if (response.alert !== "success") return;

                if (!sopMultiUploadCheckbox.is(':checked')) {
                    // adding loading timeout to just show loader
                    setTimeout(() => {
                        sopScannedEl.find('.file-loader').fadeOut(100);
                        sopScannedEl.find('iframe').removeClass('d-none').hide().fadeIn(1000);
                    }, 3000)
                }
                sopScannedEl.find('iframe').attr('src', response.url);
            }).on('removedfile', function () {

                if (sopMultiUploadCheckbox.is(':checked')) {
                    if (dz.files.length === 0) {

                        sopPreviewWrapper.addClass('d-none');
                        return;
                    }

                    const latestFile = dz.files[dz.files.length - 1];
                    sopScannedEl.find('iframe').attr('src', URL.createObjectURL(latestFile));
                } else {
                    sopScannedEl.fadeOut(100);
                    sopScannedEl.find('iframe').attr('src', '');
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }

            })

            sopScannedEl.on('click', '[data-bz-remove]', function () {
                dz.removeAllFiles(true);
                sopScannedEl.fadeOut(100);
                sopScannedEl.find('iframe').attr('src', '');
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            sopMulitPartSubmitBtn.on('click', function () {
                sopPreviewWrapper.addClass('d-none');
                runScanUI(sopScannedEl, 'collapse_SOP_scan')

                setTimeout(() => {
                    sopScannedEl.find('.file-loader').fadeOut(100);
                    sopScannedEl.find('iframe').removeClass('d-none').hide().fadeIn(1000);
                }, 3000)
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
            dzInput.setAttribute('multiple', 'multiple')
        }
        else {
            sopDropZone.options.maxFiles = 1;
            sopDropZone.options.previewsContainer = false;
            sopDropZone.maxFiles = 1
            dzInput.removeAttribute('multiple')
            sopPreviewWrapper.addClass('d-none');

        }
        console.log(sopDropZone)
        sopDropZone.removeAllFiles(true);
    })


    /**
     * Dropzone - General(Upload Documents)
     */
    const generalDropzoneContainer = $('#myAwesomeDropzone2');
    const generalDropzoneContainerActionUrl = generalDropzoneContainer.attr('action')
    const generalScannedSelector = generalDropzoneContainer.data('scannedContainer');
    const generaluploadpreviewSelector = generalDropzoneContainer.data('uploadPreviewTemplate')
    const generalPreviewSelector = generalDropzoneContainer.data('previewsContainer');
    const generalScannedEl = $(generalScannedSelector);

    opts = {
        url: generalDropzoneContainerActionUrl,
        previewsContainer: generalPreviewSelector,
        previewTemplate: $(generaluploadpreviewSelector).html(),
        init: function () {
            const dz = this;
            this.on('addedfile', function (file) {

                //added below code just for mimicking backend, code not need
                // if (dz.files.length > 1) {
                //     dz.removeFile(dz.files[0]);
                // }

                let nameEl = file.previewElement.querySelector("[data-dz-name]");

                if (nameEl) {
                    nameEl.setAttribute("title", file.name);
                }

                runScanUI(generalScannedEl, 'collapse_general_scan')

                // emittting this just for mimicking backend, code not need
                this.emit('success', file, { alert: 'success', url: URL.createObjectURL(file) });

            }).on('uploadprogress', function (file, progress) {
                const pillFileUploadProgressBar = $(file.previewElement).find(".dz-progress");
                generalScannedEl.find('.progress-bar')
                    .css('width', progress + '%')
                    .attr('aria-valuenow', progress);
                if (progress == 100) {
                    pillFileUploadProgressBar.fadeOut(1000)
                    generalScannedEl.find('.progress').fadeOut(1000);
                };
            }).on('success', function (file, response) {
                if (response.alert !== "success") return;

                // adding loading timeout to just show loader
                setTimeout(() => {
                    generalScannedEl.find('.file-loader').fadeOut(100);
                    generalScannedEl.find('iframe').removeClass('d-none').hide().fadeIn(1000);
                }, 3000)

                generalScannedEl.find('iframe').attr('src', response.url);
            }).on('removedfile', function (file) {
                const isBulk = dz?.isBulkRemoval === true;
                const remainingFiles = dz.files || [];

                // If all file removal -> skip everything
                if (isBulk) {
                    if (remainingFiles.length === 0) {
                        generalScannedEl.fadeOut(100);
                        generalScannedEl.find('iframe').attr('src', '');

                        delete dz.isBulkRemoval;
                    }
                    return;
                }

                // -- Single file removal logic --
                if (remainingFiles.length === 0) {
                    generalScannedEl.fadeOut(100);
                    generalScannedEl.find('iframe').attr('src', '');
                    return
                }

                const latestFile = remainingFiles[remainingFiles.length - 1];
                runScanUI(generalScannedEl, 'collapse_general_scan');

                // mocking code to showcase backend when file is removed
                // fading out progress bar for now
                this.emit('success', latestFile, { alert: 'success', url: URL.createObjectURL(latestFile) });
                generalScannedEl.find('.progress').fadeOut(10);

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            })

            generalScannedEl.on('click', '[data-bz-remove]', function () {
                dz.isBulkRemoval = true
                dz.removeAllFiles(true);
            });
        }

    }

    generalDropzoneContainer.dropzone(opts);

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