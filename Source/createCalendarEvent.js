function createICSFile(){
    var ICStitle = "";
    var ICSdescription = "";
    var ICSsummary = "";
    var fileName = ""
    var today = new Date();
    var startTime = new Date()
    var endTime = new Date();

    ICSdescription = document.getElementById("description").value; //long description for calendar event
    ICSsummary = document.getElementById("summary").value; //summary of event
    fileName = document.getElementById("title").value + ".ics"; //fileName with extension

    endTime.setHours(today.getHours() + 2); //Generates an endtime for your event. You should remove this and use your own endtime.

    /*
      An ICS File needs a specific timestamp
      see: https://en.wikipedia.org/wiki/ICalendar
    */
    function setTime(d){
      var date = new Date(d);
      var yearMonthDay = date.getFullYear() + slicer(date.getMonth() + 1)
                         + slicer(date.getDate());
      var hourMinuteSec = slicer(date.getHours()) + slicer(date.getMinutes())
                         + '00';
      var total = yearMonthDay + 'T' + hourMinuteSec;

      return total;

    }

    //datefixer
    function slicer(s){
      return ("0" + s).slice(-2);
    }

    //internal layout in the file, in line with the code conventions
    icsLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:toFillIn",
      "METHOD:REQUEST",
      "BEGIN:VEVENT",
      "UID:event-" + today.getTime() + "@somewhere.com",
      "DTSTAMP:" + setTime(today),
      "DTSTART:" + setTime(startTime),
      "DTEND:" + setTime(endTime),
      "DESCRIPTION:" + ICSdescription,
      "SUMMARY:" + ICSsummary,
      "LAST-MODIFIED:" + setTime(today),
      "SEQUENCE:0",
      "END:VEVENT",
      "END:VCALENDAR"
    ];
    
    //saves file
    function saveFile(fileURL){
      if (!window.ActiveXObject) {
         var save = document.createElement('a');
         save.href = fileURL;
         save.target = '_blank';
         save.download = fileName || 'unknown';
         var evt = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': false
         });
         save.dispatchEvent(evt);

         (window.URL || window.webkitURL).revokeObjectURL(save.href);

      }
    }

    var dlurl = 'data:text/calendar;base64,' + btoa(icsLines.join('\r\n'));

    saveFile(dlurl);

}
