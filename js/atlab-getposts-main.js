
function checkResourcePostsDiv(){
 
//see if we've got an altlab-getposts div before running all this stuff
  try {
  var element = document.getElementById('altlab-getposts');
  console.log(element);
    return element;
  }
  catch(err) {
      console.log(err.message);
  }
}

  if (checkResourcePostsDiv()){ 

  var element = document.getElementById('altlab-getposts');

    var url = sourceUrl();
   
    console.log(url);//what's our url?

    jQuery(document).ready(function() {
      var def = new jQuery.Deferred();
      jQuery.ajax({
        url: url + '/wp-json/wp/v2/posts?'+ getResourceRestrictions(), //add the restrictions
        jsonp: "cb",
        dataType: 'json',
        success: function(data) {
            console.log(data); //dumps the data to the console to check if the callback is made successfully.
            jQuery.each(data, function(index, item) {
              jQuery('#altlab-getposts').append('<li class="anth-resource-item"><a href="'+item.link+'"><span class="get-posts-title">'+item.title.rendered+'</span></a></li>' );
            }); //each          
          } //success
      }); //ajax  
    }); //ready





function sourceUrl(){
   var element = document.getElementById('altlab-getposts'); 
      if(element.dataset.url != null){
        var url = element.dataset.url;
    } 
   return  url;
}  


//sets the background image based on the featured image or returns a default image
    function resourceBackgroundImg (item) {
    var element = document.getElementById('altlab-getposts'); 
      if(element.dataset.display == 'grid'){
      try {
       var imgUrl = item._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
        return 'style="background-image:url('+imgUrl+');"';
      }
    catch(err) {
        return 'style="background-color:#424242;';
      }
    }
  }

function resourceUrl(item){
   return '<a href="' + item.meta.resource_url + '">';
}    

//chops up the date item a bit
    function dateDisplay(item){
      return item.date.substring(5,10);
    }
    

    var $loading = jQuery('#loading').hide();
      jQuery(document)
        .ajaxStart(function () {
          $loading.show();
        })
        .ajaxStop(function () {
          $loading.hide();
        });

}


//get the category restriction in data-cats or data-authors if either or both exists
function getResourceRestrictions(){
    var element = document.getElementById('altlab-getposts'); 
    if(element.dataset.cats){
      var cats = '&categories='+element.dataset.cats;
    } else {
      cats = "";
    }
    if(element.dataset.authors){
      var authors = '&author='+element.dataset.authors;
    }else {
      authors = "";
    }
    if(element.dataset.num){
      var num = '&per_page='+element.dataset.num;
    } else {
      num = "&per_page=10";
    }
    return cats + authors + num;
}  