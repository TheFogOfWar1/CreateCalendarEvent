function createICSFile(title, description, summary){
    var ICStitle = "";
    var ICSdescription = "";
    var ICSsummary = "";

    var today = new Date();

    ICStitle = document.getElementById("title").value;
    ICSdescription = document.getElementById("description").value;
    ICSsummary = document.getElementById("summary").value;

    console.log(ICStitle);
    console.log(ICSdescription);
    console.log(ICSsummary);

    /*
      An ICS File needs a specific timestamp
      see: https://en.wikipedia.org/wiki/ICalendar
    */
    function setTime(d){
      var date = new Date(d);
      var yearMonthDay = date.getFullYear() + addZero(date.getMonth()) + addZero(date.getDate());
      var hourMinuteSec = addZero(date.getHours() + addZero(date.getMinutes()) + "00");
      var total = yearMonthDay + "T" + hourMinuteSec;
      console.log(total);
      return total;

    }

    function addZero(i){
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }

    icsLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:toFillIn",
      "METHOD:REQUEST",
      "BEGIN:VEVENT",
      "UID:event-" + today.getTime() + "@somewhere.com",
      "DTSTAMP:" + setTime(today),
      "DTSTART:" + setTime(today),
      "DTEND:" ,
      "DESCRIPTION:" + ICSdescription,
      "SUMMARY:" + ICSsummary,
      "LAST-MODIFIED:" + today.getTime,
      "SEQUENCE:0",
      "END:VEVENT",
      "END:VCALENDAR"
    ];

    var file = 'data:text/calendar;base64' + encodeURI(icsLines.join('\r\n'));

    function downloadICS(){
      var hiddenElement = document.createElement('a');

      hiddenElement.target = '_blank';
      hiddenElement.download = 'calendarEvent.ics';
      hiddenElement.click();
    }
    download
}
