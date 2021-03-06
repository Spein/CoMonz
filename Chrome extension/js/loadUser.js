import * as blackhole from '/js/blackhole.js';
import { executeLogic } from '/js/executeLogic.js';
import { styledTabs } from '/js/styledTabs.js';
import { checkSupport } from '/js/checkSupport.js';
import { tuto } from '/js/tuto.js';


async function loadUser() {
    let user = await JSON.parse(localStorage.getItem('user'));
    //console.log(localStorage, JSON.parse(localStorage.getItem('user')));
    setTimeout(() => {
        $('#displayName').text(user.displayName);
        $('#head').css("background-image", "url(" + `../img/${user.photoURL.genre}/${user.photoURL.head}.png` + ")")
        $('#eye').css("background-image", "url(" + `../img/${user.photoURL.genre}/${user.photoURL.eye}.png` + ")")
        $('#mouth').css("background-image", "url(" + `../img/${user.photoURL.genre}/${user.photoURL.mouth}.png` + ")")
        $('#clothes').css("background-image", "url(" + `../img/${user.photoURL.genre}/${user.photoURL.clothes}.png` + ")")
        $('#face').css("background-image", "url(" + `../img/${user.photoURL.genre}/${user.photoURL.face}.png` + ")")
        $('#background').css("background-image", "url(" + `../img/${user.photoURL.genre}/${user.photoURL.background}.png` + ")")
        $('#email').text(user.email);
        $('#description').text(user.description);
        $('#nft-hash').html("<a href='http://www.comonz.us/commoner/" + user.token + "' target='_blank'>" + user.token + "</a>")
        executeLogic()
        styledTabs(user);
        tuto(user, 'profile')
        checkSupport()
        blackhole.blackhole('#blackhole', 1, 260, 220, 150);
    }, 150)


}

export { loadUser }