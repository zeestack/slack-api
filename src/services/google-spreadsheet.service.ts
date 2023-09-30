import { Injectable } from '@nestjs/common';
import { getAuthCredentials } from './google.credentials';
import { google } from 'googleapis';

const API_SCOPE = ['https://www.googleapis.com/auth/spreadsheets'];

@Injectable()
export class GoogleApiService {
  private spreadsheetId = process.env.spreadsheetId;
  private sheetName = process.env.sheetName;

  private googleAuth = null;
  constructor(spreadsheetId: string, sheetName: string) {
    this.spreadsheetId = spreadsheetId;
    this.sheetName = sheetName;
    this.googleAuth = new google.auth.GoogleAuth({
      scopes: API_SCOPE,
      credentials: getAuthCredentials(),
    });
  }

  async getHeaders(): Promise<any[] | null> {
    const sheets = google.sheets('v4');

    const response = await sheets.spreadsheets.values.get({
      auth: this.googleAuth,
      spreadsheetId: this.spreadsheetId,
      range: this.sheetName,
    });

    const rows = response.data.values;
    if (!rows) return null;
    return rows[0];
  }

  async getValues(data: any) {
    let headers = await this.getHeaders();
    if (headers !== null) {
      return [headers.map((key) => data[key])];
    }

    headers = Object.keys(data).map((key) => key);
    return [headers, headers.map((key) => data[key])];
  }

  async writeDataToGoogleSheet(data: Record<string, string>) {
    const sheets = google.sheets('v4');
    const values = await this.getValues(data);

    const response = await sheets.spreadsheets.values.append({
      auth: this.googleAuth,
      spreadsheetId: this.spreadsheetId,
      range: this.sheetName,
      valueInputOption: 'RAW',
      includeValuesInResponse: true,
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: values,
      },
    });

    return response.data;
  }
}
