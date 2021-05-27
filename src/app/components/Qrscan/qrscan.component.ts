import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'charset':"utf-8"
    })
  }; 


@Component({
    selector: 'app-qrscan',
    templateUrl: './qrscan.component.html',
    styleUrls: ['./qrscan.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class QrscanComponent implements OnInit {
    title(title: any) {
      throw new Error('Method not implemented.');
    }
 
 
    @ViewChild(QrScannerComponent) qrScannerComponent!: QrScannerComponent ;
 
    ngOnInit() {

    }

    ngAfterViewInit(): void {
        this.qrScannerComponent.getMediaDevices().then(devices => {
            console.log(devices);
            const videoDevices: MediaDeviceInfo[] = [];
            for (const device of devices) {
                if (device.kind.toString() === 'videoinput') {
                    videoDevices.push(device);
                }
            }
            if (videoDevices.length > 0){
                let choosenDev;
                for (const dev of videoDevices){
                    if (dev.label.includes('front')){
                        choosenDev = dev;
                        break;
                    }
                }
                if (choosenDev) {
                    this.qrScannerComponent.chooseCamera.next(choosenDev);
                } else {
                    this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
                }
            }
        });
 
        this.qrScannerComponent.capturedQr.subscribe(result => {
           
            console.log(JSON.stringify({ result }));

        });
    

    
    }
}