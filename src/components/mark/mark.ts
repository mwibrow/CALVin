import { Component } from "@angular/core";

/**
 * Generated class for the MarkComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "mark",
  templateUrl: "mark.html",
})
export class MarkComponent {
  text: string;

  constructor() {
    global.console.log("Hello MarkComponent Component");
    this.text = "Hello World";
  }
}
