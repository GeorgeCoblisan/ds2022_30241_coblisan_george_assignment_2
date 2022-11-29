import { Inject, Injectable  } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('ENERGY_PRODUCER') private client: ClientProxy ) {}

  async sendEnergyConsumption() {
    const fs = require("fs");
    fs.readFile("sensor.csv", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      }
     else {
      const sensorData = data.split(/\r?\n/);
      sensorData.forEach((data, i) => {
        setTimeout(() => {
          const timestamp = Date.now().toString();
          const deviceId = '0a04dea9-0560-4918-81a4-1b400023d5c4';
          const dataToSend = {
            timestamp: timestamp,
            device_id: deviceId,
            measurement_value: data
          };
          console.log(JSON.stringify(dataToSend));
          this.client.send('energy', JSON.stringify(dataToSend)).toPromise();
        }, i * 10000);
      });
     }
    });
  }
}
