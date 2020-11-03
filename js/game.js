const game = {
    prepare: function() {
        if (!Cookies.get('userbalance')){
            Cookies.set('userbalance', 1000,{secure: true,domain:'califax.host',path: '/'});
            ui.refreshbalance();
        }else{
            ui.refreshbalance();
        }
    },    
    run: function() {
        Cookies.set('userbalance', parseFloat(Cookies.get('userbalance')) - parseFloat($("#betcoins").val()),{secure: true,domain: 'califax.host',path: '/'});        
        ui.refreshgame('Game will begin in a moment...');
        ui.refreshbalance();
        let multiplier = game.crypto(CryptoJS.enc.Hex.parse(String(game.rng())), '0000000000000000004d6ec16dafe9d8370958664c1dc422f452892264c59526');
        ui.refreshgame('Crashed @ x' + multiplier);
        if(parseFloat($("#cashout").val()) <= multiplier){
         Cookies.set('userbalance',(parseFloat(Cookies.get('userbalance')) + (parseFloat($("#betcoins").val()) *  ($("#cashout").val()))).toFixed(2),{secure: true,domain: 'califax.host',path: '/'});
         ui.refreshbalance();
        }        
    },
    rng: function() {
        var rngstring = ""
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 64; i++){
            rngstring += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return rngstring;
    },   
    crypto: function(GameSeed, GameSalt) {
        const HMAC = CryptoJS.HmacSHA256(GameSeed, GameSalt);
        GameSeed = HMAC.toString(CryptoJS.enc.Hex).slice(0, 52 / 4);
        const HEX = parseInt(GameSeed, 16);
        const POW = 99 / (1 - (HEX / Math.pow(2, 52)));
        return Math.max(1, Math.floor(POW) / 100);
    }           
};