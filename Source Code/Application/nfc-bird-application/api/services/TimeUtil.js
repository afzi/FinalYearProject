  module.exports = {

    //Adapted From https://hype.codes/how-get-current-date-javascript
    currentTimestamp: function(){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();

      if(dd<10) {
          dd = '0'+dd
      } 

      if(mm<10) {
          mm = '0'+mm
      } 

      today = dd + '-' + mm + '-' + yyyy;
      return today;
    },

    unixToDate: function (UNIX_timestamp){
        var date = new Date(UNIX_timestamp * 1000);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      },

      //Adapted From https://stackoverflow.com/questions/12251325/javascript-date-to-calculate-age-work-by-the-day-months-years
       getAge: function(dateString) {    
        var now = new Date();  
        var yearNow = now.getYear();
        var monthNow = now.getMonth();
        var dateNow = now.getDate();
      
        var dob = new Date(dateString * 1000);
      
        var yearDob = dob.getYear();
        var monthDob = dob.getMonth();
        var dateDob = dob.getDate();
        var age = {};
        var ageString = "";
        var yearString = "";
        var monthString = "";
        var dayString = "";
      
      
        yearAge = yearNow - yearDob;
      
        if (monthNow >= monthDob)
          var monthAge = monthNow - monthDob;
        else {
          yearAge--;
          var monthAge = 12 + monthNow -monthDob;
        }
      
        if (dateNow >= dateDob)
          var dateAge = dateNow - dateDob;
        else {
          monthAge--;
          var dateAge = 31 + dateNow - dateDob;
      
          if (monthAge < 0) {
            monthAge = 11;
            yearAge--;
          }
        }
      
        age = {
            years: yearAge,
            months: monthAge,
            days: dateAge
            };
      
        if ( age.years > 1 ) yearString = " years";
        else yearString = " year";
        if ( age.months> 1 ) monthString = " months";
        else monthString = " month";
        if ( age.days > 1 ) dayString = " days";
        else dayString = " day";
      
      
        if ( (age.years > 0) && (age.months > 0) && (age.days > 0) )
          ageString = age.years + yearString + ", " + age.months + monthString + ", " + age.days + dayString;
        else if ( (age.years == 0) && (age.months == 0) && (age.days > 0) )
          ageString = age.days + dayString;
        else if ( (age.years > 0) && (age.months == 0) && (age.days == 0) )
          ageString = age.years + yearString;
        else if ( (age.years > 0) && (age.months > 0) && (age.days == 0) )
          ageString = age.years + yearString + ", " + age.months + monthString;
        else if ( (age.years == 0) && (age.months > 0) && (age.days > 0) )
          ageString = age.months + monthString + ", " + age.days + dayString;
        else if ( (age.years > 0) && (age.months == 0) && (age.days > 0) )
          ageString = age.years + yearString + ", " + age.days + dayString;
        else if ( (age.years == 0) && (age.months > 0) && (age.days == 0) )
          ageString = age.months + monthString;
        else ageString = "Oops! Could not calculate age!";
      
        return ageString;
      }
  };