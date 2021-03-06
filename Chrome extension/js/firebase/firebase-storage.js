! function(e, t) { "object" == typeof exports && "undefined" != typeof module ? t(require("@firebase/app")) : "function" == typeof define && define.amd ? define(["@firebase/app"], t) : t((e = e || self).firebase) }(this, function(He) { "use strict"; try {
        (function() { He = He && He.hasOwnProperty("default") ? He.default : He; var t = "https://firebasestorage.googleapis.com",
                a = "https://firebasestorage.googleapis.com",
                s = "/v0",
                r = "/v0",
                m = function() {
                    function e(e, t) { this.code_ = n(e), this.message_ = "Firebase Storage: " + t, this.serverResponse_ = null, this.name_ = "FirebaseError" } return e.prototype.codeProp = function() { return this.code }, e.prototype.codeEquals = function(e) { return n(e) === this.codeProp() }, e.prototype.serverResponseProp = function() { return this.serverResponse_ }, e.prototype.setServerResponseProp = function(e) { this.serverResponse_ = e }, Object.defineProperty(e.prototype, "name", { get: function() { return this.name_ }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "code", { get: function() { return this.code_ }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "message", { get: function() { return this.message_ }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "serverResponse", { get: function() { return this.serverResponse_ }, enumerable: !0, configurable: !0 }), e }(),
                b = { UNKNOWN: "unknown", OBJECT_NOT_FOUND: "object-not-found", BUCKET_NOT_FOUND: "bucket-not-found", PROJECT_NOT_FOUND: "project-not-found", QUOTA_EXCEEDED: "quota-exceeded", UNAUTHENTICATED: "unauthenticated", UNAUTHORIZED: "unauthorized", RETRY_LIMIT_EXCEEDED: "retry-limit-exceeded", INVALID_CHECKSUM: "invalid-checksum", CANCELED: "canceled", INVALID_EVENT_NAME: "invalid-event-name", INVALID_URL: "invalid-url", INVALID_DEFAULT_BUCKET: "invalid-default-bucket", NO_DEFAULT_BUCKET: "no-default-bucket", CANNOT_SLICE_BLOB: "cannot-slice-blob", SERVER_FILE_WRONG_SIZE: "server-file-wrong-size", NO_DOWNLOAD_URL: "no-download-url", INVALID_ARGUMENT: "invalid-argument", INVALID_ARGUMENT_COUNT: "invalid-argument-count", APP_DELETED: "app-deleted", INVALID_ROOT_OPERATION: "invalid-root-operation", INVALID_FORMAT: "invalid-format", INTERNAL_ERROR: "internal-error" };

            function n(e) { return "storage/" + e }

            function u() { return new m(b.UNKNOWN, "An unknown error occurred, please check the error payload for server response.") }

            function c() { return new m(b.CANCELED, "User canceled the upload/download.") }

            function g() { return new m(b.CANNOT_SLICE_BLOB, "Cannot slice blob for upload. Please retry the upload.") }

            function h(e, t, r) { return new m(b.INVALID_ARGUMENT, "Invalid argument in `" + t + "` at index " + e + ": " + r) }

            function l() { return new m(b.APP_DELETED, "The Firebase app was deleted.") }

            function p(e, t) { return new m(b.INVALID_FORMAT, "String does not match format '" + e + "': " + t) }

            function i(e) { throw new m(b.INTERNAL_ERROR, "Internal error: " + e) } var f = { RAW: "raw", BASE64: "base64", BASE64URL: "base64url", DATA_URL: "data_url" };

            function d(e) { switch (e) {
                    case f.RAW:
                    case f.BASE64:
                    case f.BASE64URL:
                    case f.DATA_URL:
                        return;
                    default:
                        throw "Expected one of the event types: [" + f.RAW + ", " + f.BASE64 + ", " + f.BASE64URL + ", " + f.DATA_URL + "]." } } var o = function(e, t) { this.data = e, this.contentType = t || null };

            function _(e, t) { switch (e) {
                    case f.RAW:
                        return new o(v(t));
                    case f.BASE64:
                    case f.BASE64URL:
                        return new o(y(e, t));
                    case f.DATA_URL:
                        return new o((r = new R(t)).base64 ? y(f.BASE64, r.rest) : function(e) { var t; try { t = decodeURIComponent(e) } catch (e) { throw p(f.DATA_URL, "Malformed data URL.") } return v(t) }(r.rest), new R(t).contentType) } var r; throw u() }

            function v(e) { for (var t = [], r = 0; r < e.length; r++) { var n = e.charCodeAt(r); if (n <= 127) t.push(n);
                    else if (n <= 2047) t.push(192 | n >> 6, 128 | 63 & n);
                    else if (55296 == (64512 & n))
                        if (r < e.length - 1 && 56320 == (64512 & e.charCodeAt(r + 1))) n = 65536 | (1023 & n) << 10 | 1023 & e.charCodeAt(++r), t.push(240 | n >> 18, 128 | n >> 12 & 63, 128 | n >> 6 & 63, 128 | 63 & n);
                        else t.push(239, 191, 189);
                    else 56320 == (64512 & n) ? t.push(239, 191, 189) : t.push(224 | n >> 12, 128 | n >> 6 & 63, 128 | 63 & n) } return new Uint8Array(t) }

            function y(t, e) { switch (t) {
                    case f.BASE64:
                        var r = -1 !== e.indexOf("-"),
                            n = -1 !== e.indexOf("_"); if (r || n) throw p(t, "Invalid character '" + (r ? "-" : "_") + "' found: is it base64url encoded?"); break;
                    case f.BASE64URL:
                        var o = -1 !== e.indexOf("+"),
                            i = -1 !== e.indexOf("/"); if (o || i) throw p(t, "Invalid character '" + (o ? "+" : "/") + "' found: is it base64 encoded?");
                        e = e.replace(/-/g, "+").replace(/_/g, "/") } var a; try { a = atob(e) } catch (e) { throw p(t, "Invalid character found") } for (var s = new Uint8Array(a.length), u = 0; u < a.length; u++) s[u] = a.charCodeAt(u); return s } var R = function(e) { this.base64 = !1, this.contentType = null; var t = e.match(/^data:([^,]+)?,/); if (null === t) throw p(f.DATA_URL, "Must be formatted 'data:[<mediatype>][;base64],<data>"); var r, n, o = t[1] || null;
                null != o && (this.base64 = (n = ";base64", (r = o).length >= n.length && r.substring(r.length - n.length) === n), this.contentType = this.base64 ? o.substring(0, o.length - ";base64".length) : o), this.rest = e.substring(e.indexOf(",") + 1) }; var w, e, T = { STATE_CHANGED: "state_changed" },
                E = "running",
                O = "pausing",
                U = "paused",
                k = "success",
                A = "canceling",
                C = "canceled",
                S = "error",
                N = { RUNNING: "running", PAUSED: "paused", SUCCESS: "success", CANCELED: "canceled", ERROR: "error" };

            function x(e) { switch (e) {
                    case E:
                    case O:
                    case A:
                        return N.RUNNING;
                    case U:
                        return N.PAUSED;
                    case k:
                        return N.SUCCESS;
                    case C:
                        return N.CANCELED;
                    case S:
                    default:
                        return N.ERROR } }

            function L(e, t) { for (var r in e) n = e, o = r, Object.prototype.hasOwnProperty.call(n, o) && t(r, e[r]); var n, o }

            function P(e) { if (null == e) return {}; var r = {}; return L(e, function(e, t) { r[e] = t }), r }

            function I(e) { return new Promise(e) }

            function D(e) { return Promise.resolve(e) }

            function M(e) { return null != e }

            function W(e) { return void 0 !== e }

            function B(e) { return "function" == typeof e }

            function j(e) { return "object" == typeof e }

            function q(e) { return "string" == typeof e || e instanceof String }

            function F(e) { return H() && e instanceof Blob }

            function H() { return "undefined" != typeof Blob }(e = w || (w = {}))[e.NO_ERROR = 0] = "NO_ERROR", e[e.NETWORK_ERROR = 1] = "NETWORK_ERROR", e[e.ABORT = 2] = "ABORT"; var z = function() {
                    function e() { var r = this;
                        this.sent_ = !1, this.xhr_ = new XMLHttpRequest, this.errorCode_ = w.NO_ERROR, this.sendPromise_ = I(function(t, e) { r.xhr_.addEventListener("abort", function(e) { r.errorCode_ = w.ABORT, t(r) }), r.xhr_.addEventListener("error", function(e) { r.errorCode_ = w.NETWORK_ERROR, t(r) }), r.xhr_.addEventListener("load", function(e) { t(r) }) }) } return e.prototype.send = function(e, t, r, n) { var o = this; if (this.sent_) throw i("cannot .send() more than once");
                        (this.sent_ = !0, this.xhr_.open(t, e, !0), M(n)) && L(n, function(e, t) { o.xhr_.setRequestHeader(e, t.toString()) }); return M(r) ? this.xhr_.send(r) : this.xhr_.send(), this.sendPromise_ }, e.prototype.getErrorCode = function() { if (!this.sent_) throw i("cannot .getErrorCode() before sending"); return this.errorCode_ }, e.prototype.getStatus = function() { if (!this.sent_) throw i("cannot .getStatus() before sending"); try { return this.xhr_.status } catch (e) { return -1 } }, e.prototype.getResponseText = function() { if (!this.sent_) throw i("cannot .getResponseText() before sending"); return this.xhr_.responseText }, e.prototype.abort = function() { this.xhr_.abort() }, e.prototype.getResponseHeader = function(e) { return this.xhr_.getResponseHeader(e) }, e.prototype.addUploadProgressListener = function(e) { M(this.xhr_.upload) && this.xhr_.upload.addEventListener("progress", e) }, e.prototype.removeUploadProgressListener = function(e) { M(this.xhr_.upload) && this.xhr_.upload.removeEventListener("progress", e) }, e }(),
                G = function() {
                    function e() {} return e.prototype.createXhrIo = function() { return new z }, e }();

            function X(e) { var t, r; try { t = JSON.parse(e) } catch (e) { return null } return j(r = t) && !Array.isArray(r) ? t : null } var V = function() {
                function l(e, t) { this.bucket = e, this.path_ = t } return Object.defineProperty(l.prototype, "path", { get: function() { return this.path_ }, enumerable: !0, configurable: !0 }), l.prototype.fullServerUrl = function() { var e = encodeURIComponent; return "/b/" + e(this.bucket) + "/o/" + e(this.path) }, l.prototype.bucketOnlyServerUrl = function() { return "/b/" + encodeURIComponent(this.bucket) + "/o" }, l.makeFromBucketSpec = function(t) { var e, r; try { e = l.makeFromUrl(t) } catch (e) { return new l(t, "") } if ("" === e.path) return e; throw r = t, new m(b.INVALID_DEFAULT_BUCKET, "Invalid default bucket '" + r + "'.") }, l.makeFromUrl = function(e) { var t = null,
                        r = "([A-Za-z0-9.\\-_]+)"; for (var n, o = [{ regex: new RegExp("^gs://" + r + "(/(.*))?$", "i"), indices: { bucket: 1, path: 3 }, postModify: function(e) { "/" === e.path.charAt(e.path.length - 1) && (e.path_ = e.path_.slice(0, -1)) } }, { regex: new RegExp("^https?://firebasestorage\\.googleapis\\.com/v[A-Za-z0-9_]+/b/" + r + "/o(/([^?#]*).*)?$", "i"), indices: { bucket: 1, path: 3 }, postModify: function(e) { e.path_ = decodeURIComponent(e.path) } }], i = 0; i < o.length; i++) { var a = o[i],
                            s = a.regex.exec(e); if (s) { var u = s[a.indices.bucket],
                                c = s[a.indices.path];
                            c || (c = ""), t = new l(u, c), a.postModify(t); break } } if (null == t) throw n = e, new m(b.INVALID_URL, "Invalid URL '" + n + "'."); return t }, l }();

            function K(e) { var t = e.lastIndexOf("/", e.length - 2); return -1 === t ? e : e.slice(t + 1) }

            function Z(e) { return t + s + e }

            function J(e) { return t + r + e }

            function Q(e) { var n = encodeURIComponent,
                    o = "?"; return L(e, function(e, t) { var r = n(e) + "=" + n(t);
                    o = o + r + "&" }), o = o.slice(0, -1) }

            function Y(e, t) { return t } var $ = function(e, t, r, n) { this.server = e, this.local = t || e, this.writable = !!r, this.xform = n || Y },
                ee = null;

            function te() { if (ee) return ee; var e = [];
                e.push(new $("bucket")), e.push(new $("generation")), e.push(new $("metageneration")), e.push(new $("name", "fullPath", !0)); var t = new $("name");
                t.xform = function(e, t) { return !q(r = t) || r.length < 2 ? r : K(r = r); var r }, e.push(t); var r = new $("size"); return r.xform = function(e, t) { return M(t) ? +t : t }, e.push(r), e.push(new $("timeCreated")), e.push(new $("updated")), e.push(new $("md5Hash", null, !0)), e.push(new $("cacheControl", null, !0)), e.push(new $("contentDisposition", null, !0)), e.push(new $("contentEncoding", null, !0)), e.push(new $("contentLanguage", null, !0)), e.push(new $("contentType", null, !0)), e.push(new $("metadata", "customMetadata", !0)), ee = e }

            function re(e, t, r) { for (var n, o, i = { type: "file" }, a = r.length, s = 0; s < a; s++) { var u = r[s];
                    i[u.local] = u.xform(i, t[u.server]) } return n = i, o = e, Object.defineProperty(n, "ref", { get: function() { var e = n.bucket,
                            t = n.fullPath,
                            r = new V(e, t); return o.makeStorageReference(r) } }), i }

            function ne(e, t, r) { var n = X(t); return null === n ? null : re(e, n, r) }

            function oe(o, e) { var t = X(e); if (null === t) return null; if (!q(t.downloadTokens)) return null; var r = t.downloadTokens; if (0 === r.length) return null; var i = encodeURIComponent; return r.split(",").map(function(e) { var t = o.bucket,
                        r = o.fullPath,
                        n = "/b/" + i(t) + "/o/" + i(r); return a + s + n + Q({ alt: "media", token: e }) })[0] }

            function ie(e, t) { for (var r = {}, n = t.length, o = 0; o < n; o++) { var i = t[o];
                    i.writable && (r[i.server] = e[i.local]) } return JSON.stringify(r) }

            function ae(e) { var t; if (!(e && j(e))) throw "Expected Metadata object."; for (var r in e) { var n = e[r]; if ("customMetadata" === r) { if (!j(n)) throw "Expected object for 'customMetadata' mapping." } else if (j(t = n) && null !== t) throw "Mapping for '" + r + "' cannot be an object." } }

            function se(t, e, r) { for (var n = e.length, o = e.length, i = 0; i < e.length; i++)
                    if (e[i].optional) { n = i; break }
                var a, s, u, c, l, p; if (!(n <= r.length && r.length <= o)) throw a = n, s = o, u = t, c = r.length, p = a === s ? 1 === (l = a) ? "argument" : "arguments" : (l = "between " + a + " and " + s, "arguments"), new m(b.INVALID_ARGUMENT_COUNT, "Invalid argument count in `" + u + "`: Expected " + l + " " + p + ", received " + c + "."); for (i = 0; i < r.length; i++) try { e[i].validator(r[i]) } catch (e) { throw e instanceof Error ? h(i, t, e.message) : h(i, t, e) } } var ue = function(t, e) { var r = this;
                this.validator = function(e) { r.optional && !W(e) || t(e) }, this.optional = !!e };

            function ce(e, t) {
                function r(e) { if (!q(e)) throw "Expected string." } var n, o, i; return n = e ? (o = r, i = e, function(e) { o(e), i(e) }) : r, new ue(n, t) }

            function le(e) { return new ue(ae, e) }

            function pe() { return new ue(function(e) { var t; if (!(("number" == typeof(t = e) || t instanceof Number) && 0 <= e)) throw "Expected a number 0 or greater." }) }

            function he(t, e) { return new ue(function(e) { if (!(null === e || M(e) && e instanceof Object)) throw "Expected an Object.";
                    null != t && t(e) }, e) }

            function fe(e) { return new ue(function(e) { if (null !== e && !B(e)) throw "Expected a Function." }, e) }

            function de() { for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t]; var r = "undefined" != typeof BlobBuilder ? BlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : void 0; if (void 0 !== r) { for (var n = new r, o = 0; o < e.length; o++) n.append(e[o]); return n.getBlob() } if (H()) return new Blob(e); throw Error("This browser doesn't seem to support creating Blobs") } var _e = function() {
                function s(e, t) { var r = 0,
                        n = "";
                    F(e) ? (r = (this.data_ = e).size, n = e.type) : e instanceof ArrayBuffer ? (t ? this.data_ = new Uint8Array(e) : (this.data_ = new Uint8Array(e.byteLength), this.data_.set(new Uint8Array(e))), r = this.data_.length) : e instanceof Uint8Array && (t ? this.data_ = e : (this.data_ = new Uint8Array(e.length), this.data_.set(e)), r = e.length), this.size_ = r, this.type_ = n } return s.prototype.size = function() { return this.size_ }, s.prototype.type = function() { return this.type_ }, s.prototype.slice = function(e, t) { if (F(this.data_)) { var r = this.data_,
                            n = (i = e, a = t, (o = r).webkitSlice ? o.webkitSlice(i, a) : o.mozSlice ? o.mozSlice(i, a) : o.slice ? o.slice(i, a) : null); return null === n ? null : new s(n) } var o, i, a; return new s(new Uint8Array(this.data_.buffer, e, t - e), !0) }, s.getBlob = function() { for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t]; if (H()) { var r = e.map(function(e) { return e instanceof s ? e.data_ : e }); return new s(de.apply(null, r)) } var n = e.map(function(e) { return q(e) ? _(f.RAW, e).data : e.data_ }),
                        o = 0;
                    n.forEach(function(e) { o += e.byteLength }); var i = new Uint8Array(o),
                        a = 0; return n.forEach(function(e) { for (var t = 0; t < e.length; t++) i[a++] = e[t] }), new s(i, !0) }, s.prototype.uploadData = function() { return this.data_ }, s }();

            function ve(e, t) { return -1 !== e.indexOf(t) } var me = function(e, t, r, n) { this.url = e, this.method = t, this.handler = r, this.timeout = n, this.urlParams = {}, this.headers = {}, this.body = null, this.errorHandler = null, this.progressCallback = null, this.successCodes = [200], this.additionalRetryCodes = [] };

            function be(e) { if (!e) throw u() }

            function ge(n, o) { return function(e, t) { var r = ne(n, t, o); return be(null !== r), r } }

            function ye(i) { return function(e, t) { var r, n, o; return (r = 401 === e.getStatus() ? new m(b.UNAUTHENTICATED, "User is not authenticated, please authenticate using Firebase Authentication and try again.") : 402 === e.getStatus() ? (o = i.bucket, new m(b.QUOTA_EXCEEDED, "Quota for bucket '" + o + "' exceeded, please view quota on https://firebase.google.com/pricing/.")) : 403 === e.getStatus() ? (n = i.path, new m(b.UNAUTHORIZED, "User does not have permission to access '" + n + "'.")) : t).setServerResponseProp(t.serverResponseProp()), r } }

            function Re(o) { var i = ye(o); return function(e, t) { var r, n = i(e, t); return 404 === e.getStatus() && (r = o.path, n = new m(b.OBJECT_NOT_FOUND, "Object '" + r + "' does not exist.")), n.setServerResponseProp(t.serverResponseProp()), n } }

            function we(e, t, r) { var n = Z(t.fullServerUrl()),
                    o = e.maxOperationRetryTime(),
                    i = new me(n, "GET", ge(e, r), o); return i.errorHandler = Re(t), i }

            function Te(e, t, r) { var n, o, i = Z(t.fullServerUrl()),
                    a = e.maxOperationRetryTime(),
                    s = new me(i, "GET", (n = e, o = r, function(e, t) { var r = ne(n, t, o); return be(null !== r), oe(r, t) }), a); return s.errorHandler = Re(t), s }

            function Ee(e, t, r) { var n, o, i = P(r); return i.fullPath = e.path, i.size = t.size(), i.contentType || (i.contentType = (o = t, (n = null) && n.contentType || o && o.type() || "application/octet-stream")), i } var Oe = function(e, t, r, n) { this.current = e, this.total = t, this.finalized = !!r, this.metadata = n || null };

            function Ue(e, t) { var r; try { r = e.getResponseHeader("X-Goog-Upload-Status") } catch (e) { be(!1) } return be(ve(t || ["active"], r)), r }

            function ke(e, a, t, s, r, u, n, o) { var c = new Oe(0, 0); if (c.total = n ? (c.current = n.current, n.total) : (c.current = 0, s.size()), s.size() !== c.total) throw new m(b.SERVER_FILE_WRONG_SIZE, "Server recorded incorrect upload file size, please retry the upload."); var i = c.total - c.current,
                    l = i;
                0 < r && (l = Math.min(l, r)); var p = c.current,
                    h = p + l,
                    f = { "X-Goog-Upload-Command": l === i ? "upload, finalize" : "upload", "X-Goog-Upload-Offset": c.current },
                    d = s.slice(p, h); if (null === d) throw g(); var _ = a.maxUploadRetryTime(),
                    v = new me(t, "POST", function(e, t) { var r, n = Ue(e, ["active", "final"]),
                            o = c.current + l,
                            i = s.size(); return r = "final" === n ? ge(a, u)(e, t) : null, new Oe(o, i, "final" === n, r) }, _); return v.headers = f, v.body = d.uploadData(), v.progressCallback = o || null, v.errorHandler = ye(e), v } var Ae = function(e, t, r) { if (B(e) || M(t) || M(r)) this.next = e, this.error = t || null, this.complete = r || null;
                    else { var n = e;
                        this.next = n.next || null, this.error = n.error || null, this.complete = n.complete || null } },
                Ce = function(e, t, r, n, o, i) { this.bytesTransferred = e, this.totalBytes = t, this.state = r, this.metadata = n, this.task = o, this.ref = i };

            function Se(r) { return function() { for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    D(!0).then(function() { r.apply(null, e) }) } } var Ne = function() {
                    function e(e, t, r, n, o, i) { void 0 === i && (i = null); var a = this;
                        this.transferred_ = 0, this.needToFetchStatus_ = !1, this.needToFetchMetadata_ = !1, this.observers_ = [], this.error_ = null, this.uploadUrl_ = null, this.request_ = null, this.chunkMultiplier_ = 1, this.resolve_ = null, this.reject_ = null, this.ref_ = e, this.authWrapper_ = t, this.location_ = r, this.blob_ = o, this.metadata_ = i, this.mappings_ = n, this.resumable_ = this.shouldDoResumable_(this.blob_), this.state_ = E, this.errorHandler_ = function(e) { a.request_ = null, a.chunkMultiplier_ = 1, e.codeEquals(b.CANCELED) ? (a.needToFetchStatus_ = !0, a.completeTransitions_()) : (a.error_ = e, a.transition_(S)) }, this.metadataErrorHandler_ = function(e) { a.request_ = null, e.codeEquals(b.CANCELED) ? a.completeTransitions_() : (a.error_ = e, a.transition_(S)) }, this.promise_ = I(function(e, t) { a.resolve_ = e, a.reject_ = t, a.start_() }), this.promise_.then(null, function() {}) } return e.prototype.makeProgressCallback_ = function() { var r = this,
                            n = this.transferred_; return function(e, t) { r.updateProgress_(n + e) } }, e.prototype.shouldDoResumable_ = function(e) { return 262144 < e.size() }, e.prototype.start_ = function() { this.state_ === E && null === this.request_ && (this.resumable_ ? null === this.uploadUrl_ ? this.createResumable_() : this.needToFetchStatus_ ? this.fetchStatus_() : this.needToFetchMetadata_ ? this.fetchMetadata_() : this.continueUpload_() : this.oneShotUpload_()) }, e.prototype.resolveToken_ = function(t) { var r = this;
                        this.authWrapper_.getAuthToken().then(function(e) { switch (r.state_) {
                                case E:
                                    t(e); break;
                                case A:
                                    r.transition_(C); break;
                                case O:
                                    r.transition_(U) } }) }, e.prototype.createResumable_ = function() { var v = this;
                        this.resolveToken_(function(e) { var t, r, n, o, i, a, s, u, c, l, p, h, f, d = (t = v.authWrapper_, r = v.location_, n = v.mappings_, o = v.blob_, i = v.metadata_, a = r.bucketOnlyServerUrl(), s = Ee(r, o, i), u = { name: s.fullPath }, c = J(a), l = { "X-Goog-Upload-Protocol": "resumable", "X-Goog-Upload-Command": "start", "X-Goog-Upload-Header-Content-Length": o.size(), "X-Goog-Upload-Header-Content-Type": s.contentType, "Content-Type": "application/json; charset=utf-8" }, p = ie(s, n), h = t.maxUploadRetryTime(), (f = new me(c, "POST", function(e, t) { var r;
                                    Ue(e); try { r = e.getResponseHeader("X-Goog-Upload-URL") } catch (e) { be(!1) } return be(q(r)), r }, h)).urlParams = u, f.headers = l, f.body = p, f.errorHandler = ye(r), f),
                                _ = v.authWrapper_.makeRequest(d, e);
                            (v.request_ = _).getPromise().then(function(e) { v.request_ = null, v.uploadUrl_ = e, v.needToFetchStatus_ = !1, v.completeTransitions_() }, v.errorHandler_) }) }, e.prototype.fetchStatus_ = function() { var c = this,
                            l = this.uploadUrl_;
                        this.resolveToken_(function(e) { var t, r, n, i, o, a, s = (t = c.authWrapper_, r = c.location_, n = l, i = c.blob_, o = t.maxUploadRetryTime(), (a = new me(n, "POST", function(e, t) { var r, n = Ue(e, ["active", "final"]); try { r = e.getResponseHeader("X-Goog-Upload-Size-Received") } catch (e) { be(!1) } var o = parseInt(r, 10); return be(!isNaN(o)), new Oe(o, i.size(), "final" === n) }, o)).headers = { "X-Goog-Upload-Command": "query" }, a.errorHandler = ye(r), a),
                                u = c.authWrapper_.makeRequest(s, e);
                            (c.request_ = u).getPromise().then(function(e) { e = e, c.request_ = null, c.updateProgress_(e.current), c.needToFetchStatus_ = !1, e.finalized && (c.needToFetchMetadata_ = !0), c.completeTransitions_() }, c.errorHandler_) }) }, e.prototype.continueUpload_ = function() { var n = this,
                            o = 262144 * this.chunkMultiplier_,
                            i = new Oe(this.transferred_, this.blob_.size()),
                            a = this.uploadUrl_;
                        this.resolveToken_(function(e) { var t; try { t = ke(n.location_, n.authWrapper_, a, n.blob_, o, n.mappings_, i, n.makeProgressCallback_()) } catch (e) { return n.error_ = e, void n.transition_(S) } var r = n.authWrapper_.makeRequest(t, e);
                            (n.request_ = r).getPromise().then(function(e) { n.increaseMultiplier_(), n.request_ = null, n.updateProgress_(e.current), e.finalized ? (n.metadata_ = e.metadata, n.transition_(k)) : n.completeTransitions_() }, n.errorHandler_) }) }, e.prototype.increaseMultiplier_ = function() { 262144 * this.chunkMultiplier_ < 33554432 && (this.chunkMultiplier_ *= 2) }, e.prototype.fetchMetadata_ = function() { var n = this;
                        this.resolveToken_(function(e) { var t = we(n.authWrapper_, n.location_, n.mappings_),
                                r = n.authWrapper_.makeRequest(t, e);
                            (n.request_ = r).getPromise().then(function(e) { n.request_ = null, n.metadata_ = e, n.transition_(k) }, n.metadataErrorHandler_) }) }, e.prototype.oneShotUpload_ = function() { var n = this;
                        this.resolveToken_(function(e) { var t = function(e, t, r, n, o) { var i = t.bucketOnlyServerUrl(),
                                        a = { "X-Goog-Upload-Protocol": "multipart" },
                                        s = function() { for (var e = "", t = 0; t < 2; t++) e += Math.random().toString().slice(2); return e }();
                                    a["Content-Type"] = "multipart/related; boundary=" + s; var u = Ee(t, n, o),
                                        c = "--" + s + "\r\nContent-Type: application/json; charset=utf-8\r\n\r\n" + ie(u, r) + "\r\n--" + s + "\r\nContent-Type: " + u.contentType + "\r\n\r\n",
                                        l = "\r\n--" + s + "--",
                                        p = _e.getBlob(c, n, l); if (null === p) throw g(); var h = { name: u.fullPath },
                                        f = J(i),
                                        d = e.maxUploadRetryTime(),
                                        _ = new me(f, "POST", ge(e, r), d); return _.urlParams = h, _.headers = a, _.body = p.uploadData(), _.errorHandler = ye(t), _ }(n.authWrapper_, n.location_, n.mappings_, n.blob_, n.metadata_),
                                r = n.authWrapper_.makeRequest(t, e);
                            (n.request_ = r).getPromise().then(function(e) { n.request_ = null, n.metadata_ = e, n.updateProgress_(n.blob_.size()), n.transition_(k) }, n.errorHandler_) }) }, e.prototype.updateProgress_ = function(e) { var t = this.transferred_;
                        this.transferred_ = e, this.transferred_ !== t && this.notifyObservers_() }, e.prototype.transition_ = function(e) { if (this.state_ !== e) switch (e) {
                            case A:
                            case O:
                                this.state_ = e, null !== this.request_ && this.request_.cancel(); break;
                            case E:
                                var t = this.state_ === U;
                                this.state_ = e, t && (this.notifyObservers_(), this.start_()); break;
                            case U:
                                this.state_ = e, this.notifyObservers_(); break;
                            case C:
                                this.error_ = c(), this.state_ = e, this.notifyObservers_(); break;
                            case S:
                            case k:
                                this.state_ = e, this.notifyObservers_() } }, e.prototype.completeTransitions_ = function() { switch (this.state_) {
                            case O:
                                this.transition_(U); break;
                            case A:
                                this.transition_(C); break;
                            case E:
                                this.start_() } }, Object.defineProperty(e.prototype, "snapshot", { get: function() { var e = x(this.state_); return new Ce(this.transferred_, this.blob_.size(), e, this.metadata_, this, this.ref_) }, enumerable: !0, configurable: !0 }), e.prototype.on = function(t, e, r, i) { void 0 === e && (e = void 0), void 0 === r && (r = void 0), void 0 === i && (i = void 0); var n = "Expected a function or an Object with one of `next`, `error`, `complete` properties.",
                            o = fe(!0).validator,
                            a = he(null, !0).validator;

                        function s(e) { try { return void o(e) } catch (e) {} try { if (a(e), !(W(e.next) || W(e.error) || W(e.complete))) throw ""; return } catch (e) { throw n } }
                        se("on", [ce(function(e) { if (t !== T.STATE_CHANGED) throw "Expected one of the event types: [" + T.STATE_CHANGED + "]." }), he(s, !0), fe(!0), fe(!0)], arguments); var u = this;

                        function c(o) { return function(e, t, r) { null !== o && se("on", o, arguments); var n = new Ae(e, t, i); return u.addObserver_(n),
                                    function() { u.removeObserver_(n) } } } var l = [he(function(e) { if (null === e) throw n;
                            s(e) }), fe(!0), fe(!0)]; return !(W(e) || W(r) || W(i)) ? c(l) : c(null)(e, r, i) }, e.prototype.then = function(e, t) { return this.promise_.then(e, t) }, e.prototype.catch = function(e) { return this.then(null, e) }, e.prototype.addObserver_ = function(e) { this.observers_.push(e), this.notifyObserver_(e) }, e.prototype.removeObserver_ = function(e) { var t, r, n;
                        t = this.observers_, r = e, -1 !== (n = t.indexOf(r)) && t.splice(n, 1) }, e.prototype.notifyObservers_ = function() { var e, t = this;
                        this.finishPromise_(), (e = this.observers_, Array.prototype.slice.call(e)).forEach(function(e) { t.notifyObserver_(e) }) }, e.prototype.finishPromise_ = function() { if (null !== this.resolve_) { var e = !0; switch (x(this.state_)) {
                                case N.SUCCESS:
                                    Se(this.resolve_.bind(null, this.snapshot))(); break;
                                case N.CANCELED:
                                case N.ERROR:
                                    Se(this.reject_.bind(null, this.error_))(); break;
                                default:
                                    e = !1 }
                            e && (this.resolve_ = null, this.reject_ = null) } }, e.prototype.notifyObserver_ = function(e) { switch (x(this.state_)) {
                            case N.RUNNING:
                            case N.PAUSED:
                                null !== e.next && Se(e.next.bind(e, this.snapshot))(); break;
                            case N.SUCCESS:
                                null !== e.complete && Se(e.complete.bind(e))(); break;
                            case N.CANCELED:
                            case N.ERROR:
                                null !== e.error && Se(e.error.bind(e, this.error_))(); break;
                            default:
                                null !== e.error && Se(e.error.bind(e, this.error_))() } }, e.prototype.resume = function() { se("resume", [], arguments); var e = this.state_ === U || this.state_ === O; return e && this.transition_(E), e }, e.prototype.pause = function() { se("pause", [], arguments); var e = this.state_ === E; return e && this.transition_(O), e }, e.prototype.cancel = function() { se("cancel", [], arguments); var e = this.state_ === E || this.state_ === O; return e && this.transition_(A), e }, e }(),
                xe = function() {
                    function r(e, t) { this.authWrapper = e, this.location = t instanceof V ? t : V.makeFromUrl(t) } return r.prototype.toString = function() { return se("toString", [], arguments), "gs://" + this.location.bucket + "/" + this.location.path }, r.prototype.newRef = function(e, t) { return new r(e, t) }, r.prototype.mappings = function() { return te() }, r.prototype.child = function(e) { se("child", [ce()], arguments); var t, r, n = (t = this.location.path, r = e.split("/").filter(function(e) { return 0 < e.length }).join("/"), 0 === t.length ? r : t + "/" + r),
                            o = new V(this.location.bucket, n); return this.newRef(this.authWrapper, o) }, Object.defineProperty(r.prototype, "parent", { get: function() { var e = function(e) { if (0 == e.length) return null; var t = e.lastIndexOf("/"); return -1 === t ? "" : e.slice(0, t) }(this.location.path); if (null === e) return null; var t = new V(this.location.bucket, e); return this.newRef(this.authWrapper, t) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "root", { get: function() { var e = new V(this.location.bucket, ""); return this.newRef(this.authWrapper, e) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "bucket", { get: function() { return this.location.bucket }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "fullPath", { get: function() { return this.location.path }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "name", { get: function() { return K(this.location.path) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "storage", { get: function() { return this.authWrapper.service() }, enumerable: !0, configurable: !0 }), r.prototype.put = function(e, t) { return void 0 === t && (t = null), se("put", [new ue(function(e) { if (!(e instanceof Uint8Array || e instanceof ArrayBuffer || H() && e instanceof Blob)) throw "Expected Blob or File." }), le(!0)], arguments), this.throwIfRoot_("put"), new Ne(this, this.authWrapper, this.location, this.mappings(), new _e(e), t) }, r.prototype.putString = function(e, t, r) { void 0 === t && (t = f.RAW), se("putString", [ce(), ce(d, !0), le(!0)], arguments), this.throwIfRoot_("putString"); var n = _(t, e),
                            o = P(r); return !M(o.contentType) && M(n.contentType) && (o.contentType = n.contentType), new Ne(this, this.authWrapper, this.location, this.mappings(), new _e(n.data, !0), o) }, r.prototype.delete = function() { se("delete", [], arguments), this.throwIfRoot_("delete"); var s = this; return this.authWrapper.getAuthToken().then(function(e) { var t, r, n, o, i, a = (t = s.authWrapper, r = s.location, n = Z(r.fullServerUrl()), o = t.maxOperationRetryTime(), (i = new me(n, "DELETE", function(e, t) {}, o)).successCodes = [200, 204], i.errorHandler = Re(r), i); return s.authWrapper.makeRequest(a, e).getPromise() }) }, r.prototype.getMetadata = function() { se("getMetadata", [], arguments), this.throwIfRoot_("getMetadata"); var r = this; return this.authWrapper.getAuthToken().then(function(e) { var t = we(r.authWrapper, r.location, r.mappings()); return r.authWrapper.makeRequest(t, e).getPromise() }) }, r.prototype.updateMetadata = function(l) { se("updateMetadata", [le()], arguments), this.throwIfRoot_("updateMetadata"); var p = this; return this.authWrapper.getAuthToken().then(function(e) { var t, r, n, o, i, a, s, u, c = (t = p.authWrapper, r = p.location, n = l, o = p.mappings(), i = Z(r.fullServerUrl()), a = ie(n, o), s = t.maxOperationRetryTime(), (u = new me(i, "PATCH", ge(t, o), s)).headers = { "Content-Type": "application/json; charset=utf-8" }, u.body = a, u.errorHandler = Re(r), u); return p.authWrapper.makeRequest(c, e).getPromise() }) }, r.prototype.getDownloadURL = function() { se("getDownloadURL", [], arguments), this.throwIfRoot_("getDownloadURL"); var r = this; return this.authWrapper.getAuthToken().then(function(e) { var t = Te(r.authWrapper, r.location, r.mappings()); return r.authWrapper.makeRequest(t, e).getPromise().then(function(e) { if (null === e) throw new m(b.NO_DOWNLOAD_URL, "The given file does not have any download URLs."); return e }) }) }, r.prototype.throwIfRoot_ = function(e) { if ("" === this.location.path) throw t = e, new m(b.INVALID_ROOT_OPERATION, "The operation '" + t + "' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png')."); var t }, r }(),
                Le = function() {
                    function e(e) { var t;
                        this.promise_ = (t = e, Promise.reject(t)) } return e.prototype.getPromise = function() { return this.promise_ }, e.prototype.cancel = function(e) { void 0 === e && (e = !1) }, e }(),
                Pe = function() {
                    function e() { this.map_ = {}, this.id_ = -9007199254740991 } return e.prototype.addRequest = function(e) { var t = this.id_;
                        this.id_++, this.map_[t] = e; var r = this;

                        function n() { delete r.map_[t] }
                        e.getPromise().then(n, n) }, e.prototype.clear = function() { L(this.map_, function(e, t) { t && t.cancel(!0) }), this.map_ = {} }, e }(),
                Ie = function() {
                    function a(e, t, r, n, o) { if (this.bucket_ = null, this.deleted_ = !1, this.app_ = e, null !== this.app_) { var i = this.app_.options;
                            M(i) && (this.bucket_ = a.extractBucket_(i)) }
                        this.storageRefMaker_ = t, this.requestMaker_ = r, this.pool_ = o, this.service_ = n, this.maxOperationRetryTime_ = 12e4, this.maxUploadRetryTime_ = 6e4, this.requestMap_ = new Pe } return a.extractBucket_ = function(e) { var t = e.storageBucket || null; return null == t ? null : V.makeFromBucketSpec(t).bucket }, a.prototype.getAuthToken = function() { return null !== this.app_ && M(this.app_.INTERNAL) && M(this.app_.INTERNAL.getToken) ? this.app_.INTERNAL.getToken().then(function(e) { return null !== e ? e.accessToken : null }, function(e) { return null }) : D(null) }, a.prototype.bucket = function() { if (this.deleted_) throw l(); return this.bucket_ }, a.prototype.service = function() { return this.service_ }, a.prototype.makeStorageReference = function(e) { return this.storageRefMaker_(this, e) }, a.prototype.makeRequest = function(e, t) { if (this.deleted_) return new Le(l()); var r = this.requestMaker_(e, t, this.pool_); return this.requestMap_.addRequest(r), r }, a.prototype.deleteApp = function() { this.deleted_ = !0, this.app_ = null, this.requestMap_.clear() }, a.prototype.maxUploadRetryTime = function() { return this.maxUploadRetryTime_ }, a.prototype.setMaxUploadRetryTime = function(e) { this.maxUploadRetryTime_ = e }, a.prototype.maxOperationRetryTime = function() { return this.maxOperationRetryTime_ }, a.prototype.setMaxOperationRetryTime = function(e) { this.maxOperationRetryTime_ = e }, a }(); var De = function() {
                    function e(e, t, r, n, o, i, a, s, u, c, l) { this.pendingXhr_ = null, this.backoffId_ = null, this.resolve_ = null, this.reject_ = null, this.canceled_ = !1, this.appDelete_ = !1, this.url_ = e, this.method_ = t, this.headers_ = r, this.body_ = n, this.successCodes_ = o.slice(), this.additionalRetryCodes_ = i.slice(), this.callback_ = a, this.errorCallback_ = s, this.progressCallback_ = c, this.timeout_ = u, this.pool_ = l; var p = this;
                        this.promise_ = I(function(e, t) { p.resolve_ = e, p.reject_ = t, p.start_() }) } return e.prototype.start_ = function() { var s = this;

                        function e(e, t) { var r, n = s.resolve_,
                                o = s.reject_,
                                i = t.xhr; if (t.wasSuccessCode) try { var a = s.callback_(i, i.getResponseText());
                                W(a) ? n(a) : n() } catch (e) { o(e) } else null !== i ? ((r = u()).setServerResponseProp(i.getResponseText()), s.errorCallback_ ? o(s.errorCallback_(i, r)) : o(r)) : t.canceled ? o(r = s.appDelete_ ? l() : c()) : o(r = new m(b.RETRY_LIMIT_EXCEEDED, "Max retry time for operation exceeded, please try again.")) }
                        this.canceled_ ? e(0, new Me(!1, null, !0)) : this.backoffId_ = function(t, e, r) { var n = 1,
                                o = null,
                                i = !1,
                                a = 0;

                            function s() { return 2 === a } var u = !1;

                            function c() { u || (u = !0, e.apply(null, arguments)) }

                            function l(e) { o = setTimeout(function() { o = null, t(p, s()) }, e) }

                            function p(e) { for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
                                u || (e ? c.apply(null, arguments) : s() || i ? c.apply(null, arguments) : (n < 64 && (n *= 2), l(1 === a ? (a = 2, 0) : 1e3 * (n + Math.random())))) } var h = !1;

                            function f(e) { h || (h = !0, u || (null !== o ? (e || (a = 2), clearTimeout(o), l(0)) : e || (a = 1))) } return l(0), setTimeout(function() { f(i = !0) }, r), f }(function(i, e) { if (e) i(!1, new Me(!1, null, !0));
                            else { var t = s.pool_.createXhrIo();
                                s.pendingXhr_ = t, null !== s.progressCallback_ && t.addUploadProgressListener(a), t.send(s.url_, s.method_, s.body_, s.headers_).then(function(e) { null !== s.progressCallback_ && e.removeUploadProgressListener(a), s.pendingXhr_ = null; var t = (e = e).getErrorCode() === w.NO_ERROR,
                                        r = e.getStatus(); if (t && !s.isRetryStatusCode_(r)) { var n = ve(s.successCodes_, r);
                                        i(!0, new Me(n, e)) } else { var o = e.getErrorCode() === w.ABORT;
                                        i(!1, new Me(!1, null, o)) } }) }

                            function a(e) { var t = e.loaded,
                                    r = e.lengthComputable ? e.total : -1;
                                null !== s.progressCallback_ && s.progressCallback_(t, r) } }, e, this.timeout_) }, e.prototype.getPromise = function() { return this.promise_ }, e.prototype.cancel = function(e) { this.canceled_ = !0, this.appDelete_ = e || !1, null !== this.backoffId_ && (0, this.backoffId_)(!1), null !== this.pendingXhr_ && this.pendingXhr_.abort() }, e.prototype.isRetryStatusCode_ = function(e) { var t = 500 <= e && e < 600,
                            r = ve([408, 429], e),
                            n = ve(this.additionalRetryCodes_, e); return t || r || n }, e }(),
                Me = function(e, t, r) { this.wasSuccessCode = e, this.xhr = t, this.canceled = !!r };

            function We(e, t, r) { var n, o, i, a, s = Q(e.urlParams),
                    u = e.url + s,
                    c = P(e.headers); return n = c, null !== (o = t) && 0 < o.length && (n.Authorization = "Firebase " + o), i = c, a = void 0 !== He ? He.SDK_VERSION : "AppManager", i["X-Firebase-Storage-Version"] = "webjs/" + a, new De(u, e.method, c, e.body, e.successCodes, e.additionalRetryCodes, e.handler, e.errorHandler, e.timeout, e.progressCallback, r) } var Be, je = function() {
                    function e(e, t, r) { if (this.bucket_ = null, this.authWrapper_ = new Ie(e, function(e, t) { return new xe(e, t) }, We, this, t), this.app_ = e, null != r) this.bucket_ = V.makeFromBucketSpec(r);
                        else { var n = this.authWrapper_.bucket();
                            null != n && (this.bucket_ = new V(n, "")) }
                        this.internals_ = new qe(this) } return e.prototype.ref = function(e) { if (se("ref", [ce(function(e) { if (/^[A-Za-z]+:\/\//.test(e)) throw "Expected child path but got a URL, use refFromURL instead." }, !0)], arguments), null == this.bucket_) throw new Error("No Storage Bucket defined in Firebase Options."); var t = new xe(this.authWrapper_, this.bucket_); return null != e ? t.child(e) : t }, e.prototype.refFromURL = function(e) { return se("refFromURL", [ce(function(e) { if (!/^[A-Za-z]+:\/\//.test(e)) throw "Expected full URL but got a child path, use ref instead."; try { V.makeFromUrl(e) } catch (e) { throw "Expected valid full URL but got an invalid one." } }, !1)], arguments), new xe(this.authWrapper_, e) }, Object.defineProperty(e.prototype, "maxUploadRetryTime", { get: function() { return this.authWrapper_.maxUploadRetryTime() }, enumerable: !0, configurable: !0 }), e.prototype.setMaxUploadRetryTime = function(e) { se("setMaxUploadRetryTime", [pe()], arguments), this.authWrapper_.setMaxUploadRetryTime(e) }, Object.defineProperty(e.prototype, "maxOperationRetryTime", { get: function() { return this.authWrapper_.maxOperationRetryTime() }, enumerable: !0, configurable: !0 }), e.prototype.setMaxOperationRetryTime = function(e) { se("setMaxOperationRetryTime", [pe()], arguments), this.authWrapper_.setMaxOperationRetryTime(e) }, Object.defineProperty(e.prototype, "app", { get: function() { return this.app_ }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "INTERNAL", { get: function() { return this.internals_ }, enumerable: !0, configurable: !0 }), e }(),
                qe = function() {
                    function e(e) { this.service_ = e } return e.prototype.delete = function() { return this.service_.authWrapper_.deleteApp(), D(void 0) }, e }();

            function Fe(e, t, r) { return new je(e, new G, r) }
            Be = { TaskState: N, TaskEvent: T, StringFormat: f, Storage: je, Reference: xe }, He.INTERNAL.registerService("storage", Fe, Be, void 0, !0) }).apply(this, arguments) } catch (e) { throw console.error(e), new Error("Cannot instantiate firebase-storage - be sure to load firebase-app.js first.") } });
//# sourceMappingURL=firebase-storage.js.map