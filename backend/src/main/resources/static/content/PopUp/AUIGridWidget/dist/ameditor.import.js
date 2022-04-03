/*!
* amCharts - Live Editor
* CORE; IMPORT MODULE
* Copyright (c) 2014 amCharts
* Licensed MIT
* http://amcharts.com/
* v1.0.0-beta.1
*/

AmCharts.Editor.importer = function(source,config,target) {
	var that			= this;
	this.source			= source;
	this.reader			= undefined;
	this.sourceOrigin	= undefined;
	this.sourceType		= undefined;
	this.target			= target || this;
	this.events			= [
		'update.am.import.error',
		'update.am.import.abort',
		'update.am.import.loadstart',
		'update.am.import.progress',
		'update.am.import.success',
		'update.am.import.complete'
	];
	this.results		= [];
	this.fields			= [];
	that.readerResponse	= undefined;
	that.readerType		= undefined;

	// MERGE AND SETUP
	AmCharts.extend(this,config);

	this.setupEvents();

	if ( this.source instanceof File ) {
		this.sourceOrigin	= 'INT';
		this.sourceType		= this.source.name.split('.').pop().toLowerCase();
		that.readerType		= 'FILE';
		this.setupFileReader();
	} else if ( this.source.indexOf('http://') != -1 ) {
		this.sourceOrigin	= 'EXT';
		this.sourceType		= 'RAW';
		that.readerType		= 'AJAX';
		this.setupAjaxReader();
	} else {
		this.sourceOrigin	= 'RAW';
		this.sourceType		= 'RAW';
		that.readerType		= 'RAW';
		this.process_plainData(this.source);
	}
}

// ATTACH EVENTS
AmCharts.Editor.importer.prototype.setupEvents = function() {
	var that = this;
	jQuery(that.events).each(function() {
		var eventName	= String(this);
		var handlerName	= eventName.split('.').pop();
		jQuery(that.target).on(eventName,that[handlerName] || jQuery.noop);
	});
}

// SETUP FILEREADER
AmCharts.Editor.importer.prototype.fireListener = function(eventName) {
	var that		= this;
	jQuery(that.target).trigger(eventName,arguments);
}

// SETUP FILEREADER
AmCharts.Editor.importer.prototype.setupAjaxReader = function() {
	var that = this;
	jQuery.ajax({
		type: "get",
		dataType: "json",
		url: that.source,
		beforeSend: function(transport,status) {
			that.readerResponse = transport;
			that.readerResponse.statusText = status;
			that.fireListener('update.am.import.loadstart',transport);
		},
		abort: function(transport,status) {
			that.readerResponse = transport;
			that.readerResponse.statusText = status;
			that.fireListener('update.am.import.abort',transport);
		},
		error: function(transport,status) {
			that.readerResponse = transport;
			that.readerResponse.statusText = status;
			that.fireListener('update.am.import.error',transport);
		},
		complete: function(transport,status) {
			that.readerResponse = transport;
			that.readerResponse.statusText = status;
			if ( status == "success" ) {
				var results = transport.responseJSON || transport.responseText;
				try {
					results = eval('(' + results + ')');
				} catch(e) {}

				if ( typeof results === "object" ) {
					that.process_objectiveData(results);
				} else if ( typeof results === "string" ) {
					that.process_plainData(results);
				} else {
					console.log("UNKNOWN DATA TYPE");
				}
			}
		}
	});
};

// SETUP FILEREADER
AmCharts.Editor.importer.prototype.setupFileReader = function() {
	var that	= this;
	that.reader	= new FileReader();
	that.reader.onerror=function(e) {
		that.readerResponse = e;
		that.readerResponse.statusText = e.type;
		that.fireListener('update.am.import.error',that.readerResponse);
	}
	that.reader.onprogress = function(e) {
		that.readerResponse = e;
		that.readerResponse.statusText = e.type;
		that.fireListener('update.am.import.progress',that.readerResponse);
	};
	that.reader.onabort = function(e) {
		that.readerResponse = e;
		that.readerResponse.statusText = e.type;
		that.reader.abort();
		that.fireListener('update.am.import.abort',that.readerResponse);
	}
	that.reader.onloadstart = function(e) {
		that.readerResponse = e;
		that.readerResponse.statusText = e.type;
		that.fireListener('update.am.import.loadstart',that.readerResponse);
	}
	that.reader.onload = function(e) {
		var customHandler = 'process_' + that.sourceType;
		that.readerResponse = e;
		that.readerResponse.statusText = e.type;

		if ( that[customHandler] ) {
			that[customHandler](e.target.result);
		} else {
			that.process_plainData(e.target.result);
		}
	}
	that.reader.readAsBinaryString(that.source);
}

