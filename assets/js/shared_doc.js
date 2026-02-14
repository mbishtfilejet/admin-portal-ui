
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


    // serachFieldId.forEach((fieldID) => {
    //     $(`.tab-content ${fieldID}.select2`).on('select2:select', () => {

    //     });
    // })
})
