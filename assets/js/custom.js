
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
    initializeSelect2(this)
});

function initializeSelect2(container) {
    $(container).find('.customSelect2').each(function () {
        if ($(this).hasClass('select2-hidden-accessible')) {
            return; // already initialized
        }

        $(this).select2({
            dropdownParent: $(this).closest('.modal'),
            placeholder: $(this).attr('placeholder')
        });
    });
}

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


$(window).on('resize', function () {
    $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
});
$(document).ready(function () {
    let paymentDataTable;
    let tableItem = function (config, option) {
        if (typeof (config[option]) != 'undefined') {
            return config[option];
        }

        return false;
    }

    const subscriptionModal = $('.subscription-modal');

    subscriptionModal.on('show.bs.modal', function (event) {
        const modal = $(this)

        if (paymentDataTable) {
            return;
        }

        paymentDataTable = modal.find('.ajax-datatable').DataTable(
            {
                data: tableData,
                columns: [
                    { orderable: false },
                    {},
                    {},
                    {},
                    {},
                    { orderable: false },
                    { orderable: false }],
                order: [[1, 'asc']],
                language: {
                    processing: 'Loading...',
                    emptyTable: `<div class='text-center alert alert-info'><i class='fa fa-info-circle'></i>Not Found</div>`,
                    sPaginate: {
                        sNext: "<i class='mdi mdi-chevron-left'>",
                        sPrevious: "<i class='mdi mdi-chevron-right'>",
                    }
                },
                "paging": true,
                "pagingType": "simple_numbers",
                "drawCallback": function () {
                    $(".dataTables_paginate > .pagination").addClass("pagination-rounded")
                },
                "lengthChange": false,
                "searching": true,
                "info": false,
                "autoWidth": false,
                scrollY: "45vh",
                "scrollX": true,
                "sScrollXInner": "100%",
            }
        );

    })

    subscriptionModal.on('shown.bs.modal', function () {
        paymentDataTable.columns.adjust();

        initializeSelect2(this)
    })


    $(this).on('click', '.toggle-subscription-item', function () {
        var iconContainer = $(this).find('i');
        var expandClassName = 'fa-plus-square';
        var collapseClassName = 'fa-minus-square';

        iconContainer.toggleClass(expandClassName).toggleClass(collapseClassName);

        var tr = $(this).parent('td').closest('tr');
        console.log(paymentDataTable)
        var row = paymentDataTable.row(tr);

        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('dt-row-active');
        } else {

            var div = $('<div/>').addClass('service-loader');

            div.html(childData.data)

            row.child(div, 'dt-row-child dt-row-active').show();
            tr.addClass('dt-row-active');

            initializeSelect2($(div))
        }
    });

})



// const childData = {
//     "data": "<table class=\"table bg-info text-white\">\n<tbody>\n<tr>\n<td width=\"10\"><\/td>\n<td>\n<div class=\"checkbox checkbox-primary\">\n<input id=\"annual-report-\" type=\"checkbox\" class=\"subscription-line-item\">\n<label style=\"opacity:1\" for=\"annual-report-\">Annual Report Subscription<\/label>\n<\/div>\n<\/td>\n<td><select class=\"custom-select customSelect2 form-option payment-method-select\"><option value=1229>Amex Card<\/option><option value=1228>Alaska LLC Card (Alaska_llc)<\/option><\/select><\/td>\n<td><\/td>\n<td><\/td>\n<td class=\"text-center\">\n$200.00<\/td>\n <\/tr>\n<tr>\n<td width=\"10\"><\/td>\n<td>\n<div class=\"checkbox checkbox-primary\">\n<input id=\"ra-service-\" type=\"checkbox\" class=\"subscription-line-item\" value=\"150\" >\n<label style=\"opacity:1\" for=\"ra-service-\">Registered Agent Subscription<\/label>\n<\/div>\n<\/td>\n<td><select class=\"custom-select customSelect2 form-option payment-method-select\"><option value=1229>Amex Card<\/option><option value=1228>Alaska LLC Card (Alaska_llc)<\/option><\/select><\/td>\n<td><\/td>\n<td><\/td>\n<td class=\"text-center\">$140.00<\/td>\n <\/tr>\n<tr>\n<td width=\"10\"><\/td>\n<td>\n<div class=\"checkbox checkbox-primary\">\n<input id=\"boi-report-\" type=\"checkbox\" class=\"subscription-line-item\" value=\"164\" data-parent=\"#addtosub-\" >\n<label style=\"opacity:1\" for=\"boi-report-\">BOI Subscription<\/label>\n<\/div>\n<\/td>\n<td><select class=\"custom-select customSelect2 form-option payment-method-select\"><option value=1229>Amex Card<\/option><option value=1228>Alaska LLC Card (Alaska_llc)<\/option><\/select><\/td>\n<td><\/td>\n<td><\/td>\n<td class=\"text-center\">\n$100.00<\/td>\n<\/tr>\n<tr class=\"bg-primary text-white\"><td width=\"10\"><\/td><td>Services Total Filejet Fee <\/td>\n<td><\/td>\n<td><\/td>\n<td><\/td>\n<td class=\"text-center\">\n<span id=\"item-cart-total\">$0.00<\/span><\/td>\n<\/tr>\n<\/tbody>\n<\/table>\n"
// }

