define(function(require, exports, module) {
	require("./binaryajax");
	var a = {};
	! function() {
		function b(a, b, c) {
			a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
		}

		function c(a) {
			return !!a.exifdata
		}

		function d(a, b) {
			BinaryAjax(a.src, function(c) {
				var d = e(c.binaryResponse);
				a.exifdata = d || {}, b && b()
			})
		}

		function e(a) {
			if(255 != a.getByteAt(0) || 216 != a.getByteAt(1)) return !1;
			for(var b = 2, c = a.getLength(); c > b;) {
				if(255 != a.getByteAt(b)) return j && console.log("Not a valid marker at offset " + b + ", found: " + a.getByteAt(b)), !1;
				var d = a.getByteAt(b + 1);
				if(22400 == d) return j && console.log("Found 0xFFE1 marker"), h(a, b + 4, a.getShortAt(b + 2, !0) - 2);
				if(225 == d) return j && console.log("Found 0xFFE1 marker"), h(a, b + 4, a.getShortAt(b + 2, !0) - 2);
				b += 2 + a.getShortAt(b + 2, !0)
			}
		}

		function f(a, b, c, d, e) {
			for(var f = a.getShortAt(c, e), h = {}, i = 0; f > i; i++) {
				var k = c + 12 * i + 2,
					l = d[a.getShortAt(k, e)];
				!l && j && console.log("Unknown tag: " + a.getShortAt(k, e)), h[l] = g(a, k, b, c, e)
			}
			return h
		}

		function g(a, b, c, d, e) {
			var f = a.getShortAt(b + 2, e),
				g = a.getLongAt(b + 4, e),
				h = a.getLongAt(b + 8, e) + c;
			switch(f) {
				case 1:
				case 7:
					if(1 == g) return a.getByteAt(b + 8, e);
					for(var i = g > 4 ? h : b + 8, j = [], k = 0; g > k; k++) j[k] = a.getByteAt(i + k);
					return j;
				case 2:
					var l = g > 4 ? h : b + 8;
					return a.getStringAt(l, g - 1);
				case 3:
					if(1 == g) return a.getShortAt(b + 8, e);
					for(var i = g > 2 ? h : b + 8, j = [], k = 0; g > k; k++) j[k] = a.getShortAt(i + 2 * k, e);
					return j;
				case 4:
					if(1 == g) return a.getLongAt(b + 8, e);
					for(var j = [], k = 0; g > k; k++) j[k] = a.getLongAt(h + 4 * k, e);
					return j;
				case 5:
					if(1 == g) return a.getLongAt(h, e) / a.getLongAt(h + 4, e);
					for(var j = [], k = 0; g > k; k++) j[k] = a.getLongAt(h + 8 * k, e) / a.getLongAt(h + 4 + 8 * k, e);
					return j;
				case 9:
					if(1 == g) return a.getSLongAt(b + 8, e);
					for(var j = [], k = 0; g > k; k++) j[k] = a.getSLongAt(h + 4 * k, e);
					return j;
				case 10:
					if(1 == g) return a.getSLongAt(h, e) / a.getSLongAt(h + 4, e);
					for(var j = [], k = 0; g > k; k++) j[k] = a.getSLongAt(h + 8 * k, e) / a.getSLongAt(h + 4 + 8 * k, e);
					return j
			}
		}

		function h(b, c, d) {
			if("Exif" != b.getStringAt(c, 4)) return j && console.log("Not valid EXIF data! " + b.getStringAt(c, 4)), !1;
			var e, g = c + 6;
			if(18761 == b.getShortAt(g)) e = !1;
			else {
				if(19789 != b.getShortAt(g)) return j && console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"), !1;
				e = !0
			}
			if(42 != b.getShortAt(g + 2, e)) return j && console.log("Not valid TIFF data! (no 0x002A)"), !1;
			if(8 != b.getLongAt(g + 4, e)) return j && console.log("Not valid TIFF data! (First offset not 8)", b.getShortAt(g + 4, e)), !1;
			var h = f(b, g, g + 8, a.TiffTags, e);
			if(h.ExifIFDPointer) {
				var i = f(b, g, g + h.ExifIFDPointer, a.Tags, e);
				for(var k in i) {
					switch(k) {
						case "LightSource":
						case "Flash":
						case "MeteringMode":
						case "ExposureProgram":
						case "SensingMethod":
						case "SceneCaptureType":
						case "SceneType":
						case "CustomRendered":
						case "WhiteBalance":
						case "GainControl":
						case "Contrast":
						case "Saturation":
						case "Sharpness":
						case "SubjectDistanceRange":
						case "FileSource":
							i[k] = a.StringValues[k][i[k]];
							break;
						case "ExifVersion":
						case "FlashpixVersion":
							i[k] = String.fromCharCode(i[k][0], i[k][1], i[k][2], i[k][3]);
							break;
						case "ComponentsConfiguration":
							i[k] = a.StringValues.Components[i[k][0]] + a.StringValues.Components[i[k][1]] + a.StringValues.Components[i[k][2]] + a.StringValues.Components[i[k][3]]
					}
					h[k] = i[k]
				}
			}
			if(h.GPSInfoIFDPointer) {
				var l = f(b, g, g + h.GPSInfoIFDPointer, a.GPSTags, e);
				for(var k in l) {
					switch(k) {
						case "GPSVersionID":
							l[k] = l[k][0] + "." + l[k][1] + "." + l[k][2] + "." + l[k][3]
					}
					h[k] = l[k]
				}
			}
			return h
		}

		function i() {
			for(var c = document.getElementsByTagName("img"), d = 0; d < c.length; d++) "true" == c[d].getAttribute("exif") && (c[d].complete ? a.getData(c[d]) : b(c[d], "load", function() {
				a.getData(this)
			}))
		}
		var j = !1;
		a.Tags = {
			36864: "ExifVersion",
			40960: "FlashpixVersion",
			40961: "ColorSpace",
			40962: "PixelXDimension",
			40963: "PixelYDimension",
			37121: "ComponentsConfiguration",
			37122: "CompressedBitsPerPixel",
			37500: "MakerNote",
			37510: "UserComment",
			40964: "RelatedSoundFile",
			36867: "DateTimeOriginal",
			36868: "DateTimeDigitized",
			37520: "SubsecTime",
			37521: "SubsecTimeOriginal",
			37522: "SubsecTimeDigitized",
			33434: "ExposureTime",
			33437: "FNumber",
			34850: "ExposureProgram",
			34852: "SpectralSensitivity",
			34855: "ISOSpeedRatings",
			34856: "OECF",
			37377: "ShutterSpeedValue",
			37378: "ApertureValue",
			37379: "BrightnessValue",
			37380: "ExposureBias",
			37381: "MaxApertureValue",
			37382: "SubjectDistance",
			37383: "MeteringMode",
			37384: "LightSource",
			37385: "Flash",
			37396: "SubjectArea",
			37386: "FocalLength",
			41483: "FlashEnergy",
			41484: "SpatialFrequencyResponse",
			41486: "FocalPlaneXResolution",
			41487: "FocalPlaneYResolution",
			41488: "FocalPlaneResolutionUnit",
			41492: "SubjectLocation",
			41493: "ExposureIndex",
			41495: "SensingMethod",
			41728: "FileSource",
			41729: "SceneType",
			41730: "CFAPattern",
			41985: "CustomRendered",
			41986: "ExposureMode",
			41987: "WhiteBalance",
			41988: "DigitalZoomRation",
			41989: "FocalLengthIn35mmFilm",
			41990: "SceneCaptureType",
			41991: "GainControl",
			41992: "Contrast",
			41993: "Saturation",
			41994: "Sharpness",
			41995: "DeviceSettingDescription",
			41996: "SubjectDistanceRange",
			40965: "InteroperabilityIFDPointer",
			42016: "ImageUniqueID"
		}, a.TiffTags = {
			256: "ImageWidth",
			257: "ImageHeight",
			34665: "ExifIFDPointer",
			34853: "GPSInfoIFDPointer",
			40965: "InteroperabilityIFDPointer",
			258: "BitsPerSample",
			259: "Compression",
			262: "PhotometricInterpretation",
			274: "Orientation",
			277: "SamplesPerPixel",
			284: "PlanarConfiguration",
			530: "YCbCrSubSampling",
			531: "YCbCrPositioning",
			282: "XResolution",
			283: "YResolution",
			296: "ResolutionUnit",
			273: "StripOffsets",
			278: "RowsPerStrip",
			279: "StripByteCounts",
			513: "JPEGInterchangeFormat",
			514: "JPEGInterchangeFormatLength",
			301: "TransferFunction",
			318: "WhitePoint",
			319: "PrimaryChromaticities",
			529: "YCbCrCoefficients",
			532: "ReferenceBlackWhite",
			306: "DateTime",
			270: "ImageDescription",
			271: "Make",
			272: "Model",
			305: "Software",
			315: "Artist",
			33432: "Copyright"
		}, a.GPSTags = {
			0: "GPSVersionID",
			1: "GPSLatitudeRef",
			2: "GPSLatitude",
			3: "GPSLongitudeRef",
			4: "GPSLongitude",
			5: "GPSAltitudeRef",
			6: "GPSAltitude",
			7: "GPSTimeStamp",
			8: "GPSSatellites",
			9: "GPSStatus",
			10: "GPSMeasureMode",
			11: "GPSDOP",
			12: "GPSSpeedRef",
			13: "GPSSpeed",
			14: "GPSTrackRef",
			15: "GPSTrack",
			16: "GPSImgDirectionRef",
			17: "GPSImgDirection",
			18: "GPSMapDatum",
			19: "GPSDestLatitudeRef",
			20: "GPSDestLatitude",
			21: "GPSDestLongitudeRef",
			22: "GPSDestLongitude",
			23: "GPSDestBearingRef",
			24: "GPSDestBearing",
			25: "GPSDestDistanceRef",
			26: "GPSDestDistance",
			27: "GPSProcessingMethod",
			28: "GPSAreaInformation",
			29: "GPSDateStamp",
			30: "GPSDifferential"
		}, a.StringValues = {
			ExposureProgram: {
				0: "Not defined",
				1: "Manual",
				2: "Normal program",
				3: "Aperture priority",
				4: "Shutter priority",
				5: "Creative program",
				6: "Action program",
				7: "Portrait mode",
				8: "Landscape mode"
			},
			MeteringMode: {
				0: "Unknown",
				1: "Average",
				2: "CenterWeightedAverage",
				3: "Spot",
				4: "MultiSpot",
				5: "Pattern",
				6: "Partial",
				255: "Other"
			},
			LightSource: {
				0: "Unknown",
				1: "Daylight",
				2: "Fluorescent",
				3: "Tungsten (incandescent light)",
				4: "Flash",
				9: "Fine weather",
				10: "Cloudy weather",
				11: "Shade",
				12: "Daylight fluorescent (D 5700 - 7100K)",
				13: "Day white fluorescent (N 4600 - 5400K)",
				14: "Cool white fluorescent (W 3900 - 4500K)",
				15: "White fluorescent (WW 3200 - 3700K)",
				17: "Standard light A",
				18: "Standard light B",
				19: "Standard light C",
				20: "D55",
				21: "D65",
				22: "D75",
				23: "D50",
				24: "ISO studio tungsten",
				255: "Other"
			},
			Flash: {
				0: "Flash did not fire",
				1: "Flash fired",
				5: "Strobe return light not detected",
				7: "Strobe return light detected",
				9: "Flash fired, compulsory flash mode",
				13: "Flash fired, compulsory flash mode, return light not detected",
				15: "Flash fired, compulsory flash mode, return light detected",
				16: "Flash did not fire, compulsory flash mode",
				24: "Flash did not fire, auto mode",
				25: "Flash fired, auto mode",
				29: "Flash fired, auto mode, return light not detected",
				31: "Flash fired, auto mode, return light detected",
				32: "No flash function",
				65: "Flash fired, red-eye reduction mode",
				69: "Flash fired, red-eye reduction mode, return light not detected",
				71: "Flash fired, red-eye reduction mode, return light detected",
				73: "Flash fired, compulsory flash mode, red-eye reduction mode",
				77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
				79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
				89: "Flash fired, auto mode, red-eye reduction mode",
				93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
				95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
			},
			SensingMethod: {
				1: "Not defined",
				2: "One-chip color area sensor",
				3: "Two-chip color area sensor",
				4: "Three-chip color area sensor",
				5: "Color sequential area sensor",
				7: "Trilinear sensor",
				8: "Color sequential linear sensor"
			},
			SceneCaptureType: {
				0: "Standard",
				1: "Landscape",
				2: "Portrait",
				3: "Night scene"
			},
			SceneType: {
				1: "Directly photographed"
			},
			CustomRendered: {
				0: "Normal process",
				1: "Custom process"
			},
			WhiteBalance: {
				0: "Auto white balance",
				1: "Manual white balance"
			},
			GainControl: {
				0: "None",
				1: "Low gain up",
				2: "High gain up",
				3: "Low gain down",
				4: "High gain down"
			},
			Contrast: {
				0: "Normal",
				1: "Soft",
				2: "Hard"
			},
			Saturation: {
				0: "Normal",
				1: "Low saturation",
				2: "High saturation"
			},
			Sharpness: {
				0: "Normal",
				1: "Soft",
				2: "Hard"
			},
			SubjectDistanceRange: {
				0: "Unknown",
				1: "Macro",
				2: "Close view",
				3: "Distant view"
			},
			FileSource: {
				3: "DSC"
			},
			Components: {
				0: "",
				1: "Y",
				2: "Cb",
				3: "Cr",
				4: "R",
				5: "G",
				6: "B"
			}
		}, a.getData = function(a, b) {
			return a.complete ? (c(a) ? b && b() : d(a, b), !0) : !1
		}, a.getTag = function(a, b) {
			return c(a) ? a.exifdata[b] : void 0
		}, a.getAllTags = function(a) {
			if(!c(a)) return {};
			var b = a.exifdata,
				d = {};
			for(var e in b) b.hasOwnProperty(e) && (d[e] = b[e]);
			return d
		}, a.pretty = function(a) {
			if(!c(a)) return "";
			var b = a.exifdata,
				d = "";
			for(var e in b) b.hasOwnProperty(e) && (d += "object" == typeof b[e] ? e + " : [" + b[e].length + " values]\r\n" : e + " : " + b[e] + "\r\n");
			return d
		}, a.readFromBinaryFile = function(a) {
			return e(a)
		}, b(window, "load", i)
	}(), window.EXIF = a
});