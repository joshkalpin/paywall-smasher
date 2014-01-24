var paywallSmasher = {
    deletePaywall: function() {
        smasher = this.getCorrectSmasher();
        if(smasher !== null) {
            smasher();
        }
    },

    getCorrectSmasher: function() {
        href = window.location.href.toString();
        if(href.contains('nationalpost') || href.contains('financialpost')) {
            return this.smashNationalPost;
        } else if(href.contains('thestar')) {
            return this.smashTorontoStar;
        } else if(href.contains('theonion')) {
            return this.smashTheOnion;
        } else {
            return null;
        }
    },

    smashTorontoStar: function() {
      $('#syncronexOverlay').remove();
      $('#syncronexOverlayContent').remove();
    },

    smashTheOnion: function() {
        $("#gregbox-outer").remove();
        $("#gregbox-signInTab").remove();
        $('img').filter(function() {
            return $(this).attr('src') === 'http://s.ppjol.net/static/fb/fancy_close.png';
        }).remove();

        //Slightly less of a hack, still stupid
        getElementByXpath('/html/body/div[3]').remove();
    },

    smashNationalPost: function() {
        $("#gregbox-outer").remove();
        $("#gregbox-signInTab").remove();
        $('img').filter(function() {
            return $(this).attr('src') === 'http://s.ppjol.net/static/fb/fancy_close.png';
        }).remove();

        //Fucking huge hack, OMFG
        setTimeout(function() {
            getElementByXpath('/html/body/div[5]').remove();
        }, 0);
        setTimeout(function() {
            nextElement = getElementByXpath('/html/body/div[5]');
            if (nextElement !== null) {
                getElementByXpath('/html/body/div[5]').remove();
            }
        }, 0);
    },
};

String.prototype.contains = function(string) {
    return this.indexOf(string) !== -1;
};

var getElementByXpath = function (path) {
    return document.evaluate(path, document, null, 9, null).singleNodeValue;
};

window.addEventListener('load', function() {
    setTimeout(function() {
        paywallSmasher.deletePaywall();
    }, 2000);
}, false);

