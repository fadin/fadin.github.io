class Test{
	charging(){
    if (window.navigator && window.navigator.battery) {
   // API supported
			return navigator.battery.charging;
} else {
   // Not supported
	return false;
}
	}
	
	await proximity(){
		if ('ondeviceproximity' in window) {
   // API supported
			return new Promise(resolve, reject){
				window.addEventListener('userproximity', event => {
					if(event.near){
						resolve();
					}else{
						reject();
					}
				});
			});
} else {
   // Not supported
	return false;
}
	}
	
	vibrate(nsec){
		if (window.navigator && window.navigator.vibrate) {
   // API supported
			navigator.vibrate(nsec);
} else {
   // Not supported
}
	}
	
	await ambient(){
if ("AmbientLightSensor" in window) {
  const sensor = new AmbientLightSensor();
	return new Promise((resolve, reject) => {
  sensor.addEventListener("reading", (event) => {
    console.log("Current light level:", sensor.illuminance);
  });
	})
  sensor.start();
}
	}
}
