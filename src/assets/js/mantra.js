let ddlAVDM;
let txtDeviceInfo;

var GetPIString = "";
var GetPAString = "";
var GetPFAString = "";
var DemoFinalString = "";

function discoverAvdm() {
  // New

  var SuccessFlag = 0;
  var primaryUrl = "http://127.0.0.1:";

  try {
    var protocol = window.location.href;
    if (protocol.indexOf("https") >= 0) {
      primaryUrl = "https://127.0.0.1:";
    }
  } catch (e) {}

  url = "";
  ddlAVDM = "";
  //alert("Please wait while discovering port from 11100 to 11120.\nThis will take some time.");
  for (var i = 11100; i <= 11120; i++) {
    if (primaryUrl == "https://127.0.0.1:" && OldPort == true) {
      i = "8005";
    }
    /* $("#lblStatus1").text("Discovering RD service on port : " + i.toString()); */

    var verb = "RDSERVICE";
    var err = "";
    SuccessFlag = 0;
    var res;
    $.support.cors = true;
    var httpStaus = false;
    var jsonstr = "";
    var data = new Object();
    var obj = new Object();

    $.ajax({
      type: "RDSERVICE",
      async: false,
      crossDomain: true,
      url: primaryUrl + i.toString(),
      contentType: "text/xml; charset=utf-8",
      processData: false,
      cache: false,
      crossDomain: true,

      success: function (data) {
        httpStaus = true;
        res = { httpStaus: httpStaus, data: data };
        //alert(data);
        finalUrl = primaryUrl + i.toString();
        var $doc = $.parseXML(data);
        var CmbData1 = $($doc).find("RDService").attr("status");
        var CmbData2 = $($doc).find("RDService").attr("info");
        if (RegExp("\\b" + "Mantra" + "\\b").test(CmbData2) == true) {
          /* closeNav(); */
          /* $("#txtDeviceInfo").val(data); */
          txtDeviceInfo = data;

          if ($($doc).find("Interface").eq(0).attr("path") == "/rd/capture") {
            MethodCapture = $($doc).find("Interface").eq(0).attr("path");
          }
          if ($($doc).find("Interface").eq(1).attr("path") == "/rd/capture") {
            MethodCapture = $($doc).find("Interface").eq(1).attr("path");
          }
          if ($($doc).find("Interface").eq(0).attr("path") == "/rd/info") {
            MethodInfo = $($doc).find("Interface").eq(0).attr("path");
          }
          if ($($doc).find("Interface").eq(1).attr("path") == "/rd/info") {
            MethodInfo = $($doc).find("Interface").eq(1).attr("path");
          }

          /*  $("#ddlAVDM").append(
            "<option value=" +
              i.toString() +
              ">(" +
              CmbData1 +
              ")" +
              CmbData2 +
              "</option>"
          ); */
          ddlAVDM = i.toString();
          SuccessFlag = 1;
          //alert("RDSERVICE Discover Successfully");

          return;
        }

        //alert(CmbData1);
        //alert(CmbData2);
      },
      error: function (jqXHR, ajaxOptions, thrownError) {
        if (i == "8005" && OldPort == true) {
          OldPort = false;
          i = "11099";
        }
        /* $("#txtDeviceInfo").val(""); */
        //alert(thrownError);

        //res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
      },
    });

    if (SuccessFlag == 1) {
      break;
    }

    //$("#ddlAVDM").val("0");
  }

  if (SuccessFlag == 0) {
    /* alert("Connection failed Please try again."); */
  }

  /* $("select#ddlAVDM").prop("selectedIndex", 0); */

  //$('#txtDeviceInfo').val(DataXML);

  return res;
}

let txtPidData;
let txtPidOptions;
function CaptureAvdm() {
  return new Promise((resolve, reject) => {
    discoverAvdm();
    var XML =
      '<?xml version="1.0"?> <PidOptions ver="1.0"> <Opts fCount="' +
      1 +
      '" fType="' +
      0 +
      '" iCount="' +
      0 +
      '" pCount="' +
      0 +
      '" format="' +
      0 +
      '"   pidVer="' +
      2.0 +
      '" timeout="' +
      10000 +
      '" posh="UNKNOWN" env="' +
      "pp" +
      '" /> ' +
      DemoFinalString +
      '<CustOpts><Param name="mantrakey" value="' +
      undefined +
      '" /></CustOpts> </PidOptions>';
    //alert(XML);

    var verb = "CAPTURE";

    var err = "";

    var res;
    $.support.cors = true;
    var httpStaus = false;
    var jsonstr = "";
    $.ajax({
      type: "CAPTURE",
      async: false,
      crossDomain: true,
      url: finalUrl + MethodCapture,
      data: XML,
      contentType: "text/xml; charset=utf-8",
      processData: false,
      success: function (data) {
        //alert(data);
        httpStaus = true;
        res = { httpStaus: httpStaus, data: data };

        /* $("#txtPidData").val(data);
      $("#txtPidOptions").val(XML); */
        txtPidData = data;
        txtPidOptions = XML;
        var $doc = $.parseXML(data);
        //var Message = $($doc).find("Resp").attr("errInfo");

        /* alert(Message); */
        resolve(res);
      },
      error: function (jqXHR, ajaxOptions, thrownError) {
        //$('#txtPidOptions').val(XML);
        /* alert(thrownError); */

        res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
        reject(res);
      },
    });
    //return res;
  });
}

function CaptureMorpho() {
  return new Promise((resolve, reject) => {
    var url = "http://127.0.0.1:11100/capture";

    var PIDOPTS =
      '<PidOptions ver="1.0">' +
      '<Opts fCount="1" fType="0" iCount="" iType="" pCount="" pType="" format="0" pidVer="2.0" timeout="10000" otp="" wadh="" posh=""/>' +
      "</PidOptions>";

    /*
   format=\"0\"     --> XML
   format=\"1\"     --> Protobuf
   */
    var xhr;
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      // If Internet Explorer, return version number
      //IE browser
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
      //other browser
      xhr = new XMLHttpRequest();
    }

    xhr.open("CAPTURE", url, true);
    xhr.setRequestHeader("Content-Type", "text/xml");
    xhr.setRequestHeader("Accept", "text/xml");

    xhr.onreadystatechange = function () {
      //if(xhr.readyState == 1 && count == 0){
      //	fakeCall();
      //}
      if (xhr.readyState == 4) {
        var status = xhr.status;
        if (status == 200) {
          // alert(xhr.responseText);
          //document.getElementById("text").value = xhr.responseText;
          //if(xhr.responseText.indexOf("errCode=\"100\"") != -1){
          //alert(xhr.responseText);
          //fakeCall();
          //Capture();
          //}else{
          //    alert(xhr.responseText);
          //    console.log(xhr.response);
          //}
          //console.log(xhr.response);
          //return xhr.response;
          resolve(xhr.response);
        } else {
          //console.log(xhr.response);
          reject(xhr.response);
          //return xhr.response;
        }
      } else {
        reject(xhr.response);
      }
    };

    xhr.send(PIDOPTS);
  });
}