const childData = {
    "data": "<table class=\"table bg-info text-white\">\n                <tbody>\n                                            <tr>\n                    <td width=\"10\"><\/td>\n                    <td>\n                        <div class=\"checkbox checkbox-primary\">\n                            <input id=\"annual-report\" type=\"checkbox\" class=\"subscription-line-item\" checked>\n                           <!-- \n                            \/**\n                            * FL-831 Make annual report dynamic, fetching from services\n                            *\/ -->\n                            <label style=\"opacity:1\" for=\"annual-report\">Annual Report Subscription<\/label>\n                        <\/div>\n                    <\/td>\n                    <td><select class=\"custom-select customSelect2 form-option payment-method-select\"><option value=1229>Amex Card<\/option><option value=1228>Alaska LLC Card (Alaska_llc)<\/option><\/select><\/td>\n                    <td><\/td>\n                    <td><\/td>\n                    <td class=\"text-center\">\n                                                $200.00                    <\/td>\n                <\/tr>\n                                        <tr>\n                    <td width=\"10\"><\/td>\n                    <td>\n                        <div class=\"checkbox checkbox-primary\">\n                            <!-- \n                                \/**\n                                 * FL-831 Update RA price now Renewal Price will be use.\n                                *\/\n                             -->\n                            <input id=\"ra-service\" type=\"checkbox\" class=\"subscription-line-item\" checked>\n                            <label style=\"opacity:1\" for=\"ra-service\">Registered Agent Subscription<\/label>\n                        <\/div>\n                    <\/td>\n                    <td><select class=\"custom-select customSelect2 form-option payment-method-select\"><option value=1229>Amex Card<\/option><option value=1228>Alaska LLC Card (Alaska_llc)<\/option><\/select><\/td>\n                    <td><\/td>\n                    <td><\/td>\n                    <td class=\"text-center\">\n                                        \n                     <!-- \n                        \/**\n                        * FL-831 Update RA price now Renewal Price will be use.\n                        *\/\n                    -->\n                    $140.00                    <\/td>\n                <\/tr>\n                                                        <tr>\n                    <td width=\"10\"><\/td>\n                    <td>\n                        <div class=\"checkbox checkbox-primary\">\n                            <input id=\"boi-report\" type=\"checkbox\" class=\"subscription-line-item\" >\n                           <!-- \n                            \/**\n                            * FL-831 Make annual report dynamic, fetching from services\n                            *\/ -->\n                            <label style=\"opacity:1\" for=\"boi-report\">BOI Subscription<\/label>\n                        <\/div>\n                    <\/td>\n                    <td><select class=\"custom-select customSelect2 form-option payment-method-select\"><option value=1229>Amex Card<\/option><option selected value=1228>Alaska LLC Card (Alaska_llc)<\/option><\/select><\/td>\n                    <td><\/td>\n                    <td><\/td>\n                    <td class=\"text-center\">\n                                                $100.00                    <\/td>\n                <\/tr>\n            \n           \n                             \n                     <!-- Entity Trade Names -->\n                                        \n                                            <tr>\n    <td width=\"10\"><\/td>\n    <td>\n        <div class=\"checkbox checkbox-primary\">\n\n            <input \n                id=\"business_license_renewal_annual_filing\" \n          type=\"checkbox\" class=\"subscription-line-item\" \n        >\n\n            <label style=\"opacity:1\" for=\"business_license_renewal_annual_filing\">\n                Business License Subscription                \n                            <\/label>\n        <\/div>\n    <\/td>\n    <td><select class=\"custom-select customSelect2 form-option payment-method-select\"><option value=1229>Amex Card<\/option><option value=1228>Alaska LLC Card (Alaska_llc)<\/option><\/select><\/td>\n    <td><\/td>\n    <td><\/td>\n    <td class=\"text-center\">\n                $20.00    <\/td>\n<\/tr>                                    \n                 \n                     <!-- Entity Trade Names -->\n                                            <tr>\n    <td width=\"10\"><\/td>\n    <td>\n        <div class=\"checkbox checkbox-primary\">\n\n            <input \n                id=\"dba_annual_filing\" \n         type=\"checkbox\" class=\"subscription-line-item\" \n                                 >\n\n            <label style=\"opacity:1\" for=\"dba_annual_filing\">\n                DBA\/FBN Subscription                \n                            <\/label>\n        <\/div>\n    <\/td>\n    <td><select class=\"custom-select customSelect2 form-option payment-method-select\"><option value=1229>Amex Card<\/option><option selected value=1228>Alaska LLC Card (Alaska_llc)<\/option><\/select><\/td>\n    <td><\/td>\n    <td><\/td>\n    <td class=\"text-center\">\n                $120.00    <\/td>\n<\/tr>                                        \n                                    \n                                        <tr class=\"bg-primary text-white\">\n                <td width=\"10\"><\/td>\n                <td>Services Total Filejet Fee <\/td>\n                <td><\/td>\n                <td><\/td>\n                <td><\/td>\n                <td class=\"text-center\"> \n                    <span id=\"item-cart-total\">$340.00<\/span>\n                <\/td>\n            <\/tr>\n        <\/tbody>\n    <\/table>\n"
}

