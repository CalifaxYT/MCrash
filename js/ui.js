const ui = {
    prepare: function() {
      Array.prototype.forEach.call(document.querySelectorAll('.mdl-card__media'), function (UIElement){
        let UILink = UIElement.querySelector('a');
        if (!UILink){
          return;
        }
        let UITarget = UILink.getAttribute('href');
        if (!UITarget){
          return;
        }
        UIElement.addEventListener('click', function () {
          location.href = UITarget;          
        });
      });
      if (typeof HTMLDialogElement !== 'function'){

        const HTMLScript = document.createElement('script');
        HTMLScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/dialog-polyfill/0.5.3/dialog-polyfill.min.js';
        HTMLScript.id = 'dialog-polyfill';
        document.body.appendChild(HTMLScript);
        console.log('[Note] It seems your browser does not support dialogs properly. A fix was attempted, hovewer, things might still break.');
      }
    },  
    refreshbalance: function() {
        $("#balancecard").html('<img src="images/logo.png">' + Cookies.get('userbalance') + ' ℳ');
    },
    refreshgame: function(UIText) {
        $("#crashedat").html(UIText);
    },
    dialog: function(UIElement) {
        var dialog = document.querySelector(UIElement);
        if (!dialog.showModal) {
          dialogPolyfill.registerDialog(dialog);
        }
        dialog.showModal();
        dialog.querySelector('.close').addEventListener('click', function () {
        dialog.close();
      });
    }   
};