// PROCESS OBJECTIVE DATA
AmCharts.Editor.importer.prototype.process_objectiveData = function(data) {
	var that = this;
    debugger
	if ( data instanceof Array ) {
		that.resultsType = "array";
		jQuery.each(data[0],function(field) {
			that.fields.push(field);
		});
		that.results = data;
	} else if ( data instanceof Object ) {
		that.resultsType = "object";
		jQuery.each(data,function(field) {
			that.fields.push(field);
		});
		that.results = data;
	} else {
		console.log("UNKNOWN DATA TYPE");
	}

	// TRIGGER EVENTS
	that.fireListener('update.am.import.success',that.readerResponse);
	that.fireListener('update.am.import.complete',that.readerResponse);

	// RETURN
	return that.results;
};

// PROCESS PLAIN DATA
AmCharts.Editor.importer.prototype.process_plainData = function(data) {
	var that				= this;
	var row					= 0;
	var matches				= null;
	var delimiter			= that.delimiter=='Tab'?'x09':that.delimiter;
	var next				= {
		continue: false,
		break: false
	}
	var crop				= {
		start: false,
		end: false
	}
	var objPattern			= new RegExp((
        // Delimiters.
        "(\\" + delimiter + "|\\r?\\n|\\r|^)" +

        // Quoted fields.
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

        // Standard fields.
        "([^\"\\" + delimiter + "\\r\\n]*))"
    ),"gi");
    var buffer				= [];

    that.results.push([]);
	that.resultsType	= "array";

	// CRAWL DATA
	while ( matches = objPattern.exec(data) ) {
		var tmpDelimiter	= matches[1];
		var tmpCharCode		= String(tmpDelimiter).charCodeAt(0);
		var tmpValue		= null;

		// ESCAPE
		if ( matches[2] ) {
			tmpValue = jQuery.trim(matches[2].replace(/\"\"/g,"\""));
		} else {
			tmpValue = jQuery.trim(matches[3]);
		}

		// RANGE LOGIC
		next.continue	= Boolean(that.row_start && ( Number(that.row_start) > row ));
		next.break		= Boolean(that.row_end && ( Number(that.row_end) <= row ));

		// NEW LINE
		if ( jQuery.inArray(tmpCharCode,[10,11,13]) != -1 ) {
			if ( next.break ) break;
			that.results.push([]);
			row++;
		}

		// NEW COLUMN
		that.results[that.results.length-1].push(tmpValue);

		// START/STOP BY CHAR
		if ( crop.start === false && that.row_start.length && !Boolean(Number(that.row_start) + 1) && matches[0].indexOf(that.row_start) != -1 ) {
			crop.start = row;
		} else if ( crop.end === false && that.row_end.length && !Boolean(Number(that.row_end) + 1) && matches[0].indexOf(that.row_end) != -1 ) {
			crop.end = row;
		}

		// SECURE
		if ( row > 2000 ) {
			break;
		}
	}

	// CROP
	that.results = that.results.slice(crop.start||that.row_start||0,crop.end||that.row_end||that.results.length);

	// ORGANIZE
	jQuery(that.results).each(function(rID,items) {
		var tmp = {};
		jQuery(items).each(function(cID) {
			if ( !rID ) {
				that.fields.push(this);
			} else {
				tmp[that.fields[cID]] = this;
			}
		});
		if ( rID ) buffer.push(tmp);
	});
	that.results = buffer;

	// TRIGGER EVENTS
	that.fireListener('update.am.import.success',that.readerResponse);
	that.fireListener('update.am.import.complete',that.readerResponse);

	// RETURN
	return that.results;
}

// PROCESS XLSX
AmCharts.Editor.importer.prototype.process_xlsx = function(data) {
	var that		= this;
	var workbook	= XLSX.read(data, {type:"binary"});
	var results		= {};

	// CONVERT
	jQuery(workbook.SheetNames).each(function() {
		results[this] = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[this]);
	});

	that.process_objectiveData(results);
	that.workbook = workbook;

	// RETURN
	return results;
}