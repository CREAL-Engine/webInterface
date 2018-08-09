/* These are small auxilary functions that will help the web application function properly */ 


function switchOff(elem)
{
	var navers = document.getElementsByClassName("naver");
	var i = 0;
	
	for(i = 0; i < navers.length; i++)
	{
		console.log(navers[i]);
			navers[i].classList.remove('active');
	}
	
	elem.classList.add('active');
	
	return 0;
}





function showOrHide(elementId, condition)
{
	
	if (condition)
	{	
		if(condition == 1)
		{
			document.getElementById(elementId).hidden = false;
			return 1; 
		}
		if(condition == 0)
		{
			
			document.getElementById(elementId).hidden = true;
			return 0;
		}
		else
		{
			return -1;
		}
		
	}

	else
	{
		if (document.getElementById(elementId).hidden == true)
		{
			document.getElementById(elementId).hidden = false;
			return -1; //false
		}
		else
		{
			document.getElementById(elementId).hidden = true;
			return 1; //true
		}
	}

}





function returnNodes(objStructure)
{

	var nodesToReturn = {
	
	  "nodes": [], //the nodes 
	  "edges": [] //the edges
		};
		
	
	
	
	
	return nodesToReturn; 
	
	
}


function  returnGraphNode()
{
	
	
	return 0; 
	
}
