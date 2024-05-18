import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environments} from "../environment";

@Injectable({
  providedIn: 'root'
})

export class FileServices {

  constructor(private http : HttpClient)  {
  }

  patchCertificateWithSignedPDF(id: string, formData: FormData) {
    const url = `${environments.apiUrl}/Certificates/UploadSignedPdf/id?id=${id}`;

    // Assuming the API expects the 'id' in the URL and the file in the form data
    this.http.patch(url, formData).subscribe({
      next: response => {
        console.log('Successfully uploaded the PDF', response);
      },
      error: error => {
        console.error('Error uploading the PDF', error);
      }
    });
  }
}

