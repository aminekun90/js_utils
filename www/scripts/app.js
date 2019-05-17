var core = new Core({ debug: true });
/**
 * 
 * 
 */
function initApp() {

    core.installModules(function () {
        //you script here
        console.debug("Scripts loaded");
        utils.load();
    });
}

document.addEventListener('DOMContentLoaded', initApp);
