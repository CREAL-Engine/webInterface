// TODO
// - Finish update(), figure out what to do if no argument
// 		- remove update()
// - Determine if each subclass needs it's own update
// - determine if each subclass needs it's own versions of the functions
// - clarify if purge is needed
// 	-- dont need
// - determine if "PageModule.call(this, mainObject, inlineCode);" is right for constructor
// - determine if mainObject is jusy html tag idName for the module
// 		- string w/ names
// - clarify if moduleSize is size of moduleList
// 	- size of module list

// PAGE MODULE //
function PageModule (mainObject, inlineCode) {

    this.mainObject = mainObject; //where the id tagged object goes // FIXME: make private
    this.inlineCode = inlineCode; //inline code (read hack) of content within the object

    if (mainObject = document.getElementById("user input string") != true) //boolean function that assigns tag to private var
        return false;
    /*
    else
        return true;
    */

    this.prototype.hide = function hide(idName) {
        var x = getElementByID(idName);
        x.style.display = "none";
    } // hide the module

    this.prototype.show = function show(idName) {
        var x = getElementByID(idName);
        x.style.display = "block";
    } // show the module

    this.prototype.deletePageMod = function deletePageMod() {        // delete all members of the class
        this.mainObject = null;
        this.inlineCode = null;
    } //delete the module

    // this.purge = function purge() {} //same a delete

    this.prototype.update = function update() { //update, called when putting off updating inline code for user, make update overloaded, psuedo overload, if based on number of args

        if (arguments.length == 0) { // if we have put off updating what is displayed
            // clairfy what to update
        }
        else if (arguments.length == 1) { // if we update display immendiately
            getElementByID(idName).innherHTML = this.inlineCode;
        }

        //	    this.update = function update() {} //update

        //	    this.update = function update(idName) {
        //	    	getElementByID(idName).innherHTML = this.inlineCode;
        //	    } //an inline update with new inline code.  // use innherHTML, take in string, and idname, update html


    }
}

// PAGE VIEW //
function PageView(modulesList, moduleSize, inbox, outbox, inboxSize, outboxSize) {

    this.modulesList = modulesList; //class PageModule modules; //keep the page modules in a list // FIXME: make private
    this.moduleSize = moduleSize; // module size
    this.inbox = inbox; // in queue // FIXME: make queue
    this.outbox = outbox; // out queue // FIXME: make queue
    this.inboxSize = inboxSize; // size of inbox
    this.outboxSize = outboxSize; // size of outbox

}

// HEADER //
function Header(mainObject, inlineCode) {

    PageModule.call(this, mainObject, inlineCode);

    this.deletePageMod = function deletePageMod() {        // delete all members of the class
        this.mainObject = null;
        this.inlineCode = null;
        //this.navBar = null;
    } //delete the module
    //purge() {

    //}
    this.update = function update() { //update, called when putting off updating inclide code for user, make update overloaded, psuedo overload, if based on number of args

        if(arguments.length == 0) { // if we have put off updating what is displayed

        }
        else if (arguments.length == 1) { // if we update display immendiately

        }


    }
    //update(idName) {

    //}
}
Header.prototype = new PageModule();

// FOOTER //
function Footer(mainObject, inlineCode) {

    PageModule.call(this, mainObject, inlineCode);

    this.deletePageMod = function deletePageMod() {        // delete all members of the class
        this.mainObject = null;
        this.inlineCode = null;
    } //delete the module
    this.update = function update() {  //update, called when putting off updating inclide code for user, make update overloaded, psuedo overload, if based on number if args

    }

}
Footer.prototype = new PageModule();

// LEFT SIDE BAR //
function LeftSidebar(mainObject, inlineCode) {

    PageModule.call(this, mainObject, inlineCode);

    this.deletePageMod = function deletePageMod() {        // delete all members of the class
        this.mainObject = null;
        this.inlineCode = null;
    } //delete the module
    this.update = function update() {

    }

}
LeftSidebar.prototype = new PageModule();

// RIGHT SIDE BAR //
function RightSidebar(mainObject, inlineCode) {

    PageModule.call(this, mainObject, inlineCode);

    this.deletePageMod = function deletePageMod() {        // delete all members of the class
        this.mainObject = null;
        this.inlineCode = null;
    } //delete the module
    this.update = function update() {

    }

}
RightSidebar.prototype = new PageModule();

// MAIN CONTENT //
function MainContent(mainObject, inlineCode) {

    PageModule.call(this, mainObject, inlineCode);

    this.deletePageMod = function deletePageMod() {        // delete all members of the class
        this.mainObject = null;
        this.inlineCode = null;
    } //delete the module
    this.update = function update() {

    }

}
MainContent.prototype = new PageModule();

// NAVIGATION BAR //
function NavigationBar(mainObject, inlineCode) {

    PageModule.call(this, mainObject, inlineCode);

    this.deletePageMod = function deletePageMod() {        // delete all members of the class
        this.mainObject = null;
        this.inlineCode = null;
    } //delete the module
    this.update = function update() {

    }

}
NavigationBar.prototype = new PageModule();