
function tableInit(table) {
    const tableContainer = $(`table.${table}`)

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
    let tables = ["user-datatable", "client-datatable", "notes-datatable", "payment-datatable", "subscription-datatable", "maintenance-datatable"];
    tables.forEach((table) => {
        tableInit(table)
    })
})

function dbuttons(tableContainer) {
    let dbuttons = [];

    if ($.type(tableContainer.data('actions')) != "undefined") {
        $.each(tableContainer.data('actions'), function (bindex, button) {

            let hasExtra = $.type(button.extra) != "undefined";

            let extra = hasExtra ? button.extra : {};

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

$(document).on('shown.bs.tab', function () {
    let tables = ["user-datatable", "client-datatable", "notes-datatable", "payment-datatable", "subscription-datatable", "maintenance-datatable"];
    tables.forEach((table) => {
        $(`table.${table}`).DataTable().columns.adjust()
    })
});

$(document).on("change", ".payment-method", function () {
    if ($(".payment-method:checked").val() == 'card') {
        $(".add-card-fields").removeClass('d-none');
        $(".add-ach-fields").addClass('d-none');
    } else {
        $(".add-card-fields").addClass('d-none');
        $(".add-ach-fields").removeClass('d-none');
    }
}).change();

$(document).ready(function () {
    $(".customSelect2").each(function () {
        const selectEl = $(this);
        const parent = $(this).closest('.modal') || $(this).closest('.custom-dropdown');
        const placeholder = selectEl.attr('placeholder');

        selectEl.select2({
            dropdownParent: parent,
            placeholder: placeholder,
        })
    })
});

$(document).ready(function () {
    // Initially hide all forms
    $('.toggle-form').css('display', 'none');

    // Show the form that matches the checked radio
    $('.toggle-radio:checked').each(function () {
        var target = $(this).data('target');
        $('#' + target).css('display', 'block');
    });

    // On radio button change
    $('.toggle-radio').on('change', function () {
        var target = $(this).data('target');

        // First, hide all forms related to the same group
        var groupName = $(this).attr('name'); // Get radio group name
        $('input[name="' + groupName + '"]').each(function () {
            var relatedTarget = $(this).data('target');
            $('#' + relatedTarget).css('display', 'none');
        });

        // Then show the selected form
        $('#' + target).css('display', 'block');
    });
});
