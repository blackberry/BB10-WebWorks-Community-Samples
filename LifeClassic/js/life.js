var rows=0;
var cols=0;
var percent=75;
var myTable=null;
var work=false;
var breakWork=false;
var colorON='#22dd22';
var colorOFF='#ddccdd';
var stepNr=0;
var delay=750;
var randomLevel=0.5;
var header="LifeClassic";

function setTable()
{
    if (!setRowsCols())
        return;
    printTable();
}

function randomize()
{
    if (work)
        return;
    for (var c=0; c<cols; c++)
        for (var r=0; r<rows; r++)
            {
                if (Math.random()>=randomLevel)
                    myTable[c][r]=1;
                else myTable[c][r]=0; 
                paintCell(c,r,myTable[c][r]);
            }
}

function setCell(col, row)
{
    if (work)
        return;
    var x=myTable[col][row];
    if (x==1)
        {
            myTable[col][row]=0;
            paintCell(col,row,0);
        }
        else
            {
                myTable[col][row]=1;    
                paintCell(col,row,1);
            }
}

function paintCell(col,row,v)
{
   var cell=window.document.getElementById('c_'+col+'_'+row);
    if (v==1)
        {
            cell.innerHTML=' ';
            cell.style.backgroundColor=colorON;
        }
        else
            {
                cell.innerHTML=' ';
                cell.style.backgroundColor=colorOFF;
            }
}

function printTable()
{
    window.document.getElementById('lifeTable').innerHTML='';
    window.document.getElementById('stepNumber').innerHTML=0;
    window.document.getElementById('spanStable').style.display='none';
    var t='<table>';
    for (var r=0; r<rows; r++)
    {
        t+='<tr>';
        for (var c=0; c<cols; c++)
            {
                t+='<td class="myTd" id="c_'+c+'_'+r+'" onclick="setCell('+c+','+r+')"></td>';
            }
        t+='</tr>';
    }
    t+='</table>';
    window.document.getElementById('lifeTable').innerHTML=t;
    myTable=new Array(cols);    
    for (i=0; i<cols; i++)
        myTable[i]=new Array(rows);  
}

function step()
{
    work=false;
    if (breakWork)
        return;
    stepNr++;
    //alert('step'+stepNr);
    window.document.getElementById('stepNumber').innerHTML=stepNr;
    //var myTableCopy=myTable.slice();
    var myTableCopy=copyTable();
    var alive=false;
    var dead=false;
    for(var c=0; c<cols; c++)
        {
            for(var r=0; r<rows; r++)
                {
                    var neightbours=getNeightboursNr(myTableCopy, c,r);
                    //alert (neightbours);
                    var me=myTableCopy[c][r];
                    if (me==1 && (neightbours>3||neightbours<2))
                        {
                            paintCell(c,r,0);
                            myTable[c][r]=0;
                            dead=true;
                        }
                        else if (me!=1 && neightbours==3)
                        {
                            paintCell(c,r,1);
                            myTable[c][r]=1;
                            alive=true;
                        }
                        else if (me==1)
                            {
                                myTable[c][r]=1;
                                alive=true;
                            }
                            else {
                                myTable[c][r]=0;
                                dead=true;
                            }
                }
        }
    if (dead&&!alive)
        {
    	showAlertH('All the cells are dead! Population has died after '+stepNr+' generation(s)', 'GAME OVER');
        workEnd();
        return;
        }
    else work=true;
    if (work)
        {
            if (isStable(myTableCopy))
                {
                    window.document.getElementById('spanStable').innerHTML='You reached "static pattern"!';
                    window.document.getElementById('spanStable').style.display='block';
                    workEnd();
                    showAlertH('You have reached "the static pattern"! (congratulations?)', 'GAME OVER');
                    return;
                }
            myTableCopy=null;
            setTimeout("step()", delay);
        }
}

function copyTable()
{
  var myTableCopy=new Array(cols);    
    for (i=0; i<cols; i++)
        myTableCopy[i]=new Array(rows);  

for (var i = 0; i< cols; i++)
{
    for (var j = 0; j<rows; j++)
    {
        myTableCopy[i][j]=myTable[i][j];
    }
} 
  return myTableCopy;
}

function isStable(newArray)
{
for (var i = 0; i< cols; i++)
{
    for (var j = 0; j<rows; j++)
    {
        if (newArray[i][j] != myTable[i][j]) {
            return false;
        }
    }
}
return true;
}

function workEnd()
{
breakWork=true;
work=false;
myTable=null;
}

