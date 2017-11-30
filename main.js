$(document).ready(function(){

    $('#searchButton').on('click', function(){
        $.post('/search', {searchTerm: $('#searchInput').val()}, function(dataFromServer){
            console.log(dataFromServer)
            $('a').html(dataFromServer.text).attr('href', dataFromServer.link)
            
        })
    })


})