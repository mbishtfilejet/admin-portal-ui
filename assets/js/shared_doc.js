
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

// just for refrence to get the layout accurate for order tab table dont need this code
function tableInit(tableId) {
    const tableContainer = $(`table[data-tabId="${tableId}"]`)

    console.log(tableContainer)
    let options = {
        language: {
            processing: 'Loading...',
            emptyTable: `<div class='text-center alert alert-info'><i class='fa fa-info-circle'></i>'No record available'</div>`,
            sPaginate: {
                sNext: "<i class='mdi mdi-chevron-left'>",
                sPrevious: "<i class='mdi mdi-chevron-right'>",
            }
        },
        scrollX: true,
        scrollY: "45vh",
        lengthChange: false,
        searching: true,
        info: false,
        paging: true,
        pagingType: "simple_numbers",
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded")
        },
        buttons: dbuttons(tableContainer),
        dom: 'Blfrtip',
        sScrollXInner: "100%",
        order: [[0, "desc"]],
    };

    tableContainer.DataTable(options)
}



$(function () {
    const tableId = ["received", "in_process", "completed"]

    tableId.forEach(val => {
        tableInit(val)
    })
})


function dbuttons(tableContainer) {
    let dbuttons = [];

    if ($.type(tableContainer.data('actions')) != "undefined") {
        $.each(tableContainer.data('actions'), function (bindex, button) {

            let hasExtra = $.type(button.extra) != "undefined";

            let extra = hasExtra ? button.extra : {};
            console.log(button)

            dbuttons.push({
                attr: extra, text: button.title, className: button.className, action: function (e, dt, node, config) {
                    if (!hasExtra) {
                        window.location = button.url;
                    }
                }
            });
        });
    }


    return dbuttons
}

$('#orderTab li a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    const currentTab = $(e.target);
    const tabKey = currentTab.data('tab-key');
    $(`table[data-tabId="${tabKey}"]`).DataTable().columns.adjust()
});



// this code is needed to have select2 initialize for ordertab table under upload documents section


$(document).ready(function () {
    $('#uploadDOCtype').select2({
        placeholder: 'Choose Document Type',
        minimumResultsForSearch: Infinity
    })

    $(document).on('select2:select', '#uploadDOCtype', function () {
        const select = $(this)

        const container = select.closest('.upload_section_wrapper')

        const uploadSection = container.find(".upload_section");

        uploadSection.removeClass("d-none")
    })
})
