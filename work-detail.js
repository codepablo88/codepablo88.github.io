(function(){

    var galleryTrack=document.getElementById('work-gallery-track');
    var galleryViewport=galleryTrack.closest('.work-gallery-viewport');
    function updateGalleryEdges(){
      galleryViewport.classList.toggle('is-scrolled',galleryTrack.scrollLeft>galleryTrack.clientWidth*.08);
      galleryViewport.classList.toggle('is-at-end',galleryTrack.scrollLeft+galleryTrack.clientWidth>=galleryTrack.scrollWidth-8);
    }
    document.querySelectorAll('[data-gallery-direction]').forEach(function(button){
      button.addEventListener('click',function(){
        var slide=galleryTrack.querySelector('.work-gallery-slide');
        var gap=parseFloat(getComputedStyle(galleryTrack).gap)||0;
        galleryTrack.scrollBy({left:(slide.offsetWidth+gap)*Number(button.dataset.galleryDirection),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
      });
    });
    galleryTrack.addEventListener('scroll',updateGalleryEdges,{passive:true});
    window.addEventListener('resize',updateGalleryEdges);
    updateGalleryEdges();
  
})();
