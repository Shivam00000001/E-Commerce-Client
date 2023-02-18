import { Directive, HostListener,HostBinding, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from './_model/file-handle.model';
import {EventEmitter} from '@angular/core';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {
  @Output() files : EventEmitter<FileHandle> = new EventEmitter();

  constructor(private sanitizer:DomSanitizer) { }

  @HostBinding("style.background")
  private background = "#eee";

  @HostListener("dragover",["$event"])
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#999";
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault;
    evt.stopPropagation;
    this.background = "#eee";
  }

  @HostListener("drop", ["$event"])
  public onDrop(evt: DragEvent) {
    evt.preventDefault;
    evt.stopPropagation;
    this.background = "#eee";

    let fileHandle: FileHandle;
    const file : any = evt.dataTransfer?.files[0];
    const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    fileHandle = {file, url};
    this.files.emit(fileHandle);
  }

}
