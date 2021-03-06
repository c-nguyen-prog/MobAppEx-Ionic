import { Injectable, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private currentTheme = ''

  constructor(@Inject(DOCUMENT) private document: Document,
              private statusBar: StatusBar) {}

  setPrimaryColor(color: string) {
    this.setVariable('--ion-color-primary', color)
  }

  setVariable(name: string, value: string) {
    this.currentTheme = `${name}: ${value};`
    this.document.documentElement.style.setProperty(name, value)
  }

  enableDarkMode(enableDarkMode: boolean) {
    let theme = this.getLightTheme()
    if (enableDarkMode) {
      theme = this.getDarkTheme();
      this.statusBar.backgroundColorByHexString('#141d26');
      //NavigationBar.backgroundColorByHexString('#141d26', false);
      this.statusBar.styleBlackOpaque();

    } else {
      this.statusBar.backgroundColorByHexString('#ffffff');
      //NavigationBar.backgroundColorByHexString('#efefef', true);
      this.statusBar.styleDefault();
    }
    this.document.documentElement.style.cssText = theme
  }

  getDarkTheme() {
    return `
      ${this.currentTheme}
      --ion-background-color: #141d26;
      --ion-item-background-color: #243447;
      --ion-toolbar-background: #243447;
      --ion-border-color: #243447;
      
      --darker-ripple-color: #141d26;    
      --darker-color: #141d26;
      --background-surface-color: #243447;
      --modal-color: #243447;
      --toast-color: #243447;
      --ion-inverted-color: #fff;

      --ion-color-primary: #0084b4;
      --ion-text-color: #fff;
      --ion-text-color-step-400: #fff;
      --ion-text-color-step-600: #fff;

      --snooze-logo: url('../../../assets/images/SnoozeLogo_Dark2.svg');
      --disconnected-ico: url('../../../assets/images/icons/za_disconnected_w.svg');
    `
  }

  getLightTheme() {
    return `
      ${this.currentTheme}
      --ion-background-color: #fff;
      --ion-item-background-color: #fff;
      --ion-toolbar-background: #fff;
      --ion-border-color: #d8d8d8;
      
      --darker-ripple-color: #cecece;
      --darker-color: #efefef;
      --background-surface-color: #efefef;
      --modal-color: #fff;
      --toast-color: #000;
      --ion-inverted-color: #fff;

      --ion-color-primary: #38c7ef;
      --ion-text-color: #222;
      --ion-text-color-step-400: #222;
      --ion-text-color-step-600: #222;

      --snooze-logo: url('../../../assets/images/SnoozeLogo_Light2.svg');
      --disconnected-ico: url('../../../assets/images/icons/za_disconnected.svg');
    `
  }
}



// old primary light colors: #08a0e9, 09ABF5
// snooze logo: 40c3ea
// splash color: 42A5FF
// snooze logo new: 38c7ef rgb(56, 199, 239)
// snooze font new: 343434 rgb(52, 52, 52)