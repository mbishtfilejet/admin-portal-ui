
Dropzone.autoDiscover = false;

$(function () {
    /**
     * Dropzone - Service of Process(Upload Documents)
     */
    const sopDropzoneContainer = $('#myAwesomeDropzone1');
    const sopActionUrl = sopDropzoneContainer.attr('action')
    const sopPreviewSelector = sopDropzoneContainer.data('previewsContainer');
    const sopPreviewEl = $(sopPreviewSelector);

    let opts = {
        url: sopActionUrl,
        previewsContainer: sopPreviewSelector,
        previewTemplate: '<div></div>',
        maxFiles: 1,
        init: function () {
            const dz = this;
            this.on('addedfile', function (file) {

                sopPreviewEl.removeClass('d-none').hide().fadeIn(300);

                sopPreviewEl.find('.progress-bar')
                    .css('width', '0%')
                    .attr('aria-valuenow', 0)
                    .text('Uploading...');

                this.emit('success', file, { alert: 'success', url: URL.createObjectURL(file) });
            }).on('uploadprogress', function (file, progress, bytesSent) {
                sopPreviewEl.find('.progress-bar')
                    .css('width', progress + '%')
                    .attr('aria-valuenow', progress);
                if (progress == 100) {
                    sopPreviewEl.find('.progress').fadeOut(1000);
                    sopPreviewEl.find('iframe').removeClass('d-none').hide().fadeIn(1000);
                };
            }).on('success', function (file, response) {
                if (response.alert !== "success") return;

                sopPreviewEl.find('iframe').attr('src', response.url);
            }).on('removedfile', function (file) {

                sopPreviewEl.fadeOut(200);
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            })

            sopPreviewEl.on('click', '[data-bz-remove]', function () {
                if (dz.files.length) {
                    dz.removeFile(dz.files[0]);
                }
            });
        }

    }


    sopDropzoneContainer.dropzone(opts);


    /**
     * Dropzone - General(Upload Documents)
     */
    const generalDropzoneContainer = $('#myAwesomeDropzone2');
    const generalDropzoneContainerActionUrl = generalDropzoneContainer.attr('action')
    const generalPreviewSelector = generalDropzoneContainer.data('previewsContainer');
    const generalPreviewEl = $(generalPreviewSelector);

    opts = {
        url: generalDropzoneContainerActionUrl,
        previewsContainer: generalPreviewSelector,
        previewTemplate: '<div></div>',
        maxFiles: 1,
        init: function () {
            const dz = this;
            this.on('addedfile', function (file) {

                generalPreviewEl.removeClass('d-none').hide().fadeIn(300);

                generalPreviewEl.find('.progress-bar')
                    .css('width', '0%')
                    .attr('aria-valuenow', 0)
                    .text('Uploading...');

                this.emit('success', file, { alert: 'success', url: URL.createObjectURL(file) });
            }).on('uploadprogress', function (file, progress) {
                generalPreviewEl.find('.progress-bar')
                    .css('width', progress + '%')
                    .attr('aria-valuenow', progress);
                if (progress == 100) {
                    generalPreviewEl.find('.progress').fadeOut(1000);
                    generalPreviewEl.find('iframe').removeClass('d-none').hide().fadeIn(1000);
                };
            }).on('success', function (file, response) {
                if (response.alert !== "success") return;

                generalPreviewEl.find('iframe').attr('src', response.url);
            }).on('removedfile', function (file) {
                generalPreviewEl.fadeOut(200);
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            })

            generalPreviewEl.on('click', '[data-bz-remove]', function () {
                if (dz.files.length) {
                    dz.removeFile(dz.files[0]);
                }
            });
        }

    }

    generalDropzoneContainer.dropzone(opts);

})