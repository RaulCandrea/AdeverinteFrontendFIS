import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  pdfContent = '';
  constructor(private http : HttpClient) { }


  openPdfInNewWindow(pdfContent: string) {
    const pdfBlob = this.base64ToBlob(pdfContent, 'application/pdf');
    if (pdfBlob) {
      const newWindow = window.open(URL.createObjectURL(pdfBlob), '_blank');
      if (!newWindow) {
        alert('Popup Blocked! Please allow popups for this site.');
      }
    }
  }

  private base64ToBlob(base64Data: string, contentType: string): Blob | null {
    const byteCharacters = atob(base64Data) ;
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }

  getPdfContent(certificateId: string): Observable<string> {
    const apiUrl = `${environments.apiUrl}/Certificates/GetPdf/id?id=${certificateId}`;
    return this.http.get<string>(apiUrl);
  }


}
