import { Component, HostListener } from "@angular/core";
import { NavController, App, AlertController } from "ionic-angular";
import { SelectTalkerPage } from "../select-talker/select-talker";
import { AudioProvider } from "../../providers/audio/audio";
import { AppDataProvider } from "../../providers/app-data/app-data";

import * as mdColors from "material-colors";

let _remote = null;
try {
  _remote = window["require"]("electron").remote;
} catch (err) {
  global.console.debug("No electron remote detected");
}

const remote = _remote;

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  audioAvailable: boolean;
  remote: any;
  title = "CALVin";
  constructor(
    private audio: AudioProvider,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public appData: AppDataProvider,
    private app: App
  ) {
    this.remote = remote;
  }

  getBackgroundColor() {
    return mdColors && mdColors.yellow ? mdColors.yellow[500] : "yellow";
  }

  ngOnInit() {
    this.audioAvailable = true;
    this.checkAudio();
  }

  ionViewDidEnter() {
    this.app.setTitle("CALVin");
    document.getElementById("home-page-start-button").focus();
  }

  checkAudio() {
    this.audio.startAudio().catch(() => {
      this.audioAvailable = false;
    });
  }

  exitApplication() {
    let alert = this.alertCtrl.create({
      title:
        // tslint:disable-next-line: max-line-length
        'Are you sure you want to quit <div class="calvin-logo"><span>C</span><span>A</span><span>L</span><span>V</span><span>in</span></div>&nbsp;?',
      subTitle: "",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "OK",
          handler: () => remote && remote.getCurrentWindow().close(),
        },
      ],
      cssClass: "alert",
    });
    alert.present();
  }

  onStart() {
    this.navCtrl.push(SelectTalkerPage);
  }

  @HostListener("document:keydown", ["$event"])
  onKeypress(event: KeyboardEvent) {
    this.handleKeyboardEvents(event);
  }

  handleKeyboardEvents(event) {
    let key = event.key || event.keyCode;
    switch (event.type) {
      case "keydown":
        switch (key) {
          case "F11":
            let currentWindow = remote.getCurrentWindow();
            if (currentWindow.isMaximized()) {
              currentWindow.unmaximize();
            } else {
              currentWindow.maximize();
            }
        }
    }
  }
}
