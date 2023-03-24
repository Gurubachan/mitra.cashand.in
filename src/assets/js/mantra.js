let ddlAVDM;
let txtDeviceInfo;

var GetPIString = "";
var GetPAString = "";
var GetPFAString = "";
var DemoFinalString = "";
var finalUrl = "";
let OldPort = false;
function discoverAvdm() {
  // New

  var SuccessFlag = 0;
  var primaryUrl = "http://127.0.0.1:";

  try {
    var protocol = window.location.href;
    if (protocol.indexOf("https") >= 0) {
      primaryUrl = "https://127.0.0.1:";
    }
  } catch (e) {
    //console.error(e);
  }

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
        // console.log(finalUrl);
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

          //console.log(res);
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

        // res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
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
function CaptureAvdm(ekyc = false) {
  discoverAvdm();
  return new Promise((resolve, reject) => {
    if (ekyc) {
      var XML =
        '<?xml version="1.0"?> <PidOptions ver="1.0"> <Opts fCount="' +
        1 +
        '" fType="' +
        2 +
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
        '" wadh="' +
        "E0jzJ/P8UopUHAieZn8CKqS4WPMi5ZSYXgfnlfkWjrc=" +
        '" posh="UNKNOWN" env="' +
        "p" +
        '" /> ' +
        DemoFinalString +
        '<CustOpts><Param name="mantrakey" value="' +
        undefined +
        '" /></CustOpts> </PidOptions>';
    } else {
      var XML =
        '<?xml version="1.0"?> <PidOptions ver="1.0"> <Opts fCount="' +
        1 +
        '" fType="' +
        2 +
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
        "p" +
        '" /> ' +
        DemoFinalString +
        '<CustOpts><Param name="mantrakey" value="' +
        undefined +
        '" /></CustOpts> </PidOptions>';
    }

    //alert(XML);

    var verb = "CAPTURE";

    var err = "";

    var res;
    $.support.cors = true;
    var httpStaus = false;
    var jsonstr = "";
    //console.log(finalUrl + MethodCapture);
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

function CaptureMorpho(ekyc = false) {
  return new Promise(function (resolve, reject) {
    var url = "http://127.0.0.1:11100/capture";
    /* try {
      var protocol = window.location.href;
      if (protocol.indexOf("https") >= 0) {
        url = "https://127.0.0.1:11100/capture";
      }
    } catch (e) {
      //console.error(e);
    } */

    if (ekyc) {
      var PIDOPTS =
        '<PidOptions ver="1.0">' +
        '<Opts env="P" fCount="1" fType="2" iCount="" iType="" pCount="" pType="" format="0" pidVer="2.0" timeout="10000" otp="" wadh="E0jzJ/P8UopUHAieZn8CKqS4WPMi5ZSYXgfnlfkWjrc=" posh="UNKNOWN"/>' +
        "</PidOptions>";
    } else {
      var PIDOPTS =
        '<PidOptions ver="1.0">' +
        '<Opts env="P" fCount="1" fType="2" iCount="" iType="" pCount="" pType="" format="0" pidVer="2.0" timeout="10000" otp="" wadh="" posh="UNKNOWN"/>' +
        "</PidOptions>";
    }

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
          // alert(xhr.response);
          var text = xhr.responseText;

          resolve(xhr.responseText);
        } else {
          // console.log(xhr.response);
          reject(xhr.response);
        }
      }
    };

    xhr.send(PIDOPTS);
  });
}

function CaptureMorphoNew() {
  return new Promise((t, e) => {
    var n,
      r = window.navigator.userAgent.indexOf("MSIE ");
    (n =
      r > 0 || navigator.userAgent.match(/Trident.*rv\:11\./)
        ? new ActiveXObject("Microsoft.XMLHTTP")
        : new XMLHttpRequest()).open(
      "CAPTURE",
      "http://127.0.0.1:11100/capture",
      !0
    ),
      n.setRequestHeader("Content-Type", "text/xml"),
      n.setRequestHeader("Accept", "text/xml"),
      (n.onreadystatechange = function () {
        (4 == n.readyState || 2 == n.readyState) && 200 == n.status
          ? t(n.response)
          : t(n.response);
      }),
      n.send(
        '<PidOptions ver="1.0"><Opts fCount="1" fType="2" iCount="" iType="" pCount="" pType="" format="0" pidVer="2.0" timeout="10000" otp="" wadh="" posh=""/></PidOptions>'
      );
  });
}

/* New all fingureprint device integration */

let ddlAVDMNew;
function discoverAvdmNew() {
  let SuccessFlag = 0;
  let primaryUrl = "http://127.0.0.1:";
  let res;
  /* try {
    const protocol = window.location.href;
    if (protocol.indexOf("https") >= 0) {
      primaryUrl = "https://127.0.0.1:";
    }
  } catch (e) {} */

  //alert("Please wait while discovering port from 11100 to 11120.\nThis will take some time.");
  for (var i = 11100; i <= 11120; i++) {
    if (primaryUrl == "https://127.0.0.1:" && OldPort == true) {
      i = "8005";
    }
    /*$("#lblStatus1").text("Discovering RD service on port : " + i.toString());*/

    let verb = "RDSERVICE";
    let err = "";
    SuccessFlag = 0;

    $.support.cors = true;
    let httpStatus = false;

    $.ajax({
      type: verb,
      async: false,
      crossDomain: true,
      url: primaryUrl + i.toString(),
      contentType: "text/xml; charset=utf-8",
      processData: false,
      cache: false,
      success: function (data) {
        let $doc;
        httpStatus = true;

        finalUrl = primaryUrl + i.toString();
        // console.warn(typeof data);
        if (typeof data == "string") {
          $doc = $.parseXML(data);
        } else {
          $doc = data;
        }

        let CmbData1 = $($doc).find("RDService").attr("status");
        //console.log(CmbData1);
        let CmbData2 = $($doc).find("RDService").attr("info");
        // console.log(CmbData2);
        let check = $($doc).find("Interface");
        // console.warn(check.length);
        res = { response: httpStatus, message: CmbData1, data: data };
        if (CmbData1 == "READY") {
          ddlAVDMNew = i.toString();
          /*CaptureAvdmNew();*/
          SuccessFlag = 1;
          return;
        }
      },
      error: function (jqXHR, ajaxOptions, thrownError) {
        if (i == "8005" && OldPort == true) {
          OldPort = false;
          i = "11099";
        }
        res = {
          response: httpStatus,
          message: getHttpError(jqXHR),
          error: thrownError,
        };
      },
    });

    if (SuccessFlag == 1) {
      break;
    }
  }

  if (SuccessFlag == 0) {
    res = {
      response: httpStatus,
      message: "Connection failed Please try again.",
    };
    /* alert("Connection failed Please try again."); */
  }

  return res;
}
var $scope = {};

function CaptureAvdmNew(ekyc = false) {
  return new Promise(function (resolve, reject) {
    let avdm = discoverAvdmNew();

    if (avdm.response) {
      var baseURL = "http://127.0.0.1:";
      var capture = "/rd/capture";
      var err = "";
      var httpStatus = false;
      var jsonstr = "";
      var XML;
      var res;
      $.support.cors = true;
      if (ekyc) {
        XML =
          '<?xml version="1.0" ?> <PidOptions ver="1.0"> <Opts fCount="1" fType="2" iCount="0" pCount="0" format="0" pidVer="2.0" timeout="10000" posh="" env="P" wadh="E0jzJ/P8UopUHAieZn8CKqS4WPMi5ZSYXgfnlfkWjrc=" /> <CustOpts><Param name="mantrakey" value="" /></CustOpts> </PidOptions>';
      } else {
        XML =
          '<?xml version="1.0" ?> <PidOptions ver="1.0"> <Opts fCount="1" fType="2" iCount="0" pCount="0" format="0" pidVer="2.0" timeout="10000" posh="" env="P" /> <CustOpts><Param name="mantrakey" value="" /></CustOpts> </PidOptions>';
      }
      let i = ddlAVDMNew;
      $scope.finalURL = baseURL + i + capture;

      $.ajax({
        type: "CAPTURE",
        async: false,
        crossDomain: true,
        url: $scope.finalURL,
        data: XML,
        contentType: "text/xml; charset=utf-8",
        processData: false,
        success: function (data, x, y) {
          if (typeof data == "string") {
            var $doc = $.parseXML(data);
          } else {
            var $doc = data;
          }

          if ($($doc).find("Resp").attr("errCode") == 0) {
            i = 11120;
            httpStatus = true;
          }
          res = {
            response: httpStatus,
            message: $($doc).find("Resp").attr("errInfo"),
            data: y.responseText,
          };
          resolve(res);
        },
        error: function (jqXHR, ajaxOptions, thrownError) {
          res = {
            response: httpStatus,
            message: getHttpError(jqXHR),
            error: thrownError,
          };
          reject(res);
        },
      });
      // return res;
    } else {
      reject(avdm);
      //return avdm;
    }
  });
}
function getHttpError(jqXHR) {
  var err = "Unhandled Exception";
  if (jqXHR.status === 0) {
    err = "Service Unavailable";
  } else if (jqXHR.status == 404) {
    err = "Requested page not found";
  } else if (jqXHR.status == 500) {
    err = "Internal Server Error";
  } else if (thrownError === "parsererror") {
    err = "Requested JSON parse failed";
  } else if (thrownError === "timeout") {
    err = "Time out error";
  } else if (thrownError === "abort") {
    err = "Ajax request aborted";
  } else {
    err = "Unhandled Error";
  }
  return err;
}
