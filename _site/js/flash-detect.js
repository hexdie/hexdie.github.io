var flashEnabled = false;
try {
  var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
  if (fo) {
    flashEnabled = true;
  }
} catch (e) {
  if (navigator.mimeTypes
        && navigator.mimeTypes['application/x-shockwave-flash'] != undefined
        && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
    flashEnabled = true;
  }
}

if(flashEnabled){
	$(".flash-disabled").hide();
}
else {
	$(".flash-enabled").hide();
}