const tableData = [
    [
        "<a class=\"toggle-subscription-item\" id=\"toggle-item\"><i class=\"fa fa-collapse fa-plus-square\"><\/i><\/a>",
        "<div class=\"checkbox checkbox-primary\"><input disabled checked id=\"addtosub\" type=\"checkbox\" class=\"subscription-add-item\"><label style=\"opacity:1\" for=\"addtosub-\">AL_Entity_100<\/label> <span class=\"text text-danger\"><i class=\" mdi mdi-information-outline\" data-toggle=\"tooltip\" title=\"Subscription is already added\"><\/i><\/span><\/div>",
        "Unassigned",
        "Non Profit Corporation",
        "AK",
        "$95.50",
        "<select class=\"custom-select customSelect2 form-option payment-method-select\"><option value=1229>Amex Card<\/option><option selected value=1228>Alaska LLC Card (Alaska_llc)<\/option><\/select>"
    ],
    [
        "<a class=\"toggle-subscription-item\"  id=\"toggle-item\"><i class=\"fa fa-collapse fa-plus-square\"></i></a>",
        "<div class=\"checkbox checkbox-primary\"><input disabled checked id=\"addtosub\" type=\"checkbox\" class=\"subscription-add-item\"><label style=\"opacity:1\" for=\"addtosub\"> California Entity Case I</label> <span class=\"text text-danger\"><i class=\" mdi mdi-information-outline\" data-toggle=\"tooltip\" title=\"Subscription is already added\"></i></span></div>",
        "hhhhhhhh",
        "LLC",
        "CA",
        "$95.50",
        "<select class=\"custom-select customSelect2 form-option payment-method-select\" id=\"\"><option value=832>Amex (Alphabet Inc.)</option></select>"
    ],
    [
        "<a class=\"toggle-subscription-item\"  id=\"toggle\"><i class=\"fa fa-collapse fa-plus-square\"></i></a>",
        "<div class=\"checkbox checkbox-primary\"><input disabled checked id=\"addtosub\" type=\"checkbox\" class=\"subscription-add-item\"><label style=\"opacity:1\" for=\"addtosub\">Aaarc Ventures Existing<br />Entity i9</label> <span class=\"text text-danger\"><i class=\" mdi mdi-information-outline\" data-toggle=\"tooltip\" title=\"Subscription is already added\"></i></span></div>",
        "Unassigned",
        "Profit Corporation",
        "AK",
        "$91.50",
        "<select class=\"custom-select customSelect2 form-option payment-method-select\" id=\"\"><option value=-1>No Payment Method Saved</option></select>"
    ]
]