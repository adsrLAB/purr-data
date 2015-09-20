'use strict';
var nw = require('nw.gui');
console.log(nw.App.argv);
var pdgui = require('./pdgui.js');
var port_no = nw.App.argv[0]; // fed to us by the Pd process
var pwd = process.env.PWD;
pdgui.set_port(port_no);
pdgui.set_pwd(pwd);
pdgui.set_pd_window(this);
pdgui.set_app_quitfn(app_quit);

// gui preset
pdgui.skin.apply(this);

// For translations
var l = pdgui.get_local_string;

function app_quit () {
    console.log("quitting Pd...");
    nw.App.quit();
}

var chooser = document.querySelector("#fileDialog");
chooser.addEventListener("change", function(evt) {
    var file_array = this.value;
    // reset value so that we can open the same file twice
    this.value = null;
    pdgui.menu_open(file_array);
    console.log("tried to open something");
}, false);

document.getElementById("dsp_control").addEventListener("click",
    function(evt) {
        var dsp_state = this.checked ? 1 : 0;
        pdgui.pdsend("pd dsp", dsp_state);
    }
);

// Invoke some functions to create main menus, etc.
nw.Window.get().on("close", function() {
    pdgui.menu_quit();
});
console.log(nw.App.argv); 

document.getElementById("fileDialog").setAttribute("nwworkingdir", pwd);
document.getElementById("fileDialog").setAttribute("accept",
    Object.keys(pdgui.pd_filetypes).toString());

nw_create_pd_window_menus();

pdgui.connect();
pdgui.init_socket_events();

// nw context callbacks (mostly just creating/destroying windows)
pdgui.set_new_window_fn(nw_create_window);
pdgui.set_close_window_fn(nw_close_window);


function pdmenu_copy () {
    alert("Please implement pdmenu_copy"); 
}

function pdmenu_selectall () {
    alert("Please implement pdmenu_selectall"); 
}

function pdmenu_preferences () {
    alert("Please implement pdmenu_preferences"); 
}

function pdmenu_next_win () {
    alert("Please implement pdmenu_preferences"); 
}

function pdmenu_previous_win () {
    alert("Please implement pdmenu_preferences"); 
}

function pdmenu_parent_win () {
    alert("Please implement pdmenu_preferences"); 
}

function pdmenu_console_win () {
    alert("Please implement pdmenu_preferences"); 
}

function pdmenu_audio_on () {
    alert("Please implement pdmenu_preferences"); 
}

function pdmenu_audio_off () {
    alert("Please implement pdmenu_preferences"); 
}

function pdmenu_test_audio () {
    alert("Please implement pdmenu_preferences"); 
}

function pdmenu_load_meter () {
    alert("Please implement pdmenu_preferences"); 
}

function pdmenu_about_pd () {
    alert("Please implement pdmenu_preferences"); 
}

function pdmenu_manual () {
    alert("Please implement pdmenu_preferences"); 
}

function pdmenu_help_browser () {
    alert("Please implement pdmenu_preferences"); 
}

function pdmenu_l2ork_mailinglist () {
    alert("Please implement pdmenu_preferences"); 
}

function pdmenu_pd_mailinglists () {
    alert("Please implement pdmenu_preferences"); 
}

function pdmenu_forums () {
    alert("Please implement pdmenu_preferences"); 
}

function pdmenu_irc () {
    alert("Please implement pdmenu_preferences"); 
}

