
$(function () {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    new Chartist.Bar('#top-selling-products', {
        labels: [
            "Apr 2025 - Jun 2025",
            "Jul 2025 - Sep 2025",
            "Oct 2025 - Dec 2025",
            "Jan 2026 - Mar 2026"
        ],
        series: [
            [
                {
                    "value": 9,
                    "meta": "Basic",
                    "className": "foo"
                },
                {
                    "value": 6,
                    "meta": "Basic",
                    "className": "foo"
                },
                {
                    "value": null,
                    "meta": "Basic",
                    "className": "foo"
                },
                {
                    "value": null,
                    "meta": "Basic",
                    "className": "foo"
                }
            ],
            [
                {
                    "value": 10,
                    "meta": "Gold",
                    "className": "foo"
                },
                {
                    "value": 7,
                    "meta": "Gold",
                    "className": "foo"
                },
                {
                    "value": null,
                    "meta": "Gold",
                    "className": "foo"
                },
                {
                    "value": null,
                    "meta": "Gold",
                    "className": "foo"
                }
            ],
            [
                {
                    "value": 63,
                    "meta": "Silver",
                    "className": "foo"
                },
                {
                    "value": 13,
                    "meta": "Silver",
                    "className": "foo"
                },
                {
                    "value": 9,
                    "meta": "Silver",
                    "className": "foo"
                },
                {
                    "value": 2,
                    "meta": "Silver",
                    "className": "foo"
                }
            ],
            [
                {
                    "value": 7,
                    "meta": "Platinum",
                    "className": "foo"
                },
                {
                    "value": null,
                    "meta": "Platinum",
                    "className": "foo"
                },
                {
                    "value": 1,
                    "meta": "Platinum",
                    "className": "foo"
                },
                {
                    "value": null,
                    "meta": "Platinum",
                    "className": "foo"
                }
            ],
            [
                {
                    "value": 7,
                    "meta": "Diamond",
                    "className": "foo"
                },
                {
                    "value": 1,
                    "meta": "Diamond",
                    "className": "foo"
                },
                {
                    "value": null,
                    "meta": "Diamond",
                    "className": "foo"
                },
                {
                    "value": null,
                    "meta": "Diamond",
                    "className": "foo"
                }
            ],
            [
                {
                    "value": 7,
                    "meta": "Deluxe",
                    "className": "foo"
                },
                {
                    "value": null,
                    "meta": "Deluxe",
                    "className": "foo"
                },
                {
                    "value": null,
                    "meta": "Deluxe",
                    "className": "foo"
                },
                {
                    "value": null,
                    "meta": "Deluxe",
                    "className": "foo"
                }
            ],
            [
                {
                    "value": 9,
                    "meta": "Premium",
                    "className": "foo"
                },
                {
                    "value": null,
                    "meta": "Premium",
                    "className": "foo"
                },
                {
                    "value": null,
                    "meta": "Premium",
                    "className": "foo"
                },
                {
                    "value": null,
                    "meta": "Premium",
                    "className": "foo"
                }
            ]
        ],
        color: ['#000']

    }, {
        // Default mobile configuration
        stackBars: true,
        axisX: {
            labelInterpolationFnc: function (value) {
                console.log(value.split(/\s+/).map(function (word) {
                    return word[0];
                }).join(''));
                return value.split(/\s+/).map(function (word) {
                    return word[0];
                }).join('');
            }
        },
        axisY: {
            offset: 20
        },
        plugins: [
            Chartist.plugins.tooltip()
        ]
    }, [
        // Options override for media > 400px
        ['screen and (min-width: 400px)', {
            reverseData: true,
            horizontalBars: true,
            axisX: {
                labelInterpolationFnc: Chartist.noop
            },
            axisY: {
                offset: 60
            }
        }],
        // Options override for media > 800px
        ['screen and (min-width: 800px)', {
            stackBars: false,
            seriesBarDistance: 10
        }],
        // Options override for media > 1000px
        ['screen and (min-width: 1000px)', {
            reverseData: false,
            horizontalBars: false,
            seriesBarDistance: 15
        }]
    ]);



    filingStatusOptions = {
        chart: {
            height: 300,
            type: "pie"
        },
        series: [979, 0, 12, 3108],
        labels: [
            "Info Gathering",
            "Sent to Client",
            "Sent to State",
            "Completed"
        ],
        colors: [
            "#ffc107",
            "#00bcd4",
            "#3f51b5",
            "#009688"
        ],
        tooltip: {
            y: {
                formatter: function (value, {
                    series,
                    seriesIndex,
                    dataPointIndex,
                    w
                }) {
                    return value
                }
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    height: 240
                },
                legend: {
                    show: !1
                }
            }
        }]
    };

    chart = new ApexCharts(document.querySelector("#filing-status"), filingStatusOptions);

    chart.render();


    options = {
        chart: {
            height: 380,
            type: "bar",
            toolbar: {
                show: !1
            }
        },
        plotOptions: {
            bar: {
                horizontal: !0
            }
        },
        dataLabels: {
            enabled: !1
        },
        series: [{
            name: 'Revenue',
            data: [292711.05, 285303.47, 206148.23, 196693.18, 68858.99, 63565.48, 60361.83, 30179.25, 28279.19, 24083.2]
        }],
        colors: ["#009688"],
        xaxis: {
            categories: [
                "Amazon Warehouses",
                "Corporation Inc.",
                "Alphabet Inc.",
                "Test QA Customer",
                "Corporation 2 Inc.",
                "Pricebook FileJet",
                "Fun Foods ",
                "Test New Flow 1 LLC",
                "ApexAlphaVentures",
                "dtestqa"
            ]

        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return formatter.format(val)
                }
            }
        },
        yaxis: {
            labels: {
                y: {
                    text: 'TESTT'
                }
            }
        },
        grid: {
            borderColor: "#f1f3fa"
        }
    };
    (chart = new ApexCharts(document.querySelector("#apex-bar-1"), options)).render();

})


