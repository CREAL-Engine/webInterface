// PRACTICE IMPLEMENTATION //

/*
// Objects
var myHeader = new Header(head, "inline for header");
var myFooter = new Footer(foot, "inline for footer");
var myLeftSidebar = new LeftSidebar(leftSide, "inline for left side bar");
var myRightSidebar = new RightSidebar(rightSide, "inline for right side bar");
var myMainContent = new MainContent(mainCont, "inline for main content");
var myNavigationBar = new NavigationBar(navBar, "inline for nav bar");
*/

var head = "headerClass";
var foot =  "footerClass";
var leftSide = "leftSideBarClass";
var rightSide = "rightSideBarClass";
var mainCont = "mainContentClass";
var navBar = "navigationBarClass";


// Objects
var myHeader = new Header(head, "inline for header");
var myFooter = new Footer(foot, "inline for footer");
var myLeftSidebar = new LeftSidebar(leftSide, "inline for left side bar");
var myRightSidebar = new RightSidebar(rightSide, "inline for right side bar");
var myMainContent = new MainContent(mainCont, "inline for main content");
var myNavigationBar = new NavigationBar(navBar, "inline for nav bar");

// myPageView parameters
var modList = [myHeader, myFooter, myLeftSidebar, myRightSidebar, myMainContent, myNavigationBar];
var modListSize = modList.length;
var inboxQueue = [];
var outboxQueue = [];
var inboxQueueSize = inboxQueue.length;
var outboxQueueSize = outboxQueue.length;

var myPageView = new PageView(modList, modListSize, inboxQueue, outboxQueue, inboxQueueSize, outboxQueueSize);

// Initial inline
initialInline = function() {
    //when the document is finished loading, replace everything in between class's tags with the value of x.inlineCode

    console.log("onload start");
    // Header
    document.getElementById("headerInlineClass").innerHTML=myHeader.inlineCode;

    // Footer
    document.getElementById("footerInlineClass").innerHTML=myFooter.inlineCode;

    // Left Side Bar
    document.getElementById("leftSideBarInlineClass").innerHTML=myLeftSidebar.inlineCode;

    // Right Side Bar
    document.getElementById("rightSideBarInlineClass").innerHTML=myRightSidebar.inlineCode;

    // Main Content
    document.getElementById("mainContentInlineClass").innerHTML=myMainContent.inlineCode;

    // Navigation Bar
    document.getElementById("navigationBarInlineClass").innerHTML=myNavigationBar.inlineCode;

    console.log("onload end");
};

initialInline();

alert("Test hide");
hide(myHeader.mainObject);

console.log("Test hide finished");
/*
alert("Test show");
alert("Test deletePageMod");
alert("Test update");
*/