// This program runs on a Photon and provides a variable holding
// the Photon's current temperature to the Particle cloud.
// Particle.publish is used for debugging and can be removed
// from this code.

#include <Adafruit_Si7021.h>

// The sensor
Adafruit_Si7021 sensor = Adafruit_Si7021();
// Humidity and readTemperature
double h;
double t;
// The variable temp is global and will be available to the twin upon request from the twin
double temp;

void setup() {
    sensor.begin();
    Particle.variable("t", &t, DOUBLE);
    Particle.variable("h", &h, DOUBLE);
    // tempVar is the name we use from outside to access temp
    Particle.variable("tempVar", temp);
}

void loop() {

    h = sensor.readHumidity();
    t = sensor.readTemperature();

    String temperature = String(t);
    String humidity = String(h);

    temperature = temperature.format("%1.2f", t);
     // we don’t send the temp to the twin. The twin comes down and gets it
     // when asked to do so.
    temp = t;

    Particle.publish("temperature", temperature, PUBLIC);

    delay(30000);

    Particle.publish("humidity", humidity, PUBLIC);

    delay(30000);
}
