var _charts = {};

_charts.dataMap = {
	"area":["area-basic","area-stack"],
	"bar":["bar-animation-delay","bar-brush","bar-gradient","bar-simple","bar1","bar-negative","bar-polar-stack","bar-polar-stack-radial","bar-stack","bar-tick-align","bar-waterfall","bar-waterfall2","bar-y-category","bar-y-category-stack","bar-mix","bar-line-mix","bar-line-mix2"],
	"line":["line-mini","line-simple","line-smooth","line-gradient2","line-log","line-marker","line-stack","line-step","line-style","line-y-category"],
	"scatter":["scatter-simple","scatter-in-cartesian-coordinate-system","scatter-stream-visual","scatter-exponential-regression"],
	"pie":["pie-custom","pie-doughnut","pie-nest","pie-roseType","pie-simple"],
	"funnel":["funnel-default","funnel-customize","funnel-align","funnel-multiple"]
};

_charts.classMap = {
		"__level":2,
		"title":{
				"__level":3,
				"textStyle": {
					"__level":4,
					"color":""
				},
				"text":"",
				"subtext":"",
				"sublink":"",
				"left":"",
				"top":0,
				"x":["","left","center","right"],
				"y":""
		},
		"tooltip":{
				"__level":3,
				"axisPointer":{
						"__level":4,
						"type":["","line","shadow","cross"],
						"label":{
								"__level":5,
								"backgroundColor":"",
								"borderColor":"",
								"borderWidth":"",
								"shadowBlur":0,
								"shadowOffsetX":0,
								"shadowOffsetY":0,
								"color":""
						}
				},
				"triggerOn":"",
				"formatter":"",
				"trigger":["","item","axis","none"],
		},
		"toolbox":{
				"__level":3,
				"feature":{
						"__level":4,
						"dataZoom":{},
						"restore":{
								"__level":5,
								"show":false
						},
						"saveAsImage":{
								"__level":5,
								"show": false
						},
						"dataView":{
								"__level":5,
								"show": false,
								"readOnly":false
						},
						"magicType":{
								"__level":5,
								"show":false,
								"type":["multiple",["line","bar","stack","tlied"]]
						}
				}
		},
		"brush":{
		  		"__level":3,
				"toolbox":["multiple",["rect", "polygon", "lineX", "lineY", "keep", "clear"]],
				"xAxisIndex":0
		},
		"legend":{
	  			"__level":3,
		  		"textStyle":{
					"__level":4,
					"color":"",
					"fontSize":0,
					"fontWeight":"",
					"lineHeight":0
				},
				"data":[],
				"show":false,
				"orient":["","horizontal","vertical"],
				"align":["auto","left","right"],
				"x":"",
				"y":"",
				"left":"",
				"right":"",
				"top":"",
				"bottom":"",
				"width":"",
				"height":"",
				"padding":"",
				"itemGap":0,
				"itemWidth":0,
				"itemHeight":0
		},
		"dataZoom":{
	  			"__level":3,
				"type":"",
				"show":false,
				"realtime":false,
				"start":0,
				"end":0
		},
		"polar":{
				"__level":3,
				"zlevel":0,
				"z":0
		},
		"angleAxis": {
				"__level":3,
				"type": ["","value","category","time","log"],
				"data": [],
				"z": 0
		},
		"radiusAxis": {
				"__level":3,
				"type": ["","value","category","time","log"],
				"data": [],
				"z": 0
		},
		"xAxis":{
	  			"__level":3,
	  			"axisTick":{
	  					"__level":4,
	  					"show":true,
	  					"alignWithLabel":false
				},
				"axisLine":{
						"__level":4,
						"show":true,
						"onZero":false
				},
				"axisLabel":{
						"__level":4,
						"show":true,
						"inside":false,
						"color":"",
						"fontSize":"",
						"formatter":""
				},
				"splitLine":{
						"__level":4,
						"show":false
				},
				"splitArea": {
						"__level":4,
						"show": false
				},
				"splitNumber":0,
				"name":"",
				"type":["","value","category","time","log"],
				"data":[],
				"boundaryGap":false,
				"position":"",
				"max":{},
				"min":{},
				"gridIndex":0,
				"silent": false,
				"interval":0
	  },
	  "yAxis":{
				"__level":3,
				"axisTick":{
						"__level":4,
						"show":true,
						"alignWithLabel":false
				},
				"axisLine":{
						"__level":4,
						"show":true,
						"onZero":false
				},
				"axisLabel":{
						"__level":4,
						"show":true,
						"inside":false,
						"color":"",
						"fontSize":"",
						"formatter":""
				},
				"splitLine":{
						"__level":4,
						"show":true
				},
				"splitArea": {
						"__level":4,
						"show": false
				},
				"splitNumber":0,
				"name":"",
				"type":["","value","category","time","log"],
				"data":[],
				"boundaryGap":false,
				"position":"",
				"max":0,
				"min":0,
				"gridIndex":0,
				"silent": false,
				"interval":0
	  },
	  "grid":{
				"__level":3,
				"left":"",
				"right":"",
				"top":"",
				"bottom":"",
				"containLabel":false
	  },
	  "visualMap":{
				"__level":3,
				"pieces":{
						"__level":4,
						"min":0,
						"max":0,
						"color":""
				},
				"inRange":{
						"__level":4,
						"colorLightness":["multiple",[0, 0]]
				},
				"outOfRange":{
						"__level":4,
						"color":""
				},
				"controller": {
						"__level":4,
		            	"inRange": {
		            		"__level":5,
		            		"color": ""
		            	}
		        },
				"text":["multiple",["High", "Low"]],
				"type":["","continuous","piecewise"],
				"show":false,
				"inverse":false,
				"calculable":false,
				"itemHeight":0,
				"top":0,
				"right":0,
				"min":0,
				"max":0,
				"dimension":0,
				"seriesIndex":{}
	  },
	  "series":{
				"__level":3,
				"data":[],
				"itemStyle":{
					"__level":4,
					"normal":{
							"__level":5,
							"color":"",
							"opacity":0,
							"borderColor":"",
							"borderWidth":0,
							"shadowBlur":0,
							"shadowColor":""
					},
					"emphasis":{
							"__level":5,
							"barBorderColor":"",
							"color":""
					},
					"color":"",
					"shadowBlur":0,
					"shadowColor":""
				},
				"label":{
					"__level":4,
					"normal":{
							"__level":5,
							"show":false,
							"position":["multiple",["",""]],
							"backgroundColor":"",
							"borderColor":"",
							"borderWidth":0,
							"borderRadius":0,
							"formatter":"",
							"rich":{},
							"textStyle":{
									"__level":6,
									"color":"",
									"fontSize":0,
									"fontWeight":""
							}
					},
					"emphasis": {
							"__level":5,
							"show":false,
							"shadowBlur":0,
							"shadowColor":"",
							"color":"",
							"position":["multiple",["",""]],
							"formatter":"",
							"textStyle":{
									"__level":6,
									"color":"",
									"fontSize":0,
									"fontWeight":""
							}
					},
					"show":false,
					"position":["multiple",["",""]]
				},
				"markLine":{
						"__level":4,
						"lineStyle":{
							"color":"",
							"width":0,
							"type":["","solid","dashed","dotted"]
						},
						"silent":false,
						"data":[]
				},
				"markPoint":{
						"__level":4,
						"data":[]
				},
				"labelLine":{
						"__level":4,
						"normal":{
						    "__level":5,
						    "smooth":{},
						    "length":0,
						    "length2":0,
							"lineStyle":{
									"__level":6,
									"color": ""
							}
						}
				},
				"lineStyle": {
	        		"__level":4,
		            "normal": {
		            	"__level":5,
		                "color": "",
		                "width": 0,
		                "type": ["","solid","dashed","dotted"],
						"shadowColor": "",
						"shadowBlur": "",
						"shadowOffsetX": "",
						"shadowOffsetY": ""
		            }
				},
				"selectedMode":"",
				"symbol":["","circle", "rect", "roundRect", "triangle", "diamond", "pin", "arrow"],
				"symbolSize":0,
				"stack":"",
				"name":"",
				"xAxisIndex":0,
				"yAxisIndex":0,
				"coordinateSystem":["","polar","cartesian2d","geo"],
				"barWidth":"",
				"type":["","line", "bar", "scatter", "pie","funnel"],
				"areaStyle":{},
				"smooth":false,
				"hoverAnimation":false,
				"clockwise":false,
				"animationEasing":["","linear","quadraticIn","quadraticOut","quadraticInOut","cubicIn","cubicOut","cubicInOut","quarticIn","quarticOut","quarticInOut","quinticIn","quinticOut","quinticInOut","sinusoidalIn","sinusoidalOut","sinusoidalInOut","exponentialIn","exponentialOut","exponentialInOut","circularIn","circularOut","circularInOut","elasticIn","elasticOut","elasticInOut","backIn","backOut","backInOut","bounceIn","bounceOut","bounceInOut"],
				"radius":["multiple",["0%","0%"]],
				"center":["multiple",["0%","0%"]],
				"funnelAlign":["","left","right","center"],
				"sort":["","ascending","descending","none"],
				"gap":0,
				"min":0,
				"max":0,
				"minSize":"",
				"maxSize":"",
				"width":"",
				"height":"",
				"left":"",
				"right":"",
				"top":"",
				"bottom":""
	  }
};


