import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Camera} from 'ionic-native';
import {Page, Platform} from 'ionic-angular';
import {NgZone} from '@angular/core';


/*
  Generated class for the CameraPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/camera/camera.html',
    providers: [Camera]
})
export class CameraPage {
    _zone: any;
    platform: any;
    images: Array<{ src: String }>;

    constructor(platform: Platform, _zone: NgZone) {

        this._zone = _zone;
        this.platform = platform;
        this.images = [];
    }
    takePic() {
      let options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        saveToPhotoAlbum: false
      };
        Camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            let base64Image = "data:image/jpeg;base64," + imageData;
            this._zone.run(() => this.images.unshift({
                src: base64Image
            }))
        }, (err) => {
        }
      );
    }
}