// Menus for the main Pd window
function nw_create_pd_window_menus () {
    // Window menu
    var windowMenu = new nw.Menu({
        type: 'menubar'
    });

    // File menu
    var fileMenu = new nw.Menu();

    // Add to window menu
    windowMenu.append(new nw.MenuItem({
        label: l('menu.file'),
        submenu: fileMenu
    }));

    // File sub-entries
    fileMenu.append(new nw.MenuItem({
        label: l('menu.new'),
        click: pdgui.menu_new,
        key: 'n',
        modifiers: 'ctrl',
        tooltip: l('menu.new.tt')
    }));

    fileMenu.append(new nw.MenuItem({
        label: l('menu.open'),
        key: 'o',
        modifiers: "ctrl",
        tooltip: l('menu.open.tt'),
        click: function (){
            var chooser = document.querySelector('#fileDialog');
            chooser.click();
        }
    }));

    if (pdgui.k12_mode == 1) {
        fileMenu.append(new nw.MenuItem({
        label: l('menu.k12.demos'),
        tooltip: l('menu.k12.demos_tt'),
        click: pdgui.menu_k12_open_demos
        }));
    }

    fileMenu.append(new nw.MenuItem({
        type: 'separator'
    }));

    // Note: this must be different for the main Pd window
    fileMenu.append(new nw.MenuItem({
        label: l('menu.save'),
            click: function () {},
            enabled: false,
        key: 's',
        tooltip: l('menu.save.tt'),
        modifiers: "ctrl"
    }));

    fileMenu.append(new nw.MenuItem({
        label: l('menu.saveas'),
        click: function (){},
        enabled: false,
        key: 'S',
        tooltip: l('menu.saveas_tt'),
        modifiers: "ctrl"
    }));

    if (pdgui.k12_mode == 0) {
        fileMenu.append(new nw.MenuItem({
            type: 'separator'
        }));
    }

    fileMenu.append(new nw.MenuItem({
        label: l('menu.message'),
        click: pdgui.menu_send,
        key: 'm',
        modifiers: "ctrl",
        tooltip: l('menu.message_tt')
    }));

    if (pdgui.k12_mode == 0) {
        fileMenu.append(new nw.MenuItem({
            type: 'separator'
        }));
    }

    // recent files go here

    // anther separator goes here if there are any recent files

    // Note: there's no good reason to have this here
    fileMenu.append(new nw.MenuItem({
        label: l('menu.close'),
        click: function () {},
        enabled: false,
    }));

    // Quit Pd
    fileMenu.append(new nw.MenuItem({
        label: l('menu.quit'),
        click: pdgui.menu_quit,
        key: 'q',
        modifiers: "ctrl",
        tooltip: l('menu.quit_tt')
    }));


    // Edit menu
    var editMenu = new nw.Menu();

    // Add to window menu
    windowMenu.append(new nw.MenuItem({
    label: l('menu.edit'),
    submenu: editMenu
    }));

    // Edit sub-entries
    editMenu.append(new nw.MenuItem({
        label: l('menu.copy'),
        click: pdmenu_copy,
        key: 'c',
        modifiers: "ctrl",
        tooltip: l('menu.copy_tt')
    }));

    editMenu.append(new nw.MenuItem({
        label: l('menu.selectall'),
        click: function () {
            document.selectAllChildren(document);
        },
        key: 'a',
        modifiers: "ctrl",
        tooltip: l('menu.selectall_tt')
    }));

    editMenu.append(new nw.MenuItem({
        type: 'separator'
    }));

    editMenu.append(new nw.MenuItem({
        label: l('menu.zoomin'),
        click: function () {
            nw.Window.get().zoomLevel += 1;
            pdgui.gui_post("zoom level is " + nw.Window.get().zoomLevel);
        },
        key: '=',
        modifiers: "ctrl",
        tooltip: l('menu.zoomin_tt')
    }));

    editMenu.append(new nw.MenuItem({
        label: l('menu.zoomout'),
        click: function () {
            nw.Window.get().zoomLevel -= 1;
            pdgui.gui_post("zoom level is " + nw.Window.get().zoomLevel);
        },
        key: '-',
        modifiers: "ctrl",
        tooltip: l('menu.zoomout_tt')
    }));

    editMenu.append(new nw.MenuItem({
        label: l('menu.preferences'),
        click: pdgui.open_prefs,
        key: 'p',
        modifiers: "ctrl",
        tooltip: l('menu.preferences_tt')
    }));


    // Windows menu... call it "winman" (i.e., window management)
    // to avoid confusion
    var winmanMenu = new nw.Menu();

    // Add to windows menu
    windowMenu.append(new nw.MenuItem({
    label: l('menu.windows'),
    submenu: winmanMenu
    }));

    // Winman sub-entries
    winmanMenu.append(new nw.MenuItem({
        label: l('menu.nextwin'),
        click: pdmenu_next_win,
        key: 'c',
        modifiers: "ctrl",
        tooltip: l('menu.nextwin_tt')
    }));

    winmanMenu.append(new nw.MenuItem({
        label: l('menu.prevwin'),
        click: pdmenu_previous_win,
        key: 'a',
        modifiers: "ctrl",
        tooltip: l('menu.prevwin_tt')
    }));

    winmanMenu.append(new nw.MenuItem({
        type: 'separator'
    }));

    winmanMenu.append(new nw.MenuItem({
        label: l('menu.parentwin'),
        click: pdmenu_parent_win,
        key: 'a',
        modifiers: "ctrl",
        tooltip: l('menu.parentwin_tt')
    }));

    winmanMenu.append(new nw.MenuItem({
        label: l('menu.pdwin'),
        click: pdmenu_console_win,
        key: 'a',
        modifiers: "ctrl",
        tooltip: l('menu.pdwin_tt')
    }));

    // Media menu
    var mediaMenu = new nw.Menu();

    // Add to window menu
    windowMenu.append(new nw.MenuItem({
    label: l('menu.media'),
    submenu: mediaMenu
    }));

    // Media sub-entries
    mediaMenu.append(new nw.MenuItem({
        label: l('menu.audio_on'),
        click: function() {
            pdgui.pdsend("pd dsp 1");
        },
        key: '/',
        modifiers: "ctrl",
        tooltip: l('menu.audio_on_tt')
    }));

    mediaMenu.append(new nw.MenuItem({
        label: l('menu.audio_off'),
        click: function() {
            pdgui.pdsend("pd dsp 0");
        },
        key: '.',
        modifiers: "ctrl",
        tooltip: l('menu.audio_off_tt')
    }));

    mediaMenu.append(new nw.MenuItem({
        type: 'separator'
    }));

    mediaMenu.append(new nw.MenuItem({
        label: l('menu.test'),
        click: pdmenu_test_audio,
        key: 'a',
        modifiers: "ctrl",
        tooltip: l('menu.test_tt')
    }));

    mediaMenu.append(new nw.MenuItem({
        label: l('menu.loadmeter'),
        click: pdmenu_load_meter,
        key: 'a',
        modifiers: "ctrl",
        tooltip: l('menu.loadmeter_tt')
    }));

    // Help menu
    var helpMenu = new nw.Menu();

    // Add to window menu
    windowMenu.append(new nw.MenuItem({
    label: l('menu.help'),
    submenu: helpMenu
    }));

    // Help sub-entries
    helpMenu.append(new nw.MenuItem({
        label: l('menu.about'),
        click: pdmenu_about_pd,
        key: 'c',
        modifiers: "ctrl",
        tooltip: l('menu.about_tt')
    }));

    helpMenu.append(new nw.MenuItem({
        label: l('menu.manual'),
        click: pdmenu_manual,
        key: 'a',
        modifiers: "ctrl",
        tooltip: l('menu.manual_tt')
    }));

    helpMenu.append(new nw.MenuItem({
        label: l('menu.browser'),
        click: pdmenu_help_browser,
        key: 'a',
        modifiers: "ctrl",
        tooltip: l('menu.browser_tt')
    }));

    helpMenu.append(new nw.MenuItem({
        type: 'separator'
    }));

    helpMenu.append(new nw.MenuItem({
        label: l('menu.l2ork_list'),
        click: pdmenu_l2ork_mailinglist,
        key: 'a',
        modifiers: "ctrl",
        tooltip: l('menu.l2ork_list_tt')
    }));

    helpMenu.append(new nw.MenuItem({
        label: l('menu.pd_list'),
        click: pdmenu_pd_mailinglists,
        key: 'a',
        modifiers: "ctrl",
        tooltip: l('menu.pd_list_tt')
    }));

    helpMenu.append(new nw.MenuItem({
        label: l('menu.forums'),
        click: pdmenu_forums,
        key: 'a',
        modifiers: "ctrl",
        tooltip: l('menu.forums_tt')
    }));

    helpMenu.append(new nw.MenuItem({
        label: l('menu.irc'),
        click: pdmenu_irc,
        key: 'a',
        modifiers: "ctrl",
        tooltip: l('menu.irc_tt')
    }));

    // Assign to window
    nw.Window.get().menu = windowMenu;
}

