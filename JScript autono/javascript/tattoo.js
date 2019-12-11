
$.ajax({
    type: 'GET',    
    url: 'http://localhost:3000/tattoo',
    success: function(data) {
    let text = '';
    for (let i=0;i<data.length;i++) {
        text+= '<div class="3u">'
        text += ' <section>';
        text += '<div>' + '<img class="image_tattoo" src="'+data[i].image+'"' + '</div>';
        text += '<h2 style="text-align:center">' + data[i].name +'</h2>';
        text += '<div style="text-align:center">' + data[i].description +'</div>';
        text += '<p style="text-align:right">' + data[i].price +'$'+'</p>';
        text += '</section>';
        text+= '</div>'
    }
    document.getElementById("name").innerHTML = text;
    }
});

window.onload = function () {
    // displayItems();
};
