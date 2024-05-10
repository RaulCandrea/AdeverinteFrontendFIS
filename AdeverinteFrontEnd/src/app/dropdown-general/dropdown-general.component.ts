import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {CertificateServices} from "../services/certificate.services";


@Component({
  selector: 'app-dropdown-general',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './dropdown-general.component.html',
  styleUrl: './dropdown-general.component.scss'
})
export class DropdownGeneralComponent {
  @Input() options: string[] = [];
  @Input() titlu : string ='';
  @Output() optionSelected = new EventEmitter<string>();

  selectedOption: string | any;
constructor(private certificateService : CertificateServices) {
}
  onSelect(option: string): void {
    this.selectedOption = option;
    this.optionSelected.emit(option);

  }

}
