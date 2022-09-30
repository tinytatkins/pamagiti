var List = $('#tdlApp ul');
const Mask = 'tdl_';

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

$('#tdlApp input').on('keydown', function addTask(e) {
    if (e.keyCode != 13) return;
    let MAX_TASK_LEN = 100;
    var str = e.target.value.trim();
    e.target.value = "";
    if (str.length > 0 && str.length < MAX_TASK_LEN) {
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

$(document).on('click', '.tdItem', function removeTask(e) {
    var jet = $(e.target);
    localStorage.removeItem(jet.attr('data-itemid'));
    jet.remove();
})