
var menuId = 'XUSM9010';
var XUSM9010 = {
	initParam		:  undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
	init: function() {
		var that = this;	
		$('#grid1').remove();
		var textareaHtml = '<textarea class = "xmlText" id = "xmlText" name="opinion"  ></textarea>';
		var comboData = [{"code":"R","label":"SELECT"},{"code":"C","label":"INSERT"},{"code":"CU","label":"UPSERT"},{"code":"U","label":"UPDATE"},{"code":"D","label":"DELETE"}];
		$('.grid-box1-h01').prepend(textareaHtml);
		$('#eventTypeSP1').jqxComboBox("clear");	
		$('#eventTypeSP1').jqxComboBox('source',comboData);	
	},
	searchCallBack: function(index,your,action,btnId,param,result,data) {
		if(index ==0 && btnId =='findBtn'){	
			//AUIGrid.clearGridData(momWidget.grid[index]);
			var columnItem = data;
			var xmlHtml   = '';
			var eventType = $('#eventTypeSP1').val();
			var jdbcType  = 'VARCHAR';
			var userId    = 'userId';
			if(eventType == 'R'){
				xmlHtml += '  <select id="get_defaultInfo1" parameterType="java.util.HashMap"  resultType="com.mom.dto.LowerHashMap" fetchSize="1000">\n      SELECT  ';
			  for(var i=0;i<columnItem.length;i++){	
				 if(i == columnItem.length-1){
					xmlHtml += ' '+columnItem[i]['columnName']+'\n'+'        FROM      '+$('#tableIdSP1').val()+'\n'+'        WHERE   1=1\n  </select>';
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
		    else if(eventType == 'C'){
			  xmlHtml += '  <insert id="create_defaultInfo1" parameterType="java.util.List">\n   <foreach item="item" collection="list" index="i" separator=" " open="INSERT ALL" close="SELECT * FROM DUAL"> \n     INTO '+$('#tableIdSP1').val()+' ('+'\n'+'                  ';
			    for(var i=0;i<columnItem.length;i++){	
				 if(i == columnItem.length-1){
					xmlHtml += ''+columnItem[i]['columnName']+' )'+'\n'+'      VALUES \n              (  ';
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
						         xmlHtml += ' MOM_COMMON_PKG.FN_GET_LOCAL_TIME(#{item.companyCd, jdbcType=VARCHAR},#{item.divisionCd, jdbcType=VARCHAR})\n'+'              )\n   </foreach>\n  </insert>';
					          }
					        else{
						      xmlHtml += ' #{item.'+columnItem[j]['columnName2']+', jdbcType='+jdbcType+'}\n                              )\n   </foreach>\n  </insert>';
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
		     else if(eventType == 'CU'){
			  var pkItem = [];
			  for(var j=0;j<columnItem.length;j++){			
				  if(columnItem[j]['isPk']=='Y'){
					  pkItem.push(columnItem[j]);
				  }
			  }
			  xmlHtml += '  <insert id="upsert_defaultInfo1" parameterType="java.util.List">\n      MERGE INTO '+$('#tableId'+'SP1').val()+' \n            USING('+' <foreach item="item" collection="list" index="i" separator="UNION" open="" close="">\n                     SELECT' ;
			    for(var i=0;i<columnItem.length;i++){	
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
						         xmlHtml += ' MOM_COMMON_PKG.FN_GET_LOCAL_TIME(#{item.companyCd, jdbcType=VARCHAR},#{item.divisionCd, jdbcType=VARCHAR}) as '+columnItem[i]['columnName2']+'\n' +'                     ';
						         xmlHtml += 'FROM DUAL'+'\n'+'                   </foreach>'+' ) PARAM'+'\n';
					     }
					     else{
						        if(columnItem[i]['columnName2']=='createBy' || columnItem[i]['columnName2']=='updateBy'){
							             xmlHtml += ' #{item.'+userId+', jdbcType='+jdbcType+'} as '+columnItem[i]['columnName2']+'\n' +'                     ';
							             xmlHtml += 'FROM DUAL'+'\n'+'                   </foreach>'+' ) PARAM'+'\n';
						            }
						            else{
							               xmlHtml += ' #{item.'+columnItem[i]['columnName2']+', jdbcType='+jdbcType+'} as '+columnItem[i]['columnName2']+'\n' +'                     ';
							               xmlHtml += 'FROM DUAL'+'\n'+'                   </foreach>'+' ) PARAM'+'\n';
						            }
						           
					     }
					   }
					   else{
						 if(columnItem[i]['dataType'] == 'DATE'){
						         xmlHtml += ' MOM_COMMON_PKG.FN_GET_LOCAL_TIME(#{item.companyCd, jdbcType=VARCHAR},#{item.divisionCd, jdbcType=VARCHAR}) as '+columnItem[i]['columnName2']+','+'\n' +'                           ';
					     }
					     else{
						        if(columnItem[i]['columnName2']=='createBy' || columnItem[i]['columnName2']=='updateBy'){
							             xmlHtml += ' #{item.'+userId+', jdbcType='+jdbcType+'} as '+columnItem[i]['columnName2']+','+'\n' +'                           ';
						            }
						            else{
							               xmlHtml += ' #{item.'+columnItem[i]['columnName2']+', jdbcType='+jdbcType+'} as '+columnItem[i]['columnName2']+','+'\n' +'                           ';
						            }
						           
					     }
					}
						
					   
					
						
			  }
			  xmlHtml +=  '            ON ( ';
			    for(var k=0;k<pkItem.length;k++){								
					if(k == pkItem.length-1){
						xmlHtml += pkItem[k]['columnName']+' = PARAM.'+pkItem[k]['columnName2']+' )\n            WHEN MATCHED THEN '+'\n';
				     }											
					else{
						xmlHtml += pkItem[k]['columnName']+' = PARAM.'+pkItem[k]['columnName2'] +' AND'+'\n                 ';
					}
					 
				}
				xmlHtml += '                 UPDATE SET ';
				for(var g=0;g<columnItem.length;g++){
					if(columnItem[g]['isPk']=='N'){
						if(g == columnItem.length-1){
							xmlHtml += columnItem[g]['columnName'] + ' = PARAM.'+columnItem[g]['columnName2'] +'\n'+'            WHEN NOT MATCHED THEN'+'\n';
						}
					    else{  
								xmlHtml += columnItem[g]['columnName'] + ' = PARAM.'+columnItem[g]['columnName2'] +'\n'+'                          , ';
					    }
					}
				
						
						
					
					}
					
				xmlHtml += '                     INSERT ( ';
				for(var h=0;h<columnItem.length;h++){
					if(h == columnItem.length-1){
						  xmlHtml += columnItem[h]['columnName']+' )'+'\n';
					}
					else if(h==0){
						 xmlHtml += columnItem[h]['columnName']+'\n'+'                            , ';
					}
					else{
						  xmlHtml += columnItem[h]['columnName']+'\n'+'                            , ';
					}
					
					
				}
				xmlHtml += '                     VALUES ( ';
				for(var n=0;n<columnItem.length;n++){
					if(n == columnItem.length-1){
						  xmlHtml += 'PARAM.'+columnItem[n]['columnName2']+' )'+'\n' +'  </insert>';
					}
					else if(n==0){
						 xmlHtml += 'PARAM.'+columnItem[n]['columnName2']+'\n'+'                            , ';
					}
					else{
						  xmlHtml += 'PARAM.'+columnItem[n]['columnName2']+'\n'+'                            , ';
					}
					
					
				}
			
		    }
			else if(eventType == 'U'){
			  xmlHtml += '  <update id="modify_defaultInfo1" parameterType="java.util.List">\n    <foreach collection="list" item="item" separator=";" open="DECLARE BEGIN" close=";END;">\n      UPDATE '+$('#tableId'+'SP1').val()+'\n'+'      SET    ';
			    for(var i=0;i<columnItem.length;i++){	
				     if(columnItem[i]['columnName']=='CREATE_BY' || columnItem[i]['columnName']=='CREATE_DATE' || columnItem[i]['isPk']=='Y'){
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
		    else if(eventType == 'D'){
			  var pkItem = [];
			  for(var i=0;i<columnItem.length;i++){			
				  if(columnItem[i]['isPk']=='Y'){
					  pkItem.push(columnItem[i]);
				  }
			  }
			  xmlHtml += '  <delete id="remove_defaultInfo1" parameterType="java.util.List">\n      DELETE FROM '+$('#tableIdSP1').val()+'\n'+'      <where>\n       <foreach collection="list" item="item" open="" close="" separator="OR">\n        (       ';
			  for(var i=0;i<pkItem.length;i++){								
					if(i == pkItem.length-1){
						xmlHtml += columnItem[i]['columnName']+' = #{item.'+columnItem[i]['columnName2']+', jdbcType=VARCHAR}'+'\n        )\n       </foreach>\n      </where>\n  </delete>';
				     }											
					else{
						xmlHtml += columnItem[i]['columnName']+' = #{item.'+columnItem[i]['columnName2'] +', jdbcType=VARCHAR}'+'\n           AND  ';
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
	momSetup.init();
	momWidget.init(1, menuId, XUSM9010);
	XUSM9010.init();
});