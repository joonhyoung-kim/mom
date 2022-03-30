
var menuId = 'XUSM9010';
var XUSM9010 = {
	initParam		:  undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
	init: function() {
		var that = this;	
		$('#grid1').remove();
		var textareaHtml = '<textarea id = "xmlText" name="opinion" cols="264" rows="42"></textarea>';
		$('.grid-box1').prepend(textareaHtml);
		$('#eventType').jqxComboBox("clear");	
		$('#eventType').jqxComboBox('addItem',{"code":"R","value":"SELECT"});	
		$('#eventType').jqxComboBox('addItem',{"code":"C","value":"INSERT"});	
		$('#eventType').jqxComboBox('addItem',{"code":"U","value":"UPDATE"});	
		$('#eventType').jqxComboBox('addItem',{"code":"D","value":"DELETE"});	
	},
	searchCallBack: function(index,your,action,btnId,param,result,data) {
		if(index ==0 && btnId =='findBtn1'){	
			//AUIGrid.clearGridData(momWidget.grid[index]);
			var columnItem = data;
			var xmlHtml   = '';
			var eventType = $('#eventType').val();
			var jdbcType  = 'VARCHAR';
			if(eventType == 'SELECT'){
				xmlHtml += 'SELECT  ';
			  for(var i=0;i<columnItem.length;i++){	
				 if(i == columnItem.length-1){
					xmlHtml += ' '+columnItem[i]['columnName']+'\n'+'FROM      '+$('#tableId').val()+'\n'+'WHERE   1=1';
				}	
				else{
					if(columnItem[i]['dataType'] == 'DATE'){
						 xmlHtml += " TO_CHAR("+columnItem[i]['columnName']+", 'YYYY-MM-DD') AS "+columnItem[i]['columnName']+'\n'+"             ,  ";
					}
					else{
						  xmlHtml += ' '+columnItem[i]['columnName']+'\n'+'             ,  ';
					}
					
				}				
					
				
			  }
		    }
		    else if(eventType == 'INSERT'){
			  xmlHtml += 'INSERT INTO '+$('#tableId').val()+' ('+'\n'+'                 ';
			    for(var i=0;i<columnItem.length;i++){	
				 if(i == columnItem.length-1){
					xmlHtml += ' '+columnItem[i]['columnName']+' )'+'\n'+'VALUES <foreach item="item" collection="list" index="i" separator=" " open="">\n                (  ';
					for(var j=0;j<columnItem.length;j++){
						if(columnItem[j]['dataType'] == 'VARCHAR' || columnItem[j]['dataType'] == 'VARCHAR2'){
							jdbcType = 'VARCHAR';
						}
						else if(columnItem[j]['dataType'] == 'NUMBER'){
							jdbcType = 'NUMERIC';
						}
						else{
							jdbcType = 'VARCHAR';
						}
						if(j == columnItem.length-1){
							if(columnItem[j]['dataType'] == 'DATE'){
						         xmlHtml += ' MOM_COMMON_PKG.FN_GET_LOCAL_TIME(#{item.companyCd, jdbcType=VARCHAR},#{item.divisionCd, jdbcType=VARCHAR})\n'+'                )\n       </foreach>';
					          }
					        else{
						      xmlHtml += ' #{item.'+columnItem[j]['columnName2']+', jdbcType='+jdbcType+'}\n                )\n       </foreach>';
					        }
					    
				        }
				        else{
					          if(columnItem[j]['dataType'] == 'DATE'){
						         xmlHtml += ' MOM_COMMON_PKG.FN_GET_LOCAL_TIME(#{item.companyCd, jdbcType=VARCHAR},#{item.divisionCd, jdbcType=VARCHAR})\n'+'                ,  ';
					          }
					          else{
						            xmlHtml += ' #{item.'+columnItem[j]['columnName2']+', jdbcType='+jdbcType+'}\n'+'                ,  ';
					          }
					     
				         }
					}
				}	
				else{
					xmlHtml += ' '+columnItem[i]['columnName']+'\n'+'                , ';
				}				
					
				
			  }
			
		    }
			
			$('#xmlText').val(xmlHtml);
			result = 'SUCCESS';			
		}

	}		 		
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, XUSM9010);
	XUSM9010.init();
});