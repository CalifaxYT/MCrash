const game = {
    prepare: function() {
        if (!Cookies.get('userbalance')){
            Cookies.set('userbalance', 1000);
            ui.refreshbalance();
        }else{
            ui.refreshbalance();
        }
    },    
    run: function() {
        Cookies.set('userbalance', parseFloat(Cookies.get('userbalance')) - parseFloat($("#betcoins").val()));        
        ui.refreshgame('Game will begin in a moment...');
        ui.refreshbalance();
        game.xhr();
    },
    xhr: function() {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (this.readyState === 4 && this.status === 200){
                let multiplier = game.crypto(CryptoJS.enc.Hex.parse(String(JSON.parse(this.responseText)[0])), '0000000000000000004d6ec16dafe9d8370958664c1dc422f452892264c59526');
                ui.refreshgame('Crashed @ x' + multiplier);
                if(parseFloat($("#cashout").val()) <= multiplier){
                    Cookies.set('userbalance',(parseFloat(Cookies.get('userbalance')) + (parseFloat($("#betcoins").val()) *  ($("#cashout").val()))).toFixed(2));
                    ui.refreshbalance();
                }
            }            
        }
        xhr.open("GET", "https://cors-anywhere.herokuapp.com/http://www.randomnumberapi.com/api/v1.0/randomstring?min=64&max=64");
        xhr.setRequestHeader("Accept", 'application/json');
        xhr.send();
    },
    crypto: function(GameSeed, GameSalt) {
        const HMAC = CryptoJS.HmacSHA256(GameSeed, GameSalt);
        GameSeed = HMAC.toString(CryptoJS.enc.Hex).slice(0, 52 / 4);
        const HEX = parseInt(GameSeed, 16);
        const POW = 99 / (1 - (HEX / Math.pow(2, 52)));
        return Math.max(1, Math.floor(POW) / 100);
    }           
};