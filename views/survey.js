$('.yes').click(function() {
    if ($(this).is(':checked')) {
        $('#blah, .blah').css("visibility", "visible");
    }
});