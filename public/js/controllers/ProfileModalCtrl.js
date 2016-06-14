app.controller('ProfileModalCtrl', function() {
    
    this.enableModal = function () {
        var modal = document.querySelector('#profile_modal');
        var openModalElems = document.querySelectorAll('.open_modal');
        var closeModalBtn = document.querySelector('.close_modal');
        
        for (var i = 0; i < openModalElems.length; i++) {
            openModalElems[i].style.cursor = 'pointer';
            openModalElems[i].onclick = function() {
                modal.style.display = 'block';
            }
        };
        
        closeModalBtn.onclick = function() {
            modal.style.display = 'none';
        }
        
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    };
    
});