function nw_close_window(window) {
    window.close(true);
}

// Way too many arguments here-- rethink this interface
function nw_create_window(cid, type, width, height, xpos, ypos, menu_flag,
    resize, topmost, cnv_color, canvas_string, dir, dirty_flag, cargs,
    attr_array) {
        // todo: make a separate way to format the title for OSX
    var my_title =  pdgui.format_window_title(canvas_string, dirty_flag,
        cargs, dir);
    var my_file =
        type === 'pd_canvas' ? 'pd_canvas.html' : 'dialog_' + type + '.html';

    var new_win = nw.Window.open(my_file, {
        title: my_title,
        position: "center",
        toolbar: true,
        focus: true,
        width: width,
        height: height,
        x: xpos,
        y: ypos
    });
    //pdgui.gui_post("attr_array is " + attr_array);
    var eval_string = "register_canvas_id(" +
                      JSON.stringify(cid) + ", " +
                      JSON.stringify(attr_array) + ");";
    //pdgui.gui_post("eval string is " + eval_string);
    //if (attr_array !== null) {
    //    pdgui.gui_post("attr_array is " + attr_array.toString());
    //}
    new_win.on("loaded", function() {
        new_win.eval(null, eval_string);
    });
    return new_win;
}

function canvasNew(args) {
    console.log(args);
}