function start()
{
    if (work==false)
    {
    if(!isSomethingAlive())
        {
            showAlert('Please set some cells as "alive" or use "randomize" button!');
            return;
        }
    work=true;
    breakWork=false;
    stepNr=0;
    step();
    }
    else
        {
           workEnd();
        }
}

function isSomethingAlive()
{
for (var i = 0; i< cols; i++)
{
    for (var j = 0; j<rows; j++)
    {
        if(myTable[i][j]==1)
            return true;
    }
}
return false;
}

function getNeightboursNr(t, col,row)
{
    var n=0;
    if (col-1>=0)
        {
        if (row-1>=0 && t[col-1][row-1]==1)    
            n++;
        if (t[col-1][row]==1)    
            n++;
        if (row+1<rows && t[col-1][row+1]==1)    
            n++;
        }
    if (col+1<cols)
        {
        if (row-1>=0 && t[col+1][row-1]==1)    
            n++;
        if (t[col+1][row]==1)    
            n++;
        if (row+1<rows && t[col+1][row+1]==1)    
            n++;
        }
    if (row-1>=0 && t[col][row-1]==1)    
        n++;
    if (row+1<rows && t[col][row+1]==1)    
        n++;
    return n;
}

function setRowsCols()
{
    var x;
    x=window.document.getElementById('rows').value;
    if (x<=0 || x>20)
        {
            showAlert('Number of rows should be in <5,20>');
            return false;
        }
    rows=x;
    x=window.document.getElementById('cols').value;
    if (x<=0 || x>30)
        {
            showAlert('Number of columns should be in <5,15>');
            return false;
        }
    cols=x;
    return true;
}

function showRules()
{
    var r=window.document.getElementById('rules');
    if (r.style.display=='none')
        r.style.display='block';
    else r.style.display='none';
}
function showAlertH(txt, head){
	try {
	    blackberry.ui.dialog.standardAskAsync(txt, blackberry.ui.dialog.D_OK, dialogCallBack, {title : head});
	  }catch (e) {
	    alert("Exception in 'Alert': " + e);
	  }
}
function showAlert(txt){
	try {
	    blackberry.ui.dialog.standardAskAsync(txt, blackberry.ui.dialog.D_OK, dialogCallBack, {title : "! ! ! ! !"});
	  }catch (e) {
	    alert("Exception in 'Alert': " + e);
	  }
}
function dialogCallBack(selection){
}

var aboutText='<ul><li>Any live cell with fewer than two live neighbours dies, as if caused by under-population.</li><li>Any live cell with two or three live neighbours lives on to the next generation.</li><li>Any live cell with more than three live neighbours dies, as if by overcrowding.</li><li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li></ul><b>Please set dimensions of the grid, then tap the cells You want to set as a \'alive\' or use \'randomize\' button.</b>';


function dialogAboutCallBack(selection){
	$('#top').panel("close");
}
function showAbout(){
	try {
	    blackberry.ui.dialog.standardAskAsync(aboutText, blackberry.ui.dialog.D_OK, dialogAboutCallBack, {title : header});
	  }catch (e) {
	    alert("Exception in 'About': " + e);
	  }
}

function bodyOnLoad(){
	if(typeof blackberry != 'undefined'){
    	blackberry.event.addEventListener('swipedown', function(){
    		$('#top').panel("open");
    	});
    }
	setTable();
}
function showSetting(showSett){
	if (showSett){
		$('#top').panel("close");
		$('#ustawienia').show('slow');
		$('#tablica').hide('slow');
	}else{
		$('#tablica').show('slow');
		$('#ustawienia').hide('slow');
		setTable();
	}
}

function donate(){
	try {       
	      blackberry.payment.purchase({
	            "digitalGoodID":       "35983897",
	            "digitalGoodSKU":      "lifeClassic099",
	            "digitalGoodName":     "donate",
	            "purchaseAppName":	   "LifeClassic"
	            
	        }, onPurchaseSuccess,        onPurchaseError);
	    } catch (e) {
	    	showAlert("Purchase exception" + e);
	    }
}
function onPurchaseSuccess(purchasedItem) {
    var transId = purchasedItem.transactionID;
    var sku = purchasedItem.digitalGoodSKU;
    var dgId = purchasedItem.digitalGoodID;
    showAlert("Thank you for the donation!");
}

function onPurchaseError(error) {
	//showAlert("Error occurred: " + error.errorText + ", " + error.errorID);
}