


# View Class Documentation

## Design Overview

## Classes
### PageView Class
The pageView class represents a single webpage. It contains an array of pageModules contained in the page and the array size. Its also contains inbox/outbox queues and their sizes.

### PageModule Class
The pageModules class is the class all the different module classes stem from. It contains general members and methods that will belong to any modules, regardless of what it is. 

#### Members
+ mainObject
+ inlineCode
#### Methods
+ hide(idName)
	+ Hides module with ID *idName*
+ show(idName)
	+ Un-hides module with ID *idName*
+ deletePageMod()
	+ Deletes all members of the modules to delete the module itself
+ update()
	+ 
+ update(idName)
	+ Updates inline code with new inline value
	+ Does not actually update inlineCode var, just updates innerHTML of module with ID *idName*

### Header Class
The Header class extends the PageModule class.
#### Members
+ mainObject
+ inlineCode
#### Methods
### Footer Class
The Footer class extends the PageModule class.
#### Members
+ mainObject
+ inlineCode
#### Methods
### LeftSideBar Class
The LeftSideBar class extends the PageModule class.
#### Members
+ mainObject
+ inlineCode
#### Methods
### RightSideBar Class
The RightSideBar class extends the PageModule class.
#### Members
+ mainObject
+ inlineCode
#### Methods
### MainContent Class
The MainContent class extends the PageModule class.
#### Members
+ mainObject
+ inlineCode
#### Methods
### NavigationBar Class
The NavigationBar class extends the PageModule class.
#### Members
+ mainObject
+ inlineCode
#### Methods