Dropzone.autoDiscover = false;

function runScanUI(element, collapse_container_id) {
    element.removeClass('d-none').hide().fadeIn(300);

    $(`#${collapse_container_id}`).collapse('show');
    element.find('.placeholderSection').removeClass('d-none');
    element.find('.aiFormSection').addClass('d-none');
    element.find('.ai-summary-placeholder').removeClass('d-none');
    element.find('.ai-extracted-summary').addClass('d-none');
    element.find('iframe').addClass('d-none')
    element.find('.progress').show();
    element.find('.progress-bar')
        .css('width', '0%')
        .attr('aria-valuenow', 0)
        .text('Uploading...');

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
    const sopDropzoneContainer = $('#myAwesomeDropzone1');
    const sopActionUrl = sopDropzoneContainer.attr('action')
    const sopPreviewSelector = sopDropzoneContainer.data('previewsContainer');
    const sopScannedSelector = sopDropzoneContainer.data('scannedContainer');
    const uploadpreviewSelector = sopDropzoneContainer.data('uploadPreviewTemplate')
    const sopScannedEl = $(sopScannedSelector);

    let opts = {
        url: sopActionUrl,
        previewsContainer: sopPreviewSelector,
        previewTemplate: $(uploadpreviewSelector).html(),
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

                runScanUI(sopScannedEl, 'collapse_SOP_scan')
                // emittting this just for mimicking backend, code not need
                this.emit('success', file, { alert: 'success', url: URL.createObjectURL(file) });

            }).on('uploadprogress', function (file, progress, bytesSent) {
                const pillFileUploadProgressBar = $(file.previewElement).find(".dz-progress");
                sopScannedEl.find('.progress-bar')
                    .css('width', progress + '%')
                    .attr('aria-valuenow', progress);
                if (progress == 100) {
                    pillFileUploadProgressBar.fadeOut(2000)
                    sopScannedEl.find('.progress').fadeOut(1000);
                };
            }).on('success', function (file, response) {
                if (response.alert !== "success") return;
                // adding loading timeout to just show loader
                setTimeout(() => {
                    sopScannedEl.find('.file-loader').fadeOut(100);
                    sopScannedEl.find('iframe').removeClass('d-none').hide().fadeIn(1000);
                }, 3000)

                sopScannedEl.find('iframe').attr('src', response.url);
            }).on('removedfile', function () {
                const remainingFiles = dz.files;

                if (remainingFiles.length > 0) {
                    const latestFile = remainingFiles[remainingFiles.length - 1];
                    runScanUI(sopScannedEl, 'collapse_SOP_scan');

                    // mocking code to showcase backend when file is removed
                    // fading out progress bar for now
                    this.emit('success', latestFile, { alert: 'success', url: URL.createObjectURL(latestFile) });
                    sopScannedEl.find('.progress').fadeOut(10);
                } else {
                    sopScannedEl.fadeOut(200);
                    sopScannedEl.find('iframe').attr('src', '');
                }
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            })

            sopScannedEl.on('click', '[data-bz-remove]', function () {
                sopScannedEl.fadeOut(200);
                sopScannedEl.find('iframe').attr('src', '');
                dz.removeAllFiles(true);

            });
        }

    }


    sopDropzoneContainer.dropzone(opts);


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

                runScanUI(generalScannedEl,'collapse_general_scan')
        
                // emittting this just for mimicking backend, code not need
                this.emit('success', file, { alert: 'success', url: URL.createObjectURL(file) });

            }).on('uploadprogress', function (file, progress) {
                const pillFileUploadProgressBar = $(file.previewElement).find(".dz-progress");
                generalScannedEl.find('.progress-bar')
                    .css('width', progress + '%')
                    .attr('aria-valuenow', progress);
                if (progress == 100) {
                    pillFileUploadProgressBar.fadeOut(2000)
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
                const remainingFiles = dz.files;

                if (remainingFiles.length > 0) {
                    const latestFile = remainingFiles[remainingFiles.length - 1];
                    runScanUI(generalScannedEl, 'collapse_general_scan');

                    // mocking code to showcase backend when file is removed
                    // fading out progress for now
                    this.emit('success', latestFile, { alert: 'success', url: URL.createObjectURL(latestFile) });
                    generalScannedEl.find('.progress').fadeOut(10);
                } else {
                    generalScannedEl.fadeOut(200);
                    generalScannedEl.find('iframe').attr('src', '');
                }
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            })

            generalScannedEl.on('click', '[data-bz-remove]', function () {
                generalScannedEl.fadeOut(200);
                generalScannedEl.find('iframe').attr('src', '');
                dz.removeAllFiles(true);
            });
        }

    }

    generalDropzoneContainer.dropzone(opts);

})

