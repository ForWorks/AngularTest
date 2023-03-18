import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[roleRef]'
})

export class RoleRefDirective {
    constructor(public containerRef: ViewContainerRef) {}
}