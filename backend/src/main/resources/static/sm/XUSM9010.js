
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
			var userId    = 'userId';
			if(eventType == 'SELECT'){
				xmlHtml += '  <select id="get_defaultInfo1" parameterType="java.util.HashMap"  resultType="com.mom.dto.LowerHashMap" fetchSize="1000">\n      SELECT  ';
			  for(var i=0;i<columnItem.length;i++){	
				 if(i == columnItem.length-1){
					xmlHtml += ' '+columnItem[i]['columnName']+'\n'+'        FROM      '+$('#tableId').val()+'\n'+'        WHERE   1=1\n  </select>';
				}	
				else{
					if(columnItem[i]['dataType'] == 'DATE'){
						
						 xmlHtml += " TO_CHAR("+columnItem[i]['columnName']+", 'YYYY-MM-DD') AS "+columnItem[i]['columnName']+'\n'+"                   ,  ";
					}
					else{
						  xmlHtml += ' '+columnItem[i]['columnName']+'\n'+'                   ,  ';
					}
					
				}				
					
				
			  }
		    }
		    else if(eventType == 'INSERT'){
			  xmlHtml += '  <insert id="create_defaultInfo1" parameterType="java.util.List">\n      INSERT INTO '+$('#tableId').val()+' ('+'\n'+'                  ';
			    for(var i=0;i<columnItem.length;i++){	
				 if(i == columnItem.length-1){
					xmlHtml += ''+columnItem[i]['columnName']+' )'+'\n'+'      VALUES <foreach item="item" collection="list" index="i" separator=" " open="">\n              (  ';
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
						         xmlHtml += ' MOM_COMMON_PKG.FN_GET_LOCAL_TIME(#{item.companyCd, jdbcType=VARCHAR},#{item.divisionCd, jdbcType=VARCHAR})\n'+'              )\n             </foreach>\n  </insert>';
					          }
					        else{
						      xmlHtml += ' #{item.'+columnItem[j]['columnName2']+', jdbcType='+jdbcType+'}\n                              )\n             </foreach>\n  </insert>';
					        }
					    
				        }
				        else{
					          if(columnItem[j]['dataType'] == 'DATE'){
						         xmlHtml += ' MOM_COMMON_PKG.FN_GET_LOCAL_TIME(#{item.companyCd, jdbcType=VARCHAR},#{item.divisionCd, jdbcType=VARCHAR})\n'+'                ,';
					          }
					          else{
						            if(columnItem[j]['columnName2']=='createBy' || columnItem[j]['columnName2']=='updateBy'){
							             xmlHtml += ' #{item.'+userId+', jdbcType='+jdbcType+'}\n'+'                ,';
						            }
						            else{
							               xmlHtml += ' #{item.'+columnItem[j]['columnName2']+', jdbcType='+jdbcType+'}\n'+'                ,';
						            }
						           
					          }
					     
				         }
					}
				}	
				else{
					xmlHtml += ''+columnItem[i]['columnName']+'\n'+'                , ';
				}				
					
				
			  }
			
		    }
			else if(eventType == 'UPDATE'){
			  xmlHtml += '  <update id="modify_defaultInfo1" parameterType="java.util.List">\n    <foreach collection="list" item="item" separator=";" open="DECLARE BEGIN" close=";END;">\n      UPDATE '+$('#tableId').val()+'\n'+'      SET    ';
			    for(var i=0;i<columnItem.length;i++){	
				     if(columnItem[i]['columnName']=='CREATE_BY' || columnItem[i]['columnName']=='CREATE_DATE'){
					         continue;
 				      }
					if(columnItem[i]['dataType'] == 'VARCHAR' || columnItem[i]['dataType'] == 'VARCHAR2'){
							jdbcType = 'VARCHAR';
						}
						else if(columnItem[i]['dataType'] == 'NUMBER'){
							jdbcType = 'NUMERIC';
						}
						else{
							jdbcType = 'VARCHAR';
						}
				 if(i == columnItem.length-1){
					if(columnItem[i]['dataType'] == 'DATE'){						
						         xmlHtml += columnItem[i]['columnName']+' = MOM_COMMON_PKG.FN_GET_LOCAL_TIME(#{item.companyCd, jdbcType=VARCHAR},#{item.divisionCd, jdbcType=VARCHAR})\n'+'      WHERE  1=1\n';
						        
					          }
					else{
						      xmlHtml += columnItem[i]['columnName']+' = #{item.'+columnItem[i]['columnName2']+', jdbcType='+jdbcType+'}'+'\n'+'      WHERE  1=1\n ';
					}
					 for(var k=0;k<columnItem.length;k++){
				           if(columnItem[k]['isPk']=='Y'){
					            xmlHtml += '      AND    '+columnItem[k]['columnName']+' = #{item.'+columnItem[k]['columnName2']+', jdbcType='+jdbcType+'}\n'; 
				           }
				         
							         
				     }
				       xmlHtml += '    </foreach>\n  </update>';
					
				}	
				else{
					  if(columnItem[i]['dataType'] == 'DATE'){
						         xmlHtml += columnItem[i]['columnName']+' = MOM_COMMON_PKG.FN_GET_LOCAL_TIME(#{item.companyCd, jdbcType=VARCHAR},#{item.divisionCd, jdbcType=VARCHAR})\n'+'           , ';
					          }
					  else{
						 if(columnItem[i]['columnName2']=='createBy' || columnItem[i]['columnName2']=='updateBy'){
							            xmlHtml += columnItem[i]['columnName']+' = #{item.'+userId+', jdbcType='+jdbcType+'}\n'+'           , ';
						    }
						    else{
							  xmlHtml += columnItem[i]['columnName']+' = #{item.'+columnItem[i]['columnName2']+', jdbcType='+jdbcType+'}\n'+'           , ';
						    }
						         
					  }
				}				
					
				
			  }
			
		    }
		    else if(eventType == 'DELETE'){
			  var pkItem = [];
			  for(var i=0;i<columnItem.length;i++){			
				  if(columnItem[i]['isPk']=='Y'){
					  pkItem.push(columnItem[i]);
				  }
			  }
			  xmlHtml += '  <delete id="remove_defaultInfo1" parameterType="java.util.List">\n      DELETE FROM '+$('#tableId').val()+'\n'+'      <where>\n       <foreach collection="list" item="item" open="" close="" separator="OR">\n        (       ';
			  for(var i=0;i<pkItem.length;i++){								
					if(i == pkItem.length-1){
						xmlHtml += columnItem[i]['columnName']+' = #{item.'+columnItem[i]['columnName2']+'\n        )\n       </foreach>\n      </where>\n  </delete>';
				     }											
					else{
						xmlHtml += columnItem[i]['columnName']+' = #{item.'+columnItem[i]['columnName2'] +'\n           AND  ';
					}
					 
				}
				  
			} 			  			 		
			else{
				
			}
			$('#xmlText').val(xmlHtml);
				
		}

	}		 		
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, XUSM9010);
	XUSM9010.init();
});