$(document).ready(function () {
    function highlightTabs(tab) {

        const tabOffset = tab.position();

        $(".sharedDocumnent_tablist").css({
            '--tab-left': tabOffset.left + 'px',
            '--tab-top': tabOffset.top + 'px',
            '--tab-width': tab.outerWidth() + 'px',
            '--tab-height': tab.outerHeight() + 'px'
        })
    }

    //tab change event
    $('.sharedDocumnent_tablist .nav-link').on('shown.bs.tab', function () {
        highlightTabs($(this));
    });

    // handle resize
    $(window).on('resize', function () {
        highlightTabs($('.sharedDocumnent_tablist  .nav-link.active'));
    });

    highlightTabs($(".sharedDocumnent_tablist .nav-link.active"))
})

$(document).ready(function () {

    $(".tab-content .select2").each(function () {
        const selectEl = $(this);
        const placeholder = selectEl.attr('placeholder');
        const searchAllowed = selectEl.data('searchAllowed');

        selectEl.select2({
            placeholder: placeholder,
            ...(!searchAllowed ? { minimumResultsForSearch: Infinity } : {})
        })
    })

    $('.tab-content .select2').on('select2:open select2:select', () => {
        $('.select2-search__field').attr('placeholder', 'Search...');
    });
});

// functionality wise code just for reference
$(function () {
    // const searchFieldId = ["#inputEntity", "#inputGeneralEntity"];

    $(document).on('select2:select', '.tab-content .select2.entity-field', function () {


        const parent = $(this).closest('.prefilled-container');

        const customerField = parent.find('.customer-field');
        const groupField = parent.find('.group-field');
        const jurisdictionField = parent.find('.jurisdiction-field');

        setValue(customerField, "Alphabet Inc.");
        setValue(groupField, "Adept HR");
        setValue(jurisdictionField, "AZ");

    })

    function setValue(element, data) {
        if (!data) return;

        let option = element.find(`option[value="${data}"]`);

        option.prop('selected', true);

        element.trigger('change');

    }


    $('.tab-content .select2.entity-field').on('select2:open select2:select', function () {

        const selectElement = $(this);
        const matchIcon = selectElement.closest('.form-group').find('.multi-match-icon');

        $('.select2-search__field').on('input', debounce(function (e) {
            let matchCount = 0;
            let value = e.target.value.trim().toLowerCase();
            let results = $('.select2-results__option');

            if (value) {
                results.each(function () {
                    let optionValue = $(this).text().trim().toLowerCase();
                    if (optionValue.startsWith(value)) matchCount++;
                });
            } else {
                matchCount = 0;
            }

            if (matchCount > 1) {
                matchIcon.fadeIn(50);
            } else {
                matchIcon.fadeOut(50);
            }
        }, 500));
    });
})

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function animateAIExtractionField(element) {
    const aiBadgeFields = element.find(".generalSection .form-group .ai-badge");

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