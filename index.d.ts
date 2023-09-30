// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace NodeJS {
  export interface ProcessEnv extends NodeJS.ProcessEnv {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
    universe_domain: string;
    spreadsheetId: string;
    sheetName: string;
  }
}
