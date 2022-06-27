var myQuery, isuSDK, encripted_data, redirectUrl, tempModalElem, ClientLoginURL = "",
    AEPS_API = "";
redirectUrl = "https://new-matm-gateway.web.app",
    //function () {
        myQuery = isuSDK = function (t) {
            return new e(t)
        };
        var e = function (t) {
            for (var e = document.querySelectorAll(t), o = 0; o < e.length; o++) this[o] = e[o];
            return this.length = e.length, this
        };

        function h() {
            document.getElementById("alertBox").remove()
        }
        myQuery.fn = e.prototype = {
            open: function () {
                this.closeButton = null, this.modal = null, this.overlay = null, this.transitionEnd = function () {
                    var t = document.createElement("div");
                    if (t.style.WebkitTransition) return "webkitTransitionEnd";
                    if (t.style.OTransition) return "oTransitionEnd";
                    if (t.style.MozTransition) return "mozTransitionEnd MSTransitionEnd";
                    return "transitionend"
                }();
                var t = {
                    title: "MATM Transaction",
                    autoOpen: !1,
                    className: "zoom",
                    sticky: !1,
                    closeButton: !0,
                    closeButtonIcon: "",
                    closeIconInnerColor: "",
                    closeIconOuterColor: "",
                    content: this[0].innerHTML,
                    maxWidth: 1200,
                    minWidth: 280,
                    overlay: !0,
                    overlayColor: "",
                    overlayOpacity: "",
                    bgColor: "#fff",
                    scroll: !1,
                    encryptedData: "",
                    alert: {
                        headerColor: "#fff",
                        headerBackground: "#487af1",
                        bodyColor: "#999",
                        bodyBackground: "#fff"
                    },
                    colors: {
                        primaryBackgroundColor: "#3399ff",
                        primaryTextColor: "#ffffff",
                        borderColor: "#3399ff",
                        inputTextColor: "#333333",
                        elementDisabledColor: "#e4eaea",
                        contentBackground: "#f9f9f9",
                        inputBorderBottom: "#ccc",
                        inputPlaceHolder: "#aaa"
                    }
                };
                if (arguments[0] && "object" == typeof arguments[0] && (this.options = function (t, e) {
                        var o;
                        for (o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
                        return t
                    }(t, arguments[0])), !0 === this.options.autoOpen && this.open(), (tempModalElem = this).options.encryptedData) {
                    encripted_data = this.options.encryptedData;
                    var e = document.createElement("div"),
                        o = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
                        i = o.namespaceURI,
                        l = document.createElementNS(i, "g"),
                        s = document.createElementNS(i, "animateTransform"),
                        n = document.createElementNS(i, "path"),
                        a = document.createElementNS(i, "path"),
                        r = document.createElementNS(i, "path");
                    e.classList = "loderContainer", o.setAttribute("class", "lds-comets"), o.setAttribute("height", "70px"), o.setAttribute("width", "70px"), o.setAttribute("viewBox", "0 0 100 100"), l.setAttribute("transform", "rotate(101.952 50 50)"), s.setAttribute("attributeName", "transform"), s.setAttribute("type", "rotate"), s.setAttribute("repeatCount", "indefinite"), s.setAttribute("values", "360 50 50;240 50 50;120 50 50;0 50 50"), s.setAttribute("keyTimes", "0;0.333;0.667;1"), s.setAttribute("dur", "1s"), s.setAttribute("keySplines", "0.7 0 0.3 1;0.7 0 0.3 1;0.7 0 0.3 1"), s.setAttribute("calcMode", "spline"), n.setAttributeNS(null, "d", "M91,74.1C75.6,98,40.7,102.4,21.2,81c11,9.9,26.8,13.5,40.8,8.7c7.4-2.5,13.9-7.2,18.7-13.3 c1.8-2.3,3.5-7.6,6.7-8C90.5,67.9,92.7,71.5,91,74.1z"), a.setAttributeNS(null, "d", "M50.7,5c-4,0.2-4.9,5.9-1.1,7.3c1.8,0.6,4.1,0.1,5.9,0.3c2.1,0.1,4.3,0.5,6.4,0.9c5.8,1.4,11.3,4,16,7.8 C89.8,31.1,95.2,47,92,62c4.2-13.1,1.6-27.5-6.4-38.7c-3.4-4.7-7.8-8.7-12.7-11.7C66.6,7.8,58.2,4.6,50.7,5z"), r.setAttributeNS(null, "d", "M30.9,13.4C12,22.7,2.1,44.2,7.6,64.8c0.8,3.2,3.8,14.9,9.3,10.5c2.4-2,1.1-4.4-0.2-6.6 c-1.7-3-3.1-6.2-4-9.5C10.6,51,11.1,41.9,14.4,34c4.7-11.5,14.1-19.7,25.8-23.8C37,11,33.9,11.9,30.9,13.4z"), n.setAttributeNS(null, "fill", "#e15b64"), a.setAttributeNS(null, "fill", "#f8b26a"), r.setAttributeNS(null, "fill", "#849b87"), l.appendChild(s), l.appendChild(n), l.appendChild(a), l.appendChild(r), o.appendChild(l), e.appendChild(o), document.body.appendChild(e), e.remove(),
                        function () {
                            var t, e;
                            e = document.createDocumentFragment(), this.modal = document.createElement("div"), this.modal.className = "isuSDK-modal " + this.options.className, this.modal.className = "isuSDK-modal " + this.options.className;
                            var o = escape(JSON.stringify(tempModalElem));
                            console.log(encripted_data);
                            var i = "<iframe src='" + redirectUrl + "?data=" + escape(encripted_data) + "&options=" + o + "' style='border: none;overflow: hidden;width: 100%;height: 510px !important;'></iframe>";
                            this.options.size ? ("big" === this.options.size && (this.modal.style.minWidth = "300px", this.modal.style.maxWidth = "85%"), "medium" === this.options.size && (this.modal.style.minWidth = "300px", this.modal.style.maxWidth = "60%"), "small" === this.options.size && (this.modal.style.minWidth = "300px", this.modal.style.maxWidth = "40%")) : (this.modal.style.minWidth = this.options.minWidth + "px", this.modal.style.maxWidth = this.options.maxWidth + "px");
                            this.options.sticky && (this.modal.style.position = "fixed", this.modal.style.minHeight = "200px", this.modal.style.maxHeight = "440px", this.modal.style.overflow = "auto");
                            this.options.bgColor && (this.modal.style.backgroundColor = this.options.bgColor);
                            this.options.scroll && (this.modal.style.overflowY = "auto");
                            this.options.title && (this.title = document.createElement("div"), this.title.style.width = "100%", this.title.innerHTML = '<h2 class="title">' + this.options.title + "</h2>", this.modal.appendChild(this.title));
                            if (!0 === this.options.closeButton)
                                if (this.options.closeButtonIcon) this.closeButton = document.createElement("div"), this.closeButton.setAttribute("class", "isuSDK-close close-button"), this.closeButton.innerHTML = '<img src="' + this.options.closeButtonIcon + '" alt="close" width="32px" height="32px"/>', this.modal.appendChild(this.closeButton);
                                else {
                                    this.closeButton = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this.closeButton.setAttribute("height", "32px"), this.closeButton.setAttribute("width", "32px"), this.closeButton.setAttribute("viewBox", "0 0 490.442 490.442"), this.closeButton.setAttribute("class", "isuSDK-close close-button");
                                    var l = this.closeButton.namespaceURI,
                                        s = document.createElementNS(l, "path"),
                                        n = document.createElementNS(l, "path");
                                    s.setAttributeNS(null, "d", "M270.421,245.342l42-42c7.3-7.1,7.3-18.5,0.2-25.5c-7-7-18.4-7-25.5,0l-42,42l-42-42c-7-7-18.4-7-25.5,0    c-7,7-7,18.4,0,25.5l42,42l-42,42c-7,7-7,18.4,0,25.5c3.5,3.5,8.1,5.3,12.7,5.3c4.6,0,9.2-1.8,12.7-5.3l42-42l42,42    c3.5,3.5,8.1,5.3,12.7,5.3c4.6,0,9.2-1.8,12.7-5.3c7-7,7-18.4,0-25.5L270.421,245.342z"), n.setAttributeNS(null, "d", "M418.621,71.842c-7-7-18.4-7-25.4,0l-56,55.9c-7,7-7,18.4,0,25.5c7,7,18.4,7,25.5,0l42.7-42.7    c69.2,82.1,65.1,205.3-12.2,282.6c-39.5,39.5-92.1,61.3-148,61.3c-55.9,0-108.4-21.7-148-61.2c-81.6-81.6-81.6-214.3,0-295.9    c50.1-50.1,121.6-71.4,191.1-56.8c9.7,2,19.3-4.2,21.3-13.9c2-9.7-4.2-19.3-13.9-21.3c-81.4-17.2-165.1,7.7-223.9,66.5    c-46.3,46.3-71.8,107.9-71.8,173.4s25.5,127.1,71.8,173.4c46.3,46.3,107.9,71.8,173.4,71.8s127.1-25.5,173.4-71.8    s71.8-107.9,71.8-173.4S464.921,118.142,418.621,71.842z"), this.options.closeIconInnerColor ? s.setAttributeNS(null, "fill", this.options.closeIconInnerColor) : s.setAttributeNS(null, "fill", "#FA7575"), this.options.closeIconOuterColor ? n.setAttributeNS(null, "fill", this.options.closeIconOuterColor) : n.setAttributeNS(null, "fill", "#FA7575"), this.closeButton.appendChild(s), this.closeButton.appendChild(n), this.modal.appendChild(this.closeButton)
                                }! 0 === this.options.overlay && (this.overlay = document.createElement("div"), this.overlay.className = "isuSDK-overlay " + this.options.className, this.options.overlayColor && (this.overlay.style.backgroundColor = this.options.overlayColor), this.options.overlayOpacity && (this.overlay.style.opacity = this.options.overlayOpacity), e.appendChild(this.overlay));
                            (t = document.createElement("div")).className = "isuSDK-content", t.innerHTML = i, this.modal.appendChild(t), e.appendChild(this.modal), document.body.appendChild(e)
                        }.call(tempModalElem),
                        function () {
                            this.closeButton && this.closeButton.addEventListener("click", this.close.bind(this))
                        }.call(tempModalElem), window.getComputedStyle(tempModalElem.modal).height;
                    var d = parseInt(window.innerHeight),
                        c = parseInt(window.getComputedStyle(tempModalElem.modal).height),
                        m = (d - c) / 2 + "px";
                    tempModalElem.modal.style.top = c < d ? m : "20px", tempModalElem.modal.className = tempModalElem.modal.className + (tempModalElem.modal.offsetHeight > window.innerHeight ? " isuSDK-open isuSDK-anchored" : " isuSDK-open"), tempModalElem.overlay.className = tempModalElem.overlay.className + " isuSDK-open"
                } else ! function (t, e, o) {
                    document.createDocumentFragment();
                    var i = document.createElement("div"),
                        l = document.createElement("div"),
                        s = document.createElement("div"),
                        n = document.createElement("div"),
                        a = document.createElement("div"),
                        r = document.createElement("button");
                    i.classList = "alertContainer", i.style.background = o.bodyBackground, i.setAttribute("id", "alertBox"), l.classList = "alertHeading", l.style.background = o.headerBackground, l.style.color = o.headerColor, l.innerHTML = t, s.classList = "alertBody", s.style.color = o.bodyColor, n.classList = "alertBodyContent", n.innerHTML = e, a.classList = "alertBodyBtn", r.classList = "btn btn-success", r.setAttribute("id", "closeAlert"), r.innerHTML = "OK", a.appendChild(r), s.appendChild(n), s.appendChild(a), i.appendChild(l), i.appendChild(s), document.body.appendChild(i);
                    var d = document.getElementById("alertBox");
                    d.style.top = (window.innerHeight - d.offsetHeight) / 2 + "px", d.style.left = (window.innerWidth - d.offsetWidth) / 2 + "px", document.getElementById("closeAlert").addEventListener("click", h, !1)
                }("Error", "MATM is not properly configured for transaction.", tempModalElem.options.alert);
                return this
            },
            close: function () {

                var t = this;
                window.location.href="../../#/dashboard";
                return this.modal.className = this.modal.className.replace("isuSDK-open", ""), this.overlay.className = this.overlay.className.replace("isuSDK-open", ""), this.modal.addEventListener(this.transitionEnd, function () {
                    t.modal.parentNode.removeChild(t.modal)
                }), this.overlay.addEventListener(this.transitionEnd, function () {
                    t.overlay.parentNode && t.overlay.parentNode.removeChild(t.overlay)
                }), this
                
            }
        }
   // }();
   export {myQuery, isuSDK, encripted_data, redirectUrl, tempModalElem, ClientLoginURL}