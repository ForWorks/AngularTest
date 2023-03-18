import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[userRef]'
})

export class UserRefDirective {
    constructor(public containerRef: ViewContainerRef) {}
}