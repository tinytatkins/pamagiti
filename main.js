var List = $('#tdlApp ul');
var Mask = 'tdl_';

function showTasks() {
    var Storage_size = localStorage.length;
    if (Storage_size > 0) {
    for (var i = 0; i < Storage_size; i++) {
        var key = localStorage.key(i);
        if (key.indexOf(Mask) == 0) {
        $('<li></li>').addClass('tdItem')
            .attr('data-itemid', key)
            .text(localStorage.getItem(key))
            .appendTo(List);
        }
    }
    }
}

showTasks();

$('#tdlApp input').on('keydown', function (e) {
    if (e.keyCode != 13) return;
    var str = e.target.value;
    e.target.value = "";
    if (str.length > 0) {
    var number_Id = 0;
    List.children().each(function (index, el) {
        var element_Id = $(el).attr('data-itemid').slice(4);
        if (element_Id > number_Id)
        number_Id = element_Id;
    })
    number_Id++;
    localStorage.setItem(Mask + number_Id, str);
    $('<li></li>').addClass('tdItem')
        .attr('data-itemid', Mask + number_Id)
        .text(str).appendTo(List);
    }
});

$(document).on('click', '.tdItem', function (e) {
    var jet = $(e.target);
    localStorage.removeItem(jet.attr('data-itemid'));
    jet.remove();
})