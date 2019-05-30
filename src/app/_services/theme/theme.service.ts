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
      this.statusBar.styleBlackOpaque();

    } else {
      this.statusBar.backgroundColorByHexString('#ffffff');
      this.statusBar.styleDefault();
    }
    this.document.documentElement.style.cssText = theme
  }

  getDarkTheme() {
    return `
      ${this.currentTheme}
      --background-surface-color: #243447;
      --ion-background-color: #141d26;
      --darker-color: #141d26;
      --ion-item-background-color: #243447;
      --modal-color: #243447;
      --toast-color: #243447;
      --ion-toolbar-background: #243447;
      --ion-border-color: #243447;
      --ion-color-primary: #0084b4;
      --ion-text-color: #fff;
      --ion-text-color-step-400: #fff;
      --ion-text-color-step-600: #fff;
      --ion-inverted-color: #fff;
    `
  }

  getLightTheme() {
    return `
      ${this.currentTheme}
      --background-surface-color: #efefef;
      --ion-background-color: #fff;
      --darker-color: #efefef;
      --ion-item-background-color: #fff;
      --modal-color: #fff;
      --toast-color: #000;
      --ion-toolbar-background: #fff;
      --ion-border-color: #d8d8d8;
      --ion-color-primary: #08a0e9;
      --ion-text-color: #222;
      --ion-text-color-step-400: #222;
      --ion-text-color-step-600: #222;
      --ion-inverted-color: #fff;
    `
  }
}