_charts.sample = {
	"line-mini":{
	    "xAxis":{
	        "type":"category",
	        "data":["2017/05","2017/07","2017/09","2017/11","2017/06","2017/08","2017/10"],
	        "axisTick":{
	            "show":false
	        },
	        "axisLine":{
	            "show":false
	        },
	        "axisLabel":{
	            "show":false
	        }
	    },
	    "yAxis":{
	        "type":"value",
	        "max":800,
	        "interval":800,
	        "axisTick":{
	            "show":false   
	        },
	        "axisLine":{
	            "show":false
	        }
	    },
	    "series":[{
	        "data":[191,150,106,194,338,368,283],
	        "type":"line",
	        "itemStyle":{
	            "color":"#2d35d9"
	        },
	        "symbolSize":6,
	        "symbol":"circle",
	        "label":{
	            "show":true
	            
	        },
	        "markLine":{
	        	"silent": false,
	            "data":[{
	                "yAxis":300
	            }]
	        }
	        
	    }],
	    "grid":{
	        "top":"5%"
	    }
	        
	},
	"line-simple":{
			"xAxis": [{
					"type": "category",
					"data": ["월", "화", "수", "목", "금", "토", "일"]
			}],
			"yAxis": [{
					"type": "value"
			}],
			"series": [{
					"data": [820, 932, 901, 934, 1290, 1330, 1320],
					"type": "line"
			}]
	},
	"line-smooth":{
		"xAxis": {
        "type": "category",
        "data": ["월", "화", "수", "목", "금", "토", "일"]
		},
	    "yAxis": {
	        "type": "value"
	    },
	    "series": [{
	        "data": [820, 932, 901, 934, 1290, 1330, 1320],
	        "type": "line",
	        "smooth": true
	    }]
	},
	"line-gradient2":{
		  "title": {
		        "left": "center",
		        "text": "Gradient along the y axis"
		   },
		   "tooltip": {
		       "trigger": "axis"
		   },
		   "xAxis": {
		       "data": _data.gradient[0]
		   },
		   "yAxis": {
		       "splitLine": {
		    	   "show": false
		    	}
		   },
		   "visualMap": [{
		       "show": false,
		       "type": "continuous"
		   }],
		   "series": [{
		       "type": "line",
		       "showSymbol": false,
		       "data": _data.gradient[1]
		   }]
	},
	"line-log":{
	    "title": {
	        "text": "Example",
	        "left": "center"
	    },
	    "tooltip": {
	        "trigger": "item",
	        "formatter": "{a} <br/>{b} : {c}"
	    },
	    "legend": {
	        "left": "left",
	        "data": ["색인2", "색인3","색인1/2"]
	    },
	    "xAxis": {
	        "type": "category",
	        "name": "x",
	        "splitLine": {"show": false},
	        "data": ["하나", "둘", "셋", "넷", "다섯", "여섯", "일곱", "여덟", "아홉"]
	    },
	    "grid": {
	        "left": "3%",
	        "right": "4%",
	        "bottom": "3%",
	        "containLabel": true
	    },
	    "yAxis": {
	        "type": "log",
	        "name": "y"
	    },
	    "series": [
	        {
	            "name": "색인3",
	            "type": "line",
	            "data": [1, 3, 9, 27, 81, 247, 741, 2223, 6669]
	        },
	        {
	            "name": "색인2",
	            "type": "line",
	            "data": [1, 2, 4, 8, 16, 32, 64, 128, 256]
	        },
	        {
	            "name": "색인1/2",
	            "type": "line",
	            "data": [1/2, 1/4, 1/8, 1/16, 1/32, 1/64, 1/128, 1/256, 1/512]
	        }
	    ]
	},
	"line-marker":{
		"title": {
        "text": "NextWeek A change of temperature",
        "subtext": "Sub Title"
    },
    "tooltip": {
        "trigger": "axis"
    },
    "legend": {
        "data":["최고기온","최저기온"]
    },
    "toolbox": {
        "show": true,
        "feature": {
            "dataZoom": {
                "yAxisIndex": "none"
            },
            "dataView": {"readOnly": false},
            "magicType": {"type": ["line", "bar"]},
            "restore": {},
            "saveAsImage": {}
        }
    },
    "xAxis":  {
        "type": "category",
        "boundaryGap": false,
        "data": ["월요일","화요일","수요일","목요일","금요일","토요일","일요일"]
    },
    "yAxis": {
        "type": "value",
        "axisLabel": {
            "formatter": "{value} °C"
        }
    },
    "series": [
        {
            "name":"최고기온",
            "type":"line",
            "data":[11, 11, 15, 13, 12, 13, 10],
            "markPoint": {
                "data": [
                    {"type": "max", "name": "최대"},
                    {"type": "min", "name": "최소"}
                ]
            },
            "markLine": {
                "data": [
                    {"type": "average", "name": "평균"}
                ]
            }
        },
        {
            "name":"최저기온",
            "type":"line",
            "data":[1, -2, 2, 5, 3, 2, 0],
            "markPoint": {
                "data": [
                    {"name": "주간별 최소", "value": -2, "xAxis": 1, "yAxis": -1.5}
                ]
            },
            "markLine": {
                "data": [
                    {"type": "average", "name": "평균"},
                    [
                    	{
                    		"symbol": "none",
                    		"x": "90%",
                    		"yAxis": "max"
                    	}, 
                    	{
                    		"symbol": "circle",
                    		"label": {
                    			"normal": {
                    				"position": "start",
                    				"formatter": "최대"
                    			}
                    		},
                    		"type": "max",
                    		"name": "가장 높은지점"
                    	}
                    ]
                ]
            }
        }
    ]
	},
	"line-stack":{
		"title": {
	        "text": "Line graph"
	    },
	    "tooltip": {
	        "trigger": "axis"
	    },
	    "legend": {
	        "data":["메일광고","제휴광고","영상광고","직접방문","검색엔진"]
	    },
	    "grid": {
	        "left": "3%",
	        "right": "4%",
	        "bottom": "3%",
	        "containLabel": true
	    },
	    "toolbox": {
	        "feature": {
	            "saveAsImage": {}
	        }
	    },
	    "xAxis": {
	        "type": "category",
	        "boundaryGap": false,
	        "data": ["월요일","화요일","수요일","목요일","금요일","토요일","일요일"]
	    },
	    "yAxis": {
	        "type": "value"
	    },
	    "series": [
	        {
	            "name":"메일광고",
	            "type":"line",
	            "stack": "총량",
	            "data":[120, 132, 101, 134, 90, 230, 210]
	        },
	        {
	            "name":"제휴광고",
	            "type":"line",
	            "stack": "총량",
	            "data":[220, 182, 191, 234, 290, 330, 310]
	        },
	        {
	            "name":"영상광고",
	            "type":"line",
	            "stack": "총량",
	            "data":[150, 232, 201, 154, 190, 330, 410]
	        },
	        {
	            "name":"직접방문",
	            "type":"line",
	            "stack": "총량",
	            "data":[320, 332, 301, 334, 390, 330, 320]
	        },
	        {
	            "name":"검색엔진",
	            "type":"line",
	            "stack": "총량",
	            "data":[820, 932, 901, 934, 1290, 1330, 1320]
	        }
	    ]
	},
	"line-step":{
		"title": {
        "text": "Step Line"
    },
    "tooltip": {
        "trigger": "axis"
    },
    "legend": {
        "data":["Step Start", "Step Middle", "Step End"]
    },
    "grid": {
        "left": "3%",
        "right": "4%",
        "bottom": "3%",
        "containLabel": true
    },
    "toolbox": {
        "feature": {
            "saveAsImage": {}
        }
    },
    "xAxis": {
        "type": "category",
        "data": ["월", "화", "수", "목", "금", "토", "일"]
    },
    "yAxis": {
        "type": "value"
    },
    "series": [
        {
            "name":"Step Start",
            "type":"line",
            "step": "start",
            "data":[120, 132, 101, 134, 90, 230, 210]
        },
        {
            "name":"Step Middle",
            "type":"line",
            "step": "middle",
            "data":[220, 282, 201, 234, 290, 430, 410]
        },
        {
            "name":"Step End",
            "type":"line",
            "step": "end",
            "data":[450, 432, 401, 454, 590, 530, 510]
        }
    ]
	},
	"line-style":{
		"xAxis": {
        "type": "category",
        "data": ["월", "화", "수", "목", "금", "토", "일"]
    },
    "yAxis": {
        "type": "value"
    },
    "series": [{
        "data": [120, 200, 150, 80, 70, 110, 130],
        "type": "line",
        "symbol": "triangle",
        "symbolSize": 20,
        "lineStyle": {
            "normal": {
                "color": "green",
                "width": 4,
                "type": "dashed"
            }
        },
        "itemStyle": {
            "normal": {
                "borderWidth": 3,
                "borderColor": "yellow",
                "color": "blue"
            }
        }
    }]
	},
	"line-y-category":{
		"legend": {
        "data":["고도(km) / 기온(°C)"]
    },
    "tooltip": {
        "trigger": "axis",
        "formatter": "Temperature : <br/>{b}km : {c}°C"
    },
    "grid": {
        "left": "3%",
        "right": "4%",
        "bottom": "3%",
        "containLabel": true
    },
    "xAxis": {
        "type": "value",
        "axisLabel": {
            "formatter": "{value} °C"
        }
    },
    "yAxis": {
        "type": "category",
        "axisLine": {"onZero": false},
        "axisLabel": {
            "formatter": "{value} km"
        },
        "boundaryGap": false,
        "data": ["0", "10", "20", "30", "40", "50", "60", "70", "80"]
    },
    "series": [
        {
            "name": "고도(km) / 기온(°C)",
            "type": "line",
            "smooth": true,
            "lineStyle": {
                "normal": {
                    "width": 3,
                    "shadowColor": "rgba(0,0,0,0.4)",
                    "shadowBlur": 10,
                    "shadowOffsetY": 10
                }
            },
            "data":[15, -50, -56.5, -46.5, -22.1, -2.5, -27.7, -55.7, -76.5]
        }
    ]
	},
	"area-basic": {
		"xAxis": {
        "type": "category",
        "boundaryGap": false,
        "data": ["월", "화", "수", "목", "금", "토", "일"]
    },
    "yAxis": {
        "type": "value"
    },
    "series": [{
        "data": [820, 932, 901, 934, 1290, 1330, 1320],
        "type": "line",
        "areaStyle": {}
    }]
	},
	"area-stack":{
		"title": {
        "text": "Line Grape"
    },
    "tooltip": {
        "trigger": "axis"
    },
    "legend": {
        "data":["메일광고","제휴광고","영상광고","직접방문","검색엔진"]
    },
    "grid": {
        "left": "3%",
        "right": "4%",
        "bottom": "3%",
        "containLabel": true
    },
    "toolbox": {
        "feature": {
            "saveAsImage": {}
        }
    },
    "xAxis": {
        "type": "category",
        "boundaryGap": false,
        "data": ["월요일","화요일","수요일","목요일","금요일","토요일","일요일"]
    },
    "yAxis": {
        "type": "value"
    },
    "series": [
        {
            "name":"메일광고",
            "type":"line",
            "stack": "view",
			"smooth":true,
            "data":[120, 132, 101, 134, 90, 230, 210],
						"areaStyle":{}
        },
        {
            "name":"제휴광고",
            "type":"line",
            "stack": "view",
			"smooth":true,
            "data":[220, 182, 191, 234, 290, 330, 310],
						"areaStyle":{}
        },
        {
            "name":"영상광고",
            "type":"line",
            "stack": "view",
			"smooth":true,
            "data":[150, 232, 201, 154, 190, 330, 410],
						"areaStyle":{}
        },
        {
            "name":"직접방문",
            "type":"line",
            "stack": "view",
			"smooth":true,
            "data":[320, 332, 301, 334, 390, 330, 320],
						"areaStyle":{}
        },
        {
            "name":"검색엔진",
            "type":"line",
            "stack": "view",
			"smooth":true,
            "data":[820, 932, 901, 934, 1290, 1330, 1320],
						"areaStyle":{}
        }
    ]
	},
	"bar-animation-delay":{
	    "title": {
	        "text": "Bar Chart"
	    },
	    "legend": {
	        "data": ["bar", "bar2"],
	        "align": "left"
	    },
	    "toolbox": {
	        "feature": {
	            "magicType": {
	                "type": ["stack", "tiled"]
	            },
	            "dataView": {},
	            "saveAsImage": {
	                "pixelRatio": 2
	            }
	        }
	    },
	    "tooltip": {},
	    "xAxis": {
			"type":"category",
	        "data": _data.animation[0],
	        "silent": false,
	        "splitLine": {
	            "show": false
	        }
	    },
	    "yAxis": {
					"type":"value"
	    },
	    "series": [{
	        "name": "bar",
	        "type": "bar",
	        "data": _data.animation[1],
			"animationEasing": "elasticOut"
	    }, {
	        "name": "bar2",
	        "type": "bar",
	        "data": _data.animation[2],
			"animationEasing": "elasticOut"
	    }]
	},
	"bar-brush":{
	    "legend": {
	        "data": ["bar", "bar2", "bar3", "bar4"],
	        "align": "left",
	        "left": 10
	    },
	    "brush": {
	        "toolbox": ["rect", "polygon", "lineX", "lineY", "keep", "clear"],
	        "xAxisIndex": 0
	    },
	    "toolbox": {
	        "feature": {
	            "magicType": {
	                "type": ["stack", "tiled"]
	            },
	            "dataView": {}
	        }
	    },
	    "tooltip": {},
	    "xAxis": {
	        "data": ["class1","class2","class3","class4","class5","class6","class7","class8","class9","class10"],
	        "name": "X Axis",
	        "silent": false,
	        "axisLine": {"onZero": true},
	        "splitLine": {"show": false},
	        "splitArea": {"show": false}
	    },
	    "yAxis": {
	        "inverse": true,
	        "splitArea": {"show": false}
	    },
	    "grid": {
	        "left": 100
	    },
	    "visualMap": {
	        "type": "continuous",
	        "dimension": 1,
	        "text": ["High", "Low"],
	        "inverse": true,
	        "itemHeight": 200,
	        "calculable": true,
	        "min": -2,
	        "max": 6,
	        "top": 60,
	        "left": 10,
	        "inRange": {
	            "colorLightness": [0.4, 0.8]
	        },
	        "outOfRange": {
	            "color": "#bbb"
	        },
	        "controller": {
	            "inRange": {
	                "color": "#2f4554"
	            }
	        }
	    },
	    "series": [
	        {
	            "name": "bar",
	            "type": "bar",
	            "stack": "one",
	            "data": ["1.90", "1.01", "1.95", "0.84", "1.25", "0.98", "1.21", "0.43", "0.13", "0.56"]
	        },
	        {
	            "name": "bar2",
	            "type": "bar",
	            "stack": "one",
	            "data": [-0.55, -0.22, -0.54, -0.74, -0.83, -0.28, -0.95, -0.17, -0.32, -0.93]
	        },
	        {
	            "name": "bar3",
	            "type": "bar",
	            "stack": "two",
	            "data": ["0.47", "4.34", "3.12", "3.00", "0.87", "0.71", "1.27", "4.38", "2.04", "1.47"]
	        },
	        {
	            "name": "bar4",
	            "type": "bar",
	            "stack": "two",
	            "data": ["0.57", "0.73", "0.99", "0.31", "0.54", "1.19", "0.59", "0.97", "0.78", "0.83"]
	        }
	    ]
	},
	"bar-gradient":{
		"title": {
			 "text": "Gradient",
			 "subtext": "Feature Sample: Gradient Color, Shadow"
	 },
	 "xAxis": {
			 "data": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"],
			 "axisLabel": {
					 "inside": true,
					 "textStyle": {
							 "color": "#fff"
					 }
			 },
			 "axisTick": {
					 "show": false
			 },
			 "axisLine": {
					 "show": false
			 },
			 "z": 10
	 },
	 "yAxis": {
			 "axisLine": {
					 "show": false
			 },
			 "axisTick": {
					 "show": false
			 },
			 "axisLabel": {
					 "textStyle": {
							 "color": "#999"
					 }
			 }
	 },
	 "dataZoom": [
			 {
					 "type": "inside"
			 }
	 ],
	 "series": [
			 {
					 "type": "bar",
					 "itemStyle": {
							 "normal": {"color": "rgba(0,0,0,0.05)"}
					 },
					 "barGap":"-100%",
					 "barCategoryGap":"40%",
					 "data": [500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500],
					 "animation": false
			 },
			 {
					 "type": "bar",
					 "itemStyle": {
							 "normal": {
									 "color": new echarts.graphic.LinearGradient(
											 0, 0, 0, 1,
											 [
													 {"offset": 0, color: "#83bff6"},
													 {"offset": 0.5, color: "#188df0"},
													 {"offset": 1, color: "#188df0"}
											 ]
									 )
							 },
							 "emphasis": {
									 "color": new echarts.graphic.LinearGradient(
											 0, 0, 0, 1,
											 [
													 {"offset": 0, "color": "#2378f7"},
													 {"offset": 0.7, "color": "#2378f7"},
													 {"offset": 1, "color": "#83bff6"}
											 ]
									 )
							 }
					 },
					 "data": [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220]
			 }
	]
	},
	"bar-simple":{
		"xAxis": {
        "type": "category",
        "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    "yAxis": {
        "type": "value"
    },
    "series": [{
        "data": [120, 200, 150, 80, 70, 110, 130],
        "type": "bar"
    }]
	},
	"bar1":{
	    "title" : {
	        "text": "weather",
	        "subtext": "Sub Title"
	    },
	    "tooltip" : {
	        "trigger": "axis"
	    },
	    "legend": {
	        "data":["증발량","강수량"]
	    },
	    "toolbox": {
	        "show" : true,
	        "feature" : {
	            "dataView" : {"show": true, "readOnly": false},
	            "magicType" : {"show": true, "type": ["line", "bar"]},
	            "restore" : {"show": true},
	            "saveAsImage" : {"show": true}
	        }
	    },
	    "calculable" : true,
	    "xAxis" : [
	        {
	            "type" : "category",
	            "data" : ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"]
	        }
	    ],
	    "yAxis" : [
	        {
	            "type" : "value"
	        }
	    ],
	    "series" : [
	        {
	            "name":"증발량",
	            "type":"bar",
	            "data":[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
	            "markPoint" : {
	                "data" : [
	                    {"type" : "max", "name": "최대"},
	                    {"type" : "min", "name": "최소"}
	                ]
	            },
	            "markLine" : {
	                "data" : [
	                    {"type" : "average", "name": "평균치"}
	                ]
	            }
	        },
	        {
	            "name":"강수량",
	            "type":"bar",
	            "data":[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
	            "markPoint" : {
	                "data" : [
	                    {"name" : "강수량", "value" : 182.2, "xAxis": 7, "yAxis": 183},
	                    {"name" : "증발량", "value" : 2.3, "xAxis": 11, "yAxis": 3}
	                ]
	            },
	            "markLine" : {
	                "data" : [
	                    {"type" : "average", "name" : "평균치"}
	                ]
	            }
	        }
	    ]
	},
	"bar-negative":{
	    "tooltip" : {
	        "trigger": "axis",
	        "axisPointer" : {            
	            "type" : "shadow"
	        }
	    },
	    "legend": {
	        "data":["이익", "지출", "수입"]
	    },
	    "grid": {
	        "left": "3%",
	        "right": "4%",
	        "bottom": "3%",
	        "containLabel": true
	    },
	    "xAxis" : [
	        {
	            "type" : "value"
	        }
	    ],
	    "yAxis" : [
	        {
	            "type" : "category",
	            "axisTick" : {"show": false},
	            "data" : ["월요일","화요일","수요일","목요일","금요일","토요일","일요일"]
	        }
	    ],
	    "series" : [
	        {
	            "name":"이익",
	            "type":"bar",
	            "label": {
	                "normal": {
	                    "show": true,
	                    "position": "inside"
	                }
	            },
	            "data":[200, 170, 240, 244, 200, 220, 210]
	        },
	        {
	            "name":"수입",
	            "type":"bar",
	            "stack": "총량",
	            "label": {
	                "normal": {
	                    "show": true
	                }
	            },
	            "data":[320, 302, 341, 374, 390, 450, 420]
	        },
	        {
	            "name":"지출",
	            "type":"bar",
	            "stack": "총량",
	            "label": {
	                "normal": {
	                    "show": true,
	                    "position": "left"
	                }
	            },
	            "data":[-120, -132, -101, -134, -190, -230, -210]
	        }
	    ]
	},
	"bar-polar-stack":{
	    "angleAxis": {
	    },
	    "radiusAxis": {
	        "type": "category",
	        "data": ["월요일", "화요일", "수요일", "목요일"],
	        "z": 10
	    },
	    "polar": {
	    },
	    "series": [{
	        "type": "bar",
	        "data": [1, 2, 3, 4],
	        "coordinateSystem": "polar",
	        "name": "A",
	        "stack": "a"
	    }, {
	        "type": "bar",
	        "data": [2, 4, 6, 8],
	        "coordinateSystem": "polar",
	        "name": "B",
	        "stack": "a"
	    }, {
	        "type": "bar",
	        "data": [1, 2, 3, 4],
	        "coordinateSystem": "polar",
	        "name": "C",
	        "stack": "a"
	    }],
	    "legend": {
	        "show": true,
	        "data": ["A", "B", "C"]
	    }
	},
	"bar-polar-stack-radial":{
	    "angleAxis": {
	        "type": "category",
	        "data": ["월요일","화요일","수요일","목요일","금요일","토요일","일요일"],
	        "z": 10
	    },
	    "radiusAxis": {
	    },
	    "polar": {
	    },
	    "series": [{
	        "type": "bar",
	        "data": [1, 2, 3, 4, 3, 5, 1],
	        "coordinateSystem": "polar",
	        "name": "A",
	        "stack": "a"
	    }, {
	        "type": "bar",
	        "data": [2, 4, 6, 1, 3, 2, 1],
	        "coordinateSystem": "polar",
	        "name": "B",
	        "stack": "a"
	    }, {
	        "type": "bar",
	        "data": [1, 2, 3, 4, 1, 2, 5],
	        "coordinateSystem": "polar",
	        "name": "C",
	        "stack": "a"
	    }],
	    "legend": {
	        "show": true,
	        "data": ["A", "B", "C"]
	    }
	},
	"bar-stack":{
	    "tooltip" : {
	        "trigger": "axis",
	        "axisPointer" : {            
	            "type" : "shadow"        
	        }
	    },
	    "legend": {
	        "data":["직접방문","메일광고","제휴광고","영상광고","검색엔진","Baidu","Google","Bing","기타"]
	    },
	    "grid": {
	        "left": "3%",
	        "right": "4%",
	        "bottom": "3%",
	        "containLabel": true
	    },
	    "xAxis" : [
	        {
	            "type" : "category",
	            "data" : ["월요일","화요일","수요일","목요일","금요일","토요일","일요일"]
	        }
	    ],
	    "yAxis" : [
	        {
	            "type" : "value"
	        }
	    ],
	    "series" : [
	        {
	            "name":"직접방문",
	            "type":"bar",
	            "data":[320, 332, 301, 334, 390, 330, 320]
	        },
	        {
	            "name":"메일광고",
	            "type":"bar",
	            "stack": "광고",
	            "data":[120, 132, 101, 134, 90, 230, 210]
	        },
	        {
	            "name":"제휴광고",
	            "type":"bar",
	            "stack": "광고",
	            "data":[220, 182, 191, 234, 290, 330, 310]
	        },
	        {
	            "name":"영상광고",
	            "type":"bar",
	            "stack": "광고",
	            "data":[150, 232, 201, 154, 190, 330, 410]
	        },
	        {
	            "name":"검색엔진",
	            "type":"bar",
	            "data":[862, 1018, 964, 1026, 1679, 1600, 1570],
	            "markLine" : {
	                "lineStyle": {
	                    "normal": {
	                        "type": "dashed"
	                    }
	                },
	                "data" : [
	                    [{"type" : "min"}, {"type" : "max"}]
	                ]
	            }
	        },
	        {
	            "name":"Baidu",
	            "type":"bar",
	            "barWidth" : 5,
	            "stack": "검색엔진",
	            "data":[620, 732, 701, 734, 1090, 1130, 1120]
	        },
	        {
	            "name":"Google",
	            "type":"bar",
	            "stack": "검색엔진",
	            "data":[120, 132, 101, 134, 290, 230, 220]
	        },
	        {
	            "name":"Bing",
	            "type":"bar",
	            "stack": "검색엔진",
	            "data":[60, 72, 71, 74, 190, 130, 110]
	        },
	        {
	            "name":"기타",
	            "type":"bar",
	            "stack": "검색엔진",
	            "data":[62, 82, 91, 84, 109, 110, 120]
	        }
	    ]
	},
	"bar-tick-align":{
	    "color": ["#3398DB"],
	    "tooltip" : {
	        "trigger": "axis",
	        "axisPointer" : {
	            "type" : "shadow"        
	        }
	    },
	    "grid": {
	        "left": "3%",
	        "right": "4%",
	        "bottom": "3%",
	        "containLabel": true
	    },
	    "xAxis" : [
	        {
	            "type" : "category",
	            "data" : ["월요일","화요일","수요일","목요일","금요일","토요일","일요일"],
	            "axisTick": {
	                "alignWithLabel": true
	            }
	        }
	    ],
	    "yAxis" : [
	        {
	            "type" : "value"
	        }
	    ],
	    "series" : [
	        {
	            "name":"직접방문",
	            "type":"bar",
	            "barWidth": "0%",
	            "data":[10, 52, 200, 334, 390, 330, 220]
	        }
	    ]
	},
	"bar-waterfall":{
	    "title": {
	        "text": "The minimum cost of living in Seoul.",
	        "subtext": "From ExcelHome",
	        "sublink": "http://e.weibo.com/1341556070/AjQH99che"
	    },
	    "tooltip" : {
	        "trigger": "axis",
	        "axisPointer" : {            
	            "type" : "shadow"
	        },
	        formatter : function (params) {
	            var tar = params[1];
	            return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
	        }
	    },
	    "grid": {
	        "left": "3%",
	        "right": "4%",
	        "bottom": "3%",
	        "containLabel": true
	    },
	    "xAxis": {
	        "type" : "category",
	        "splitLine": {"show":false},
	        "data" : ["총비욜","집세","수도전기세","교통비","식비","일용품비"]
	    },
	    "yAxis": {
	        "type" : "value"
	    },
	    "series": [
	        {
	            "name": "원조",
	            "type": "bar",
	            "stack":  "총량",
	            "itemStyle": {
	                "normal": {
	                    "barBorderColor": "rgba(0,0,0,0)",
	                    "color": "rgba(0,0,0,0)"
	                },
	                "emphasis": {
	                    "barBorderColor": "rgba(0,0,0,0)",
	                    "color": "rgba(0,0,0,0)"
	                }
	            },
	            "data": [0, 1700, 1400, 1200, 300, 0]
	        },
	        {
	            "name": "생활비",
	            "type": "bar",
	            "stack": "총량",
	            "label": {
	                "normal": {
	                    "show": true,
	                    "position": "inside"
	                }
	            },
	            "data":[2900, 1200, 300, 200, 900, 300]
	        }
	    ]
	},
	"bar-waterfall2":{
	    "title": {
	        "text": "waterfall",
	        "subtext": "From ExcelHome",
	        "sublink": "http://e.weibo.com/1341556070/Aj1J2x5a5"
	    },
	    "tooltip" : {
	        "trigger": "axis",
	        "axisPointer" : {
	            "type" : "shadow"
	        },
	        formatter: function (params) {
	            var tar;
	            if (params[1].value != "-") {
	                tar = params[1];
	            }
	            else {
	                tar = params[0];
	            }
	            return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
	        }
	    },
	    "legend": {
	        "data":["지출","수입","원조"]
	    },
	    "grid": {
	        "left": "3%",
	        "right": "4%",
	        "bottom": "3%",
	        "containLabel": true
	    },
	    "xAxis": {
	        "type" : "category",
	        "splitLine": {"show":false},
	        "data" : function (){
	            var list = [];
	            for (var i = 1; i <= 11; i++) {
	                list.push("11월" + i + "일");
	            }
	            return list;
	        }()
	    },
	    "yAxis": {
	        "type" : "value"
	    },
	    "series": [
	        {
	            "name": "원조",
	            "type": "bar",
	            "stack": "총량",
	            "itemStyle": {
	                "normal": {
	                    "barBorderColor": "rgba(0,0,0,0)",
	                    "color": "rgba(0,0,0,0)"
	                },
	                "emphasis": {
	                    "barBorderColor": "rgba(0,0,0,0)",
	                    "color": "rgba(0,0,0,0)"
	                }
	            },
	            "data": [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
	        },
	        {
	            "name": "수입",
	            "type": "bar",
	            "stack": "총량",
	            "label": {
	                "normal": {
	                    "show": true,
	                    "position": "top"
	                }
	            },
	            "data": [900, 345, 393, "-", "-", 135, 178, 286, "-", "-", "-"]
	        },
	        {
	            "name": "지출",
	            "type": "bar",
	            "stack": "총량",
	            "label": {
	                "normal": {
	                    "show": true,
	                    "position": "bottom"
	                }
	            },
	            "data": ["-", "-", "-", 108, 154, "-", "-", "-", 119, 361, 203]
	        }
	    ]
	},
	"bar-y-category":{
	    "title": {
	        "text": "The total population of the world.",
	        "subtext": "Data Network"
	    },
	    "tooltip": {
	        "trigger": "axis",
	        "axisPointer": {
	            "type": "shadow"
	        }
	    },
	    "legend": {
	        "data": ["2011년", "2012년","2013년"]
	    },
	    "grid": {
	        "left": "3%",
	        "right": "4%",
	        "bottom": "3%",
	        "containLabel": true
	    },
	    "xAxis": {
	        "type": "value",
	        "boundaryGap": [0, 0.01]
	    },
	    "yAxis": {
	        "type": "category",
	        "data": ["브라질","인도네시아","미국","인도","중국","세계인구(만명)"]
	    },
	    "series": [
	        {
	            "name": "2011년",
	            "type": "bar",
	            "data": [18203, 23489, 29034, 104970, 131744, 630230]
	        },
	        {
	            "name": "2012년",
	            "type": "bar",
	            "data": [19325, 23438, 31000, 121594, 134141, 681807]
	        },
					{
	            "name": "2013년",
	            "type": "bar",
	            "data": [17665, 23400, 30001, 112764, 137143, 732404]
	        }
	    ]
	},
	"bar-y-category-stack":{
	    "tooltip" : {
	        "trigger": "axis",
	        "axisPointer" : {
	            "type" : "shadow"
	        }
	    },
	    "legend": {
	        "data": ["직접방문", "메일광고","제휴광고","영상광고","검색엔진"]
	    },
	    "grid": {
	        "left": "3%",
	        "right": "4%",
	        "bottom": "3%",
	        "containLabel": true
	    },
	    "xAxis":  {
	        "type": "value"
	    },
	    "yAxis": {
	        "type": "category",
	        "data": ["월요일","화요일","수요일","목요일","금요일","토요일","일요일"]
	    },
	    "series": [
	        {
	            "name": "직접방문",
	            "type": "bar",
	            "stack": "총량",
	            "label": {
	                "normal": {
	                    "show": true,
	                    "position": "insideRight"
	                }
	            },
	            "data": [320, 302, 301, 334, 390, 330, 320]
	        },
	        {
	            "name": "메일광고",
	            "type": "bar",
	            "stack": "총량",
	            "label": {
	                "normal": {
	                    "show": true,
	                    "position": "insideRight"
	                }
	            },
	            "data": [120, 132, 101, 134, 90, 230, 210]
	        },
	        {
	            "name": "제휴광고",
	            "type": "bar",
	            "stack": "총량",
	            "label": {
	                "normal": {
	                    "show": true,
	                    "position": "insideRight"
	                }
	            },
	            "data": [220, 182, 191, 234, 290, 330, 310]
	        },
	        {
	            "name": "영상광고",
	            "type": "bar",
	            "stack": "총량",
	            "label": {
	                "normal": {
	                    "show": true,
	                    "position": "insideRight"
	                }
	            },
	            "data": [150, 212, 201, 154, 190, 330, 410]
	        },
	        {
	            "name": "검색엔진",
	            "type": "bar",
	            "stack": "총량",
	            "label": {
	                "normal": {
	                    "show": true,
	                    "position": "insideRight"
	                }
	            },
	            "data": [820, 832, 901, 934, 1290, 1330, 1320]
	        }
	    ]
	},
	"bar-mix":{
	    "title": {
	        "text": "Operational Status",
	        "subtext": "Sub Title"
	    },
	    "tooltip": {
	        "trigger": "axis",
	        "axisPointer": {
	            "type": "cross",
	            "label": {
	                "backgroundColor": "#283b56"
	            }
	        }
	    },
	    "legend": {
	        "data":["최신거래가", "예매가"]
	    },
	    "toolbox": {
	        "show": true,
	        "feature": {
	            "dataView": {"readOnly": false},
	            "restore": {},
	            "saveAsImage": {}
	        }
	    },
	    "dataZoom": {
	        "show": false,
	        "start": 0,
	        "end": 100
	    },
	    "xAxis": [
	        {
	            "type": "category",
	            "boundaryGap": true,
	            "data": ["11:37:23","11:37:25","11:37:27","11:37:29","11:37:31","11:37:33","11:37:35","11:37:37","11:37:39","11:37:41"]
	        },
	        {
	            "type": "category",
	            "boundaryGap": true,
	            "data": [0,1,2,3,4,5,6,7,8,9]
	        }
	    ],
	    "yAxis": [
	        {
	            "type": "value",
	            "scale": true,
	            "name": "가격",
	            "max": 50,
	            "min": 0,
	            "boundaryGap": [0.2, 0.2]
	        },
	        {
	            "type": "value",
	            "scale": true,
	            "name": "예약수량",
	            "max": 1200,
	            "min": 0,
	            "boundaryGap": [0.2, 0.2]
	        }
	    ],
	    "series": [
	        {
	            "name":"예매가",
	            "type":"bar",
	            "xAxisIndex": 1,
	            "yAxisIndex": 1,
	            "data":[565,346,460,459,504,823,864,676,518,474]
	        },
	        {
	            "name":"최신거래가",
	            "type":"line",
	            "data":[5.4,10.1,8.5,9.7,5.8,9.1,14.2,6.5,5.1,5.3]
	        }
	    ]
	},
	"bar-line-mix":{
	    "tooltip": {
	        "trigger": "axis",
	        "axisPointer": {
	            "type": "cross",
	            "crossStyle": {
	                "color": "#999"
	            }
	        }
	    },
	    "toolbox": {
	        "feature": {
	            "dataView": {"show": true, "readOnly": false},
	            "magicType": {"show": true, "type": ["line", "bar"]},
	            "restore": {"show": true},
	            "saveAsImage": {"show": true}
	        }
	    },
	    "legend": {
	        "data":["증발량","강수량","평균온도"]
	    },
	    "xAxis": [
	        {
	            "type": "category",
	            "data": ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
	            "axisPointer": {
	                "type": "shadow"
	            }
	        }
	    ],
	    "yAxis": [
	        {
	            "type": "value",
	            "name": "수량",
	            "min": 0,
	            "max": 250,
	            "interval": 50,
	            "axisLabel": {
	                "formatter": "{value} ml"
	            }
	        },
	        {
	            "type": "value",
	            "name": "온도",
	            "min": 0,
	            "max": 25,
	            "interval": 5,
	            "axisLabel": {
	                "formatter": "{value} °C"
	            }
	        }
	    ],
	    "series": [
	        {
	            "name":"증발량",
	            "type":"bar",
	            "data":[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
	        },
	        {
	            "name":"강수량",
	            "type":"bar",
	            "data":[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
	        },
	        {
	            "name":"평균온도",
	            "type":"line",
	            "yAxisIndex": 1,
	            "data":[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
	        }
	    ]
	},
	"bar-line-mix2":{
		"tooltip": {
		    "trigger": "axis"
		},
		"xAxis": [
			{
				"type": "category",
				"data": ["모델A","모델B","모델C","모델D","모델E"],
				"axisPointer": {
		    	  "type": "shadow"
				}
			}
		],
		"yAxis": [
			{
				"type": "value",
				"max": 95,
				"interval": 5,
				"axisLabel": {
					"inside": false
				},
				"silent": false,
				"boundaryGap": false,
				"axisTick": {
					"show": false
				},
				"splitLine": {
					"show": false
				},
				"axisLine": {
					"show": false
				},
				"min": 70
			},
			{
				"type": "value",
				"min": 0,
				"max": 2000,
				"interval": 500,
				"axisLabel": {
					"show": true,
					"inside": false
				},
				"axisTick": {
					"show": false
				},
				"axisLine": {
					"show": false
				}
			}
		],
	  	"series": [
		    {
		    	"name": "value1",
		    	"type": "line",
		    	"data": [78.5, 89.2, 90.1, 92.3, 92.4],
		    	"itemStyle": {
		    		"color": "#f2970e"
		    	},
		    	"symbol": "circle",
		    	"symbolSize": 10,
		    	"label": {
		    		"normal": {
		    			"show": true,
		    			"position": [15,6]
		    		}
		    	}
		    },
		    {
		    	"name": "value2",
		    	"type": "bar",
		    	"data": [1500, 800, 250, 120, 300],
		    	"top": 0,
		    	"bottom": 0,
		    	"itemStyle": {
		    		"color": "#9477e6"
		    	},
		    	"barWidth": "20%",
		    	"yAxisIndex": 1,
		    	"label": {
		    		"normal": {
		    			"show": true,
		    			"position": "top"
		    		}
		    	}
		    }
		]
	},
	"scatter-simple" : {
			"xAxis": {},
			"yAxis": {},
			"series": [{
					"symbolSize": 20,
					"data": [
							[10.0, 8.04],
							[8.0, 6.95],
							[13.0, 7.58],
							[9.0, 8.81],
							[11.0, 8.33],
							[14.0, 9.96],
							[6.0, 7.24],
							[4.0, 4.26],
							[12.0, 10.84],
							[7.0, 4.82],
							[5.0, 5.68]
					],
					"type": "scatter"
			}]
	},
	"scatter-in-cartesian-coordinate-system": {
	    "xAxis": {},
	    "yAxis": {},
	    "series": [{
	        "data": [[20, 120], [50, 200], [40, 50]],
	        "type": "line"
	    }]
	},
	"scatter-stream-visual":{
        "title": {
            "text": 'Dispersion of house price based on the area',
            "left": 'center',
            "top": 0
        },
        "visualMap": {
            "min": 15202,
            "max": 159980,
            "dimension": 1,
            "orient": 'vertical',
            "right": 10,
            "top": 'center',
            "text": ['HIGH', 'LOW'],
            "calculable": true,
            "inRange": {
                "color": ['#f2c31a', '#24b7f2']
            }
        },
        "tooltip": {
            "trigger": 'item',
            "axisPointer": {
                "type": 'cross'
            }
        },
        "xAxis": [{
            "type": 'value'
        }],
        "yAxis": [{
            "type": 'value'
        }],
        "series": [{
            "name": 'price-area',
            "type": 'scatter',
            "symbolSize": 5,
            "data": _data.scatter[0]
        }]
	},
	"scatter-exponential-regression":{
	    "title": {
	        "text": "1981 - 1998 gross domestic product GDP (trillion yuan)",
	        "subtext": "By ecStat.regression",
	        "sublink": "https://github.com/ecomfe/echarts-stat",
	        "left": "center"
	    },
	    "tooltip": {
	        "trigger": "axis",
	        "axisPointer": {
	            "type": "cross"
	        }
	    },
	    "xAxis": {
	        "type": "value",
	        "splitLine": {
	            "lineStyle": {
	                "type": "dashed"
	            }
	        },
	        "splitNumber": 20
	    },
	    "yAxis": {
	        "type": "value",
	        "splitLine": {
	            "lineStyle": {
	                "type": "dashed"
	            }
	        }
	    },
	    "series": [{
	        "name": "scatter",
	        "type": "scatter",
	        "label": {
	            "emphasis": {
	                "show": true,
	                "position": "left",
	                "textStyle": {
	                    "color": "blue",
	                    "fontSize": 16
	                }
	            }
	        },
	        "data": _data.scatter_reg[0]
	    }, {
	        "name": "line",
	        "type": "line",
	        "showSymbol": false,
	        "smooth": true,
	        "data": _data.scatter_reg[1]
	    }]
	},
	"pie-custom":{
		"title": {
				"text": "Customized Pie",
				"left": "center",
				"top": 20,
				"textStyle": {
						"color": "#000000"
				}
		},
		"tooltip" : {
				"trigger": "item",
				"formatter": "{a} <br/>{b} : {c} ({d}%)"
		},
		"visualMap": {
				"show": false,
				"min": 80,
				"max": 1000,
				"inRange": {
						"colorLightness": [1, 0]
				}
		},
		"series" : [
				{
						"name":"방문원",
						"type":"pie",
						"radius" : "55%",
						"center": ["50%", "50%"],
						"data":[
								{"name":"직접방문", "value":335},
								{"name":"메일광고", "value":310},
								{"name":"제휴광고", "value":274},
								{"name":"영상광고", "value":235},
								{"name":"검색엔진", "value":400}
						],
						"roseType": "radius",
						"label": {
								"normal": {
										"textStyle": {
												"color": "rgba(0, 0, 0, 0.8)"
										}
								}
						},
						"labelLine": {
								"normal": {
										"lineStyle": {
												"color": "rgba(0, 0, 0, 0.8)"
										},
										"smooth": 0.2,
										"length": 10,
										"length2": 20
								}
						},
						"itemStyle": {
								"normal": {
										"color": "#c23531",
										"shadowBlur": 200,
										"shadowColor": "rgba(0, 0, 0, 0.5)"
								}
						},
						"animationType": "scale",
						"animationEasing": "elasticOut"
				}
		]
	},
	"pie-doughnut":{
	    "tooltip": {
	        "trigger": "item",
	        "formatter": "{a} <br/>{b}: {c} ({d}%)"
	    },
	    "legend": {
	        "orient": "vertical",
	        "x": "left",
	        "data":["직접방문","메일광고","제휴광고","영상광고","검색엔진"]
	    },
	    "series": [
	        {
	            "name":"방문원",
	            "type":"pie",
	            "radius": ["50%", "70%"],
	            "avoidLabelOverlap": false,
	            "label": {
	                "normal": {
	                    "show": false,
	                    "position": "center"
	                },
	                "emphasis": {
	                    "show": true,
	                    "textStyle": {
	                        "fontSize": "30",
	                        "fontWeight": "bold"
	                    }
	                }
	            },
	            "labelLine": {
	                "normal": {
	                    "show": false
	                }
	            },
	            "data":[
	                {"name":"직접방문", "value":335},
	                {"name":"메일광고", "value":310},
	                {"name":"제휴광고", "value":234},
	                {"name":"영상광고", "value":135},
	                {"name":"검색엔진", "value":1548}
	            ]
	        }
	    ]
	},
	"pie-nest": {
	    "tooltip": {
	        "trigger": "item",
	        "formatter": "{a} <br/>{b}: {c} ({d}%)"
	    },
	    "legend": {
	        "orient": "vertical",
	        "x": "left",
	        "data":["직행","마케팅광고","검색엔진","메일광고","제휴광고","영상광고","Baidu","Google","Bing","기타"]
	    },
	    "series": [
	        {
	            "name":"TestNameA",
	            "type":"pie",
	            "selectedMode": "single",
	            "radius": [0, "30%"],

	            "label": {
	                "normal": {
	                    "position": "inner"
	                }
	            },
	            "labelLine": {
	                "normal": {
	                    "show": false
	                }
	            },
	            "data":[
	                { "name":"직행", "value":335, "selected":true},
	                { "name":"마케팅광고", "value":679},
	                { "name":"검색엔진", "value":1548}
	            ]
	        },
	        {
	            "name":"TestNameB",
	            "type":"pie",
	            "radius": ["40%", "55%"],
	            "label": {
	                "normal": {
	                    "formatter": "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
	                    "backgroundColor": "#eee",
	                    "borderColor": "#aaa",
	                    "borderWidth": 1,
	                    "borderRadius": 4,
	                    // shadowBlur:3,
	                    // shadowOffsetX: 2,
	                    // shadowOffsetY: 2,
	                    // shadowColor: "#999",
	                    // padding: [0, 7],
	                    "rich": {
	                        "a": {
	                            "color": "#999",
	                            "lineHeight": 22,
	                            "align": "center"
	                        },
	                        // abg: {
	                        //     backgroundColor: "#333",
	                        //     width: "100%",
	                        //     align: "right",
	                        //     height: 22,
	                        //     borderRadius: [4, 4, 0, 0]
	                        // },
	                        "hr": {
	                            "borderColor": "#aaa",
	                            "width": "100%",
	                            "borderWidth": 0.5,
	                            "height": 0
	                        },
	                        "b": {
	                            "fontSize": 16,
	                            "lineHeight": 33
	                        },
	                        "per": {
	                            "color": "#eee",
	                            "backgroundColor": "#334455",
	                            "padding": [2, 4],
	                            "borderRadius": 2
	                        }
	                    }
	                }
	            },
	            "data":[
		           {"name":"직행", "value":335},
		           {"name":"메일광고", "value":310},
		           {"name":"제휴광고", "value":234},
		           {"name":"영상광고", "value":135},
		           {"name":"Baidu", "value":1048},
		           {"name":"Google", "value":251},
		           {"name":"Bing", "value":147},
		           {"name":"기타", "value":102}
	            ]
	        }
	    ]
	},
	"pie-roseType":{
	    "title" : {
	        "text": "Rose Illustration",
	        "subtext": "Sub Title",
	        "x":"center"
	    },
	    "tooltip" : {
	        "trigger": "item",
	        "formatter": "{a} <br/>{b} : {c} ({d}%)"
	    },
	    "legend": {
	        "x" : "center",
	        "y" : "bottom",
	        "data":["rose1","rose2","rose3","rose4","rose5","rose6","rose7","rose8"]
	    },
	    "toolbox": {
	        "show" : true,
	        "feature" : {
	            "mark" : {"show": true},
	            "dataView" : {"show": true, "readOnly": false},
	            "magicType" : {
	                "show": true,
	                "type": ["pie", "funnel"]
	            },
	            "restore" : {"show": true},
	            "saveAsImage" : {"show": true}
	        }
	    },
	    "calculable" : true,
	    "series" : [
	        {
	            "name":"TestNameA",
	            "type":"pie",
	            "radius" : [20, 110],
	            "center" : ["25%", "50%"],
	            "roseType" : "radius",
	            "label": {
	                "normal": {
	                    "show": false
	                },
	                "emphasis": {
	                    "show": true
	                }
	            },
	            "lableLine": {
	                "normal": {
	                    "show": false
	                },
	                "emphasis": {
	                    "show": true
	                }
	            },
	            "data":[
	                {"name":"rose1", "value":10},
	                {"name":"rose2", "value":5},
	                {"name":"rose3", "value":15},
	                {"name":"rose4", "value":25},
	                {"name":"rose5", "value":20},
	                {"name":"rose6", "value":35},
	                {"name":"rose7", "value":30},
	                {"name":"rose8", "value":40}
	            ]
	        },
	        {
	            "name":"TestNameB",
	            "type":"pie",
	            "radius" : [30, 110],
	            "center" : ["75%", "50%"],
	            "roseType" : "area",
	            "data":[
	                {"name":"rose1", "value":10},
	                {"name":"rose2", "value":5},
	                {"name":"rose3", "value":15},
	                {"name":"rose4", "value":25},
	                {"name":"rose5", "value":20},
	                {"name":"rose6", "value":35},
	                {"name":"rose7", "value":30},
	                {"name":"rose8", "value":40}
	            ]
	        }
	    ]
	},
	"pie-simple":{
	    "title" : {
	        "text": "Number of reverse visitors",
	        "subtext": "Sub Title",
	        "x":"center"
	    },
	    "tooltip" : {
	        "trigger": "item",
	        "formatter": "{a} <br/>{b} : {c} ({d}%)"
	    },
	    "legend": {
	        "orient": "vertical",
	        "left": "left",
	        "data": ["직접방문","메일광고","제휴광고","영상광고","검색엔진"]
	    },
	    "series" : [
	        {
	            "name": "방문원",
	            "type": "pie",
	            "radius" : "55%",
	            "center": ["50%", "60%"],
	            "data":[
	                {"name":"직접방문", "value":335},
	                {"name":"메일광고", "value":310},
	                {"name":"제휴광고", "value":234},
	                {"name":"영상광고", "value":135},
	                {"name":"검색엔진", "value":1548}
	            ],
	            "itemStyle": {
	                "emphasis": {
	                    "shadowBlur": 10,
	                    "shadowOffsetX": 0,
	                    "shadowColor": "rgba(0, 0, 0, 0.5)"
	                }
	            }
	        }
	    ]
	},
	"funnel-default":{
	    "title": {
	        "text": "Funnel Diagram",
	        "subtext": "Sub Title"
	    },
	    "tooltip": {
	        "trigger": "item",
	        "formatter": "{a} <br/>{b} : {c}%"
	    },
	    "toolbox": {
	        "feature": {
	            "dataView": {"readOnly": false},
	            "restore": {},
	            "saveAsImage": {}
	        }
	    },
	    "legend": {
	        "data": ["레벨1","레벨2","레벨3","레벨4","레벨5"]
	    },
	    "calculable": true,
	    "series": [
	        {
	            "name":"퍼널 다이어그램",
	            "type":"funnel",
	            "left": "10%",
	            "top": 60,
	            //x2: 80,
	            "bottom": 60,
	            "width": "80%",
	            // height: {totalHeight} - y - y2,
	            "min": 0,
	            "max": 100,
	            "minSize": "0%",
	            "maxSize": "100%",
	            "sort": "descending",
	            "gap": 2,
	            "label": {
	                "normal": {
	                    "show": true,
	                    "position": "inside"
	                },
	                "emphasis": {
	                    "textStyle": {
	                        "fontSize": 20
	                    }
	                }
	            },
	            "labelLine": {
	                "normal": {
	                    "length": 10
	                }
	            },
	            "itemStyle": {
	                "normal": {
	                    "borderColor": "#fff",
	                    "borderWidth": 1
	                }
	            },
	            "data": [
	                {"name": "레벨5", "value": 20},
	                {"name": "레벨4", "value": 40},
	                {"name": "레벨3", "value": 60},
	                {"name": "레벨2", "value": 80},
	                {"name": "레벨1", "value": 100}
	            ]
	        }
	    ]
	},
	"funnel-customize":{
	    "title": {
	        "text": "Funnel Diagram 2",
	        "subtext": "Sub Title"
	    },
	    "tooltip": {
	        "trigger": "item",
	        "formatter": "{a} <br/>{b} : {c}%"
	    },
	    "toolbox": {
	        "feature": {
	            "dataView": {"readOnly": false},
	            "restore": {},
	            "saveAsImage": {}
	        }
	    },
	    "legend": {
	        "data": ["조회","선택","방문","상담","주문"]
	    },
	    "series": [
	        {
	            "name": "예상",
	            "type": "funnel",
	            "left": "10%",
	            "width": "80%",
	            "label": {
	                "normal": {
	                    "formatter": "{b}예상"
	                },
	                "emphasis": {
	                    "position":"inside",
	                    "formatter": "{b}예상: {c}%"
	                }
	            },
	            "labelLine": {
	                "normal": {
	                    "show": false
	                }
	            },
	            "itemStyle": {
	                "normal": {
	                    "opacity": 0.7
	                }
	            },
	            "data": [
	                {"name": "방문", "value": 60},
	                {"name": "상담", "value": 40},
	                {"name": "주문", "value": 20},
	                {"name": "선택", "value": 80},
	                {"name": "조회", "value": 100}
	            ]
	        },
	        {
	            "name": "실제",
	            "type": "funnel",
	            "left": "10%",
	            "width": "80%",
	            "maxSize": "80%",
	            "label": {
	                "normal": {
	                    "position": "inside",
	                    "formatter": "{c}%",
	                    "textStyle": {
	                        "color": "#fff"
	                    }
	                },
	                "emphasis": {
	                    "position":"inside",
	                    "formatter": "{b}실제: {c}%"
	                }
	            },
	            "itemStyle": {
	                "normal": {
	                    "opacity": 0.5,
	                    "borderColor": "#fff",
	                    "borderWidth": 2
	                }
	            },
	            "data": [
	                {"name": "방문", "value": 30},
	                {"name": "상담", "value": 10},
	                {"name": "주문", "value": 5},
	                {"name": "선택", "value": 50},
	                {"name": "조회", "value": 80}
	            ]
	        }
	    ]
	},
	"funnel-align":{
	    "title": {
	        "text": "Funnel Diagram (comparison)",
	        "subtext": "Sub Title",
	        "left": "left",
	        "top": "bottom"
	    },
	    "tooltip": {
	        "trigger": "item",
	        "formatter": "{a} <br/>{b} : {c}%"
	    },
	    "toolbox": {
	        "show": true,
	        "orient": "vertical",
	        "top": "center",
	        "feature": {
	            "dataView": {"readOnly": false},
	            "restore": {},
	            "saveAsImage": {}
	        }
	    },
	    "legend": {
	        "orient": "vertical",
	        "left": "left",
	        "data": ["제품A","제품B","제품C","제품D","제품E"]
	    },
	    "calculable": true,
	    "series": [
	        {
	            "name": "퍼널",
	            "type": "funnel",
	            "width": "40%",
	            "height": "45%",
	            "left": "5%",
	            "top": "50%",
	            "funnelAlign": "right",
	            "center": ["25%", "25%"],
	            "data":[
	                {"name":"제품C", "value":60},
	                {"name":"제품D", "value":30},
	                {"name":"제품E", "value":10},
	                {"name":"제품B", "value":80},
	                {"name":"제품A", "value":100}
	            ]
	        },
	        {
	            "name": "피라미드",
	            "type":"funnel",
	            "width": "40%",
	            "height": "45%",
	            "left": "5%",
	            "top": "5%",
	            "sort": "ascending",
	            "funnelAlign": "right",
	            "center": ["25%", "75%"],
	            "data":[
	                {"name":"제품C", "value":60},
	                {"name":"제품D", "value":30},
	                {"name":"제품E", "value":10},
	                {"name":"제품B", "value":80},
	                {"name":"제품A", "value":100}
	            ]
	        },
	        {
	            "name":"퍼널",
	            "type":"funnel",
	            "width": "40%",
	            "height": "45%",
	            "left": "55%",
	            "top": "5%",
	            "funnelAlign": "left",
	            "center": ["75%", "25%"],
	            "data": [
	                {"name": "제품C", "value": 60},
	                {"name": "제품D", "value": 30},
	                {"name": "제품E", "value": 10},
	                {"name": "제품B", "value": 80},
	                {"name": "제품A", "value": 100}
	            ]
	        },
	        {
	            "name": "피라미드",
	            "type":"funnel",
	            "width": "40%",
	            "height": "45%",
	            "left": "55%",
	            "top": "50%",
	            "sort": "ascending",
	            "funnelAlign": "left",
	            "center": ["75%", "75%"], 
	            "data": [
	                {"name": "제품C", "value": 60},
	                {"name": "제품D", "value": 30},
	                {"name": "제품E", "value": 10},
	                {"name": "제품B", "value": 80},
	                {"name": "제품A", "value": 100}
	            ]
	        }
	    ]
	},
	"funnel-multiple":{
	    "title": {
	        "text": "Funnel Diagram (multiple)",
	        "subtext": "Sub Title",
	        "left": "left",
	        "top": "bottom"
	    },
	    "tooltip": {
	        "trigger": "item",
	        "formatter": "{a} <br/>{b} : {c}%"
	    },
	    "toolbox": {
	        "orient": "vertical",
	        "top": "center",
	        "feature": {
	            "dataView": {"readOnly": false},
	            "restore": {},
	            "saveAsImage": {}
	        }
	    },
	    "legend": {
	        "orient": "vertical",
	        "left": "left",
	        "data": ["조회","선택","방문","상담","주문"]
	    },
	    "calculable": true,
	    "series": [
	        {
	            "name": "퍼널",
	            "type": "funnel",
	            "width": "40%",
	            "height": "45%",
	            "left": "5%",
	            "top": "50%",
	            "data":[
	                {"name":"방문", "value": 60},
	                {"name":"상담", "value": 30},
	                {"name":"주문", "value": 10},
	                {"name":"선택", "value": 80},
	                {"name":"조회", "value": 100}
	            ]
	        },
	        {
	            "name": "피라미드",
	            "type": "funnel",
	            "width": "40%",
	            "height": "45%",
	            "left": "5%",
	            "top": "5%",
	            "sort": "ascending",
	            "data":[
	                {"name":"방문", "value": 60},
	                {"name":"상담", "value": 30},
	                {"name":"주문", "value": 10},
	                {"name":"선택", "value": 80},
	                {"name":"조회", "value": 100}
	            ]
	        },
	        {
	            "name": "퍼널",
	            "type":"funnel",
	            "width": "40%",
	            "height": "45%",
	            "left": "55%",
	            "top": "5%",
	            "label": {
	                "normal": {
	                    "position": "left"
	                }
	            },
	            "data":[
	                {"name": "방문", "value": 60},
	                {"name": "상담", "value": 30},
	                {"name": "주문", "value": 10},
	                {"name": "선택", "value": 80},
	                {"name": "조회", "value": 100}
	            ]
	        },
	        {
	            "name": "피라미드",
	            "type":"funnel",
	            "width": "40%",
	            "height": "45%",
	            "left": "55%",
	            "top": "50%",
	            "sort": "ascending",
	            "label": {
	                "normal": {
	                    "position": "left"
	                }
	            },
	            "data":[
	                {"name": "방문", "value": 60},
	                {"name": "상담", "value": 30},
	                {"name": "주문", "value": 10},
	                {"name": "선택", "value": 80},
	                {"name": "조회", "value": 100}
	            ]
	        }
	    ]
	}

};
